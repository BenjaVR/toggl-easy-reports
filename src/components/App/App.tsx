import React, { Component } from "react";
import { ApiKeyForm } from "../ApiKeyForm";
import { TogglLogin } from "../TogglLogin";

export default class App extends Component {
    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <TogglLogin />,
                <ApiKeyForm />
            </React.Fragment>
        );
    }
}
