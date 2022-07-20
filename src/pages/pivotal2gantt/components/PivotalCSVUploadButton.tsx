import {useContext} from "react"
import {parse} from "csv-parse/sync"
import {UploadButton} from "@/components/Upload"
import {readFile} from "@/utils/fileReader"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"
import {Ticket, TicketType, CurrentState, currentStates, ticketTypes} from "@/types/pivotal/Ticket"

type CSVTicket = {
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

const tryParseInt = (x: any) => {
  const result = parseInt(x, 10)
  if (isNaN(result)) return 0
  return result
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
    estimate: tryParseInt(ticket["Estimate"]),
    id: tryParseInt(ticket["Id"]),
    iteration: tryParseInt(ticket["Iteration"]),
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

export const PivotalCSVUploadButton = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files: File[] = Array.from(e.target.files)
    readFile(files[0])
      .then(res => {
        const result = tryImport(res)
        setState({
          ...state,
          tickets: result,
        })
      })
      .catch(err => console.error(err))
  }

  return <UploadButton labelId="upload" onSelectFiles={handleSelectFiles}>インポート</UploadButton>
}
