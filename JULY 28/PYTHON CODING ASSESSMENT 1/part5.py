import json

with open("products.json", "r") as f:
    products = json.load(f)

# increase all by 10 %
for product in products:
    product["price"] = round(product["price"] * 1.10, 2)

print("JSON Read:\n",products)
# Save the updated data to products_updated.json
with open("products_updated.json", "w") as f:
    json.dump(products, f, indent=2)
