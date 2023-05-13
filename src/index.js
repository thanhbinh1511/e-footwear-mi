import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "~/components/globle-styles";
import { persistor, store } from "~/app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <GlobalStyle>
                        <App />
                    </GlobalStyle>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
