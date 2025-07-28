import pandas as pd
db=pd.read_csv('employee.csv')
print(db)

db.to_csv('updated_emp.csv',index=False)
print("Datas updated to updated_emp csv file")