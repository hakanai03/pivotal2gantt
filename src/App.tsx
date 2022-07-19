import React from "react"
import ReactDOM from "react-dom/client"

import {Providers} from "@/Providers"

import "@/app.css"
import "antd/dist/antd.dark.css"
import {UploadButton} from "./components/Upload"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <UploadButton
        labelId="upload"
        onSelectFiles={(files) => {console.log(files)}}
        shape="round"
      >
        アップロード
      </UploadButton>
    </Providers>
  </React.StrictMode>
)

