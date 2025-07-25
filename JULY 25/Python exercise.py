'''
1. FizzBuzz Challenge
Print numbers from 1 to 50:
If divisible by 3, print "Fizz"
If divisible by 5, print "Buzz"
If divisible by both, print "FizzBuzz"
Else, print the number
# Expected output sample:
# 1
# 2
# Fizz
# 4
# Buzz
# ...
'''

for i in range(1, 51):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)

'''
2. Login Simulation (Max 3 Attempts)
Ask for a username and password. Allow maximum 3 attempts to enter the correct
values ( admin / 1234 ). After 3 wrong tries, print "Account Locked".
'''

cor_username = "admin"
cor_password = "1234"
attempts = 0

while attempts < 3:
    username = input("Enter Username: ")
    password = input("Enter Passcode: ")

    if username == cor_username and password == cor_password:
        print("Login successful!!!!")
        break
    else:
        print("Username or password is wrong")
        attempts += 1

if attempts == 3:
    print("Account Locked!!")

'''
3. Palindrome Checker
Ask the user to input a word. Print whether the word is a palindrome (reads same
forward & backward).
# Example: madam → Palindrome
'''

word = input("Enter a word: ")
for i in word:
    if word == word[::-1]:
        print("It is palindrome")
        break
    else:
        print("It is not a palindrome")
        break

'''
4. Prime Numbers in a Range
Ask user for a number n and print all prime numbers from 1 to n.
# Example: input = 10 → Output: 2, 3, 5, 7
'''

n = int(input("Enter a number: "))
for num in range(2, n + 1):
    for i in range(2, num):
        if num % i == 0:
            break
    else:
        print(num, end=" ")

print()

'''
5. Star Pyramid
Use a for loop to print a triangle of stars:
# Example for n = 5:
# *
# **
# ***
# ****
# *****
'''

n = int(input("Enter a number: "))
for i in range(1, n + 1):
    print("*" * i)

'''
6. Sum of Digits
Ask the user to input a number like 456. Output should be 4 + 5 + 6 = 15
'''

num = int(input("Enter a number: "))
sum = 0
for digit in str(num):
    sum += int(digit)
print("Sum of digits:", sum)

"""
7. Multiplication Table Generator
Ask user for a number, print its multiplication table up to 10.
# Example: 3 → 3 x 1 = 3 ... up to 3 x 10 = 30
"""

number = int(input("Enter an integer: "))
for i in range(1, 11):
    value = number * i
    print(f"{number} x {i} = {value}")

"""
8. Count Vowels in a String
Ask user to enter a sentence. Print total number of vowels (a, e, i, o, u)
present.
"""

sen = input("Enter a sentence: ")
count = 0

for char in sen:
    if char.lower() in "aeiou":
        count += 1

print("Total vowels:", count)
