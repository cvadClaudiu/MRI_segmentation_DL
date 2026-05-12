import cv2
import numpy as np

def preprocess_image(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    
    if img is None:
        raise ValueError("Invalid image format")
    
    img_resized = cv2.resize(img, (256, 256))
    img_normalized = img_resized.astype(np.float32) / 255.0
    
    # Prepare for model (Batch, H, W, C)
    img_input = np.expand_dims(img_normalized, axis=-1)
    img_input = np.expand_dims(img_input, axis=0)
    
    return img_input, img_normalized