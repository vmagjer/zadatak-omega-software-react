import "./CMSTable.css"

// type RowEntry = {
//   id: number
//   [key: string]: any
// }

export default function CMSTable({
  headers,
//   data,
    children,
}: {
  headers: string[]
//   data: RowEntry[]
    children: React.ReactNode
}) {
  return (
    <table className="cms-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {data.map((row) => (
          <tr key={row.id}>
            {Object.keys(row)
              //   .filter((x) => x === "id")
              .map((key) => (
                <td key={`${row.id}-${key}`}>{row[key]}</td>
              ))}
          </tr>
        ))} */}
        {children}
      </tbody>
    </table>
  )
}
