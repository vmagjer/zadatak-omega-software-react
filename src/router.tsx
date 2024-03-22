import { createBrowserRouter } from "react-router-dom"
import Contracts from "./pages/Contracts"
import ContractDetailsView from "./pages/ContractDetails"
import ContractEdit from "./pages/ContractEdit"
import ContractNew from "./pages/ContractNew"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Contracts />,
  },
  {
    path: "/contracts/new",
    element: <ContractNew />,
  },
  {
    path: "/contracts/:id",
    element: <ContractDetailsView />,
  },
  {
    path: "/contracts/:id/edit",
    element: <ContractEdit />,
  },
])

export default router