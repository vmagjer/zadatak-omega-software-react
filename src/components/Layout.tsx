import "./Layout.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
