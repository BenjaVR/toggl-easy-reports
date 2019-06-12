import { Avatar, Layout } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { OptionsMenu } from "../OptionsMenu";
import { TogglLogin } from "../TogglLogin";
import { styles } from "./App.styles";

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends Component<AppProps> {
    public componentDidMount(): void {
        this.props.login();
    }

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

function mapStateToProps(state: IApplicationState) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: Dispatch<UserAction>) {
    return bindActionCreators(
        {
            login,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
