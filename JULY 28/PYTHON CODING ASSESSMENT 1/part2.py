"""
  Part 2: Classes and Inheritance P
Q4. Create a base class Person  with:
 Attributes: name, age
 Method: display()
 Create a derived class Employee:
 Additional attributes: employee_id, department
 Override display() to include all attributes
 
"""

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")

class Employee(Person):
    def __init__(self, name, age, emp_id, dept):
        super().__init__(name, age)
        self.emp_id = emp_id
        self.dept = dept

    def display(self):
        super().display()
        print(f"Employee ID: {self.emp_id}")
        print(f"Department: {self.dept}")

emp = Employee("Nikitha", 21, "BAD035", "Artificial Intelligence and Data Science")
emp.display()

"""
 Q5. Demonstrate method overriding with another example: 
 Vehicle → Car
 drive() method with custom message in child
 """

class Vehicle:
    def drive(self):
        print("ride by vehicle")
class Car(Vehicle):
    def drive(self):
        print("Car drived !!")

c=Car()
c.drive()