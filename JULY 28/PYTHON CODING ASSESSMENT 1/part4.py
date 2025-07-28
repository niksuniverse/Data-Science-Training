#Data cleaning and transformation

'''
Q8. Using Pandas and NumPy, perform the following on students_cleaned.csv:

• Add a column `Status` where:
   - If Score ≥ 85 → 'Distinction'
   - If 60 ≤ Score < 85 → 'Passed'
   - Else → 'Failed'

• Add another column `Tax_ID` with values like 'TAX-1', 'TAX-2', etc., using the ID column.
'''
import pandas as pd
import numpy as np
data=pd.read_csv('students_cleaned.csv')

df = pd.DataFrame(data)
df['Status'] = np.where(df['Score'] >= 85, 'Distinction',np.where(df['Score'] >= 60, 'Passed','Failed'))
print(df)

df['Tax_ID'] = 'TAX-' + df[' ID'].astype(str)
print(df)
df.to_csv("students_transformed.csv", index=False)