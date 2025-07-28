
"""
Part 5: Enrichment with NumPy
Q7. Generate an array of 20 random student scores between 35 and 100 using NumPy.
•	Count how many students scored above 75
•	Calculate mean and standard deviation
•	Create a Pandas DataFrame and save as scores.csv

"""
import numpy as np
import pandas as pd

scores = np.random.randint(35, 101, size=20)

above_75_count = np.sum(scores > 75)

mean_score = np.mean(scores)
std_deviation = np.std(scores)

df = pd.DataFrame({'Score': scores})

df.to_csv('scores.csv', index=False)

print("Scores:", scores)
print("Students scored more  75:", above_75_count)
print("Mean score:", mean_score)
print("Std deviation:", std_deviation)
