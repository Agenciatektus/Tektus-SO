import "../i18n"; // ✅ importa as configurações de tradução
import "./index.css"; // ✅ importa os estilos
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// c:\Users\Peterson\Documents\TektusOperations\TektusOperations\client\src\main.tsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";