import React, {useState} from "react"
import {Button, InputNumber} from "antd"
import {Gantt, Task, ViewMode} from "gantt-task-react"
import dayjs, {Dayjs} from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import {stringify} from "csv-stringify/lib/sync"

import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {tryImport} from "./importTickets"
import {DatePicker} from "@/components/DatePicker"
import {makeGanttTasks} from "./algorithm"

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
    currentVelocity: currentVelocity > 0 ? currentVelocity : 1,
    workDaysPerWeek: workDaysPerWeek > 0 ? workDaysPerWeek : 1,
    includeBugTicket: true,
  })

  const downloadCSV = () => {
    const csv = stringify(tasks, {header: true})
  }

  return (
    <div style={{margin: "1rem"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>
        <div>
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
        </div>
        <div>
          <UploadButton
            labelId="upload"
            onSelectFiles={handleSelectFiles}
          >
            PivotalTrackerのCSVをアップロード
          </UploadButton>
          <Button onClick={downloadCSV}>ガントチャートのCSV出力</Button>
        </div>

      </div>
      {tasks.length > 1 && <Gantt
        tasks={tasks}
        locale="ja"
        ganttHeight={800}
        viewMode={ViewMode.Week}
      />}
    </div>
  )
}
