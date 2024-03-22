import { NavLink } from "react-router-dom"
import "./Breadcrumbs.css"

export default function Breadcrumbs({
  crumbs,
}: {
  crumbs: { name: string; path?: string }[]
}) {
  return (
    <nav className="breadcrumbs">
      <ol className="breadcrumb">
        {crumbs.map(({ name, path }, key) => (
          <li key={key} className="breadcrumb-item">
            {path ? <NavLink to={path}>{name}</NavLink> : name}
          </li>
        ))}
      </ol>
    </nav>
  )
}
