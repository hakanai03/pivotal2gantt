import {GanttChart} from "@/pages/pivotal2gantt/components/GanttChart"
import {CurrentVelocityInput} from "./components/CurrentVelocityInput"
import {StartDayDatePicker} from "./components/StartDayDatePicker"
import {WorkDaysPerWeekInput} from "./components/WorkDaysPerWeekInput"
import {GanttViewModeSegmented} from "./components/GanttViewModeSegmented"
import {ExportGanttButton} from "./components/ExportGanttButton"
import {PivotalCSVUploadButton} from "./components/PivotalCSVUploadButton"
import {ShowTaskTicketCheckBox} from "./components/ShowTaskTicketCheckBox"


export const Pivotal2Gantt = () => {
  return (
    <div style={{margin: "1rem"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center"}}>
        <div style={{display: "flex", gap: "1rem"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>作業開始</small>
            <StartDayDatePicker />
          </div>

          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>消費ポイント/週</small>
            <div><CurrentVelocityInput style={{width: "4rem"}} />ポイント</div>
          </div>

          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>稼働日数/週</small>
            <div><WorkDaysPerWeekInput style={{width: "4rem"}} />日</div>
          </div>
        </div>
        <div style={{display: "flex", gap: "1rem"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>表示単位</small>
            <GanttViewModeSegmented style={{width: "6rem"}} />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>表示内容</small>
            <ShowTaskTicketCheckBox />
          </div>
        </div>
        <div style={{display: "inline-flex", gap: "1rem"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>Pivotal TrackerのCSV</small>
            <PivotalCSVUploadButton />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <small>ガントチャートのCSV</small>
            <ExportGanttButton />
          </div>
        </div>
      </div>
      <GanttChart />
    </div>
  )
}
