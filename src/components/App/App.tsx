import { Avatar, Layout, message, Tooltip } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { BindThis } from "../../utilities/BindThis";
import { OptionsMenu } from "../OptionsMenu";
import { styles } from "./App.styles";

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends Component<AppProps> {
    public componentDidMount(): void {
        this.props.login();
    }

    public componentDidUpdate(prevProps: AppProps): void {
        this.notifyUserAuthChange(prevProps);
    }

    public render(): React.ReactNode {
        const { userData, authState } = this.props;
        const avatarSrc = userData === undefined ? undefined : userData.image_url;
        const userNameAndEmail = userData === undefined ? "" : `${userData.fullname} (${userData.email})`;

        const content =
            authState === "Authenticated" ? this.renderAuthenticatedContent() : this.renderNotAuthenticatedContent();

        return (
            <Layout style={styles.layout}>
                <Layout.Header style={styles.header}>
                    <div style={styles.avatarContainer}>
                        <Tooltip title={userNameAndEmail} placement="bottomRight">
                            <Avatar size="small" src={avatarSrc} />
                        </Tooltip>
                    </div>
                    <div style={styles.optionsContainer}>
                        <OptionsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={styles.content}>{content}</Layout.Content>
                <Layout.Footer style={styles.footer}>FOOTER</Layout.Footer>
            </Layout>
        );
    }

    @BindThis()
    private renderAuthenticatedContent(): React.ReactNode {
        // TODO: temporary content.
        return <h1>Hello, world!</h1>;
    }

    @BindThis()
    private renderNotAuthenticatedContent(): React.ReactNode {
        // TODO: temporary content.
        return <h1>LOGIN PLS</h1>;
    }

    private notifyUserAuthChange(prevProps: AppProps): void {
        if (prevProps.authState === "Authenticating") {
            const { authState, userData } = this.props;
            if (authState === "Authenticated" && userData !== undefined) {
                message.success(`Successfully logged in, ${userData.fullname}!`);
            } else if (authState === "NotAuthenticated") {
                message.error("Please enter a valid API key!");
            }
        }
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        userData: state.user.userData,
        authState: state.user.authenticationState,
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
