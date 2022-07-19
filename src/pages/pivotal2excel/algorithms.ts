import {Ticket} from "@/types/pivotal/Ticket"
import {Dayjs} from "dayjs"

export const transformToTicketsPerWeek = (pivotalTickets: Ticket[], currentVelocity: number): Ticket[][] => {
  const pivotalTicketsPerWeek: Ticket[][] = pivotalTickets.reduce((prev, current) => {
    const ticketsPerCurrentWeek: Ticket[] = prev[prev.length - 1]
    const accumulationPointsPerCurrentWeek: number = ticketsPerCurrentWeek.reduce((p, c) => p + current.estimate, 0)
    if (accumulationPointsPerCurrentWeek > currentVelocity) {
      prev.push([current])
    }
    prev[prev.length - 1].push(current)
    return prev
  }, [[]] as Ticket[][])
  return pivotalTicketsPerWeek
}

export const makeGanttTasks = (ticketsPerWeek: Ticket[][], startDay: Dayjs) => {
}
