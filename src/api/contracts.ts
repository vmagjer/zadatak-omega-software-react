// import delay from "../utils/delay"

export type ContractStatus = "KREIRANO" | "NARUČENO" | "ISPORUČENO"

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

export type Contract = {
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

export const contractActivity: Record<ContractStatus, boolean> = {
  KREIRANO: true,
  NARUČENO: true,
  ISPORUČENO: false,
}

export const getContracts = async (filters: {
  customerName: string
  isActive?: boolean
}): Promise<Array<Contract>> => {
  // TODO: Implement API call
  // await delay(1000)

  // TODO: Implement server-side filtering, sorting, and pagination
  return mockContracts.map(transformContract).filter((contract) => {
    if (
      filters.customerName &&
      !contract.customerName
        .toLocaleLowerCase()
        .includes(filters.customerName.toLocaleLowerCase())
    ) {
      return false
    }
    if (filters.isActive && isActive(contract.status) !== filters.isActive) {
      return false
    }
    return true
  })
}

export async function getContract(id: number): Promise<Contract> {
  // TODO: Implement API call
  // await delay(1000)

  const contract = mockContracts.find((contract) => contract.id === id)
  if (!contract) {
    throw new Error("Contract not found")
  }

  return transformContract(contract)
}

export async function updateContract(
  contract: Partial<Contract>
): Promise<void> {
  // TODO: Implement API call
  // await delay(1000)

  const index = mockContracts.findIndex((c) => c.id === contract.id)
  if (index === -1) {
    throw new Error("Contract not found")
  }

  mockContracts[index] = {
    ...mockContracts[index],
    ...contract,
  }
}

export async function createContract(
  contract: Omit<Contract, "id" | "status" | 'actions'>
): Promise<void> {
  // TODO: Implement API call
  // await delay(1000)

  const id = mockContracts.length + 1
  console.log(contract);
  console.log(contract.advancePaymentDate.getFullYear() );
  

  const advancePaymentDate = `${contract.advancePaymentDate.getFullYear()}-${contract.advancePaymentDate.getMonth()}-${contract.advancePaymentDate.getDate()}`
  const deliveryDate = `${contract.deliveryDate.getFullYear()}-${contract.deliveryDate.getMonth()}-${contract.deliveryDate.getDate()}`
  mockContracts.push({
    id,
    kupac: contract.customerName,
    broj_ugovora: contract.contractNumber,
    datum_akontacije: advancePaymentDate,
    rok_isporuke: deliveryDate,
    status: "KREIRANO",
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

export const availableStatuses: Record<
  ContractStatus,
  Array<ContractStatus>
> = {
  KREIRANO: ["KREIRANO", "NARUČENO"],
  NARUČENO: ["NARUČENO", "ISPORUČENO"],
  ISPORUČENO: ["ISPORUČENO"],
}
