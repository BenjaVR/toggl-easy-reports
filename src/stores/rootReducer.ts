import { combineReducers } from "redux";
import { UserAction } from "./user/actions";
import { IUserState, userReducer } from "./user/reducers";
import { IWorkspaceState, workspaceReducer } from "./workspaces/reducers";

export interface IApplicationState {
    user: IUserState;
    workspaces: IWorkspaceState;
}

export type ApplicationActions = UserAction;

const rootReducer = combineReducers<IApplicationState>({
    user: userReducer,
    workspaces: workspaceReducer,
});

export default rootReducer;
