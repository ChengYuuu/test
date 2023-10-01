import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center p-4">
          <h1 className="text-center">Something went wrong! Please refresh page</h1>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
