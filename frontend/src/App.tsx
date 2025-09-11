
import './App.css'
import Header from "./components/Header.tsx";
import AdvertisementSection from "./components/AdvertisementSection.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (
      <div className='min-h-screen'>
          <Header/>
          <AdvertisementSection/>
          <Footer/>
      </div>
  )
}

export default App
