import { Layout, message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState } from "../../stores/rootReducer";
import { login, UserAction } from "../../stores/user/actions";
import { IUserState } from "../../stores/user/reducers";
import { BindThis } from "../../utilities/BindThis";
import { styles } from "./App.styles";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { AuthenticatingContent } from "./AuthenticatingContent";
import { HeaderContent } from "./HeaderContent";
import { HeaderContentAvatarTooltipPlacement } from "./HeaderContent/HeaderContent";
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

        const avatarTooltipPlacement: HeaderContentAvatarTooltipPlacement = this.state.isSmallWidth
            ? "bottomRight"
            : "right";

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
                    <HeaderContent user={user} avatarTooltipPlacement={avatarTooltipPlacement} />
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
