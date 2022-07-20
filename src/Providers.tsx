import {ConfigProvider} from "antd"
import jaJP from "antd/lib/locale/ja_JP"
import React from "react"
import {Pivotal2GanttProvider} from "./pages/pivotal2gantt/Pivotal2GanttProvider"

export interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <ConfigProvider locale={jaJP}>
      <Pivotal2GanttProvider>
        {children}
      </Pivotal2GanttProvider>
    </ConfigProvider>
  )
}
