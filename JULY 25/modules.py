import math
print(math.sqrt(4))
print(math.pow(2,3))
print(math.pi)
print(math.floor(5.9))
print(math.ceil(5.1))
print(math.factorial(5))
print(math.gcd(28, 36))
print(math.degrees(math.pi))
print(math.radians(180))
print(math.log(10))


#datetime module
import datetime as d
today =d.date.today()
print("Today date is: ",today)

now =d.datetime.now()
print("Current time is: ",now.strftime("%H:%M:%S"))

#User defined modules
import myModule as m

print(m.add(5, 7))
print(m.is_even(10))
print(m.is_palindrome("Madam"))
