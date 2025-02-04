// css
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// components
import App from "./App.jsx";
import Toast from "./components/Toast.jsx";

// libs
import SocketProvider from "./redux/socket/SocketProvider.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserProtectWrapper from "./components/UserProtectWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <UserProtectWrapper>
            <App />
            <Toast />
          </UserProtectWrapper>
        </SocketProvider>
      </Provider>
    </Router>
  </StrictMode>
);
