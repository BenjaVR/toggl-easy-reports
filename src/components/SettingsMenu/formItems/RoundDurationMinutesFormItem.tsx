import React, { useState } from "react";
import { useSettings } from "../../../context/SettingsContext";
import { IOptionsMenuItemProps } from "../index";
import { SettingsFormItem } from "../SettingsFormItem";

type RoundDurationMinutesFormItemProps = IOptionsMenuItemProps;

export const RoundDurationMinutesFormItem: React.FC<RoundDurationMinutesFormItemProps> = (props) => {
    const { onSave } = props;
    const settings = useSettings();

    const [roundDurationMinutes, setRoundDurationMinutes]
        = useState<number>(settings.roundProjectDurationsDownToMinutes);

    const handleChange = (newValue: number): void => {
        setRoundDurationMinutes(newValue);
    };

    const handleSave = () => {
        settings.dispatch({
            type: "SET_ROUND_PROJECT_DURATIONS_DOWN_TO_MINUTES",
            minutes: roundDurationMinutes,
        });
        onSave(`Project durations will now round down to ${roundDurationMinutes} minutes!`);
    };

    // We use Input.Search here, because it is the only clean way to add a button to an input field.
    return (
        <SettingsFormItem
            type="number"
            value={roundDurationMinutes}
            allowNegativeNumbers={false}
            label="Round projects down to minutes"
            handleChange={handleChange}
            handleSave={handleSave}
        />
    );
};
