import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
