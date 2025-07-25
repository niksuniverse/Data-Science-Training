
def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0
  
def mul(n,m):
    return n*m
  
def sub(a,b):
  if a>b:
    return a-b
  else:
    return b-a

def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

def reverse_string(s):
    return s[::-1]

def get_max(lst):
    return max(lst)

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]


def average(numbers):
    return sum(numbers) / len(numbers) if numbers else 0
