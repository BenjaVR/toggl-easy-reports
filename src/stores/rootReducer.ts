import { combineReducers } from "redux";
import { UserAction } from "./user/actions";
import { IUserState, userReducer } from "./user/reducers";

export interface IApplicationState {
    user: IUserState;
}

export type ApplicationActions = UserAction;

const rootReducer = combineReducers<IApplicationState>({
    user: userReducer,
});

export default rootReducer;
