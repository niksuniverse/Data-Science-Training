from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime
import os

MESSAGE_PATH = "/tmp/airflow_message.txt"

def generate_message():
    message = "Hello, this message flows through tasks!"
    with open(MESSAGE_PATH, 'w') as f:
        f.write(message)

def read_message():
    if os.path.exists(MESSAGE_PATH):
        with open(MESSAGE_PATH, 'r') as f:
            print("Message from file:", f.read())
    else:
        raise FileNotFoundError("Message file does not exist.")
with DAG(
    dag_id="chained_tasks_dag",
    start_date=datetime(year=2023, month=1, day=1),
    schedule_interval=None,
    catchup=False,
    tags=["example"]
) as dag:

    generate = PythonOperator(
        task_id="generate_message",
        python_callable=generate_message
    )

    simulate_save = BashOperator(
        task_id="simulate_file_confirmation",
        bash_command=f"echo 'Message saved at {MESSAGE_PATH}'"
    )

    read = PythonOperator(
        task_id="read_message",
        python_callable=read_message
    )
