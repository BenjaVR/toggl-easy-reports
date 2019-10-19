import { message } from "antd";
import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { SettingsProvider } from "./context/SettingsContext";
import { UserProvider } from "./context/UserContext";
import "./index.scss";
import "./polyfills";

// Ant design notification messages.
message.config({
    maxCount: 1,
    top: 45,
});

ReactDOM.render(
    (
        <SettingsProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </SettingsProvider>
    ),
    document.getElementById("root"),
);
