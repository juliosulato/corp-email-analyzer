import { VALID_EXTENSIONS } from './config.js';
import { sendEmailForAnalysis } from './api.js';
import * as UI from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  // Elementos de Controle
  const fileInput = document.getElementById("fileInput");
  const uploadArea = document.getElementById("uploadArea");
  const fileInfo = document.getElementById("fileInfo");
  const fileNameDisplay = document.getElementById("fileName");
  const analyzeFileBtn = document.getElementById("analyzeFileBtn");
  const removeFileBtn = document.getElementById("removeFile");
  
  // Tabs e Texto
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const analyzeTextBtn = document.getElementById("analyzeTextBtn");
  const emailText = document.getElementById("emailText");

  // Botões de Ação
  const newAnalysisBtn = document.getElementById("newAnalysisBtn");
  const copyResponseBtn = document.getElementById("copyResponseBtn");

  // Estado
  let currentFile = null;

  // --- Funções Auxiliares de Controle ---
  
  function handleFileSelection(file) {
    if (!file) return;

    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!VALID_EXTENSIONS.includes(ext)) {
      UI.showError(`Formato inválido. Use ${VALID_EXTENSIONS.join(", ")}`);
      return;
    }

    currentFile = file;
    fileNameDisplay.textContent = file.name;
    
    // Atualiza o visual
    uploadArea.style.display = "none";
    fileInfo.style.display = "flex";
    analyzeFileBtn.disabled = false;
    UI.hideError();
  }

  async function processSubmission(file) {
    if (!file) return;
    
    UI.showLoading();
    try {
      const data = await sendEmailForAnalysis(file);
      UI.renderResults(data.data || data, currentFile); // Passa o data e o arquivo atual
    } catch (err) {
      UI.showError(err.message);
    } finally {
      UI.hideLoading();
    }
  }

  // --- Event Listeners ---

  // 1. Abas
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add("active");
      UI.hideError();
    });
  });

  // 2. Upload Area (Click & Drag)
  uploadArea.addEventListener("click", () => fileInput.click());
  
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("drag-over");
  });
  
  uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("drag-over"));
  
  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
    handleFileSelection(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener("change", (e) => handleFileSelection(e.target.files[0]));

  // 3. Botões de Análise
  analyzeFileBtn.addEventListener("click", () => processSubmission(currentFile));

  analyzeTextBtn.addEventListener("click", () => {
    const text = emailText.value.trim();
    if (!text) {
      UI.showError("Por favor, digite ou cole o conteúdo do email.");
      return;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const file = new File([blob], "email-colado.txt", { type: "text/plain" });
    // Atualiza currentFile para aparecer o nome correto no resultado
    currentFile = file; 
    processSubmission(file);
  });

  // 4. Limpar / Resetar
  removeFileBtn.addEventListener("click", () => {
    currentFile = null;
    fileInput.value = "";
    uploadArea.style.display = "block";
    fileInfo.style.display = "none";
    analyzeFileBtn.disabled = true;
  });

  newAnalysisBtn.addEventListener("click", () => {
    UI.resetUI();
    removeFileBtn.click(); // Reutiliza a lógica de limpar arquivo
  });

  copyResponseBtn.addEventListener("click", () => UI.copyResponseToClipboard(copyResponseBtn));
});