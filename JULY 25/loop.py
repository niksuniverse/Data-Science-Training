age =int(input("Enter the age : "))

if age>=18:
    print("you can vote")
else:
    print("You are too young to vote.")


score = int(input("Enter ur marks: "))

if score >= 90:
    print("Excellent! ")
elif score >= 75:
    print("Great job! Keep it up.")
elif score >= 50:
    print("Not bad")
else:
    print("Let's focus and try again.")

count=1
while count <=5:
    print("Count is: ", count)
    count +=1

print()

for i in range(5):
    print("Number:",i)

print()

for i in range(1, 6):
    print(f"Counting: {i}")

for i in range(10):
    if i==5:
        continue #skips 5
    if i==8:
        break #stop at 8
    print(i)
