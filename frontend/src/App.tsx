
import './App.css'
import Header from "./components/Header.tsx";
import AdvertisementCard, {AdvertisementCardProps} from "./components/AdvertisementCard.tsx";

function App() {

    const sampleAdvertisements: AdvertisementCardProps[] = [
        {
            companyTitle: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            address: "Hlavná ulica 123",
            city: "Bratislava",
            country: "Slovensko",
            advertisementText: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
        },
        {
            companyTitle: "Zelená záhrada",
            ico: "87654321",
            address: "Kvetná 45",
            city: "Košice",
            country: "Slovensko",
            advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
        },
        {
            companyTitle: "Zelená záhrada",
            ico: "87654321",
            address: "Kvetná 45",
            city: "Košice",
            country: "Slovensko",
            advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
        },
        {
            companyTitle: "Zelená záhrada",
            ico: "87654321",
            address: "Kvetná 45",
            city: "Košice",
            country: "Slovensko",
            advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
        },
        {
            companyTitle: "Zelená záhrada",
            ico: "87654321",
            address: "Kvetná 45",
            city: "Košice",
            country: "Slovensko",
            advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
        },
    ];

    const handleEdit = () => {
        console.log("editing")
    };

    const handleRemove = () => {
        console.log("removing")
    };

  return (
      <div className='min-h-screen'>
          <Header/>
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                  Obchodné inzeráty
              </h1>
              <p className="text-muted-foreground">
                  Prehľad všetkých aktívnych inzerátov
              </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {sampleAdvertisements.map((ad, index) => (
                  <AdvertisementCard
                      key={index}
                      advertisement={ad}
                      onEdit={() => handleEdit}
                      onRemove={() => handleRemove}
                  />
              ))}
          </div>
      </div>
  )
}

export default App
