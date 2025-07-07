// Ponto de entrada para rodar o servidor localmente
require('dotenv').config();
const app = require('./index');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});

