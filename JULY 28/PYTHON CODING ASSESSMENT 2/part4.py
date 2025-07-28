'''Q6. Write a script to:
•	Read the JSON
•	Add a new field status:
•	'In Stock' if stock > 0
•	'Out of Stock' otherwise
•	Save as inventory_updated.json
'''
import json
with open("inventory.json", "r") as f:
    inventory = json.load(f)

print(inventory)
for product in inventory:
    if product["stock"] > 0:
        product["status"] = "In Stock"
    else:
        product["status"] = "Out of Stock"

with open("inventory_updated.json", "w") as f:
    json.dump(inventory, f, indent=4)

print(" Inventory updated and saved to inventory_updated.json")
