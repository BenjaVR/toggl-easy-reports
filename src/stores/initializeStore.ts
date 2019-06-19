import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer, { ApplicationActions, IApplicationState } from "./rootReducer";

export default function initializeStore(): Store<IApplicationState, ApplicationActions> {
    const middleware = [thunk];
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
}
