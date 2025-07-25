"""Simplified Intermediate Python Exercises (All Topics Included)
1. BMI Calculator (Input + Function + Conditions + math )
What to do:
Ask user to enter weight (kg) and height (m)
Create a function to calculate BMI = weight / height^2
Print if the user is Underweight, Normal, or Overweight
Use: math.pow(height, 2) or height * height
"""
import math


def bmi(w,h):
    return w/(math.pow(h,2))
weight = float(input("Enter your weight in kg: "))
height = float(input("Enter your height in meters: "))

bmi = bmi(weight, height)

print(f"Your BMI is: {bmi:.2f}")

if bmi < 18.5:
    print("You are Underweight")
elif 18.5 <= bmi < 25:
    print("You are Normal")
else:
    print("You are Overweight")


"""
2. Strong Password Checker (Strings + Conditions + Loop)
What to do:
Ask the user to enter a password
Check if it:
Has at least 1 capital letter
Has at least 1 number
Has at least 1 special character like !@#$
If not, ask again until the password is strong.
"""



special_chars = "!@#$"

while True:
    passcode = input("Enter a strong password: ")

    has_upper = False
    has_digit = False
    has_special = False
    for char in passcode:
        if char.isupper():
            has_upper = True
        if char.isdigit():
            has_digit = True
        if char in special_chars:
            has_special = True

    if has_upper and has_digit and has_special:
        print("Password is strong!")
        break
    else:
        print(" Password must have at least one uppercase letter, one number, and one special character (!@#$). Please try again.")



"""
3. Weekly Expense Calculator (List + Loop + Built-in Functions)
What to do:
Ask the user to enter 7 numbers (daily expenses)
Store them in a list
Create a function to:
Show total spent
Show average per day
Show highest spend in a day
Use: sum() , max() , len()

"""
def tot_spent(li):
    total = 0
    for i in li:
        total += int(i)
    return total

def avg_per_day(li):
    return tot_spent(li) / len(li)

def highest(li):
    return max(li)

li = input("Enter total expenses (7 int values): ").split()

print(" Expenses List:", li)
print(" Total Spent:", tot_spent(li))
print(" Average Per Day:", avg_per_day(li))
print(" Highest Spend in a Day:", highest(li))



"""
4. Guess the Number (Loops + random )
What to do:
Use random.randint(1, 50) to pick a secret number
Ask the user to guess
Tell them if their guess is Too High, Too Low, or Correct
Give only 5 chances
"""

import random

secret = random.randint(1, 50)
attempts = 5

print(" Guess the secret number between 1 and 50! You have", attempts, "tries.")

for i in range(attempts):
    guess = int(input(f"Attempt {i+1}: "))
    if guess == secret:
        print("Correct! You guessed it.")
        break
    elif guess < secret:
        print("Too Low.")
    else:
        print("Too High.")
else:
    print(" Out of attempts! The secret number was:", secret)


"""
5. Student Report Card (Functions + Input + If/Else + datetime )

What to do:
Ask name and 3 subject marks
Create functions to:
Calculate total and average
Print grade: A, B, or C
Show current date using datetime.date.today()
"""
import datetime as d
name =input("Enter ur name: ")
marks =input("Enter 3 subject marks: ").split()
marks = list(map(int, marks))

def total(marks):
    sum=0
    for i in marks:
        sum +=i
    return sum

def avg(marks):
    return total(marks)/len(marks)

average = avg(marks)
if 90 <= average <= 100:
    grade = "A"
elif 60 <= average < 90:
    grade = "B"
elif 40 <= average < 60:
    grade = "C"
else:
    grade = "Failed"

print("\nStudent Report ")
print("Name:", name)
print("Marks:", marks)
print("Total:", total(marks))
print("Average:", round(average, 2))
print("Grade:", grade)
print("Date:", d.date.today())

"""
6. Contact Saver (Loop + Dictionary + File Writing)
What to do:
Show a menu:
1. Add Contact
2. View Contacts
3. Save & Exit
Save contacts (name, phone) in a dictionary
When exiting, write them into a file called contacts.txt line by line
Use: open() , for loop, dictionary

"""

contacts = {}

while True:
    print("\nContact Menu:")
    print("1. Add Contact")
    print("2. View Contacts")
    print("3. Save & Exit")
    choice = input("Choose an option (1/2/3): ")

    if choice == "1":
        name = input("Enter name: ")
        phone = input("Enter phone number: ")
        contacts[name] = phone
        print("Contact added.")

    elif choice == "2":
        if contacts:
            print("\nSaved Contacts:")
            for name, phone in contacts.items():
                print(f"{name}: {phone}")
        else:
            print("No contacts saved yet.")

    elif choice == "3":
        with open("contacts.txt", "w") as f:
            for name, phone in contacts.items():
                f.write(f"{name} {phone}\n")
        print("Contacts saved to 'contacts.txt'. Exiting...")
        break

    else:
        print("Invalid option. Please choose 1, 2, or 3.")
