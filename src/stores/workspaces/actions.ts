import { Action } from "redux";
import { IWorkspace } from "../../services/toggl/UsersService";

export type WorkspacesActionType = "WORKSPACES_UPDATE" | "WORKSPACES_SELECT";

interface IWorkspacesUpdateAction extends Action<WorkspacesActionType> {
    readonly type: "WORKSPACES_UPDATE";
    readonly workspaces: IWorkspace[];
}

interface IWorkspacesSelectAction extends Action<WorkspacesActionType> {
    readonly type: "WORKSPACES_SELECT";
    readonly selectedWorkspaceId: number | undefined;
}

export type WorkspaceAction = IWorkspacesUpdateAction | IWorkspacesSelectAction;

export function updateWorkspaces(workspaces: IWorkspace[]): IWorkspacesUpdateAction {
    return {
        type: "WORKSPACES_UPDATE",
        workspaces,
    };
}

export function selectWorkspace(workspaceId: number | undefined): IWorkspacesSelectAction {
    return {
        type: "WORKSPACES_SELECT",
        selectedWorkspaceId: workspaceId,
    };
}
