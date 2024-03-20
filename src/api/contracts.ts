import delay from "../utils/delay"

type ContractStatus = "KREIRANO" | "NARUČENO" | "ISPORUČENO"

type APIContract = {
  id: number
  kupac: string
  broj_ugovora: string
  datum_akontacije: string
  rok_isporuke: string
  status: ContractStatus
}

const mockContracts: Array<APIContract> = [
  {
    id: 1,
    kupac: "Petra Kranjčar",
    broj_ugovora: "1/2024",
    datum_akontacije: "2024-01-04",
    rok_isporuke: "2024-04-20",
    status: "KREIRANO",
  },
  {
    id: 2,
    kupac: "Franko Kasun",
    broj_ugovora: "2/2024",
    datum_akontacije: "2024-03-01",
    rok_isporuke: "2024-05-01",
    status: "ISPORUČENO",
  },
  {
    id: 3,
    kupac: "Stjepan Babić",
    broj_ugovora: "3/2024",
    datum_akontacije: "2024-03-03",
    rok_isporuke: "2024-04-15",
    status: "NARUČENO",
  },
  {
    id: 4,
    kupac: "Tia Janković",
    broj_ugovora: "4/2024",
    datum_akontacije: "2024-03-14",
    rok_isporuke: "2024-08-13",
    status: "KREIRANO",
  },
]

type Contract = {
  id: number
  customerName: string
  contractNumber: string
  advancePaymentDate: Date
  deliveryDate: Date
  status: ContractStatus
  actions: Record<string, Action>
}

type Action = {
  url: string
}

function isActive(status: ContractStatus): boolean {
  return contractActivity[status]
}

const contractActivity: Record<ContractStatus, boolean> = {
  KREIRANO: true,
  NARUČENO: true,
  ISPORUČENO: false,
}

export const getContracts = async (filters: {
  customerName: string
  isActive?: boolean
}): Promise<Array<Contract>> => {
  // TODO: Implement API call
  await delay(1000)

  // TODO: Implement server-side filtering, sorting, and pagination
  return mockContracts.map(transformContract).filter((contract) => {
    if (
      filters.customerName &&
      !contract.customerName.includes(filters.customerName)
    ) {
      return false
    }
    if (
      filters.isActive !== undefined &&
      isActive(contract.status) !== filters.isActive
    ) {
      return false
    }
    return true
  })
}

function transformContract(contract: APIContract): Contract {
  const result: Contract = {
    id: contract.id,
    customerName: contract.kupac,
    contractNumber: contract.broj_ugovora,
    advancePaymentDate: new Date(contract.datum_akontacije),
    deliveryDate: new Date(contract.rok_isporuke),
    status: contract.status,
    actions: {},
  }

  // TODO: Actions should be given by the server
  availableStatuses[contract.status].forEach((status) => {
    result.actions[`changeStatusTo${status}`] = {
      url: `/contracts/${contract.id}/status/${status}`,
    }
  })

  if (isActive(contract.status)) {
    result.actions["changeDeliveryDate"] = {
      url: `/contracts/${contract.id}/delivery-date`,
    }
  }

  return result
}

const availableStatuses: Record<ContractStatus, Array<ContractStatus>> = {
  KREIRANO: ["NARUČENO"],
  NARUČENO: ["ISPORUČENO"],
  ISPORUČENO: [],
}