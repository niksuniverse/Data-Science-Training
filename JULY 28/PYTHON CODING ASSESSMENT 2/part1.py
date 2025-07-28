# Part 1: Python Basics
# 🔸Q1. Write a Python function factorial(n) using a loop.
# Don’t use math.factorial().

def fact(n):
    f=1
    for i in range(1,n+1):
        f=f*i
    return f

n=int(input("Enter the number: "))
print(f"The factorial for {n} is {fact(n)}")

# Q2. Create a list of tuples like this:
# [("Aarav", 80), ("Sanya", 65), ("Meera", 92), ("Rohan", 55)] Write code to:
# •	Print only names of students scoring above 75
# •	Calculate and print average score

l = [("Aarav", 80), ("Sanya", 65), ("Meera", 92), ("Rohan", 55)]

print("All students:")
for name, score in l:
    print(f"{name}: {score}")

print("Students scoring more than 75")
for name,score in l:
    if score >75:
        print(f"{name} :{score}")


sum = 0
for name, score in l:
    sum += score
average = sum / len(l)
print("Average score: ", average)