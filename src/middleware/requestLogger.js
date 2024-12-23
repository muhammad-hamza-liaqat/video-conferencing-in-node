export const requestLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const headers = JSON.stringify(req.headers, null, 2);
    const clientIp = req.ip || req.connection.remoteAddress;

    console.info(`
        ${url}
    =============================
    [${currentTime}] Request Logged
    -----------------------------
    Method:         ${method}
    URL:            ${url}
    Client IP:      ${clientIp}
    Headers:        ${headers}
    =============================
    `);

    next();
};
