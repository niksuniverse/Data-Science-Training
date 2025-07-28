
'''
Q6. Read the Q6. Read the students.csv students.csv and: and:
 Fill missing Age with average age
 Fill missing Score with 0
 Save the cleaned data as students_cleaned.csv
'''

import pandas as pd
data = pd.read_csv("students.csv")
print(data)

df = pd.DataFrame(data)

#fill missing age with mean
df['Age'] = df['Age'].fillna(df['Age'].mean())
print(df)

#fill missing score with o
df['Score']=df['Score'].fillna(0)
print(df)

df.to_csv("students_cleaned.csv", index=False)



'''
 Q7. Convert the cleaned CSV into JSON and save as students.json
'''
df.to_json("students.json", orient="records", lines=True)

