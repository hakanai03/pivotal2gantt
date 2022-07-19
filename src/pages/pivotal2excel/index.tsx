import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {Gantt, Task, ViewMode} from "gantt-task-react"
import React, {useState} from "react"
import {tryImport} from "./importTickets"
import {Dayjs} from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import 'antd/es/date-picker/style/index'


type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

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
      <DatePicker
        onChange={(date) => {console.log(date)}}
        showToday
      />
      {tasks.length > 1 && <Gantt
        tasks={tasks}
        viewMode={ViewMode.Week}
      />}
    </>
  )
}
