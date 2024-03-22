import { useNavigate, useParams } from "react-router-dom"
import Layout from "../components/Layout"
import DetailsProperty from "../components/DetailsProperty"
import CMSTable from "../components/CMSTable"
import StatusTag from "../components/StatusTag"
import { statusMap } from "./ContractDetails"
import { useEffect, useMemo, useState } from "react"
import {
  Contract,
  availableStatuses,
  getContract,
  updateContract,
} from "../api/contracts"
import { Article, getArticles } from "../api/articles"
import Breadcrumbs from "../components/Breadcrumbs"

export default function ContractEdit() {
  const { id } = useParams()
  const [articles, setArticles] = useState<Article[]>([])
  const [contract, setContract] = useState<Contract | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      const [contract, articles] = await Promise.all([
        getContract(parseInt(id)),
        getArticles(id),
      ])

      setContract(contract)
      setArticles(articles)
    }
    // TODO: Implement loading state
    // TODO: Handle error
    fetchData()
  }, [id])

  const navigate = useNavigate()

  const [changes, setChanges] = useState<Partial<Contract>>({})
  const handleEditContract = async () => {
    if (!contract) return
    // TODO: Decide how to handle no changes
    try {
      // TODO: Handle loading state
      await updateContract({ ...changes, id: contract.id })
      navigate(`/contracts/${id}`)
      // TODO: Show success message
    } catch (error) {
      // TODO: Handle error
      console.error(error)
    }
  }

  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Validate date
    const newDate = new Date(e.target.value)
    if (newDate.toDateString() === contract?.deliveryDate.toDateString()) {
      setChanges((prev) => {
        const { deliveryDate, ...rest } = prev
        return rest
      })
      return
    }
    setChanges((prev) => ({ ...prev, deliveryDate: newDate }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Contract["status"]
    if (newStatus === contract?.status) {
      setChanges((prev) => {
        const { status, ...rest } = prev
        return rest
      })
      return
    }
    setChanges((prev) => ({ ...prev, status: newStatus }))
  }

  return (
    <Layout>
      <div className="header">
        <div className="container">
          <div className="left">
            <Breadcrumbs
              crumbs={[{ name: "Ugovori", path: "/" }, { name: id || "N/A" }]}
            />
          </div>
          <div className="right">
            <button
              className="button button-primary"
              onClick={handleEditContract}
            >
              Spremi promjene
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
            {/* TODO: date input component */}
            <input
              type="date"
              value={
                changes.deliveryDate?.toDateString() ||
                contract?.deliveryDate.toDateString() ||
                ""
              }
              onChange={handleDeliveryDateChange}
            />
          </DetailsProperty>
          <DetailsProperty label="Status">
            {/* TODO: select / radio button / chips component */}
            {availableStatuses[
              changes.status || contract?.status || "ISPORUČENO"
            ].length <= 1 ? (
              <StatusTag
                value={
                  statusMap[changes.status || contract?.status || "ISPORUČENO"]
                }
              >
                {(
                  changes.status ||
                  contract?.status ||
                  "ISPORUČENO"
                ).toLocaleLowerCase()}
              </StatusTag>
            ) : (
              <select
                value={changes.status || contract?.status}
                onChange={handleStatusChange}
              >
                {availableStatuses[
                  changes.status || contract?.status || "ISPORUČENO"
                ].map((status) => (
                  <option key={status} value={status}>
                    {status.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
            )}
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
