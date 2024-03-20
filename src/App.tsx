import { useEffect, useState } from "react"
import "./App.css"
import { Contract, ContractStatus, getContracts } from "./api/contracts"

const statusMap: Record<ContractStatus, string> = {
  KREIRANO: 'created',
  NARUČENO: 'ordered',
  ISPORUČENO: 'delivered',
}


function App() {
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
    const fetchData = async () => {
      const response = await getContracts({
        customerName: search,
        isActive: active,
      })
      setContracts(response)
    }
    fetchData()
  }, [search, active])

  return (
    <div className="App">
      <div className="container">
        <h1>Ugovori</h1>
        <div className="meta-interactives">
          <div>
            <input
              type="text"
              placeholder="Pretraži ugovore"
              onChange={handleSearch}
            />
            <label htmlFor="active">
              <input type="checkbox" checked={active} onChange={handleActive} />
              Prikazuj samo aktivne ugovore
            </label>
          </div>
          <button>Dodaj ugovor</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Broj ugovora</th>
                <th>Kupac</th>
                <th>Rok isporuke</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td>{contract.contractNumber}</td>
                  <td>{contract.customerName}</td>
                  <td>{contract.deliveryDate.toLocaleDateString()}</td>
                  <td>
                    <div className="status-tag" data-status={statusMap[contract.status]}>{contract.status.toLocaleLowerCase()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
