export const currentStates = ["unstarted", "started", "finished", "delivered", "accepted", "rejected"] as const
export type CurrentState = typeof currentStates[number]

export const ticketTypes = ["feature", "bug", "chore", "release"] as const
export type TicketType = "feature" | "bug" | "chore" | "release"

export interface Ticket {
  acceptedAt: string
  comment: string
  createdAt: string
  currentState: CurrentState
  deadline: string
  description: string
  Estimate: number
  id: number
  iteration: number
  IterationEnd: string
  iterationStart: string
  labels: string
  ownedBy: string
  priority: string
  requestedBy: string
  title: string
  type: TicketType
  url: string
}

