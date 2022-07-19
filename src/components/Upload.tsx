import {FileAddOutlined} from "@ant-design/icons"
import {BaseButtonProps} from "antd/es/button/button"
import React from "react"


export interface ButtonProps extends BaseButtonProps {
  onSelectFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
  labelId: string
  multiple?: boolean
  icon?: React.ReactNode,
  style?: React.CSSProperties,
}

const makeClassName: (props: ButtonProps) => string = ({
  block,
  type,
  shape,
  children,
  size,
}) => {
  const classes: string[] = ["ant-btn"]
  if (block) classes.push("ant-btn-block")
  if (type) {
    classes.push(`ant-btn-${type}`)
  } else {
    classes.push("ant-btn-primary")
  }
  switch (shape) {
    case "round":
      classes.push("ant-btn-round")
      break
    case "circle":
      classes.push("ant-btn-circle")
      break
    case "default":
    default:
      break
  }
  switch (size) {
    case "small":
      classes.push("ant-btn-sm")
      break
    case "large":
      classes.push("ant-btn-lg")
      break
    case "middle":
    default:
      break
  }
  if (!children) {
    classes.push("ant-btn-icon-only")
  }

  return classes.reduce((prev, cur) => `${prev} ${cur}`)
}

const defaultLabelStyle: React.CSSProperties = {
  cursor: "pointer",
  display: "inline-block",
  textAlign: "center",
}

const mergeCSSProperties = (base: React.CSSProperties, overwrite: React.CSSProperties): React.CSSProperties => {
  return {
    ...base,
    ...overwrite,
  }
}

export const UploadButton: React.FC<ButtonProps> = (props) => {
  const mergedStyle = props.style ? mergeCSSProperties(defaultLabelStyle, props.style) : defaultLabelStyle

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSelectFiles(e)
    e.target.value = "" // ユーザーが同じファイルを選んだ場合にイベントが発火しない対策
  }

  return (
    <label
      htmlFor={props.labelId}
      className={makeClassName(props)}
      style={mergedStyle}
    >
      <input
        id={props.labelId}
        type="file"
        style={{display: "none"}}
        multiple={props.multiple}
        onChange={handleChangeFiles}
      />
      {props.icon ? props.icon : <FileAddOutlined />}
      <span style={{marginLeft: "0.4rem"}}>{props.children}</span>
    </label>
  )
}

