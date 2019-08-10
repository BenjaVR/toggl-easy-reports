import { Alert, Icon } from "antd";
import * as React from "react";

export default class NotAuthenticatedContent extends React.Component {
    public render(): React.ReactNode {
        return (
            <Alert
                type="error"
                message="Could not login"
                description={this.renderDescription}
            />
        );
    }

    private renderDescription(): React.ReactNode {
        return (
            <React.Fragment>
                <p>
                    <span>Please enter a valid Toggl API token in the settings.</span>
                    &nbsp;
                    <span>
                                Click on <Icon type="setting" theme="outlined" /> top right.
                            </span>
                </p>
                <p>
                    <span>Get your API token</span>
                    &nbsp;
                    <a href="https://toggl.com/app/profile" rel="noopener noreferrer" target="_blank">
                        here
                    </a>
                    .
                </p>
            </React.Fragment>
        );
    }
}
