import { Avatar, Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import * as React from "react";
import { User } from "../../../models/User";
import { BindThis } from "../../../utilities/BindThis";
import { MediaQuery } from "../../MediaQuery";
import { SettingsPopup } from "../../SettingsMenu";
import { styles } from "./HeaderContent.styles";

interface IHeaderContentProps {
    user?: User;
}

interface IHeaderContentState {
    isSmallWidth: boolean;
}

class HeaderContent extends React.Component<IHeaderContentProps, IHeaderContentState> {
    constructor(props: IHeaderContentProps) {
        super(props);

        this.state = {
            isSmallWidth: true,
        };
    }

    public render(): React.ReactNode {
        const { user } = this.props;

        const userNameAndEmail = user === undefined ? "" : `${user.fullName} (${user.email})`;
        const avatarSrc = user === undefined ? undefined : user.imageUrl;
        const avatarTooltipPlacement: TooltipPlacement = this.state.isSmallWidth ? "bottomRight" : "right";

        return (
            <React.Fragment>
                <MediaQuery mediaQuery="(max-width: 500px)" onChange={this.handleWidthMediaQueryChanged} />
                <div style={styles.avatarContainer}>
                    <Tooltip title={userNameAndEmail} placement={avatarTooltipPlacement} autoAdjustOverflow={true}>
                        <Avatar size="small" src={avatarSrc} />
                    </Tooltip>
                </div>
                <div style={styles.navbarCenter}>
                    <h1 style={styles.navbarTitle}>Toggl Easy Reports</h1>
                </div>
                <div style={styles.optionsContainer}>
                    <SettingsPopup />
                </div>
            </React.Fragment>
        );
    }

    @BindThis()
    private handleWidthMediaQueryChanged(doesMediaQueryMatch: boolean): void {
        this.setState({
            isSmallWidth: doesMediaQueryMatch,
        });
    }
}

export default HeaderContent;
