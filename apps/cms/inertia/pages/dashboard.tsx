export default function Dashboard(props) {
  console.log(props)
  return (
    <div>
      <h4 className="mb-2">Bonjour {props.user.fullName}</h4>
      Dashboard
    </div>
  )
}
