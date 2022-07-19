import {Buffer} from "buffer"
import {UploadButton} from "@/components/Upload"
import {parse} from "csv-parse/sync"
import React from "react"

type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void

export const Pivotal2Excel = () => {
  const handleSelectFiles: OnSelectFiles = (e) => {
    if (!e.target.files) return
    console.log("hello")
    const files: File[] = Array.from(e.target.files)
    const file = files[0]
    file.arrayBuffer().then(res => {
      console.log(parse(res))
    })
  }

  return (
    <UploadButton
      labelId="upload"
      onSelectFiles={handleSelectFiles}
      shape="round"
    >
      アップロード
    </UploadButton>
  )
}
