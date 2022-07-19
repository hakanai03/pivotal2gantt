import {UploadButton} from "@/components/Upload"
import {Ticket} from "@/types/pivotal/Ticket"
import {readFile} from "@/utils/fileReader"
import {Table} from "antd"
import {ColumnType} from "antd/lib/table"
import React, {useState} from "react"
import {tryImport} from "./importTickets"

type OnSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => void


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

  const columns: ColumnType<Ticket>[] = (tickets.length > 0 ? Object.keys(tickets[0]) : []).map((column) => ({
    title: column,
    dataIndex: column,
    key: column,
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
      <Table<Ticket>
        columns={columns}
        dataSource={tickets}
      />
    </>
  )
}
