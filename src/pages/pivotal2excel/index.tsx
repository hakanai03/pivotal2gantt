import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {Gantt, Task, ViewMode} from "gantt-task-react"
import React, {useState} from "react"
import {tryImport} from "./importTickets"


type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void

const transformToTicketsPerWeek = (pivotalTickets: Ticket[], currentVelocity: number): Ticket[][] => {
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

export const Pivotal2Excel = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])

  const handleSelectFiles: OnSelectFiles = (e) => {
    if (!e.target.files) return
    const files: File[] = Array.from(e.target.files)
    readFile(files[0]).then(res => {
      const result = tryImport(res)
      setTickets(result)
    })
      .catch(err => console.error(err))
  }

  console.log(transformToTicketsPerWeek(tickets, 10))

  const tasks: Task[] = tickets.map(i => ({
    start: new Date(i.iterationStart),
    end: new Date(i.IterationEnd),
    name: i.title,
    id: `${i.id}`,
    type: "task",
    progress: 0,
  }))

  return (
    <>
      <UploadButton
        labelId="upload"
        onSelectFiles={handleSelectFiles}
        shape="round"
      >
        アップロード
      </UploadButton>
      {tasks.length > 1 && <Gantt
        tasks={tasks}
        viewMode={ViewMode.Week}
      />}
    </>
  )
}
