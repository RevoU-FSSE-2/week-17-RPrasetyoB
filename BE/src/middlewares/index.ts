import helmetApp from "./helmet";
import morganApp from "./morgan";
import { Express } from "express";
import cookieMidleware from "./cookiesParser";
import corsMiddleware from "./cors";

const middleWares = (app: Express)=> {
    corsMiddleware(app);
    helmetApp(app);
    morganApp(app);
    cookieMidleware(app);
}

export default middleWares