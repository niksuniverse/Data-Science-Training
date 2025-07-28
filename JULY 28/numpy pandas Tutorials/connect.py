import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Nikitha@2003',
    database='simple_Sql'
)
print("✅ Connected to the database!")

cursor = conn.cursor()

create_table_query = """
CREATE TABLE IF NOT EXISTS emp (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    gender VARCHAR(10),
    department VARCHAR(50),
    designation VARCHAR(50),
    salary DECIMAL(10, 2),
    date_of_joining DATE
);
"""
cursor.execute(create_table_query)
print("Table created or already exists.")

# insert_query = """
# INSERT INTO emp (name, age, gender, department, designation, salary, date_of_joining)
# VALUES (%s, %s, %s, %s, %s, %s, %s)
# """
# employees = [
#     ("Ananya Sharma", 29, "Female", "HR", "Recruiter", 45000.00, "2022-06-15"),
#     ("Ravi Kumar", 34, "Male", "IT", "Software Engineer", 75000.50, "2021-03-10"),
#     ("Meera Raj", 27, "Female", "Marketing", "Content Strategist", 56000.75, "2023-01-20"),
#     ("Vikram Patel", 40, "Male", "Finance", "Analyst", 82000.00, "2020-08-01")
# ]
#
# cursor.executemany(insert_query, employees)
# conn.commit()
# print(f"✅ {cursor.rowcount} records inserted successfully!")



update_query = """
UPDATE emp
SET designation = %s, salary = %s
WHERE name = %s
"""

cursor.execute(update_query, ("Senior Software Engineer", 85000.00, "Ravi Kumar"))
conn.commit()
print(f"✅ {cursor.rowcount} record(s) updated.")
delete_query = "DELETE FROM emp WHERE name = %s"
cursor.execute(delete_query, ("Meera Raj",))
conn.commit()
print(f"🗑️ {cursor.rowcount} record(s) deleted.")

cursor.execute("SELECT * FROM emp")
rows = cursor.fetchall()
for row in rows:
    print(row)

cursor.close()
conn.close()








