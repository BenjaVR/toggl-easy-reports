import { Alert, Avatar, Icon, Layout, message, Spin, Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { BindThis } from "../../utilities/BindThis";
import { OptionsMenu } from "../OptionsMenu";
import { styles } from "./App.styles";

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
        const { userData, authState } = this.props;
        const userNameAndEmail = userData === undefined ? "" : `${userData.fullname} (${userData.email})`;

        const avatarSrc = userData === undefined ? undefined : userData.image_url;
        const avatarTooltipPlacement: TooltipPlacement = this.state.isSmallWidth ? "bottomRight" : "right";

        let content: React.ReactNode;
        switch (authState) {
            case "Authenticated":
                content = this.renderAuthenticatedContent();
                break;
            case "NotAuthenticated":
                content = this.renderNotAuthenticatedContent();
                break;
            case "Authenticating":
                content = this.renderAuthenticatingContent();
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
                        <OptionsMenu />
                    </div>
                </Layout.Header>
                <Layout.Content style={styles.content}>{content}</Layout.Content>
                <Layout.Footer style={styles.footer}>FOOTER</Layout.Footer>
            </Layout>
        );
    }

    private renderAuthenticatedContent(): React.ReactNode {
        // TODO: temporary content.
        return <h1>Hello, world!</h1>;
    }

    private renderNotAuthenticatedContent(): React.ReactNode {
        return (
            <Alert
                type="error"
                message="Could not login"
                description={
                    <React.Fragment>
                        <span>Please enter a valid Toggl API token in the settings.</span>
                        &nbsp;
                        <span>
                            Click on <Icon type="setting" theme="outlined" /> top right.
                        </span>
                    </React.Fragment>
                }
            />
        );
    }

    private renderAuthenticatingContent(): React.ReactNode {
        return <Spin style={styles.loadingSpinner} />;
    }

    private notifyUserAuthChange(prevProps: AppProps): void {
        if (prevProps.authState === "Authenticating") {
            const { authState, userData } = this.props;
            if (authState === "Authenticated" && userData !== undefined) {
                message.success(`Successfully logged in, ${userData.fullname}!`);
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
