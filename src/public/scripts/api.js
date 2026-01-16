import { API_URL } from './config.js';

export async function sendEmailForAnalysis(file) {
  const formData = new FormData();
  formData.append("email", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao processar email");
  }

  return data;
}