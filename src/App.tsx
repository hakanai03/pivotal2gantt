import React from "react"
import ReactDOM from "react-dom/client"

import {Providers} from "@/Providers"

import "@/app.css"
import "antd/dist/antd.dark.css"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <div>hello</div>
    </Providers>
  </React.StrictMode>
)

