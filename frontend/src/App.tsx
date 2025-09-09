
import './App.css'
import Header from "./components/Header.tsx";
import AdvertSection from "./components/AdvertSection.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (
      <div className='min-h-screen'>
          <Header/>
          <AdvertSection/>
          <Footer/>
      </div>
  )
}

export default App
