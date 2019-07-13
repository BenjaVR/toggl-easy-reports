import { Avatar, Tooltip } from "antd";
import * as React from "react";
import { User } from "../../../models/User";
import { SettingsMenu } from "../../SettingsMenu";
import { styles } from "./HeaderContent.styles";

export type HeaderContentAvatarTooltipPlacement = "bottomRight" | "right";

interface IHeaderContentProps {
    user?: User;
    avatarTooltipPlacement: HeaderContentAvatarTooltipPlacement;
}

const HeaderContent: React.FunctionComponent<IHeaderContentProps> = ({ user, avatarTooltipPlacement }) => {
    const userNameAndEmail = user === undefined ? "" : `${user.fullName} (${user.email})`;
    const avatarSrc = user === undefined ? undefined : user.imageUrl;

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default HeaderContent;
