export const requestLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const headers = JSON.stringify(req.headers, null, 2);
    const queryParams = JSON.stringify(req.query, null, 2);
    const body = JSON.stringify(req.body, null, 2);
    const clientIp = req.ip || req.connection.remoteAddress;

    console.info(`
    =============================
    [${currentTime}] Request Logged
    -----------------------------
    Method:         ${method}
    URL:            ${url}
    Client IP:      ${clientIp}
    Headers:        ${headers}
    Query Params:   ${queryParams}
    Body:           ${body}
    =============================
    `);

    next();
};
