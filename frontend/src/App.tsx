import { useState } from "react";

import "./App.css";

function App() {
  const URL = "/api/fetch-data";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  return <>hello</>;
}

export default App;
