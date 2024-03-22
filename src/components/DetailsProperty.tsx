import './DetailsProperty.css'

const DetailsProperty = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <div className="property">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </div>
)

export default DetailsProperty
