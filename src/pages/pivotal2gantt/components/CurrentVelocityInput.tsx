import {InputNumber} from "antd"
import React, {useContext} from "react"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"

export interface CurrentVelocityInputProps {
style?: React.CSSProperties
}

export const CurrentVelocityInput: React.FC<CurrentVelocityInputProps> = ({style}) => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const setCurrentVelocity = (velocity: number) => {
    setState({
      ...state,
      currentVelocity: velocity,
    })
  }

  return (<InputNumber<number>
    onChange={setCurrentVelocity}
    min={1}
    max={1000}
    value={state.currentVelocity}
    style={style}
  />
  )
}
