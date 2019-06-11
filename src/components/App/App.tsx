import { Avatar, Layout } from "antd";
import React, { Component } from "react";
import { verticalCenterStyles } from "../../utilities/styles";
import { OptionsMenu } from "../OptionsMenu";
import { TogglLogin } from "../TogglLogin";

export default class App extends Component {
    private readonly headerStyles: React.CSSProperties = {
        height: 58,
        position: "relative",
    };
    private readonly avatarContainerStyles: React.CSSProperties = {
        left: 15,
        ...verticalCenterStyles,
    };
    private readonly optionsContainerStyles: React.CSSProperties = {
        marginTop: 5,
        right: 15,
        ...verticalCenterStyles,
    };
    private readonly contentStyles: React.CSSProperties = {
        padding: "0 50px",
    };

    public render(): React.ReactNode {
        return (
            <Layout>
                <Layout.Header style={this.headerStyles}>
                    <div style={this.avatarContainerStyles}>
                        <Avatar size="small" />
                    </div>
                    <div style={this.optionsContainerStyles}>
                        <OptionsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={this.contentStyles}>
                    <div style={{ background: "#fff", padding: 24, minHeight: 100 }}>
                        <TogglLogin />
                    </div>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
            </Layout>
        );
    }
}
