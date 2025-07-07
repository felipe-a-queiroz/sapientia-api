# Sapientia API

API Node.js usando Express e AWS Lambda para a aplicação Sapientia.

## Estrutura Inicial

- `src/` - Código-fonte da aplicação
  - `routes/` - Rotas da API
  - `controllers/` - Lógica dos controladores
  - `middlewares/` - Middlewares customizados
  - `services/` - Serviços de negócio
  - `utils/` - Utilitários
- `.env.example` - Exemplo de variáveis de ambiente
- `.eslintrc.json` - Configuração do ESLint
- `.gitignore` - Arquivos e pastas ignorados pelo git

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Copie `.env.example` para `.env` e configure as variáveis.
3. Para rodar localmente:
   ```sh
   npm run dev
   ```
