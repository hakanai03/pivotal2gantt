import {Dayjs} from "dayjs"
import {Ticket} from "@/types/pivotal/Ticket"
import {Task} from "gantt-task-react"

interface InternalTicket extends Ticket {
  accumulationEstimate: number
}

export interface Config {
  currentVelocity: number
  workDaysPerWeek: number
  startDay: Dayjs
  includeBugTicket: boolean
}

export const makeGanttTasks = (tickets: Ticket[], config: Config): Task[] => {
  const internalTickets = tickets
    .filter((ticket) => ticket.type === "feature" || (config.includeBugTicket && ticket.type === "bug"))
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

  const tasks: Task[] = internalTickets.map(t => {
    const offsetWeek = t.iteration - 1
    const monday = config.startDay.add(offsetWeek, "week")
    const velocityPerDay = config.currentVelocity / config.workDaysPerWeek
    const start = monday.add(Math.floor((t.accumulationEstimate - (offsetWeek * config.currentVelocity)) / velocityPerDay), "day")
    const end = monday.add(Math.floor((t.accumulationEstimate - (offsetWeek * config.currentVelocity) + t.estimate) / velocityPerDay), "day")

    return ({
      start: start.toDate(),
      end: end.toDate(),
      name: `${t.title} (第${offsetWeek + 1}週, ${t.estimate}point)`,
      project: t.labels,
      id: `${t.id}`,
      type: "task",
      progress: 0,
    })
  })
  return tasks
}
