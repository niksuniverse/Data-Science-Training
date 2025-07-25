# calculator.py

# 1. Add
def add(a, b):
    return a + b

# 2. Subtract
def subtract(a, b):
    return a - b

# 3. Multiply
def multiply(a, b):
    return a * b

# 4. Divide
def divide(a, b):
    return a / b if b != 0 else "Cannot divide by zero"

# 5. Modulus
def modulus(a, b):
    return a % b

# 6. Exponent
def power(a, b):
    return a ** b

# 7. Square root
def square_root(x):
    return x ** 0.5

# 8. Floor division
def floor_div(a, b):
    return a // b

# 9. Absolute value
def absolute(x):
    return abs(x)

# 10. Average of two numbers
def average(a, b):
    return (a + b) / 2

# 11. Maximum
def maximum(a, b):
    return max(a, b)

# 12. Minimum
def minimum(a, b):
    return min(a, b)

# 13. Factorial
def factorial(n):
    return 1 if n == 0 else n * factorial(n - 1)

# 14. Check even
def is_even(n):
    return n % 2 == 0

# 15. Check odd
def is_odd(n):
    return n % 2 != 0

# 16. Sum of digits
def sum_of_digits(n):
    return sum(int(d) for d in str(abs(n)))

# 17. Count digits
def count_digits(n):
    return len(str(abs(n)))

# 18. Reverse number
def reverse_number(n):
    return int(str(n)[::-1]) if n >= 0 else -int(str(abs(n))[::-1])

# 19. Check prime
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# 20. GCD
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
