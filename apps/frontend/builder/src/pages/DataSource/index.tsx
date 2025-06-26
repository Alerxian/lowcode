import '@glideapps/glide-data-grid/dist/index.css'

import { DataEditor, GridCell, GridCellKind, GridColumn } from '@glideapps/glide-data-grid'
import { Database } from 'lucide-react'
import { useState } from 'react'

import { ColumnAdder } from './ColumnAdder'
type ColumnType = Array<GridColumn & { kind: GridCellKind; width: number }>

const DataSource = () => {
  const Columns: ColumnType = [
    {
      title: 'Name',
      id: 'name',
      width: 200,
      hasMenu: true,
      kind: GridCellKind.Text,
    },
    {
      title: 'Age',
      id: 'age',
      width: 200,
      hasMenu: true,
      kind: GridCellKind.Number,
    },
    {
      title: 'Gender',
      id: 'gender',
      width: 200,
      hasMenu: true,
      kind: GridCellKind.Text,
    },
  ]
  const [columns, setColumns] = useState(Columns)
  const [rows, setRows] = useState(() => {
    return Array.from({ length: 100000 }, (_, i) => {
      return ['name' + i, Math.round(Math.random() * 1000), 'Male']
    })
  })

  const handleAdd = (data: { name: string; type: string }) => {
    const newColumns: ColumnType = [
      ...columns,
      {
        id: `${data.type}-${data.name}`,
        title: data.name,
        width: 100,
        hasMenu: true,
        kind: data.type as GridCellKind,
      },
    ]
    // 为每一行添加新列的默认值
    const newRecords = [...rows]
    rows.forEach(row => {
      row.push('')
    })
    console.log(newColumns, newRecords)
    /**
     * 更新行列
     */
    setColumns(newColumns)
    setRows(newRecords)
  }

  return (
    <div className="w-full flex flex-col flex-1 h-[calc(100vh-64px)]">
      <div className="w-full pl-6 h-[64px] flex-shrink-0 bg-zinc-100 flex items-center border-b">
        <Database size={24} />
        <div className="text-lg font-bold ml-2">Data Source</div>
      </div>

      <DataEditor
        // className="flex-1"
        width="100%"
        rowMarkers="both"
        columns={columns}
        rows={rows.length}
        getCellContent={cell => {
          const [col, row] = cell
          return {
            kind: columns[col].kind,
            data: rows[row][col],
            displayData: String(rows[row][col]),
            allowOverlay: true,
          } as GridCell
        }}
        trailingRowOptions={{
          sticky: true,
          tint: true,
          hint: '点击添加新行',
        }}
        theme={{
          bgIconHeader: '#7D5DFF',
          accentColor: '#7D5DFF',
          accentLight: '#7D5DFF20',
          fgIconHeader: '#FFFFFF',
        }}
        onRowAppended={() => {
          setRows(prevRows => [...prevRows, ['', '', '', '', '']])
        }}
        onCellEdited={([col, row], newValue) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const record: any[] = rows[row]
          if (newValue.kind === GridCellKind.Text || newValue.kind === GridCellKind.Number) {
            record[col] = newValue.data || ''
          } else {
            record[col] = newValue.data || ''
          }

          setRows(rows)
        }}
        onColumnMoved={(from, to) => {
          const newCols = [...columns]
          const [moved] = newCols.splice(from, 1)
          newCols.splice(to, 0, moved)
          setColumns(newCols)
        }}
        onColumnResize={(_, newSize, colIndex) => {
          const newCols = [...columns]
          newCols[colIndex].width = newSize
          setColumns(newCols)
        }}
        rightElement={<ColumnAdder onAdd={handleAdd} />}
      />
      <div id="portal"></div>
    </div>
  )
}

export default DataSource
