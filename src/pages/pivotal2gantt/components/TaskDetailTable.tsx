import {Ticket} from "@/types/pivotal/Ticket"
import {Divider, Table, Typography} from "antd"
import {ColumnsType, ColumnType} from "antd/lib/table"
import {useContext} from "react"
import {Pivotal2GanttContext} from "../Pivotal2GanttProvider"

const columns: ColumnsType<Ticket> = [
  {
    title: "プロジェクト大項目",
    dataIndex: "labels",
    key: "labels",
  },
  {
    title: "概要",
    dataIndex: "description",
    key: "description",
    render: (value: string) => <div style={{whiteSpace: "pre-wrap"}}>{value.replace(/\t/g,"")}</div>,
  },
]

export const TaskDetailTable = () => {
  const {state, setState} = useContext(Pivotal2GanttContext)
  const data = state.tickets.filter(ticket => ticket.type === "release").filter(ticket => ticket.labels !== "")
  console.log(data)

  return (
    <div>
      <Typography.Title level={3}>Releases</Typography.Title>
      <Table<Ticket>
        dataSource={data}
        columns={columns}
        pagination={{pageSize: 200}}
      />
    </div>
  )
}
