from PyPackage import calculator
from PyPackage import string_util
print("addition:" ,calculator.add(5,2))

print("Subtract:", calculator.subtract(10, 3))    # 7

print("Multiply:", calculator.multiply(4, 6))     # 24

print("Divide:", calculator.divide(8, 2))         # 4.0

print("Modulus:", calculator.modulus(9, 4))       # 1

print("Power:", calculator.power(2, 3))           # 8

print("Square Root:", calculator.square_root(49))# 7.0

print("Floor Division:", calculator.floor_div(9, 2)) # 4

print("Absolute:", calculator.absolute(-5))       # 5

print("Average:", calculator.average(5, 15))      # 10.0

print("Maximum:", calculator.maximum(7, 11))      # 11

print("Minimum:", calculator.minimum(7, 11))      # 7

print("Factorial:", calculator.factorial(5))      # 120

print("Is Even:", calculator.is_even(4))          # True

print("Is Odd:", calculator.is_odd(7))            # True

print("Sum of Digits:", calculator.sum_of_digits(123)) # 6

print("Count Digits:", calculator.count_digits(1001))  # 4

print("Reverse:", calculator.reverse_number(1234))     # 4321

print("Is Prime:", calculator.is_prime(17))       # True

print("GCD:", calculator.gcd(24, 36))             # 12

#string package
print("Upper case : ",string_util.shout("Nikitha"))
print("Lower case : ",string_util.whisper("Nikitha"))