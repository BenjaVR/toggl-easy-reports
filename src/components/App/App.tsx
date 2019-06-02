import { Layout } from "antd";
import React, { Component } from "react";
import { OptionsMenu } from "../OptionsMenu";
import { TogglLogin } from "../TogglLogin";

export default class App extends Component {
    public render(): React.ReactNode {
        return (
            <Layout>
                <TogglLogin />,
                <OptionsMenu />
            </Layout>
        );
    }
}
