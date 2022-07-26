import {Checkbox} from "antd"
import {CheckboxChangeEvent} from "antd/lib/checkbox"
import {useContext} from "react"
import {Pivotal2GanttContext} from "../Pivotal2GanttProvider"

export const ShowTaskTicketCheckBox = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const setShowList = (e: CheckboxChangeEvent) => {
    setState({
      ...state,
      showList: e.target.checked,
    })
  }

  const setShowTask = (e: CheckboxChangeEvent) => {
    setState({
      ...state,
      showTask: e.target.checked,
    })
  }

  const setShowRelease = (e: CheckboxChangeEvent) => {
    setState({
      ...state,
      showRelease: e.target.checked,
    })
  }


  return (
    <div style={{display: "flex", height: "100%", alignItems: "center", userSelect: "none"}}>
      <Checkbox checked={state.showList} onChange={setShowList}>
        左リスト表示
      </Checkbox>
      <Checkbox checked={state.showTask} onChange={setShowTask}>
        作業項目
      </Checkbox>
      <Checkbox checked={state.showRelease} onChange={setShowRelease}>
        リリース
      </Checkbox>
    </div>
  )
}
