# Zadatak – React developer
Zadatak je kreirati aplikaciju za prikaz i uređivanje kupoprodajnih ugovora i povezanih artikala, koristeći React. 
Prije rješavanja zadatka javite na mail procjenu koliko vremena trebate za rješavanje zadatka, i do kada ćete ga završiti. S TODO komentarima označite sve što mislite da je potrebno napraviti kako bi aplikacija bila spremna za produkciju, a ne stignete to implementirati.

## Opis funkcinalnosti
Aplikacija treba dohvatiti kupoprodajne ugovore s API-ja. Primjer kupoprodajnih ugovora nalazi se u Prilogu 1. 
Dobivene ugovore potrebno je prikazati na početnoj stranici, tako da se za svaki kupoprodajni ugovor ispisuje ime kupca, broj ugovora, rok isporuke u formatu ispravnom za hrvatski jezik i status ugovora. Status ugovora je potrebno dodatno označiti bojom i to po ovim pravilima: Ako je status „KREIRAN“ označava se zelenom bojom, ako je status „NARUČENO“ označava se žutom bojom, a ako je status „ISPORUČENO“ označava se sivom bojom.
Potrebno je omogućiti filtriranje ugovora koji se prikazuju prema nazivu kupca, i prema aktivnosti. Aktivni ugovori su oni koji su u statusu „KREIRANO“ ili „NARUČENO“, neaktivni ugovori su oni koji su u statusu „ISPORUČENO“.
Potrebno je omogućiti kreiranje novog kupoprodajnog ugovora (svi podaci su obavezni). Novom kupoprodajnom ugovoru se automatski dodjeljuje status „KREIRANO“.
Potrebno je omogućiti promjenu roka isporuke i statusa za postojeće kupoprodajne ugovore. Rok isporuke je moguće mijenjati samo aktivnom kupoprodajnom ugovoru. Status „KREIRANO“ može prijeći samo u status „NARUČENO“, a status „NARUČENO“ može prijeći samo u status „ISPORUČENO“.
Klikom na kupoprodajni ugovor potrebno je otvoriti stranicu na kojoj se prikazuju detalji kupoprodajnog ugovora. Na vrhu stranice prikazuju se informacije o kupoprodajnom ugovoru: kupac, broj ugovora, datum akontacije, rok isporuke i status. Ispod informacija o kupoprodajnom ugovoru prikazuju se artikli.  
Aplilkacija treba dohvatiti artikle kupoprodajnog ugovora s APIja. Primjer odgovora za kupoprodajni ugovor s brojem „1/2024“ nalazi se u Prilogu 2.
Za svaki artikl potrebno je prikazati naziv artikla, dobavljača i status. Za prikaz statusa artikala vrijede ista pravila kao i za prikaz statusa kupoprodajnog ugovora.


### Prilog 1. Kupoprodajni ugovori
[
    {
        id: 1,
        kupac: "Petra Kranjčar",
        broj_ugovora: "1/2024",
        datum_akontacije: "2024-01-04",
        rok_isporuke: "2024-04-20"
        status: "KREIRANO"
    },
    {
        id: 2,
        kupac: "Franko Kasun",
        broj_ugovora: "2/2024",
        datum_akontacije: "2024-03-01",
        rok_isporuke: "2024-05-01"
        status: "ISPORUČENO"
    },
    {
        id: 3,
        kupac: "Stjepan Babić",
        broj_ugovora: "3/2024",
        datum_akontacije: "2024-03-03",
        rok_isporuke: "2024-04-15"
        status: "NARUČENO"
    },
    {
        id: 4,
        kupac: "Tia Janković",
        broj_ugovora: "4/2024",
        datum_akontacije: "2024-03-14",
        rok_isporuke: "2024-08-13"
        status: "KREIRANO"
    }
]


### Prilog 2. Artikli
[
    {
        id: 1
        naziv: "Perilica posuđa ugradbena Electrolux EEA27200L",
        dobavljač: "Sancta Domenica",
        status: "KREIRANO"
    },
    {
        id: 2
        naziv: "Napa ugradbena Gorenje TH60E3X",
        dobavljač: "Sancta Domenica",
        status: "NARUČENO"
    },
    {
        id: 3
        naziv: "Ploča ugradbena kombinirana Gorenje GCE691BSC",
        dobavljač: "Bijela tehnika",
        status: "ISPORUČEO"
    }
]
