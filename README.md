# MRI Brain Tumor Segmentation

An end-to-end deep learning application designed to segment brain tumors from MRI scans using a **U-Net** architecture. This project features a **FastAPI** backend for real-time inference and a modern **Vanilla JS/Tailwind** frontend.

## Model & Training
The model was developed and trained using a U-Net architecture, optimized for medical image segmentation.

* **Architecture**: Symmetric encoder-decoder paths (U-Net) with skip connections to preserve spatial information.
* **Dataset**: Brain Tumor Segmentation dataset (via KaggleHub).
* **Preprocessing**: Images are resized to $256 \times 256$ pixels, converted to grayscale, and normalized to $[0, 1]$.
* **Loss Functions**: A custom `combined_loss` summing **Binary Cross-Entropy** and **Dice Loss**.
* **Optimization**: Implemented `EarlyStopping` and `ReduceLROnPlateau` for efficient convergence.

##  Metrics and Performance
Based on the project documentation, the model was evaluated using standard medical imaging metrics:

* **Dice Coefficient**: Achieved **0.81**, indicating high overlap between predicted masks and ground truth.
* **IoU (Intersection over Union)**: Achieved **0.70**.
* **Accuracy**: The model reached **99% training accuracy** and **98% validation accuracy**.

### Mathematical Formulations
* **Dice Coefficient**: $DSC = \frac{2 |A \cap B|}{|A| + |B|}$
* **IoU (Jaccard Index)**: $IoU = \frac{|A \cap B|}{|A \cup B|}$
* **Combined Loss**: $BCE + (1 - Dice)$

##  Tech Stack
* **Deep Learning**: TensorFlow, Keras
* **Backend**: FastAPI, Uvicorn
* **Image Processing**: OpenCV, NumPy, Pillow
* **Frontend**: JavaScript (ES6), Tailwind CSS, Lucide Icons

##  Project Structure
The application follows a modular decoupled architecture:
* `main.py`: Entry point with CORS and startup logic.
* `/Controllers`: API routes for health (`StatusController`) and inference (`PredictController`).
* `/Properties`: Core logic including `Coeficienti.py` (metrics), `NormalizareImagine.py` (preprocessing), and `LoadModel.py`.
* `/Services`: Post-processing for red-channel overlays and Base64 conversion (`PredictiiImagine.py`).
* `/Frontend`: Responsive SPA with dark mode and real-time rendering.

##  Getting Started

### 1. Model Download
The `MRI_1530.keras` file exceeds GitHub's 100MB limit. 
1.  Navigate to the **Releases** tab in this repository.
2.  Download the `MRI_1530.keras` asset.
3.  Place it in the project root directory.

### 2. Backend Setup
```bash
# Install dependencies
pip install fastapi uvicorn tensorflow opencv-python pillow

# Start the server
python main.py
