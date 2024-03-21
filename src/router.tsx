import { createBrowserRouter } from "react-router-dom"
import Contracts from "./pages/Contracts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Contracts />,
  },
  {
    path: "/contracts/:id",
    element: <div>Contract details</div>,
  }
])

export default router