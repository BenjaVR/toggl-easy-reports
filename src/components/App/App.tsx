import { Layout, message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { IUserState } from "../../stores/user/reducers";
import { styles } from "./App.styles";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { AuthenticatingContent } from "./AuthenticatingContent";
import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { NotAuthenticatedContent } from "./NotAuthenticatedContent";

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends Component<AppProps> {
    public componentDidMount(): void {
        this.props.login();
    }

    public componentDidUpdate(prevProps: AppProps): void {
        this.notifyUserAuthChange(prevProps);
    }

    public render(): React.ReactNode {
        const { user, authState } = this.props;

        let content: React.ReactNode;
        switch (authState) {
            case "Authenticated":
                // User prop should always be available here!
                content = this.props.user !== undefined ? <AuthenticatedContent user={this.props.user} /> : undefined;
                break;
            case "NotAuthenticated":
                content = <NotAuthenticatedContent />;
                break;
            case "Authenticating":
                content = <AuthenticatingContent />;
                break;
        }

        return (
            <React.Fragment>
                <Layout style={styles.layout}>
                    <Layout.Header style={styles.header}>
                        <HeaderContent user={user} />
                    </Layout.Header>
                    <Layout.Content style={styles.content}>{content}</Layout.Content>
                    <Layout.Footer style={styles.footer}>
                        <FooterContent />
                    </Layout.Footer>
                </Layout>
            </React.Fragment>
        );
    }

    private notifyUserAuthChange(prevProps: AppProps): void {
        if (prevProps.authState === "Authenticating") {
            const { authState, user } = this.props;
            if (authState === "Authenticated" && user !== undefined) {
                message.success(`Successfully logged in, ${user.fullName}!`);
            } else if (authState === "NotAuthenticated") {
                message.error("Please enter a valid API key!");
            }
        } else {
            if (this.props.authState === "Authenticating") {
                message.loading("Logging in...");
            }
        }
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        user: state.user.userData,
        authState: state.user.authenticationState,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IUserState, undefined, UserAction>) {
    return {
        login: () => dispatch(login()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
