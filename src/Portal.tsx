import { ReactNode } from "react"
import ReactDOM from "react-dom"

interface Props {
  children: ReactNode
}
export default function Portal({children}: Props) {
  const el = document.getElementById('modal')
  return ReactDOM.createPortal(children, el!)
}