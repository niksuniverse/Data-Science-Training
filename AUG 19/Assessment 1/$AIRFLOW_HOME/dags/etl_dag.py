# etl_dag.py
# Multi-step ETL DAG in Airflow using PythonOperator and BashOperator
# Deliverable for assignment

import json
import os
import pathlib
from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models import Variable

# ----- Config -----
DEFAULT_DATA_DIR = "/tmp/airflow_etl"
DATA_DIR = Variable.get("ETL_DATA_DIR", default_var=DEFAULT_DATA_DIR)

default_args = {
    "owner": "airflow",
    "retries": 1,
    "retry_delay": timedelta(minutes=1),
}


def _ensure_dirs():
    """Ensure directories for raw, staging, and warehouse exist"""
    raw = os.path.join(DATA_DIR, "raw")
    staging = os.path.join(DATA_DIR, "staging")
    warehouse = os.path.join(DATA_DIR, "warehouse")
    for d in (raw, staging, warehouse):
        pathlib.Path(d).mkdir(parents=True, exist_ok=True)
    return raw, staging, warehouse


def transform_callable(**context):
    """Transform JSON to CSV and push record count to XCom"""
    import csv
    import logging
    ti = context["ti"]

    logger = logging.getLogger("airflow.task")
    logger.info("Starting transform stage...")

    raw_dir, staging_dir, _ = _ensure_dirs()
    raw_file = os.path.join(raw_dir, "data.json")

    if not os.path.exists(raw_file):
        raise FileNotFoundError(f"Expected raw file not found: {raw_file}")

    logger.info("Reading raw JSON: %s", raw_file)
    with open(raw_file, "r") as f:
        rows = json.load(f)

    # Transformation: keep only active users, clean names
    transformed_rows = []
    for r in rows:
        if r.get("active"):
            transformed_rows.append({
                "id": r.get("id"),
                "name": r.get("name", "").strip().title(),
                "amount": float(r.get("amount", 0)),
            })

    staging_file = os.path.join(staging_dir, "data_transformed.csv")
    logger.info("Writing transformed CSV: %s", staging_file)
    with open(staging_file, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "name", "amount"])
        writer.writeheader()
        writer.writerows(transformed_rows)

    record_count = len(transformed_rows)
    logger.info("Transform complete. Records written: %d", record_count)

    # Push to XCom
    ti.xcom_push(key="record_count", value=record_count)


with DAG(
    dag_id="etl_pipeline_example",
    description="Multi-step ETL pipeline using Bash and Python operators",
    default_args=default_args,
    start_date=datetime(2025, 1, 1),
    schedule=None,   # Manual trigger
    catchup=False,
    tags=["assignment", "etl"],
) as dag:

    _ensure_dirs()

    # ----- Task 1: Extract -----
    extract = BashOperator(
        task_id="extract_data",
        bash_command="""
        set -euo pipefail
        DATA_DIR="{{ var.value.get('ETL_DATA_DIR', '/tmp/airflow_etl') }}"
        RAW_DIR="$DATA_DIR/raw"
        mkdir -p "$RAW_DIR"
        echo '[INFO] Extract stage: writing sample JSON'
        cat > "$RAW_DIR/data.json" << 'JSON'
        [
          {"id": 1, "name": "  alice ", "amount": 10.5, "active": true},
          {"id": 2, "name": "Bob", "amount": 5, "active": false},
          {"id": 3, "name": "charlie", "amount": 12.75, "active": true}
        ]
        JSON
        echo '[INFO] Extract complete.'
        """,
        do_xcom_push=False,
    )

    # ----- Task 2: Transform -----
    transform = PythonOperator(
        task_id="transform_data",
        python_callable=transform_callable,
    )

    # ----- Task 3: Load -----
    load = BashOperator(
        task_id="load_data",
        bash_command="""
        set -euo pipefail
        DATA_DIR="{{ var.value.get('ETL_DATA_DIR', '/tmp/airflow_etl') }}"
        STAGING="$DATA_DIR/staging"
        WAREHOUSE="$DATA_DIR/warehouse"
        mkdir -p "$WAREHOUSE"
        echo "[INFO] Load stage: moving transformed CSV to warehouse"
        mv "$STAGING/data_transformed.csv" "$WAREHOUSE/data_transformed.csv"
        COUNT="{{ ti.xcom_pull(task_ids='transform_data', key='record_count') }}"
        echo "[INFO] Loaded records: $COUNT"
        echo "[INFO] Final artifact: $WAREHOUSE/data_transformed.csv"
        """,
        do_xcom_push=False,
    )

    # Task chaining: extract -> transform -> load
    extract >> transform >> load
