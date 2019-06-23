import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import UsersService, { IUser } from "../../services/toggl/UsersService";
import { selectWorkspace, updateWorkspaces, WorkspacesActionType } from "../workspaces/actions";
import { IUserState } from "./reducers";

type UserActionType = "USER_LOGIN_REQUEST" | "USER_LOGIN_SUCCESS" | "USER_LOGIN_FAILED";

interface IUserLoginRequestAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_REQUEST";
}

interface IUserLoginSuccessAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_SUCCESS";
    readonly user: IUser;
}

interface IUserLoginFailedAction extends Action<UserActionType> {
    readonly type: "USER_LOGIN_FAILED";
}

export type UserAction = IUserLoginRequestAction | IUserLoginSuccessAction | IUserLoginFailedAction;

export function login(): ThunkAction<void, IUserState, undefined, Action<UserActionType | WorkspacesActionType>> {
    return async dispatch => {
        dispatch(loginRequest());
        try {
            const user = await UsersService.getCurrentUser();
            dispatch(loginSuccess(user));
            dispatch(updateWorkspaces(user.workspaces));
            dispatch(selectWorkspace(user.default_wid));
        } catch {
            dispatch(loginFailed());
        }
    };
}

export function loginRequest(): IUserLoginRequestAction {
    return {
        type: "USER_LOGIN_REQUEST",
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
