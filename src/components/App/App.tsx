import { Layout } from "antd";
import React, { Component } from "react";
import { OptionsMenu } from "../OptionsMenu";
import { TogglLogin } from "../TogglLogin";

export default class App extends Component {
    private readonly headerStyles: React.CSSProperties = {
        height: 58,
    };

    public render(): React.ReactNode {
        return (
            <Layout className="layout">
                <Layout.Header style={this.headerStyles}>
                    <div className="logo" />
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <OptionsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={{ padding: "0 50px" }}>
                    <div style={{ background: "#fff", padding: 24, minHeight: 100 }}>
                        <TogglLogin />
                    </div>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
            </Layout>
        );
    }
}
