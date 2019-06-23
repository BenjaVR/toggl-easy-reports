import { IWorkspace } from "../../services/toggl/UsersService";
import { WorkspaceAction } from "./actions";

export interface IWorkspaceState {
    workspaces: IWorkspace[];
    selectedWorkspaceId: number | undefined;
}

const initialState: IWorkspaceState = {
    workspaces: [],
    selectedWorkspaceId: undefined,
};

export function workspaceReducer(state = initialState, action: WorkspaceAction): IWorkspaceState {
    switch (action.type) {
        case "WORKSPACES_UPDATE":
            return {
                ...state,
                workspaces: action.workspaces,
            };
        case "WORKSPACES_SELECT":
            return {
                ...state,
                selectedWorkspaceId: action.selectedWorkspaceId,
            };
        default:
            return state;
    }
}
