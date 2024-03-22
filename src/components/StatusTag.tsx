import "./StatusTag.css"

export type Status = "created" | "ordered" | "delivered"

export default function StatusTag({
  value,
  children,
}: {
  value: Status
  children: React.ReactNode
}) {
  return (
    <span className={`status-tag status-tag-${value.toLowerCase()}`}>
      {children}
    </span>
  )
}
