import { Button, Input } from "antd";
import React, { useState } from "react";
import { useSettings } from "../../../context/SettingsContext";
import { useUserState } from "../../../context/UserContext";
import { IOptionsMenuItemProps } from "../SettingsMenu";

type TogglApiTokenFormProps = IOptionsMenuItemProps;

export const TogglApiTokenForm: React.FC<TogglApiTokenFormProps> = (props) => {
    const { onSave } = props;
    const settings = useSettings();
    const { login } = useUserState();

    const [apiToken, setApiToken] = useState<string>(settings.togglApiToken);

    const handleChange = (value: React.ChangeEvent<HTMLInputElement>): void => {
        setApiToken(value.currentTarget.value);
    };

    const handleSave = () => {
        settings.dispatch({
            type: "SET_TOGGL_API_TOKEN",
            token: apiToken,
        });
        onSave("API key saved!");
        login();
    };

    const enterButton = (
        <Button type="primary" ghost={true}>
            Update
        </Button>
    );

    // We use Input.Search here, because it is the only clean way to add a button to an input field.
    return (
        <Input.Search
            value={apiToken}
            onChange={handleChange}
            addonBefore={"Toggl API Key"}
            enterButton={enterButton}
            onSearch={handleSave}
        />
    );
};
