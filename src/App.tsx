import React from "react"
import ReactDOM from "react-dom/client"

import {Providers} from "@/Providers"

import "gantt-task-react/dist/index.css"
import "antd/dist/antd.css"
// import "antd/dist/antd.dark.css"
import "@/app.css"
import {Pivotal2Excel} from "@/pages/pivotal2excel"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Pivotal2Excel />
    </Providers>
  </React.StrictMode>
)

