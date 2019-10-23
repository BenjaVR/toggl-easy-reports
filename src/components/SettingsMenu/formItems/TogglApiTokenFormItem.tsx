import React, { useState } from "react";
import { useSettings } from "../../../context/SettingsContext";
import { useUserState } from "../../../context/UserContext";
import { IOptionsMenuItemProps } from "../index";
import { SettingsFormItem } from "../SettingsFormItem";

type TogglApiTokenFormItemProps = IOptionsMenuItemProps;

export const TogglApiTokenFormItem: React.FC<TogglApiTokenFormItemProps> = (props) => {
    const { onSave } = props;
    const settings = useSettings();
    const { login } = useUserState();

    const [apiToken, setApiToken] = useState<string>(settings.togglApiToken);

    const handleChange = (newValue: string): void => {
        setApiToken(newValue);
    };

    const handleSave = () => {
        settings.dispatch({
            type: "SET_TOGGL_API_TOKEN",
            token: apiToken,
        });
        onSave("API key saved!");
        login();
    };

    return (
        <SettingsFormItem
            type="text"
            value={apiToken}
            label="Toggl API token"
            handleChange={handleChange}
            handleSave={handleSave}
        />
    );
};
