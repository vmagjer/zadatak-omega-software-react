import { useEffect, useState } from "react"
import "./ContractDetails.css"
import { ContractStatus } from "../api/contracts"
import { Article, getArticles } from "../api/articles"
import { useParams } from "react-router-dom"
import DetailsProperty from "../components/DetailsProperty"
import CMSTable from "../components/CMSTable"
import StatusTag, { Status } from "../components/StatusTag"
import Layout from "../components/Layout"

const statusMap: Record<ContractStatus, Status> = {
  KREIRANO: "created",
  NARUČENO: "ordered",
  ISPORUČENO: "delivered",
}

function ContractDetailsView() {
  const [articles, setArticles] = useState<Article[]>([])

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) return
    // TODO: implement debouncing and loading state, probably using a reducer
    const fetchData = async () => {
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
            <div className="breadcrumbs">
              <a href="/">Ugovori</a>
              <span> / </span>
              <span> {id} </span>
            </div>
          </div>

          <button className="button button-primary" onClick={handleEditContract}>
            Uredi ugovor
          </button>
        </div>

        <div className="content">
          <div className=" section master">
            <DetailsProperty label="Broj ugovora" value="123456" />
            <DetailsProperty label="Kupac" value="Kupac d.o.o." />
            <DetailsProperty label="Datum akontacije" value="01.01.2021" />
            <DetailsProperty label="Rok isporuke" value="01.01.2022" />
            <DetailsProperty label="Status" value="KREIRANO" />
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
