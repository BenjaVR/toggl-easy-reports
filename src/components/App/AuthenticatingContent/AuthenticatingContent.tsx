import { Row, Spin } from "antd";
import * as React from "react";
import { styles } from "./AuthenticatingContent.styles";

export default class AuthenticatingContent extends React.Component {
    public render(): React.ReactNode {
        return (
            <Row type="flex" align="middle">
                <Spin style={styles.loadingSpinner} />
            </Row>
        );
    }
}
