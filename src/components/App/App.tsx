import { Layout, message } from "antd";
import React, { useEffect } from "react";
import { useUserState } from "../../context/UserContext";
import styles from "./App.module.scss";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { AuthenticatingContent } from "./AuthenticatingContent";
import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { NotAuthenticatedContent } from "./NotAuthenticatedContent";

const App: React.FC = () => {
    const { userState, login } = useUserState();

    useEffect(() => {
        login();
    }, [login]);

    useEffect(() => {
        switch (userState.authState) {
            case "LOGGED_IN":
                message.success(`Successfully logged in, ${userState.user.fullName}!`);
                break;
            case "LOGGED_OUT":
                message.success("Successfully logged out!");
                break;
            case "LOGGING_IN":
                message.loading("Logging in...");
                break;
            case "LOGIN_FAILED":
                message.error("Please enter a valid API key!");
                break;
        }
    }, [userState]);

    let content: React.ReactNode;
    switch (userState.authState) {
        case "LOGGED_IN":
            content = <AuthenticatedContent user={userState.user} />;
            break;
        case "LOGIN_FAILED":
        case "LOGGED_OUT":
            content = <NotAuthenticatedContent />;
            break;
        case "LOGGING_IN":
            content = <AuthenticatingContent />;
            break;
    }

    return (
        <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
                <HeaderContent user={userState.user} />
            </Layout.Header>
            <Layout.Content className={styles.content}>{content}</Layout.Content>
            <Layout.Footer className={styles.footer}>
                <FooterContent />
            </Layout.Footer>
        </Layout>
    );
};

export default App;
