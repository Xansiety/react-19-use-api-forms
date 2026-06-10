import * as React from "react";
import { logErrorToMyService } from "./logger";

// API agregada en React 19.1; en 19.0 no existe, por eso el acceso opcional
const { captureOwnerStack } = React as {
  captureOwnerStack?: () => string | null;
};

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  state: { hasError: boolean } = { hasError: false };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logErrorToMyService(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack ?? null,
      // `captureOwnerStack` solo existe en React 19.1+ y en builds de desarrollo
      captureOwnerStack?.() ?? null,
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
