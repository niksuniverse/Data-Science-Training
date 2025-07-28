"""
Part 2: Classes and Inheritance
🔸Q3. Create a class BankAccount with:
•	Attributes: holder_name, balance
•	Method: deposit(amount) and withdraw(amount)
•	Raise an exception if withdrawal amount exceeds balance

"""

class BankAccount:
    def __init__(self,holder_name,balance):
        self.holder_name = holder_name
        self.balance=balance


    def deposit(self, amount):
        if amount <= 0:
            print("Deposit should more than zero")
        else:
            self.balance += amount
            print(f"Deposited ₹{amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Amount is insufficient")
        elif amount <= 0:
            print("Withdrawal amount must be positive.")
        else:
            self.balance -= amount
            print(f"Withdrew ₹{amount}. Remaining balance: {self.balance}")

account = BankAccount("Nikitha", 1000)
account.deposit(500)
try:
    account.withdraw(1200)
except ValueError as e:
    print("Error:", e)

print(f"final balance for {account.holder_name}: ₹{account.balance}")

"""
Q4. Inherit a SavingsAccount class from BankAccount that adds:
•	Attribute: interest_rate
•	Method: apply_interest() that updates the balance
"""

class SavingsAccount(BankAccount):
    def __init__(self, holder_name, balance, interest_rate):
        super().__init__(holder_name, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate / 100
        self.balance += interest
        print(f"Applied {self.interest_rate}% interest: {interest:.2f}")
        print(f"New balance after interest: {self.balance:.2f}")


    # Create a SavingsAccount object
savings = SavingsAccount("Zara", 2000, 5)
savings.apply_interest()

savings.deposit(1000)
savings.withdraw(500)
