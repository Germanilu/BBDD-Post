/**
 * Cors config
*/
const corsOptions = 
{
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    optionsSuccessStatus: 204,
};