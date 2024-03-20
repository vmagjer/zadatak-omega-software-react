import delay from "../utils/delay"

type Status = "KREIRANO" | "NARUČENO" | "ISPORUČENO"

type APIArticle = {
  id: number
  naziv: string
  dobavljač: string
  status: Status
}

const mockArticles: Array<APIArticle> = [
  {
    id: 1,
    naziv: "Perilica posuđa ugradbena Electrolux EEA27200L",
    dobavljač: "Sancta Domenica",
    status: "KREIRANO",
  },
  {
    id: 2,
    naziv: "Napa ugradbena Gorenje TH60E3X",
    dobavljač: "Sancta Domenica",
    status: "NARUČENO",
  },
  {
    id: 3,
    naziv: "Ploča ugradbena kombinirana Gorenje GCE691BSC",
    dobavljač: "Bijela tehnika",
    status: "ISPORUČENO",
  },
]

type Article = {
  id: number
  name: string
  supplier: string
  status: Status
}

export const getArticles = async (
  contractNumber: string 
): Promise<Array<Article>> => {
  // TODO: Implement API call 
  await delay(1000)

  return mockArticles.map(transformArticle)
}

function transformArticle(article: APIArticle): Article {
  return {
    id: article.id,
    name: article.naziv,
    supplier: article.dobavljač,
    status: article.status,
  }
}
