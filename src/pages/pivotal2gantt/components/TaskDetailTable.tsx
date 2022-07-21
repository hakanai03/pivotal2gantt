import {Ticket} from "@/types/pivotal/Ticket"
import {Table} from "antd"
import {ColumnsType, ColumnType} from "antd/lib/table"
import {useContext} from "react"
import {Pivotal2GanttContext} from "../Pivotal2GanttProvider"

export const TaskDetailTable = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)

  const columns: ColumnsType<Ticket> = state.tickets.length > 0 ? Object.keys(state.tickets[0]).map(key => ({key, title: key, dataIndex: key})) : []

  return (
    <Table<Ticket>
      dataSource={state.tickets}
      columns={columns}
      pagination={{pageSize: 200}}
    />
  )
}
