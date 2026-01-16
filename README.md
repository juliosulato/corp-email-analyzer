# 📧 Email Classifier AI - Desafio Técnico AutoU

Uma solução robusta de Inteligência Artificial para automatizar a triagem de emails corporativos. O sistema analisa o conteúdo de arquivos (`.txt`, `.pdf`, `.eml`, `.msg`), classifica-os entre **Produtivos** ou **Improdutivos** e sugere respostas automáticas contextualizadas.

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20TypeScript%20%7C%20OpenAI-blue)
![License](https://img.shields.io/badge/license-MIT-gray)

---

## 🔗 Demo Online

Acesse a aplicação rodando em produção:
👉 [Link no Render](https://corp-email-analyzer.onrender.com/)

---

## 💡 Nota sobre a Decisão Técnica (Node.js vs Python)

Embora o descritivo do desafio mencione Python, optei por desenvolver a solução utilizando **Node.js com TypeScript**. Esta decisão arquitetural baseou-se em três pilares:

1.  **Performance em I/O Assíncrono:** A natureza do desafio envolve leitura de arquivos pesados e chamadas de rede para APIs externas (OpenAI). O _Event Loop_ não-bloqueante do Node.js oferece performance superior para este tipo de tarefa de middleware.
2.  **Robustez e Segurança:** O uso de **TypeScript** garante tipagem estática e detecção de erros em tempo de compilação, resultando em um código mais seguro e limpo (_Clean Code_) do que scripts dinâmicos básicos.
3.  **Ecossistema Web Unificado:** A arquitetura permite que o Backend compartilhe interfaces de tipagem com o Frontend, facilitando a manutenção e escalabilidade.

**Todos os requisitos funcionais foram rigorosamente atendidos:** Processamento de arquivos legados (.eml, .msg), integração NLP, classificação e geração de respostas.

---

## 📋 Funcionalidades

- **Processamento Multi-formato:** Leitura e extração de texto de arquivos `.txt`, `.pdf`, `.eml` e `.msg`.
- **Classificação Inteligente:** Uso do modelo GPT-4o-mini para categorizar emails com alta precisão.
- **Respostas Sugeridas:** Geração automática de drafts de resposta baseados no contexto.
- **Interface Web:** UI amigável e responsiva para upload de arquivos e visualização dos resultados.
- **API RESTful:** Endpoints documentados e seguros com validação de dados (Zod).

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js (v20+), Express.js
- **Linguagem:** TypeScript
- **IA/NLP:** OpenAI API (GPT-4o-mini)
- **Validação:** Zod
- **Uploads:** Multer (Memória)
- **Parsers:** `pdf.js-extract`, `mailparser`, `msgreader`

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação no seu ambiente de desenvolvimento.

### Pré-requisitos

- Node.js (v18 ou superior)
- Chave da API da OpenAI

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/corp-email-analyzer.git
    cd corp-email-analyzer
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`) e adicione sua chave:
    ```text
    NODE_ENV=development
    PORT=3000
    API_PREFIX=/api
    OPENAI_API_KEY=sk-sua-chave-aqui...
    ```

4.  **Execute em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Acesse: `http://localhost:3000`

5.  **Para testar o Build de produção localmente:**
    ```bash
    npm run build
    npm run start
    ```

---

## 🔌 Documentação da API

### `POST /api/emails/classify`

Classifica um arquivo de email enviado.

**Requisição:**

-   **Content-Type:** `multipart/form-data`
-   **Body:**
    -   `email`: Arquivo (Binário - .txt, .pdf, .eml, .msg) - Máx 10MB.

**Resposta de Sucesso (200 OK):**

```json
{
  "status": "success",
  "data": {
    "result": {
      "classification": "Produtivo",
      "suggestedResponse": "Prezado, obrigado pelo envio. Segue o status...",
      "confidence": 0.95
    },
    "processedText": "conteúdo extraído do email..."
  }
}
```

---

## 📁 Estrutura do Projeto

```text
corp-email-analyzer/
├── dist/             # Código compilado (Gerado no build)
├── public/           # Frontend estático (HTML/CSS/JS)
├── src/
│   ├── config/       # Variáveis de ambiente
│   ├── controllers/  # Lógica de controle
│   ├── middleware/   # Upload e Erros
│   ├── routes/       # Rotas da API
│   ├── schemas/      # Validação Zod
│   ├── services/     # Regras de negócio (OpenAI/Parsers)
│   ├── app.ts        # Setup do Express
│   └── server.ts     # Entry point
├── .env.example      # Modelo de configuração
├── package.json
└── tsconfig.json
```

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico.
