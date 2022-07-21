import {Segmented, Select} from "antd"
import {SegmentedLabeledOption, SegmentedValue} from "antd/lib/segmented"
import {ViewMode} from "gantt-task-react"
import React, {useContext} from "react"
import {Pivotal2GanttContext} from "../Pivotal2GanttProvider"

interface GanttViewModeSelectProps {
  style?: React.CSSProperties
}

const viewModeMap = {
  quarterDay: ViewMode.QuarterDay,
  halfDay: ViewMode.HalfDay,
  day: ViewMode.Day,
  week: ViewMode.Week,
  month: ViewMode.Month,
}

const segmentLabelOption: SegmentedLabeledOption[] = [
  {value: ViewMode.QuarterDay, label: "6時間"},
  {value: ViewMode.HalfDay, label: "12時間"},
  {value: ViewMode.Day, label: "日"},
  {value: ViewMode.Week, label: "週"},
  {value: ViewMode.Month, label: "月"},
]

export const GanttViewModeSegmented: React.FC<GanttViewModeSelectProps> = ({style}) => {
  const {state, setState} = useContext(Pivotal2GanttContext)
  const setViewMode = (viewMode: SegmentedValue) => {
    setState({
      ...state,
      viewMode: viewMode as ViewMode,
    })
  }

  return (
    <Segmented defaultValue={state.viewMode} options={segmentLabelOption} onChange={setViewMode}/>
  )
}
