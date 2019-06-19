import { message } from "antd";
import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import "./index.scss";
import "./polyfills";
import initializeStore from "./stores/initializeStore";

// Ant design notification messages.
message.config({
    maxCount: 1,
    top: 45,
});

// Redux store.
const store = initializeStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
