import pandas as pd
db=pd.read_csv('employee.csv')
print(db)

db.to_csv('updated_emp.csv',index=False)
print("Datas updated to updated_emp csv file")\

import json
with open('data.json','r') as f:
    data=json.load(f)
print("JSON Read:\n",data)

with open('Output.json','w') as f:
    json.dump(data,f,indent=4)
print("JSON Written to output.json")