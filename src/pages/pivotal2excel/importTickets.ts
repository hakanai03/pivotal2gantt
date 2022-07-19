import {Ticket, TicketType, CurrentState, currentStates, ticketTypes} from "@/types/pivotal/Ticket"
import {parse} from "csv-parse/sync"

interface CSVTicket {
  "Accepted at": string
  "Comment": string
  "Created at": string
  "Current State": string
  "Deadline": string
  "Description": string
  "Estimate": string
  "Id": string
  "Iteration": string
  "Iteration End": string
  "Iteration Start": string
  "Labels": string
  "Owned By": string
  "Priority": string
  "Requested By": string
  "Title": string
  "Type": string
  "URL": string
}

const isCurrentState = (x: string): x is CurrentState => {
  return (currentStates as readonly string[]).indexOf(x) >= 0
}

const isTicketType = (x: string): x is TicketType => {
  return (ticketTypes as readonly string[]).indexOf(x) >= 0
}

const formatTicket = (ticket: CSVTicket): Ticket => {
  if (!isCurrentState(ticket["Current State"]) || !isTicketType(ticket["Type"])) throw new Error()

  return {
    acceptedAt: ticket["Accepted at"],
    comment: ticket["Comment"],
    createdAt: ticket["Created at"],
    currentState: ticket["Current State"],
    deadline: ticket["Deadline"],
    description: ticket["Description"],
    Estimate: parseInt(ticket["Estimate"], 10),
    id: parseInt(ticket["Id"], 10),
    iteration: parseInt(ticket["Iteration"], 10),
    IterationEnd: ticket["Iteration End"],
    iterationStart: ticket["Iteration Start"],
    labels: ticket["Labels"],
    ownedBy: ticket["Owned By"],
    priority: ticket["Priority"],
    requestedBy: ticket["Requested By"],
    title: ticket["Title"],
    type: ticket["Type"] as TicketType,
    url: ticket["URL"],
  }
}

export const tryImport = (tickets: any): Ticket[] => {
  const result = parse(tickets, {
    columns: true,
    skipEmptyLines: true,
  })
  return result.map((i: CSVTicket) => formatTicket(i))
}
