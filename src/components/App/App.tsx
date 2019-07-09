import { Avatar, Layout, message, Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { IUserState } from "../../stores/user/reducers";
import { BindThis } from "../../utilities/BindThis";
import { SettingsMenu } from "../SettingsMenu";
import { styles } from "./App.styles";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { AuthenticatingContent } from "./AuthenticatingContent";
import { NotAuthenticatedContent } from "./NotAuthenticatedContent";

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface IAppState {
    isSmallWidth: boolean;
}

class App extends Component<AppProps, IAppState> {
    private readonly widthMediaQuery: MediaQueryList;

    constructor(props: AppProps) {
        super(props);

        this.state = {
            isSmallWidth: false,
        };

        this.widthMediaQuery = window.matchMedia("(max-width: 500px)");
    }

    public componentDidMount(): void {
        this.props.login();

        this.widthMediaQuery.addEventListener("change", this.handleWidthMediaQueryChanged);
    }

    public componentWillUnmount(): void {
        this.widthMediaQuery.removeEventListener("change", this.handleWidthMediaQueryChanged);
    }

    public componentDidUpdate(prevProps: AppProps): void {
        this.notifyUserAuthChange(prevProps);
    }

    public render(): React.ReactNode {
        const { user, authState } = this.props;
        const userNameAndEmail = user === undefined ? "" : `${user.fullName} (${user.email})`;

        const avatarSrc = user === undefined ? undefined : user.imageUrl;
        const avatarTooltipPlacement: TooltipPlacement = this.state.isSmallWidth ? "bottomRight" : "right";

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
            <Layout style={styles.layout}>
                <Layout.Header style={styles.header}>
                    <div style={styles.avatarContainer}>
                        <Tooltip title={userNameAndEmail} placement={avatarTooltipPlacement} autoAdjustOverflow={true}>
                            <Avatar size="small" src={avatarSrc} />
                        </Tooltip>
                    </div>
                    <div style={styles.navbarCenter}>
                        <h1 style={styles.navbarTitle}>Toggl Easy Reports</h1>
                    </div>
                    <div style={styles.optionsContainer}>
                        <SettingsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={styles.content}>{content}</Layout.Content>
                <Layout.Footer style={styles.footer}>FOOTER</Layout.Footer>
            </Layout>
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

    @BindThis()
    private handleWidthMediaQueryChanged(event: MediaQueryListEvent): void {
        this.setState({
            isSmallWidth: event.matches,
        });
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
