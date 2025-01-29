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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <App />
          <Toast />
        </SocketProvider>
      </Provider>
    </Router>
  </StrictMode>
);
