import os
import pandas as pd
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

# Environment Variables
ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
CONTAINER_NAME = os.getenv("AZURE_CONTAINER_NAME")

# File paths
RAW_FILE_PATH = "data/sales_data.csv"
RAW_OUTPUT_PATH = "raw_sales_data.csv"
PROCESSED_OUTPUT_PATH = "processed_sales_data.csv"

def load_data(file_path):
    return pd.read_csv(file_path)

def clean_and_enrich_data(df):
    df = df.drop_duplicates(subset=["order_id"])
    df["region"] = df["region"].fillna("Unknown")
    df["revenue"] = df["revenue"].fillna(0)
    df["profit_margin"] = df.apply(lambda row: (row["revenue"] - row["cost"]) / row["revenue"]
                                   if row["revenue"] != 0 else 0, axis=1)

    def segment_customer(revenue):
        if revenue > 100000:
            return "Platinum"
        elif 50000 < revenue <= 100000:
            return "Gold"
        else:
            return "Standard"

    df["customer_segment"] = df["revenue"].apply(segment_customer)
    return df

def save_files(raw_df, processed_df):
    raw_df.to_csv(RAW_OUTPUT_PATH, index=False)
    processed_df.to_csv(PROCESSED_OUTPUT_PATH, index=False)

def upload_to_blob(file_path, blob_name):
    try:
        blob_service_client = BlobServiceClient(
            f"https://{ACCOUNT_NAME}.blob.core.windows.net", credential=ACCOUNT_KEY)
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)

        with open(file_path, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)
        print(f"Uploaded {file_path} to Blob Storage as {blob_name}")
    except Exception as e:
        print(f"Error uploading {file_path}: {str(e)}")

def main():
    raw_df = load_data(RAW_FILE_PATH)
    processed_df = clean_and_enrich_data(raw_df.copy())

    save_files(raw_df, processed_df)

    upload_to_blob(RAW_OUTPUT_PATH, RAW_OUTPUT_PATH)
    upload_to_blob(PROCESSED_OUTPUT_PATH, PROCESSED_OUTPUT_PATH)

if __name__ == "__main__":
    main()
