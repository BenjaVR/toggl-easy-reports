import { IUser } from "../../services/toggl/UsersService";
import { UserAction } from "./actions";

type UserAuthenticationState = "NotAuthenticated" | "Authenticating" | "Authenticated";

export interface IUserState {
    apiKey: string | undefined;
    authenticationState: UserAuthenticationState;
    userData: IUser | undefined;
}

const initialState: IUserState = {
    apiKey: undefined,
    authenticationState: "NotAuthenticated",
    userData: undefined,
};

export function userReducer(state = initialState, action: UserAction): IUserState {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return {
                ...state,
                apiKey: action.apiKey,
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
