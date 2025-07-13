import 'dotenv/config';
import app from './index.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});
