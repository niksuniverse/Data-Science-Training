import json

def process():
    with open("raw_data.json", "r") as f:
        data = json.load(f)

    high_scorers = [s for s in data["students"] if s["marks"] > 80]

    with open("processed_data.json", "w") as f:
        json.dump(high_scorers, f)

    print("Processed data saved to processed_data.json")

if __name__ == "__main__":
    process()
