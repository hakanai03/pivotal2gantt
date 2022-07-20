import {Dayjs} from "dayjs"
import {Ticket, TicketType} from "@/types/pivotal/Ticket"
import {Task} from "gantt-task-react"
import {TaskType} from "gantt-task-react/dist/types/public-types"

interface InternalTicket extends Ticket {
  accumulationEstimate: number
}

export interface Config {
  currentVelocity: number
  workDaysPerWeek: number
  startDay: Dayjs
}

export interface CreateTicketParams {
  start: Date,
  end: Date,
  name: string
  project: string,
  id: string,
  type: TicketType
  progress: number
}

const convertType = (type: TicketType): TaskType => {
  switch (type) {
    case "feature": return "task"
    case "bug": return "task"
    case "chore": return "task"
    case "release": return "milestone"
  }
}

const convert = (params: CreateTicketParams): Task => {
  const start = params.type === "release" ? params.end : params.start
  const type = convertType(params.type)

  return {
    start,
    end: params.end,
    name: params.name,
    project: params.project,
    id: params.id,
    type,
    progress: params.progress,
  }
}

export const makeGanttTasks = (tickets: Ticket[], config: Config): Task[] => {
  const internalTickets = tickets
    .reduce((prev, current) => {
      const accumulationEstimate: number = prev.length > 0 ? prev[prev.length - 1].accumulationEstimate + current.estimate : current.estimate
      prev.push({
        ...current,
        accumulationEstimate,
      })
      return prev
    }, [] as InternalTicket[])
    .map(internalTicket => ({
      // overwrite iteration
      ...internalTicket,
      iteration: Math.ceil(internalTicket.accumulationEstimate / config.currentVelocity),
    }))

  const velocityPerDay = config.currentVelocity / config.workDaysPerWeek
  const tasks: Task[] = internalTickets.map(t => {
    const offsetWeek = t.iteration - 1
    const monday = config.startDay.add(offsetWeek, "week")
    const start = monday.add(Math.floor((t.accumulationEstimate - (offsetWeek * config.currentVelocity) - t.estimate) / velocityPerDay), "day")
    const end = monday.add(Math.floor((t.accumulationEstimate - (offsetWeek * config.currentVelocity)) / velocityPerDay), "day")
    console.log(monday, start, t.accumulationEstimate, velocityPerDay)

    return convert({
      start: start.toDate(),
      end: end.toDate(),
      name: `${t.title} (第${offsetWeek + 1}週, ${t.estimate}point)`,
      project: t.labels,
      id: `${t.id}`,
      type: t.type,
      progress: 0,
    })
  }).reduce((prev, current) => {
    // milesnoteの時だけmilestoneの時間を直近の最後のprojectのend時間で上書きする
    if (current.type === "milestone") {
      const lastProjectIndex = (() => {
        const reversedIndex = ([...prev].reverse()).findIndex((t: Task) => t.type === "task")
        if (reversedIndex < 0) return prev.length - 1
        return (prev.length - 1) - reversedIndex
      })()
      current.start = prev[lastProjectIndex].end
      current.end = prev[lastProjectIndex].end
    }
    return [...prev, current]
  }, [] as Task[])

  const tasksWithProject = tasks.reduce((prev, current) => {
    if (!current.project) return [...prev, current]
    const existProjects = [...new Set(prev.map(task => task.project))].filter(task => task !== "") as string[]
    const isExistProject = existProjects.some(project => project === current.project)

    if (isExistProject) {
      const index = prev.findIndex((task => task.project === current.project))
      prev[index].end = current.end
      return [...prev, current]
    } else {
      const newProject: Task = {
        start: current.start,
        end: current.end,
        name: current.project,
        project: current.project,
        id: current.project,
        type: "project",
        progress: 0,
      }
      return [...prev, newProject, current]
    }
  }, [] as Task[])

  return tasksWithProject
}
