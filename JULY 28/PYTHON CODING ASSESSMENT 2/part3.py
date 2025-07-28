
"""
Part 3: CSV Task – Data Cleaning
Use this CSV file: orders.csv
OrderID,CustomerName,Item,Quantity,Price
101,Aarav,Notebook,2,50
102,Sanya,Pen,5,20
103,Rohan,,3,25
104,,Marker,4,
105,Meera,Eraser,,10
Q5. Write a Python script using Pandas to:
•	Fill missing CustomerName with 'Unknown'
•	Fill missing Quantity and Price with 0
•	Add column TotalAmount = Quantity * Price
•	Save cleaned data to orders_cleaned.csv
"""

import pandas as pd

df = pd.read_csv("orders.csv")


df['CustomerName'] = df['CustomerName'].fillna('Unknown')
df['Quantity'] = df['Quantity'].fillna(0)
df['Price'] = df['Price'].fillna(0)


df['Quantity'] = pd.to_numeric(df['Quantity'], errors='coerce').fillna(0)
df['Price'] = pd.to_numeric(df['Price'], errors='coerce').fillna(0)

df['TotalAmount'] = df['Quantity'] * df['Price']

df.to_csv("orders_cleaned.csv", index=False)

print(" Data cleaned and saved to 'orders_cleaned.csv'")

