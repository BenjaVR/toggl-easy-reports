import bodyParser from "body-parser";
import express from "express";
import fetch, { RequestInit } from "node-fetch";

const app = express();
app.use(bodyParser.json());

app.use(async (req: express.Request, res: express.Response) => {
    const toggleRequestInit: RequestInit = {
        headers: {
            authorization: req.headers.authorization || "",
        },
        method: req.method,
    };
    if (Object.keys(req.body).length > 0) {
        toggleRequestInit.body = req.body;
    }

    const toggleUrl = `https://toggl.com${req.url}`;
    const togglResponse = await fetch(toggleUrl, toggleRequestInit);

    try {
        const togglJsonResponse = await togglResponse.json();
        return res.status(togglResponse.status).json(togglJsonResponse);
    } catch (err) {
        return res.status(500).json({
            proxyError: err
        });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
