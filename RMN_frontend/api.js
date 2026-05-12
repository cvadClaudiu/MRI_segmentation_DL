const API_URL = 'http://localhost:8000';

export async function fetchStatus() {
  const response = await fetch(`${API_URL}/status`);
  if (!response.ok) throw new Error('Status check failed');
  return response.json();
}

export async function postPrediction(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) 
  {
    const errorText = await response.text();
    throw new Error(`Prediction failed: ${errorText}`);
  }

  return response.json();
}