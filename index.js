const app = require('./src/app');
const config = require('./src/config/config');

app.listen(config.port, () => {
    console.log(`[SERVER] Servidor rodando: http://localhost:${config.port}`)
})