import bodyParser from "body-parser";
import express from "express";
import fetch, { Headers, RequestInit } from "node-fetch";

const app = express();
app.use(bodyParser.json());

app.use(async (req: express.Request, res: express.Response) => {
    const toggleRequestInit: RequestInit = {
        method: req.method,
        headers: {
            authorization: req.headers.authorization || "",
        },
    };
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
        toggleRequestInit.body = req.body;
    }
    const toggleUrl = `https://toggl.com${req.url}`;

    const togglResponse = await fetch(toggleUrl, toggleRequestInit);
    const togglJsonResponse = await togglResponse.json();

    return res.status(togglResponse.status).json(togglJsonResponse);
});

const port = 5000;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
