import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import responseHandler from "./utils/response/response_handler.js";
import { errorHandler } from "./utils/response/error_handler.js";
import routes from "./routes/index.js";
import sequelize from "./config/app_config.js";
import { authenticateUser } from "./config/passport_strategy.js";
import passport from "passport";
dotenv.config();

const app = express();

const corsOptions = { origin: process.env.ALLOW_ORIGIN };
app.use(cors(corsOptions));

app.use(responseHandler);
app.use(
    bodyParser.json({
        verify: function (req, res, buf) {
            req.rawBody = buf;
        },
    })
);
authenticateUser(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000; // Ensure fallback port
app.listen(PORT, () => {
    console.log(`Your application is running on port ${PORT}`);
});
