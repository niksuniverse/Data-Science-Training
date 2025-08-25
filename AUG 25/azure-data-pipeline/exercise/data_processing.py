# data_processing.py
import pandas as pd
import os

# Create the data/ directory if it doesn't exist
os.makedirs('data', exist_ok=True)

# Read the raw sales data
raw_file = 'data/raw_sales_data.csv'
df = pd.read_csv(raw_file)

# Save raw file without modification
df.to_csv(raw_file, index=False)

# Drop rows with missing values
df_cleaned = df.dropna()

# Normalize column names to lowercase
df_cleaned.columns = [col.lower() for col in df_cleaned.columns]

# Convert date columns to YYYY-MM-DD format
for col in df_cleaned.columns:
    if 'date' in col:
        try:
            df_cleaned[col] = pd.to_datetime(df_cleaned[col]).dt.strftime('%Y-%m-%d')
        except Exception as e:
            print(f"Skipping column {col}, error: {e}")

# Save cleaned data
clean_file = 'data/clean_sales_data.csv'
df_cleaned.to_csv(clean_file, index=False)

print("Data processing complete. Files saved in /data/")
