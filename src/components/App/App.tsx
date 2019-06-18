import { Avatar, Layout, Tooltip } from "antd";
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
        const { userData } = this.props;
        const avatarSrc = userData === undefined ? undefined : userData.image_url;
        const userNameAndEmail = userData === undefined ? "" : `${userData.fullname} (${userData.email})`;

        return (
            <Layout>
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
        userData: state.user.userData,
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
