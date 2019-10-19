import React, { Dispatch, ReducerAction, ReducerState, useContext, useReducer, useState } from "react";
import SettingsRepository from "../services/SettingsRepository";

interface ISettingsState {
    readonly togglApiToken: string;
    readonly roundTimeEntriesDownToMinutes: number;
}

type SettingsAction =
    | { type: "SET_TOGGL_API_TOKEN"; token: string }
    | { type: "SET_ROUND_TIME_ENTRIES_DOWN_TO_MINUTES"; minutes: number };

function settingsReducer(state: ISettingsState, action: SettingsAction): ISettingsState {
    switch (action.type) {
        case "SET_TOGGL_API_TOKEN":
            SettingsRepository.togglApiToken = action.token;
            return { ...state, togglApiToken: action.token };
        case "SET_ROUND_TIME_ENTRIES_DOWN_TO_MINUTES":
            SettingsRepository.roundTimeEntriesDownToMinutes = action.minutes;
            return { ...state, roundTimeEntriesDownToMinutes: action.minutes };
        default:
            return state;
    }
}

function getInitialState(): ISettingsState {
    return {
        togglApiToken: SettingsRepository.togglApiToken,
        roundTimeEntriesDownToMinutes: SettingsRepository.roundTimeEntriesDownToMinutes,
    };
}

// TODO: make this cleaner?
type SettingsContextType = [ReducerState<typeof settingsReducer>, Dispatch<ReducerAction<typeof settingsReducer>>];
const SettingsContext = React.createContext<SettingsContextType>([
    getInitialState(),
    () => { return; },
]);

export const SettingsProvider: React.FC = (props) => {
    const [settingsState] = useState(getInitialState());
    const reducer = useReducer(settingsReducer, settingsState);

    return (
        <SettingsContext.Provider value={reducer}>
            {props.children}
        </SettingsContext.Provider>
    );
};

export function useSettings() {
    const [settings, dispatchSettings] = useContext(SettingsContext);

    return {
        ...settings,
        dispatch: dispatchSettings,
    };
}
