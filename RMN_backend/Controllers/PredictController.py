from fastapi import APIRouter, File, UploadFile, HTTPException
from Properties.NormalizareImagine import preprocess_image
from Services.PredictiiImagine import create_overlay, numpy_to_base64

router = APIRouter()
shared_data = {"model": None} # Reference set in main.py

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if shared_data["model"] is None:
        raise HTTPException(status_code=500, detail="Modelul nu este incarcat")
    
    try:
        content = await file.read()
        img_input, img_norm = preprocess_image(content)
        
        prediction = shared_data["model"].predict(img_input, verbose=0)[0].squeeze()
        overlay = create_overlay(img_norm, prediction)
        
        return {
            "original_image": numpy_to_base64(img_norm),
            "predicted_mask": numpy_to_base64(prediction),
            "overlay": numpy_to_base64(overlay)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))