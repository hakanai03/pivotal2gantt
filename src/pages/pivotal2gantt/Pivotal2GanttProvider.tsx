import {Ticket} from "@/types/pivotal/Ticket"
import dayjs, {Dayjs} from "dayjs"
import {Task, ViewMode} from "gantt-task-react"
import React, {createContext, useState} from "react"

export interface Pivotal2GanttState {
  tickets: Ticket[]
  tasks: Task[]
  startDay: Dayjs
  viewMode: ViewMode
  workDaysPerWeek: number
  currentVelocity: number
}

const defaultState: Pivotal2GanttState = {
  tickets: [],
  tasks: [],
  startDay: dayjs().startOf("week").add(1, "day"),
  viewMode: ViewMode.Week,
  currentVelocity: 10,
  workDaysPerWeek: 5,
}

export interface Context {
  state: Pivotal2GanttState
  setState: React.Dispatch<React.SetStateAction<Pivotal2GanttState>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Pivotal2GanttContext = createContext<Context>({} as any)

export interface Pivotal2GanttProviderProps {
  children?: React.ReactNode
}

export const Pivotal2GanttProvider: React.FC<Pivotal2GanttProviderProps> = ({children}) => {
  const [state, setState] = useState(defaultState)

  return (
    <Pivotal2GanttContext.Provider value={{state, setState}}>
      {children}
    </Pivotal2GanttContext.Provider>
  )
}
