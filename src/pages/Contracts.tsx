import { useEffect, useState } from "react"
import "./Contracts.css"
import {
  Contract,
  ContractStatus,
  contractActivity,
  getContracts,
} from "../api/contracts"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import CMSTable from "../components/CMSTable"
import StatusTag, { Status } from "../components/StatusTag"
import Breadcrumbs from "../components/Breadcrumbs"

const statusMap: Record<ContractStatus, Status> = {
  KREIRANO: "created",
  NARUČENO: "ordered",
  ISPORUČENO: "delivered",
}

function ContractsView() {
  const [contracts, setContracts] = useState<Array<Contract>>([])

  const [search, setSearch] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked)
  }

  useEffect(() => {
    // TODO: implement debouncing and loading state, probably using a reducer
    const fetchData = async () => {
      const response = await getContracts({
        customerName: search,
        isActive: active,
      })
      setContracts(response)
    }
    fetchData()
  }, [search, active])

  const navigate = useNavigate()
  const handleAddContract = () => {
    navigate("/contracts/new")
  }
  const handleContractDetails = (id: number) => {
    navigate(`/contracts/${id}`)
  }

  return (
    <Layout>
      <div className="App">
        <div className="header">
          <div className="container">
            <Breadcrumbs crumbs={[{ name: "Ugovori" }]} />

            <button
              className="button button-primary"
              onClick={handleAddContract}
            >
              Dodaj ugovor
            </button>
          </div>
        </div>

        <div className="content">
          <div className="container meta-interactives">
            {/* when implementing additional filters, i recommend hiding them in a 'Filters' menu, 
            BUT consider common use cases before requiring more clicks from the user */}
            <div className="left">
              <input
                className="search-input"
                type="text"
                placeholder="Pretraži po kupcu"
                onChange={handleSearch}
              />
              <label htmlFor="active" className="checkbox-input">
                {/* TODO: be transparent about what are 'active' contracts  */}
                <input
                  type="checkbox"
                  id="active"
                  checked={active}
                  onChange={handleActive}
                />
                {`Prikazuj samo aktivne ugovore (${
                  contracts.filter(
                    (contract) => contractActivity[contract.status]
                  ).length
                })`}
              </label>
            </div>
          </div>

          <div className="container table-container">
            <CMSTable
              headers={["Broj ugovora", "Kupac", "Rok isporuke", "Status"]}
            >
              {contracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="clickable-row"
                  onClick={() => handleContractDetails(contract.id)}
                >
                  <td>{contract.contractNumber}</td>
                  {/* TODO: Highlight search strings */}
                  <td>{contract.customerName}</td>
                  {/* TODO: explore UX of date-derived values like days until date x */}
                  <td>{contract.deliveryDate.toLocaleDateString()}</td>
                  <td>
                    <StatusTag value={statusMap[contract.status]}>
                      {contract.status.toLocaleLowerCase()}
                    </StatusTag>
                  </td>
                </tr>
              ))}
            </CMSTable>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContractsView
