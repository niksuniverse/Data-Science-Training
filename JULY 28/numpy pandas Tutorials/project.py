import numpy as np
import pandas as pd


raw_data = {
    'EmpID': [201, 202, 203, 204, 205, 206],
    'Name': ['Aarav', 'Sanya', None, 'Karthik', 'Meera', None],  # Missing names
    'Age': [24, np.nan, 29, 22, 31, np.nan],                    # Missing ages
    'Department': ['Finance', 'Tech', 'HR', None, 'Marketing', None],  # Missing departments
    'Salary': ['52000', '73000', 'not available', '48000', '61000', None]  # Invalid and missing salary
}

df=pd.DataFrame(raw_data)
print(df)

df['Name'] =df['Name'].fillna('Unknown')

print(df)

df['Department']=df['Department'].fillna('Not Assigned')

print(df)

df['Salary']=pd.to_numeric(df['Salary'],errors='coerce')

print(df)

df['Age']=df['Age'].fillna(df['Age'].mean())
df['Salary']=df['Salary'].fillna(df['Salary'].mean())

print(df)
print("Cleaned data!!! ")