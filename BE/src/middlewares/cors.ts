import cors, { CorsOptions } from "cors";
import { Application } from "express";


const origin = [
    "http://localhost:5173",
    "https://week-15-rprasetyob-production.up.railway.app"
]

const partnerOrigin = [
    "https://week15-rpb-y.netlify.app"
  ];

const corsOptions = ( req: Request | any,
    callback: (err: Error | null, options?: CorsOptions) => void
    ) => {
        const clientOrigin = origin.includes(req.header("Origin"));
        const clientPartnerOrigin = partnerOrigin.includes(req.header("Origin"));

        if(clientOrigin) {
            callback(null, {
                origin: true,
                methods: 'GET, POST, DELETE, PUT, OPTIONS, HEAD',
                credentials: true
            })
        } else if(clientPartnerOrigin){
            callback(null, {
                origin: true,
                methods: 'GET, POST',
                credentials: true
            })
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }

const corsMiddleware = (app : Application) => {
    app.use(cors(corsOptions))
};

export default corsMiddleware