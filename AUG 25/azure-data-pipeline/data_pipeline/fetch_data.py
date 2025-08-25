import json

def fetch():
    data = {
        "students": [
            {"id": 1, "name": "Abhinav", "marks": 78},
            {"id": 2, "name": "Priya", "marks": 85},
            {"id": 3, "name": "Rahul", "marks": 92},
        ]
    }
    with open("raw_data.json", "w") as f:
        json.dump(data, f)

    print("Raw data fetched and saved to raw_data.json")

if __name__ == "__main__":
    fetch()
