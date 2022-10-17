import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "app"

import "assets/scss/black-dashboard-react.scss"
import "assets/demo/demo.css"
import "assets/css/nucleo-icons.css"
import "assets/css/style.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper"
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper"

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
  )
  