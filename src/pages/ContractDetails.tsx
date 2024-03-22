import { useEffect, useState } from "react"
import "./ContractDetails.css"
import { Contract, ContractStatus, getContract } from "../api/contracts"
import { Article, getArticles } from "../api/articles"
import { useParams } from "react-router-dom"
import DetailsProperty from "../components/DetailsProperty"
import CMSTable from "../components/CMSTable"
import StatusTag, { Status } from "../components/StatusTag"
import Layout from "../components/Layout"
import Breadcrumbs from "../components/Breadcrumbs"

const statusMap: Record<ContractStatus, Status> = {
  KREIRANO: "created",
  NARUČENO: "ordered",
  ISPORUČENO: "delivered",
}

function ContractDetailsView() {
  const [articles, setArticles] = useState<Article[]>([])
  const [contract, setContract] = useState<Contract | null>(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) return
    
    // TODO: implement loading state, probably using a reducer
    const fetchData = async () => {
      const details = await getContract(parseInt(id))
      setContract(details)
      const response = await getArticles(id)
      setArticles(response)
    }
    fetchData()
  }, [id])

  const handleEditContract = () => {
    throw new Error("Not implemented")
  }

  return (
    <Layout>
      <div className="contract-details">
        <div className="header">
          <div className="left">
            <Breadcrumbs
              crumbs={[
                { name: "Ugovori", path: "/" },
                { name: id || "N/A"},
              ]}
            />
          </div>

          <button className="button button-primary" onClick={handleEditContract}>
            Uredi ugovor
          </button>
        </div>

        <div className="content">
          <div className="section master">
            <DetailsProperty label="Broj ugovora" value={contract?.contractNumber || "N/A"} />
            <DetailsProperty label="Kupac" value={contract?.customerName || "N/A"} />
            <DetailsProperty label="Datum akontacije" value={contract?.advancePaymentDate.toLocaleDateString() || "N/A"} />
            <DetailsProperty label="Rok isporuke" value={contract?.deliveryDate.toLocaleDateString() || "N/A"} />
            <DetailsProperty label="Status" value={contract?.status.toLocaleLowerCase() || "N/A"} />
          </div>

          <div className="section table-container">
            <h2 className="text-large">Artikli</h2>
            <CMSTable headers={["ID", "Naziv artikla", "Dobavljac", "Status"]}>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.name}</td>
                  <td>{article.supplier}</td>
                  <td>
                    <StatusTag value={statusMap[article.status]}>
                      {article.status.toLocaleLowerCase()}
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

export default ContractDetailsView
