import { createBrowserRouter } from "react-router-dom"
import Contracts from "./pages/Contracts"
import ContractDetailsView from "./pages/ContractDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Contracts />,
  },
  {
    path: "/contracts/:id",
    element: <ContractDetailsView />,
  }
])

export default router