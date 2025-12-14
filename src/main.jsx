import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "@/App";
import ErrorBoundary from "./components/ErrorBoundary";
import { store, persistor } from "./store/stores";
import "@/index.css";
import i18n from "@/i18n/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";
import Loading from "./components/Loading";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorBoundary>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <ThemeProvider />
          <App />
        </Suspense>
      </PersistGate>
    </ReduxProvider>
  </ErrorBoundary>,
  // </StrictMode>,
);
