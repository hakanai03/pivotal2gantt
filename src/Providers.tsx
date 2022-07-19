import {ConfigProvider} from "antd"
import jaJP from "antd/lib/locale/ja_JP"
import React from "react"

export interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <ConfigProvider locale={jaJP}>
      {children}
    </ConfigProvider>
  )
}
