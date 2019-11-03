import { Button, Icon, message, Modal } from "antd";
import * as React from "react";
import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { useUserState } from "../../context/UserContext";
import { hasProperty } from "../../utilities/hasProperty";
import SettingsForm, { ChangedFormItems, IFormFields } from "./SettingsForm";
import styles from "./SettingsPopup.module.scss";

const SettingsPopup: React.FC = () => {
    const settings = useSettings();
    const { login } = useUserState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formFieldValues, setFormFieldValues] = useState<Partial<IFormFields>>({});
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    const initialFormFieldValues: IFormFields = {
        togglApiToken: settings.togglApiToken,
        roundProjectMinutes: settings.roundProjectDurationsDownToMinutes,
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleFormItemChanged = (changedFormItems: ChangedFormItems, areAllFieldsValid: boolean) => {
        setFormFieldValues(changedFormItems);
        setIsFormValid(areAllFieldsValid);
    };

    const handleSave = () => {
        if (!isFormValid) { return; }
        // TODO: make this generic for each field, and only do an explicit check for e.g. calling login()?
        if (hasProperty(formFieldValues, "togglApiToken")) {
            settings.dispatch({
                type: "SET_TOGGL_API_TOKEN",
                token: formFieldValues.togglApiToken!,
            });
            login();
        }
        if (hasProperty(formFieldValues, "roundProjectMinutes")) {
            settings.dispatch({
                type: "SET_ROUND_PROJECT_DURATIONS_DOWN_TO_MINUTES",
                minutes: formFieldValues.roundProjectMinutes!,
            });
        }
        message.success("Successfully updated settings");
        closeModal();
    };
    const handleCancel = () => {
        closeModal();
    };
    const handleResetDefaults = () => {
        settings.dispatch({ type: "RESET" });
        login();
        closeModal();
    };

    const renderFooter = () => {
        return (
            <>
                <Button
                    ghost={true}
                    type="danger"
                    className={styles.restoreSettingsButton}
                    onClick={handleResetDefaults}
                >
                    Reset defaults
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" disabled={!isFormValid} onClick={handleSave}>Save</Button>
            </>
        );
    };

    return (
        <>
            <Icon type="setting" theme="outlined" className={styles.icon} onClick={openModal} />
            <Modal
                title="Settings"
                footer={renderFooter()}
                visible={isModalOpen}
                destroyOnClose={true}
                maskClosable={false}
                onCancel={handleCancel}
            >
                <SettingsForm
                    initialValues={initialFormFieldValues}
                    onFormFieldChanged={handleFormItemChanged}
                    onSave={handleSave}
                />
            </Modal>
        </>
    );
};

export default SettingsPopup;
