from fastapi import HTTPException
from app.services.task_service import get_task_by_id_service, add_feedback_service
from app.services.task_service import get_all_tasks_service as repo_get_all_tasks_service
from datetime import datetime

def get_all_tasks_controller():
    return repo_get_all_tasks_service()

def add_feedback_controller(task_id, data, mentor_id):
    task = get_task_by_id_service(task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    data["date"] = datetime.utcnow()
    add_feedback_service(task_id, data)
    return {"message": "Feedback added"}
