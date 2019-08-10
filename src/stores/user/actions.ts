import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { User } from "../../models/User";
import UsersService from "../../services/toggl/UsersService";
import { IUserState } from "./reducers";

type UserActionType = "USER_LOGIN_REQUEST" | "USER_LOGIN_SUCCESS" | "USER_LOGIN_FAILED";

interface IUserLoginRequestAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_REQUEST";
}

interface IUserLoginSuccessAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_SUCCESS";
    readonly user: User;
}

interface IUserLoginFailedAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_FAILED";
}

export type UserAction = IUserLoginRequestAction | IUserLoginSuccessAction | IUserLoginFailedAction;

export function login(): ThunkAction<void, IUserState, undefined, Action<UserActionType>> {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const user = await UsersService.getCurrentUser();
            dispatch(loginSuccess(user));
        } catch {
            dispatch(loginFailed());
        }
    };
}

function loginRequest(): IUserLoginRequestAction {
    return {
        type: "USER_LOGIN_REQUEST",
    };
}

function loginSuccess(user: User): IUserLoginSuccessAction {
    return {
        type: "USER_LOGIN_SUCCESS",
        user,
    };
}

function loginFailed(): IUserLoginFailedAction {
    return {
        type: "USER_LOGIN_FAILED",
    };
}
