import os
from tensorflow import keras
from Properties.Coeficienti import combined_loss, dice_coef, iou_metric

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, '..', 'MRI_1530.keras')

def get_model():
    try:
        if not os.path.exists(MODEL_PATH):
            print(f"Error: {MODEL_PATH} not found.")
            return None
        
        custom_objects = {
            'combined_loss': combined_loss,
            'dice_coef': dice_coef,
            'iou_metric': iou_metric
        }
        model = keras.models.load_model(MODEL_PATH, custom_objects=custom_objects)
        return model
    except Exception as e:
        print(f"EROARE incarcare model: {e}")
        return None