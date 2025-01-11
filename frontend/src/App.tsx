import { useState } from "react";

import "./App.css";
import DemoPage from "./components/payments/page";
function App() {
  const URL = "/api/fetch-data";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  return (
    <>
      <DemoPage />
    </>
  );
}

export default App;
