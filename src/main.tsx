import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { inject } from '@vercel/analytics';
// import "bootstrap/dist/css/bootstrap.min.css";
import { VMStateProvider } from "./contexts/StateProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <VMStateProvider>
        <App />
      </VMStateProvider>
    </ContextProvider>
  </React.StrictMode>
);
inject();