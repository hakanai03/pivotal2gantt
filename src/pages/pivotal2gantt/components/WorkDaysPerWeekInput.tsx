import {InputNumber} from "antd"
import React, {useContext} from "react"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"

export interface WorkDaysPerWeekInputProps {
style?: React.CSSProperties
}

export const WorkDaysPerWeekInput: React.FC<WorkDaysPerWeekInputProps> = ({style}) => {
  const {state, setState} = useContext(Pivotal2GanttContext)
  const setWorkDaysPerWeek = (workDaysPerWeek: number) => {
    if (workDaysPerWeek < 1) return
    if (workDaysPerWeek > 7) return
    setState({
      ...state,
      workDaysPerWeek,
    })
  }

  return (
    <InputNumber<number>
      onChange={setWorkDaysPerWeek}
      min={1}
      max={7}
      style={style}
      value={state.workDaysPerWeek}
    />
  )
}
