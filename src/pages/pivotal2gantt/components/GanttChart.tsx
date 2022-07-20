import {Gantt} from "gantt-task-react"
import {useContext, useEffect} from "react"
import {makeGanttTasks} from "@/pages/pivotal2gantt/algorithm"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"


export const GanttChart = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  useEffect(() => {
    const tasks = makeGanttTasks(state.tickets, {
      startDay: state.startDay,
      currentVelocity: state.currentVelocity,
      workDaysPerWeek: state.workDaysPerWeek,
    })
    setState({
      ...state,
      tasks,
    })
  }, [state.tickets])

  if (state.tasks.length <= 0) return <></>
  return (
    <Gantt
      tasks={state.tasks}
      viewMode={state.viewMode}
    />
  )
}
