#basics
"""
Q1. Write a function is_prime(n) that returns True if n is a prime number, else False .
"""


def is_prime(n):
    if n==2:
        return True
    elif n<=1:
        return False
    else:
        for i in range(2,int(n ** 0.5) + 1):
            if n%i==0:
                return False;

        return True


n=int(input("Enter a number : "))
if(is_prime(n)):
    print(f"{n} is prime")
else:
    print(f"{n} is not prime")

'''
Q2. Write a program that:
Accepts a string
Reverses it
Checks if it's a palindrome
'''
name =input("Enter a string value: ")
reverse_name =name[::-1]
print(f"{reverse_name} is the reversed name of {name}.")
if name.lower().replace(" ", "") == reverse_name.lower().replace(" ", ""):
    print(f"{name} is palindrome" )
else:
    print(f"{name} is not a palindrome")


'''
Q3. Given a list of numbers, write code to:
Remove duplicates
Sort them
Print the second largest number
'''

l = list(map(int, input("Enter numbers : ").split()))
#to remove duplicates
l=list(set(l))
print(l)
l.sort()
print(l)
print(f"Second largest number is {l[1]}")
