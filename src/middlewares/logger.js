// Middleware simples de log
const logger = (req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'N/A';

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        const timestamp = new Date().toISOString();

        // eslint-disable-next-line no-console
        console.log(
            `[${timestamp}] ${ip} - "${method} ${url}" ${statusCode} ${duration}ms - "${userAgent}"`
        );
    });

    next();
};

export default logger;
