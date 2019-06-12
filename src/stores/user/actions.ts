import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import ApiTokenService from "../../services/toggl/ApiTokenService";
import UsersService, { IUser } from "../../services/toggl/UsersService";
import { IUserState } from "./reducers";

type UserActionType = "USER_LOGIN_REQUEST" | "USER_LOGIN_SUCCESS" | "USER_LOGIN_FAILED";

interface IUserLoginRequestAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_REQUEST";
    readonly apiKey: string;
}

interface IUserLoginSuccessAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_SUCCESS";
    readonly user: IUser;
}

interface IUserLoginFailedAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_FAILED";
}

export type UserAction = IUserLoginRequestAction | IUserLoginSuccessAction | IUserLoginFailedAction;

export function login(): ThunkAction<void, IUserState, undefined, Action<UserActionType>> {
    return async dispatch => {
        dispatch(loginRequest());
        // TODO: error/not authenticated handling
        const user = await UsersService.getCurrentUser();
        dispatch(loginSuccess(user));
    };
}

export function loginRequest(): IUserLoginRequestAction {
    return {
        type: "USER_LOGIN_REQUEST",
        apiKey: ApiTokenService.getToken(),
    };
}

export function loginSuccess(user: IUser): IUserLoginSuccessAction {
    return {
        type: "USER_LOGIN_SUCCESS",
        user,
    };
}

export function loginFailed(): IUserLoginFailedAction {
    return {
        type: "USER_LOGIN_FAILED",
    };
}
