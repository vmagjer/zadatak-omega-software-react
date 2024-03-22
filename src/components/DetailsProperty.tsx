import './DetailsProperty.css'

const DetailsProperty = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="property">
    <div className="label">{label}</div>
    <div className="value">{children}</div>
  </div>
)

export default DetailsProperty
