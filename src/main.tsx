import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { router } from "./routers/Routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
