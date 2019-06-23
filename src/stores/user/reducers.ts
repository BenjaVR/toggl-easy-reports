import { User } from "../../models/User";
import { UserAction } from "./actions";

type UserAuthenticationState = "NotAuthenticated" | "Authenticating" | "Authenticated";

export interface IUserState {
    authenticationState: UserAuthenticationState;
    userData: User | undefined;
}

const initialState: IUserState = {
    authenticationState: "NotAuthenticated",
    userData: undefined,
};

export function userReducer(state = initialState, action: UserAction): IUserState {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return {
                ...state,
                authenticationState: "Authenticating",
            };
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                authenticationState: "Authenticated",
                userData: action.user,
            };
        case "USER_LOGIN_FAILED":
            return {
                ...state,
                authenticationState: "NotAuthenticated",
                userData: undefined,
            };
        default:
            return state;
    }
}
