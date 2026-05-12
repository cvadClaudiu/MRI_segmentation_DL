from fastapi import APIRouter
from Controllers.PredictController import shared_data

router = APIRouter()

@router.get("/status")
async def getstatus():
    is_loaded = shared_data.get("model") is not None
    
    return {
        "app": "Segmentare RMN",
        "status": "online",
        "nume_model" : "MRI_1530.keras",
        "model_loaded": is_loaded
    }
    