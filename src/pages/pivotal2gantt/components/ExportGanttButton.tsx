import {Button} from "antd"
import {useContext} from "react"
import {stringify} from "csv-stringify/sync"
import dayjs from "dayjs"
import weekday from 'dayjs/plugin/weekday'
import downloadFile from "js-file-download"
import {Pivotal2GanttContext} from "@/pages/pivotal2gantt/Pivotal2GanttProvider"

dayjs.extend(weekday)

export const ExportGanttButton = () => {
  const {state} = useContext(Pivotal2GanttContext)
  const downloadCSV = () => {
    const data = state.tasks.map(i => ({
      ...i,
      start: dayjs(i.start).toISOString(),
      end: dayjs(i.end).toISOString(),
    }))
    const csv = stringify(data, {
      header: true,
    })
    downloadFile(csv, "見積もり.csv")
  }

  return <Button onClick={downloadCSV}>エクスポート</Button>
}
