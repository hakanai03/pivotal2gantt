import {Select} from "antd"
import {ViewMode} from "gantt-task-react"
import React, {useContext} from "react"
import {Pivotal2GanttContext} from "../Pivotal2GanttProvider"

interface GanttViewModeSelectProps {
  style?: React.CSSProperties
}

export const GanttViewModeSelect: React.FC<GanttViewModeSelectProps> = ({style}) => {
  const {state, setState} = useContext(Pivotal2GanttContext)
  const setViewMode = (viewMode: ViewMode) => {
    setState({
      ...state,
      viewMode,
    })
  }

  return (
    <Select defaultValue={state.viewMode} onChange={setViewMode} style={style}>
      <Select.Option value={ViewMode.QuarterDay}>6時間</Select.Option>
      <Select.Option value={ViewMode.HalfDay}>12時間</Select.Option>
      <Select.Option value={ViewMode.Day}>日</Select.Option>
      <Select.Option value={ViewMode.Week}>週</Select.Option>
      <Select.Option value={ViewMode.Month}>月</Select.Option>
    </Select>
  )
}
