import { Form, Input, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";

export interface IFormFields {
    togglApiToken: string;
    roundProjectMinutes: number;
}

interface ISettingsFormProps {
    readonly initialValues: IFormFields;
    readonly onFormFieldChanged: (changedFormItems: ChangedFormItems, areAllFieldsValid: boolean) => void;
    readonly onSave: () => void;
}

export type ChangedFormItems = Partial<IFormFields>;

type SettingsFormProps =
    & FormComponentProps
    & ISettingsFormProps;

const SettingsForm: React.FC<SettingsFormProps> = (props) => {
    const { form, initialValues, onSave } = props;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.keyCode === 13) {
            // Submit on enter
            event.preventDefault();
            onSave();
        }
    };

    return (
        <Form layout="horizontal" onKeyDown={handleKeyDown}>
            <Form.Item label="Toggl API token">
                {form.getFieldDecorator<IFormFields>("togglApiToken", {
                    initialValue: initialValues.togglApiToken,
                })(
                    <Input />,
                )}
            </Form.Item>
            <Form.Item label="Round projects down to minutes">
                {form.getFieldDecorator<IFormFields>("roundProjectMinutes", {
                    initialValue: initialValues.roundProjectMinutes,
                })(
                    <InputNumber min={0} />,
                )}
            </Form.Item>
        </Form>
    );
};

export default Form.create<SettingsFormProps>({
    onValuesChange: async (props, _, allFormFields: IFormFields) => {
        const { initialValues, onFormFieldChanged } = props;
        const changedFormItems: ChangedFormItems = {};

        // TODO: make this more generic?
        if (allFormFields.togglApiToken !== initialValues.togglApiToken) {
            changedFormItems.togglApiToken = allFormFields.togglApiToken;
        }
        if (allFormFields.roundProjectMinutes !== initialValues.roundProjectMinutes) {
            changedFormItems.roundProjectMinutes = allFormFields.roundProjectMinutes;
        }

        const changedFields = Object.keys(changedFormItems);
        // The actual fields get updated in the next tick, so delay validation until that moment.
        window.setTimeout(() => {
            const areAllFieldsValid = changedFields.reduce(
                (areValid, changedField) => {
                    if (!areValid) { return false; }
                    const errors = props.form.getFieldError(changedField);
                    return errors === undefined || errors.length === 0;
                },
                true);
            onFormFieldChanged(changedFormItems, areAllFieldsValid);
        });
    },
})(SettingsForm);
