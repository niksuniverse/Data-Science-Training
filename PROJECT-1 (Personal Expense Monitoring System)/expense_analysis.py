import pandas as pd
import argparse
import os

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument("--threshold", type=float, required=True)
args = parser.parse_args()

# Simulated user + expenses data (replace with DB read in production)
data = {
    "user_email": ["a@x.com", "b@x.com", "c@x.com", "a@x.com", "b@x.com"],
    "month": [1, 1, 1, 2, 2],
    "expense": [1200, 2500, 500, 7000, 2000],
    "income": [5000, 6000, 4000, 5000, 6000],
}

df = pd.DataFrame(data)

# Monthly summary
summary = (
    df.groupby(["user_email", "month"], as_index=False)
      .agg({"income": "sum", "expense": "sum"})
)
summary["savings"] = summary["income"] - summary["expense"]
summary["alert"] = summary["expense"].apply(lambda x: "⚠️ High Spending" if x > args.threshold else "")

# Save output
os.makedirs("output", exist_ok=True)
output_path = "output/monthly_summary.csv"
summary.to_csv(output_path, index=False)

print(f"✅ Monthly analysis saved to {output_path}")
print(summary)
