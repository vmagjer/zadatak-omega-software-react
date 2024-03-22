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

  const handleDeleteContract = () => {
    throw new Error("Not implemented")
  }

  return (
    <Layout >
        <div className="header">
          <div className="container">
            <div className="left">
              <Breadcrumbs
                crumbs={[{ name: "Ugovori", path: "/" }, { name: id || "N/A" }]}
              />
            </div>
            <div className="right">
              <button
                className="button button-secondary"
                onClick={handleDeleteContract}
              >
                Izbriši ugovor
              </button>
              <button
                className="button button-primary"
                onClick={handleEditContract}
              >
                Uredi ugovor
              </button>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container master">
            <DetailsProperty label="Broj ugovora">
              {contract?.contractNumber || "N/A"}
            </DetailsProperty>
            <DetailsProperty label="Kupac">
              {contract?.customerName || "N/A"}
            </DetailsProperty>
            <DetailsProperty label="Datum akontacije">
              {contract?.advancePaymentDate.toLocaleDateString() || "N/A"}
            </DetailsProperty>
            <DetailsProperty label="Rok isporuke">
              {contract?.deliveryDate.toLocaleDateString() || "N/A"}
            </DetailsProperty>
            <DetailsProperty label="Status">
              <StatusTag value={statusMap[contract?.status || "KREIRANO"]}>
                {contract?.status.toLocaleLowerCase()}
              </StatusTag>
            </DetailsProperty>
            <DetailsProperty label="Artikli">
              <CMSTable headers={["Naziv artikla", "Dobavljac", "Status"]}>
                {articles.map((article) => (
                  <tr key={article.id}>
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
            </DetailsProperty>
          </div>
      </div>
    </Layout>
  )
}

export default ContractDetailsView
