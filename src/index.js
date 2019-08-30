import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

//Styles
import "./Styles/index.css";

//Components
import App from "./Components/App";


ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
