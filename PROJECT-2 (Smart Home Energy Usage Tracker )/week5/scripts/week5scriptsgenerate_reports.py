#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate weekly energy reports:
- Load CSV logs
- Clean malformed/missing records
- Daily & weekly summaries
- Peak vs Off-Peak split
- Alerts when daily_kwh > threshold per device/day
- Save CSV outputs + plain execution log

Inputs:
  --input      path to input CSV (device_id,room_id,timestamp,energy_kwh)
  --out        output directory
  --threshold  alert threshold in kWh (per device per day)
"""

import argparse
import os
import sys
import pandas as pd
import numpy as np

def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, help="Path to energyusage.csv")
    p.add_argument("--out", required=True, help="Output folder")
    p.add_argument("--threshold", type=float, default=10.0, help="Daily per-device kWh alert threshold")
    return p.parse_args()

def log(msg: str):
    print(msg, flush=True)

def main():
    args = parse_args()
    os.makedirs(args.out, exist_ok=True)

    # -----------------------------
    # Load & Clean
    # -----------------------------
    log(f"[INFO] Loading: {args.input}")
    df = pd.read_csv(args.input)

    # Standardize column names (lowercase)
    df.columns = [c.strip().lower() for c in df.columns]

    required = {"device_id", "room_id", "timestamp", "energy_kwh"}
    if not required.issubset(df.columns):
        log(f"[ERROR] Missing required columns. Found: {list(df.columns)}")
        sys.exit(1)

    # Parse timestamp and energy as numeric
    df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
    df["energy_kwh"] = pd.to_numeric(df["energy_kwh"], errors="coerce")

    # Drop bad rows
    before = len(df)
    df = df.dropna(subset=["device_id", "room_id", "timestamp", "energy_kwh"])
    df = df[df["energy_kwh"] > 0]
    after = len(df)
    log(f"[INFO] Cleaned rows: kept {after} / {before}")

    # Save cleaned
    cleaned_path = os.path.join(args.out, "cleaned_energy_usage.csv")
    df.to_csv(cleaned_path, index=False)
    log(f"[OK] Saved cleaned dataset -> {cleaned_path}")

    # -----------------------------
    # Enrich: day/week/hour labels
    # -----------------------------
    df["day"] = df["timestamp"].dt.date
    # Weekly label: ISO week start (Monday). Store week-start date for clarity.
    # Using Monday (weekday=0) by subtracting current weekday days.
    df["week_start"] = df["timestamp"].dt.floor("D") - pd.to_timedelta(df["timestamp"].dt.weekday, unit="D")
    df["hour"] = df["timestamp"].dt.hour
    df["usage_type"] = np.where((df["hour"] >= 18) & (df["hour"] <= 23), "peak", "off_peak")

    # -----------------------------
    # Daily Summary (per device, room, day)
    # -----------------------------
    daily = (
        df.groupby(["day", "device_id", "room_id"], as_index=False)
          .agg(daily_kwh=("energy_kwh", "sum"),
               daily_avg_kwh=("energy_kwh", "mean"),
               readings=("energy_kwh", "count"))
          .sort_values(["day", "device_id"])
    )
    daily_path = os.path.join(args.out, "daily_summary.csv")
    daily.to_csv(daily_path, index=False)
    log(f"[OK] Saved daily summary -> {daily_path}")

    # -----------------------------
    # Weekly Summary (per device, room, week_start)
    # -----------------------------
    weekly = (
        df.groupby(["week_start", "device_id", "room_id"], as_index=False)
          .agg(weekly_kwh=("energy_kwh", "sum"),
               weekly_avg_kwh=("energy_kwh", "mean"),
               readings=("energy_kwh", "count"))
          .sort_values(["week_start", "device_id"])
    )
    weekly_path = os.path.join(args.out, "weekly_summary.csv")
    weekly.to_csv(weekly_path, index=False)
    log(f"[OK] Saved weekly summary -> {weekly_path}")

    # -----------------------------
    # Peak vs Off-Peak (per device)
    # -----------------------------
    pv = (
        df.groupby(["device_id", "usage_type"], as_index=False)
          .agg(total_kwh=("energy_kwh", "sum"))
    )
    # Pivot to columns peak/off_peak
    pv = pv.pivot(index="device_id", columns="usage_type", values="total_kwh").fillna(0.0)
    pv["total_usage"] = pv.get("peak", 0.0) + pv.get("off_peak", 0.0)
    pv = pv.reset_index()
    pv_path = os.path.join(args.out, "peak_offpeak_summary.csv")
    pv.to_csv(pv_path, index=False)
    log(f"[OK] Saved peak/off-peak summary -> {pv_path}")

    # -----------------------------
    # Alerts (daily threshold)
    # -----------------------------
    alerts = daily[daily["daily_kwh"] > args.threshold].copy()
    alerts_path = os.path.join(args.out, "alerts.csv")
    if not alerts.empty:
        alerts.to_csv(alerts_path, index=False)
        log(f"[ALERT] Threshold exceeded for {len(alerts)} device-day rows (> {args.threshold} kWh). -> {alerts_path}")
        # Also echo individual warnings (visible in pipeline logs)
        for _, r in alerts.iterrows():
            log(f"WARNING: device_id={r['device_id']}, room_id={r['room_id']}, day={r['day']}, daily_kwh={r['daily_kwh']:.2f}")
    else:
        # Create empty file for artifact consistency
        pd.DataFrame(columns=alerts.columns).to_csv(alerts_path, index=False)
        log("[OK] No alerts triggered.")

    # -----------------------------
    # Basic run metadata / execution summary
    # -----------------------------
    summary_lines = [
        "=== Execution Summary ===",
        f"Input file: {args.input}",
        f"Cleaned rows: {after}",
        f"Threshold (kWh/day): {args.threshold}",
        f"Outputs:",
        f" - {cleaned_path}",
        f" - {daily_path}",
        f" - {weekly_path}",
        f" - {pv_path}",
        f" - {alerts_path}",
    ]
    log("\n".join(summary_lines))

if __name__ == "__main__":
    main()
