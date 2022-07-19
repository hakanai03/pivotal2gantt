import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {Gantt, Task, ViewMode} from "gantt-task-react"
import React, {useState} from "react"
import {tryImport} from "./importTickets"
import dayjs, {Dayjs} from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import {DatePicker} from "@/components/DatePicker"
import {makeGanttTasks} from "./algorithms"
import {InputNumber} from "antd"

dayjs.extend(weekday)

type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void

const firstDayOfWeek = dayjs().startOf("week").add(1, "day")

export const Pivotal2Excel = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentVelocity, setCurrentVelocity] = useState<number>(10)
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5)
  const [startDay, setStartDay] = useState<Dayjs>(firstDayOfWeek)

  const handleSelectFiles: OnSelectFiles = (e) => {
    if (!e.target.files) return
    const files: File[] = Array.from(e.target.files)
    readFile(files[0]).then(res => {
      const result = tryImport(res)
      setTickets(result)
    })
      .catch(err => console.error(err))
  }

  const tasks = makeGanttTasks(tickets, {
    startDay,
    currentVelocity,
    workDaysPerWeek,
    includeBugTicket: true,
  })

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
        defaultValue={startDay}
        onChange={(day) => day && setStartDay(day)}
        disabledDate={(day) => day.weekday() !== 1}
      />
      の週からプロジェクトを開始し、週あたり

      <InputNumber<number>
        onChange={(value) => setCurrentVelocity(value)}
        min={1}
        max={1000}
        value={currentVelocity}
      />
      ポイントを消化する。稼働日は週
      <InputNumber<number>
        onChange={(value) => setWorkDaysPerWeek(value)}
        min={1}
        max={7}
        value={workDaysPerWeek}
      />
      日とする。
      {tasks.length > 1 && <Gantt
        tasks={tasks}
        locale="ja"
      />}
    </>
  )
}
