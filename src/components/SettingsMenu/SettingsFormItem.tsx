import { Button, Input } from "antd";
import React from "react";
import styles from "./SettingsFormItem.module.scss";

interface ISharedSettingsFormItemProps {
    label: string;
    handleSave: () => void;
}

interface ISettingsFormItemTextProps extends ISharedSettingsFormItemProps {
    type: "text";
    value: string;
    handleChange: (value: string) => void;
}

interface ISettingsFormItemNumberProps extends ISharedSettingsFormItemProps {
    type: "number";
    value: number;
    handleChange: (value: number) => void;
    allowNegativeNumbers: boolean;
}

type SettingsFormItemProps =
    | ISettingsFormItemTextProps
    | ISettingsFormItemNumberProps;

export const SettingsFormItem: React.FC<SettingsFormItemProps> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (props.type) {
            case "text":
                props.handleChange(event.currentTarget.value);
                return;
            case "number":
                const numericValue = parseInt(event.currentTarget.value, 10);
                if (isNaN(numericValue)) {
                    return;
                }
                if (!props.allowNegativeNumbers && numericValue < 0) {
                    props.handleChange(0);
                    return;
                }
                props.handleChange(numericValue);
                return;
        }
    };
    const { type, value, label, handleSave } = props;

    return (
        // We use Input.Search here, because it is the only clean way to add a button to an input field.
        <Input.Search
            className={styles.formItem}
            type={type}
            value={value}
            onChange={onChange}
            addonBefore={label}
            enterButton={(
                <Button type="primary" ghost={true}>
                    Update
                </Button>
            )}
            onSearch={handleSave}
        />
    );
};
