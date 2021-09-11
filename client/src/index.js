import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
