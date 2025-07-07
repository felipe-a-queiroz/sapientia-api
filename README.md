# Sapientia API

API RESTful em Node.js usando Express, com autenticação JWT e persistência de dados em MariaDB. Projetada para ser executada localmente ou como uma função AWS Lambda.

## Estrutura do Projeto

- `src/` - Código-fonte da aplicação
  - `config/` - Arquivos de configuração (ex: conexão com banco de dados).
  - `controllers/` - Lógica dos controladores, responsáveis por lidar com as requisições e respostas HTTP.
  - `middlewares/` - Middlewares customizados (ex: logger, validação de token JWT).
  - `models/` - Camada de acesso a dados, contendo as queries para o banco de dados.
  - `routes/` - Definição das rotas da API.
  - `services/` - Lógica de negócio da aplicação.
  - `utils/` - Funções utilitárias.
- `.env.example` - Exemplo de variáveis de ambiente necessárias.
- `.eslintrc.json` - Configuração do ESLint para padronização de código.
- `lambda.js` - Ponto de entrada para a execução na AWS Lambda.
- `server.js` - Ponto de entrada para a execução local do servidor.

## Pré-requisitos

- Node.js (v16 ou superior)
- npm
- MariaDB (ou MySQL)

## Como Rodar Localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/felipe-a-queiroz/sapientia-api.git
   cd sapientia-api
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o Banco de Dados:**
   - Certifique-se de que seu servidor MariaDB/MySQL está rodando.
   - Crie um banco de dados. O nome padrão é `sapientia`.
     ```sql
     CREATE DATABASE sapientia;
     ```
   - Conecte-se ao banco de dados recém-criado e execute o seguinte script SQL para criar a tabela de usuários:
     ```sql
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) NOT NULL UNIQUE,
         email VARCHAR(100) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Configure as Variáveis de Ambiente:**
   - Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
     ```sh
     cp .env.example .env
     ```
   - Edite o arquivo `.env` e preencha as variáveis, especialmente `JWT_SECRET` e as credenciais do banco de dados (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

5. **Inicie o servidor:**
   - Para rodar em modo de desenvolvimento (com hot-reload):
   ```sh
   npm run dev
   ```
   - O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

### Health Check

- `GET /health`: Verifica o status da API.

### Autenticação

- `POST /register`: Registra um novo usuário.
  - **Body**: `{ "username": "seu_usuario", "email": "seu@email.com", "password": "sua_senha" }`
- `POST /login`: Realiza o login e retorna um token JWT.
  - **Body**: `{ "username": "seu_usuario", "password": "sua_senha" }`

### Rotas Protegidas (Exemplo)

- `GET /profile`: Retorna as informações do perfil do usuário autenticado.
  - **Header Requerido**: `Authorization: Bearer SEU_TOKEN_JWT`
