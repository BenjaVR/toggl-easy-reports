import { Avatar, Layout } from "antd";
import React, { Component } from "react";
import { OptionsMenu } from "../OptionsMenu";
import { TogglLogin } from "../TogglLogin";
import { styles } from "./App.styles";

export default class App extends Component {
    public render(): React.ReactNode {
        return (
            <Layout>
                <Layout.Header style={styles.header}>
                    <div style={styles.avatarContainer}>
                        <Avatar size="small" />
                    </div>
                    <div style={styles.optionsContainer}>
                        <OptionsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={styles.content}>
                    <div style={styles.innerContent}>
                        <TogglLogin />
                    </div>
                </Layout.Content>
                <Layout.Footer style={styles.footer}>FOOTER</Layout.Footer>
            </Layout>
        );
    }
}
