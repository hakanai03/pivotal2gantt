import {UploadButton} from "./components/Upload"

export const Pivotal2Excel = () => {

  return (
    <UploadButton
      labelId="upload"
      onSelectFiles={(files) => {console.log(files)}}
      shape="round"
    >
      アップロード
    </UploadButton>
  )
}
