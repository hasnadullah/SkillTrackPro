# services/meeting_service.py
from app.repository.meeting_repository import find_all_meetings
from app.utils.id_converter import convert_object_ids

def get_all_meetings_service():
    meetings = find_all_meetings()
    return convert_object_ids(meetings)
