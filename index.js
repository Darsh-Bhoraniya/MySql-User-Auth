import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
<<<<<<< HEAD
import responseHandler from "./utils/response/response_handler.js";

import {errorHandler} from "./utils/response/error_handler.js"; 
import routes from "./routes/index.js";

=======
>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = { origin: process.env.ALLOW_ORIGIN };
app.use(cors(corsOptions));
<<<<<<< HEAD

app.use(responseHandler);
app.use(
    bodyParser.json({
        verify: function (req, res, buf) {
            req.rawBody = buf;
        },
    })
);

app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`your application is running on ${process.env.PORT}`);
});
=======
>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b
