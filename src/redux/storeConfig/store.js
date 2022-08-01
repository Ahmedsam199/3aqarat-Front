// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist-indexeddb-storage";
import { encryptTransform } from 'redux-persist-transform-encrypt';

// import Routes from '@Routes'
// const keys = Object.keys(Routes)
// const DATA = []
// keys.forEach(x => {
//     if (Routes[x].root)
//         DATA.push(x)
// })
// ** init middleware
const middleware = [thunk, createDebounce()]
const persistConfig = {
    key: "root",
    transforms: [
        encryptTransform({
            secretKey: 'POS-secret-key',
            onError: function (error) {
                // Handle the error.
                console.error("hacker_it_error", error)
            },
        }),
    ],
    storage: storage('data'),
    // whitelist: ["layout", "tempData", "Offline", ...DATA],
    whitelist: ["layout", "tempData", "Offline"],
};
// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
export const store = createStore(persistReducer(persistConfig, rootReducer), {}, composeEnhancers(applyMiddleware(...middleware)))

export const persistor = persistStore(store);
