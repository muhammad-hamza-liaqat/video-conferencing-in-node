export const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:4001",
            "http://127.0.0.1:4001",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
    ],
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
};
