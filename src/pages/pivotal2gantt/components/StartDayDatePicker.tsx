import React, {useContext} from "react"
import {Dayjs} from "dayjs"
import {DatePicker} from "@/components/DatePicker"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"

export interface StartDayDatePickerProps {
  style?: React.CSSProperties
}

export const StartDayDatePicker: React.FC<StartDayDatePickerProps> = ({style}) => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const setStartDay = (day: Dayjs | null) => {
    day && setState({
      ...state,
      startDay: day,
    })
  }

  return (
    <DatePicker
      style={style}
      defaultValue={state.startDay}
      onChange={(day) => day && setStartDay(day)}
      disabledDate={(day) => day.weekday() !== 1}
    />
  )
}
