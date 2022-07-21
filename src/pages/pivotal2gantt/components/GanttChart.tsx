import {Gantt} from "gantt-task-react"
import {useContext, useEffect, useMemo} from "react"
import {makeGanttTasks} from "@/pages/pivotal2gantt/algorithm"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"


export const GanttChart = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const tasks = useMemo(() => {
    return makeGanttTasks(state.tickets, {
      startDay: state.startDay,
      currentVelocity: state.currentVelocity,
      workDaysPerWeek: state.workDaysPerWeek,
    })
  }, [state.tickets, state.startDay, state.currentVelocity, state.workDaysPerWeek])

  useEffect(() => {
    const filtered = tasks
      .filter(task => state.showRelease ? true : task.type !== "milestone")
      .filter(task => state.showTask ? true : task.type !== "task")
    setState({
      ...state,
      tasks: filtered,
    })
  }, [tasks, state.showTask, state.showRelease])

  if (state.tasks.length <= 0) return <></>
  return (
    <Gantt
      locale="ja"
      listCellWidth={state.showList ? undefined : ""}
      tasks={state.tasks}
      viewMode={state.viewMode}
    />
  )
}
