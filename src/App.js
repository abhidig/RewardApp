import React from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <MainContainer />
    </ErrorBoundary>
  );
}

export default App;
