import React, {useState} from "react"
import {Button, InputNumber, Select} from "antd"
import {Gantt, Task, ViewMode} from "gantt-task-react"
import dayjs, {Dayjs} from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import {stringify} from "csv-stringify/sync"
import downloadFile from "js-file-download"

import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {tryImport} from "./importTickets"
import {DatePicker} from "@/components/DatePicker"
import {makeGanttTasks} from "./algorithm"

dayjs.extend(weekday)

type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void

const firstDayOfWeek = dayjs().startOf("week").add(1, "day")

export const Pivotal2Gantt = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentVelocity, setCurrentVelocity] = useState<number>(10)
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5)
  const [startDay, setStartDay] = useState<Dayjs>(firstDayOfWeek)
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week)

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
    const data = tasks.map(i => ({
      ...i,
      start: dayjs(i.start).toISOString(),
      end: dayjs(i.end).toISOString(),
    }))
    console.log(data)
    const csv = stringify(data, {
      header: true,
    })
    downloadFile(csv, "見積もり.csv")
  }

  return (
    <div style={{margin: "1rem"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center"}}>
        <div style={{display: "flex", gap: "2rem"}}>
          <div>
            作業開始:
            <DatePicker
              defaultValue={startDay}
              onChange={(day) => day && setStartDay(day)}
              disabledDate={(day) => day.weekday() !== 1}
            />
          </div>

          <div>
            消費ポイント/週:
            <InputNumber<number>
              onChange={(value) => setCurrentVelocity(value)}
              min={1}
              max={1000}
              value={currentVelocity}
              style={{width: "4rem"}}
            />ポイント
          </div>

          <div>
            稼働日数/週:
            <InputNumber<number>
              onChange={(value) => setWorkDaysPerWeek(value)}
              min={1}
              max={7}
              style={{width: "4rem"}}
              value={workDaysPerWeek}
            />日
          </div>
        </div>
        <div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>表示単位</small>
            <Select defaultValue={viewMode} onChange={(value) => setViewMode(value)} style={{width: "6rem"}}>
              <Select.Option value={ViewMode.QuarterDay}>6時間</Select.Option>
              <Select.Option value={ViewMode.HalfDay}>12時間</Select.Option>
              <Select.Option value={ViewMode.Day}>日</Select.Option>
              <Select.Option value={ViewMode.Week}>週</Select.Option>
              <Select.Option value={ViewMode.Month}>月</Select.Option>
            </Select>
          </div>
        </div>
        <div style={{display: "inline-flex", gap: "1rem"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>Pivotal TrackerのCSV</small>
            <UploadButton labelId="upload" onSelectFiles={handleSelectFiles}>インポート</UploadButton>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>ガントチャートのCSV</small>
            <Button onClick={downloadCSV}>エクスポート</Button>
          </div>
        </div>

      </div>
      {tasks.length > 1 && <Gantt
        tasks={tasks}
        locale="ja"
        viewMode={viewMode}
      />}
    </div>
  )
}
