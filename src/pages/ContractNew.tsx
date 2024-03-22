import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import DetailsProperty from "../components/DetailsProperty"
import { Contract, createContract } from "../api/contracts"
import Breadcrumbs from "../components/Breadcrumbs"
import { useState } from "react"

export default function ContractNew() {
  const [contract, setContract] = useState<Omit<Contract, 'id'|'status'|'actions'>>({
    contractNumber: "",
    customerName: "",
    advancePaymentDate: new Date(),
    deliveryDate: new Date(),
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setContract((prevContract) => ({
      ...prevContract,
      [name]: name.endsWith("Date") ? new Date(value) : value,
    }))
  }

  const navigate = useNavigate()

  async function handleAddContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Validate contract
    
    // TODO: Handle loading state
    try {
      await createContract(contract)
      navigate("/")
    } catch (error) {
      // TODO Handle error
      console.error(error)
    }
  }

  return (
    <Layout>
      <div className="header">
        <div className="container">
          <div className="left">
            <Breadcrumbs
              crumbs={[{ name: "Ugovori", path: "/" }, { name: "Novi ugovor" }]}
            />
          </div>
          <div className="right">
            <button
              type="submit"
              form="add-contract-form"
              className="button button-primary"
            >
              Spremi ugovor
            </button>
          </div>
        </div>
      </div>

      <div className="content" >
        <form id="add-contract-form" className="container master" onSubmit={handleAddContract}>
          <DetailsProperty label="Broj ugovora">
            <input
              type="text"
              name="contractNumber"
              onChange={handleInputChange}
            />
          </DetailsProperty>
          <DetailsProperty label="Kupac">
            <input
              type="text"
              name="customerName"
              onChange={handleInputChange}
            />
          </DetailsProperty>
          <DetailsProperty label="Datum akontacije">
            <input
              type="date"
              name="advancePaymentDate"
              onChange={handleInputChange}
            />
          </DetailsProperty>
          <DetailsProperty label="Rok isporuke">
            <input
              type="date"
              name="deliveryDate"
              onChange={handleInputChange}
            />
          </DetailsProperty>
        </form>
      </div>
    </Layout>
  )
}
