import base64
import numpy as np
from io import BytesIO
from PIL import Image

def create_overlay(image, mask):
    overlay = np.stack([image, image, image], axis=-1)
    overlay[:, :, 0] = np.where(mask > 0.5, 1.0, overlay[:, :, 0]) # Red channel
    overlay[:, :, 1] = np.where(mask > 0.5, 0.0, overlay[:, :, 1])
    overlay[:, :, 2] = np.where(mask > 0.5, 0.0, overlay[:, :, 2])
    return overlay

def numpy_to_base64(img_array):
    img_uint8 = (img_array * 255).astype(np.uint8)
    mode = 'L' if len(img_uint8.shape) == 2 else 'RGB'
    img_pil = Image.fromarray(img_uint8, mode=mode)
    
    buffered = BytesIO()
    img_pil.save(buffered, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buffered.getvalue()).decode()}"