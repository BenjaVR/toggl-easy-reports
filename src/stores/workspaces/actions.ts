import { Action } from "redux";
import { Workspace } from "../../models/Workspace";

export type WorkspacesActionType = "WORKSPACES_UPDATE" | "WORKSPACES_SELECT";

interface IWorkspacesUpdateAction extends Action<WorkspacesActionType> {
    readonly type: "WORKSPACES_UPDATE";
    readonly workspaces: Workspace[];
}

interface IWorkspacesSelectAction extends Action<WorkspacesActionType> {
    readonly type: "WORKSPACES_SELECT";
    readonly selectedWorkspaceId: number | undefined;
}

export type WorkspaceAction = IWorkspacesUpdateAction | IWorkspacesSelectAction;

export function updateWorkspaces(workspaces: Workspace[]): IWorkspacesUpdateAction {
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
