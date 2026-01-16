// Elementos Globais de UI (cacheados para uso interno)
const loading = document.getElementById("loading");
const resultsSection = document.getElementById("resultsSection");
const errorDiv = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

export function showLoading() {
  loading.style.display = "block";
  resultsSection.style.display = "none";
  errorDiv.style.display = "none";
}

export function hideLoading() {
  loading.style.display = "none";
}

export function showError(msg) {
  errorDiv.style.display = "flex";
  errorMessage.textContent = msg;
  hideLoading();
}

export function hideError() {
  errorDiv.style.display = "none";
}

export function renderResults(data, currentFile) {
  resultsSection.style.display = "block";

  // Adaptação para estrutura de resposta (sua correção está aqui)
  const classificationData = data.result || data;

  if (!classificationData || !classificationData.classification) {
    console.error("Estrutura inesperada:", data);
    showError("Erro: A resposta da API não contém a classificação esperada.");
    return;
  }

  // Atualiza Badge
  const badge = document.getElementById("categoryBadge");
  badge.textContent = classificationData.classification;
  badge.className = `category-badge ${classificationData.classification.toLowerCase()}`;

  // Atualiza Confiança
  const confidenceVal = classificationData.confidence || 0;
  const confidencePercent = Math.round(confidenceVal * 100);
  document.getElementById("confidenceValue").textContent = `${confidencePercent}%`;
  document.getElementById("confidenceFill").style.width = `${confidencePercent}%`;

  // Atualiza Raciocínio
  document.getElementById("reasoning").textContent = 
    `A IA identificou este email com ${confidencePercent}% de certeza baseada no conteúdo.`;

  // Atualiza Resposta Sugerida
  const fileName = currentFile ? currentFile.name : "Texto colado / Resposta automática";
  document.getElementById("responseSubject").textContent = `RE: ${fileName}`;
  document.getElementById("responseBody").textContent = 
    classificationData.suggestedResponse || "Nenhuma sugestão gerada.";

  resultsSection.scrollIntoView({ behavior: "smooth" });
}

export function resetUI() {
  resultsSection.style.display = "none";
  document.getElementById("emailText").value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function copyResponseToClipboard(btnElement) {
    const text = document.getElementById("responseBody").textContent;
    navigator.clipboard.writeText(text);
    
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = "Copiado!";
    setTimeout(() => (btnElement.innerHTML = originalText), 2000);
}