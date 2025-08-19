# File name: data_audit_dag.py

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta
import json
import random

# -----------------------
# Default DAG Arguments
# -----------------------
default_args = {
    'owner': 'Nikitha',
    'depends_on_past': False,
    'email': ['alerts@datateam.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# -----------------------
# Functions for tasks
# -----------------------

# Task 1: Simulate data pull
def pull_data(**context):
    # Simulating API/DB pull (dummy values)
    data = {
        "id": random.randint(1000, 2000),
        "timestamp": datetime.utcnow().isoformat(),
        "value": random.randint(50, 150)  # threshold check later
    }
    context['ti'].xcom_push(key='pulled_data', value=data)

# Task 2: Validate business rule
def audit_validation(**context):
    data = context['ti'].xcom_pull(key='pulled_data', task_ids='pull_data_task')
    threshold = 100
    audit_result = {
        "record_id": data['id'],
        "value": data['value'],
        "timestamp": data['timestamp'],
        "is_valid": data['value'] <= threshold
    }

    # Save to file
    with open("/tmp/audit_result.json", "w") as f:
        json.dump(audit_result, f, indent=4)

    if not audit_result["is_valid"]:
        raise ValueError(f"Audit failed! Value {data['value']} exceeds threshold {threshold}")

    context['ti'].xcom_push(key='audit_result', value=audit_result)

# Task 3: Log audit results
def log_audit(**context):
    audit_result = context['ti'].xcom_pull(key='audit_result', task_ids='audit_validation_task')
    if audit_result["is_valid"]:
        print(f"AUDIT SUCCESS: Record {audit_result['record_id']} passed validation.")
    else:
        print(f"AUDIT FAILURE: Record {audit_result['record_id']} failed validation.")

# -----------------------
# DAG Definition
# -----------------------
with DAG(
    dag_id='data_audit_dag',
    default_args=default_args,
    description='Event-driven Data Audit DAG',
    schedule_interval='@hourly',
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=['audit', 'monitoring'],
) as dag:

    # Stage 1: Data Pull
    pull_data_task = PythonOperator(
        task_id='pull_data_task',
        python_callable=pull_data,
        provide_context=True,
    )

    # Stage 2: Audit Validation
    audit_validation_task = PythonOperator(
        task_id='audit_validation_task',
        python_callable=audit_validation,
        provide_context=True,
    )

    # Stage 3: Logging results
    log_results_task = PythonOperator(
        task_id='log_results_task',
        python_callable=log_audit,
        provide_context=True,
    )

    # Stage 4: Final status update (BashOperator)
    final_status_task = BashOperator(
        task_id='final_status_task',
        bash_command='echo "Final Audit Status Logged at $(date)"',
    )

    # Task Dependency Chain
    pull_data_task >> audit_validation_task >> log_results_task >> final_status_task
