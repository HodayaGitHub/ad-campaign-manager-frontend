// import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { combineReducers, createStore } from "redux"
import { campaignReducer } from "./reducers/campaign.reducer"
import { appReducer } from "./reducers/app.reducer"
import { systemReducer } from "./reducers/system.reducer"

const rootReducer = combineReducers({
    campaignModule: campaignReducer,
    appModule: appReducer,
    systemModule: systemReducer, 
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})