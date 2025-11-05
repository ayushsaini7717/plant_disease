from fastapi import FastAPI, UploadFile, File, Query
from transformers import AutoFeatureExtractor, AutoModelForImageClassification
from PIL import Image
import torch
import io
from fastapi.middleware.cors import CORSMiddleware


from language import dict, dict_hindi, dict_malayalam

app = FastAPI()
origins = [
    "http://localhost:3000",  # frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_name = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"

extractor = AutoFeatureExtractor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)

# https://api.openweathermap.org/data/2.5/weather?q=Roorkee&appid=d8cb7a67f4d5d13e48ac78169104a784&units=metric


@app.post("/predict/")
async def predict(
    file: UploadFile = File(...),
    lang: str = Query("en", description="Language: en (default), hi, ml"),
):
    if lang == "hi":
        disease_dict = dict_hindi
    elif lang == "ml":
        disease_dict = dict_malayalam
    else:
        disease_dict = dict

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    inputs = extractor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    preds = torch.softmax(outputs.logits, dim=-1)

    label_id = preds.argmax(-1).item()
    pred = model.config.id2label[label_id]
    confidence = preds[0][label_id].item()

    if pred in disease_dict:
        return {
            "predicted": pred,
            # "confidence": confidence,
            "description": disease_dict[pred]["description"],
            "cause": disease_dict[pred]["cause"],
            "cure": disease_dict[pred]["cure"],
        }
    else:
        return {
            "predicted": pred,
            # "confidence": confidence,
            "message": "Sorry, I don't have information about this disease in the selected language."
        }


# uvicorn server:app --host 0.0.0.0 --port 8080 --reload