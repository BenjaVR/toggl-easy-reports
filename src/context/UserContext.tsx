import React, { Dispatch, ReducerAction, ReducerState, useCallback, useContext, useReducer } from "react";
import { User } from "../models/User";
import UsersService from "../services/toggl/UsersService";

type UserState =
    | { authState: "LOGGED_IN", user: User }
    | { authState: "LOGGED_OUT" | "LOGGING_IN" | "LOGIN_FAILED", user: undefined };

type UserAction =
    | { type: "LOGGING_IN" }
    | { type: "LOGGED_IN", user: User }
    | { type: "LOGGING_IN_FAILED" }
    | { type: "LOGGED_OUT" };

function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case "LOGGING_IN":
            return {
                user: undefined,
                authState: "LOGGING_IN",
            };
        case "LOGGED_IN":
            return {
                user: action.user,
                authState: "LOGGED_IN",
            };
        case "LOGGING_IN_FAILED":
            return {
                user: undefined,
                authState: "LOGIN_FAILED",
            };
        case "LOGGED_OUT":
            return {
                user: undefined,
                authState: "LOGGED_OUT",
            };
        default:
            return state;
    }
}

function getInitialState(): UserState {
    return {
        user: undefined,
        authState: "LOGGED_OUT",
    };
}

// TODO: make this cleaner?
type UserContextType = [ReducerState<typeof userReducer>, Dispatch<ReducerAction<typeof userReducer>>];
const UserContext = React.createContext<UserContextType>([
    getInitialState(),
    () => { return; },
]);

export const UserProvider: React.FC = (props) => {
    const reducer = useReducer(userReducer, getInitialState());

    return (
        <UserContext.Provider value={reducer}>
            {props.children}
        </UserContext.Provider>
    );
};

export function useUserState() {
    const [userState, dispatchUserState] = useContext(UserContext);

    const login = useCallback(() => {
        dispatchUserState({
            type: "LOGGING_IN",
        });
        UsersService.getCurrentUser()
            .then((user: User) => {
                dispatchUserState({
                    type: "LOGGED_IN",
                    user,
                });
            })
            .catch(() => {
                dispatchUserState({
                    type: "LOGGING_IN_FAILED",
                });
            });
    }, [dispatchUserState]);

    return {
        userState,
        login,
    };
}
