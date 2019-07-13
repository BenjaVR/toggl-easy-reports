import { combineReducers } from "redux";
import { UserAction } from "./user/actions";
import { IUserState, userReducer } from "./user/reducers";
import { WorkspaceAction } from "./workspaces/actions";
import { IWorkspaceState, workspaceReducer } from "./workspaces/reducers";

export interface IApplicationState {
    user: IUserState;
    workspaces: IWorkspaceState;
}

export type ApplicationActions = UserAction | WorkspaceAction;

const rootReducer = combineReducers<IApplicationState>({
    user: userReducer,
    workspaces: workspaceReducer,
});

export default rootReducer;
