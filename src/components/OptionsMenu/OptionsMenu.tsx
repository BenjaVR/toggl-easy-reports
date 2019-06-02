import { Dropdown, Icon, Menu } from "antd";
import * as React from "react";
import { ApiKeyForm } from "../ApiKeyForm";

export default class OptionsMenu extends React.Component {
    private readonly iconStyles: React.CSSProperties = {
        fontSize: 24,
    };

    public render() {
        return (
            <Dropdown overlay={this.renderMenu()} trigger={["click"]}>
                <Icon type="setting" theme="outlined" style={this.iconStyles} />
            </Dropdown>
        );
    }

    private renderMenu(): React.ReactNode {
        return (
            <Menu>
                <ApiKeyForm />
            </Menu>
        );
    }
}
