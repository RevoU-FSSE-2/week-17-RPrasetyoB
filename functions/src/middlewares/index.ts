import { Express } from "express";
import cookieMidleware from "./cookiesParser";
import morganApp from "./morgan";

const middleWares = (app: Express)=> {
    // helmetApp(app);
    // morganApp(app);
    cookieMidleware(app);
}

export default middleWares