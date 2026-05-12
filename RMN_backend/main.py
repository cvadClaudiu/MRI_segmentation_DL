import uvicorn
from fastapi import FastAPI
from Properties.LoadModel import get_model
from Controllers import PredictController, StatusController
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Segmentare RMN, backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(StatusController.router)
app.include_router(PredictController.router)

@app.on_event("startup")
async def startup():
    PredictController.shared_data["model"] = get_model()
    print("\n http://localhost:8000/docs \n")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)