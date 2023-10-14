import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
