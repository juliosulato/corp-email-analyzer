# 📧 Email Classifier AI - Desafio Técnico AutoU

Uma solução robusta de Inteligência Artificial para automatizar a triagem de emails corporativos. O sistema analisa o conteúdo de arquivos (`.txt`, `.pdf`, `.eml`, `.msg`), classifica-os entre **Produtivos** ou **Improdutivos** e sugere respostas automáticas contextualizadas.

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20TypeScript%20%7C%20OpenAI-blue)

## 📋 Funcionalidades

- **Processamento Multi-formato:** Leitura e extração de texto de arquivos `.txt`, `.pdf`, `.eml` e `.msg`.
- **Classificação Inteligente:** Uso do modelo GPT-4o-mini para categorizar emails com alta precisão.
- **Respostas Sugeridas:** Geração automática de drafts de resposta baseados no contexto.
- **Interface Web:** UI amigável para upload de arquivos e visualização dos resultados.
- **API RESTful:** Endpoints documentados e seguros com validação de dados (Zod).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído focando em performance de I/O e segurança de tipos:

- **Backend:** Node.js (v20+), Express.js
- **Linguagem:** TypeScript
- **IA/NLP:** OpenAI API (GPT-4o-mini)
- **Validação:** Zod
- **Uploads:** Multer (Memória)
- **Parsers:** `pdf.js-extract`, `mailparser`, `msgreader`
- **Infraestrutura:** Docker (Multi-stage build)

---

## 💡 Nota sobre a Decisão Técnica (Node.js vs Python)

Embora o descritivo do desafio mencione Python, optei por desenvolver a solução utilizando **Node.js com TypeScript**. Esta decisão arquitetural baseou-se em três pilares:

1.  **Performance em I/O Assíncrono:** A natureza do desafio envolve leitura de arquivos pesados e chamadas de rede para APIs externas (OpenAI). O *Event Loop* não-bloqueante do Node.js oferece performance superior para este tipo de tarefa de middleware.
2.  **Robustez e Manutenibilidade:** O uso de **TypeScript** garante tipagem estática e detecção de erros em tempo de compilação, resultando em um código mais seguro e limpo (*Clean Code*) do que scripts dinâmicos básicos.
3.  **Ecossistema Web Unificado:** Utilizar a mesma linguagem para Backend e scripts de Frontend facilita a integração e manutenção do projeto.

**Todos os requisitos funcionais foram rigorosamente atendidos:** Processamento de arquivos legados (.eml, .msg), integração NLP, classificação e geração de respostas.

---

## 🚀 Como Rodar o Projeto

Você pode rodar a aplicação localmente usando Docker (recomendado) ou diretamente com Node.js.

### Pré-requisitos
- Chave da API da OpenAI (`OPENAI_API_KEY`).

### Opção 1: Rodando com Docker (Recomendado)

Garanta que você tem o Docker instalado.

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/corp-email-analyzer.git](https://github.com/seu-usuario/corp-email-analyzer.git)
   cd corp-email-analyzer