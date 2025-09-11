import './App.css'
import Header from "./components/Header.tsx";
import AdvertisementSection from "./components/AdvertisementSection.tsx";
import Footer from "./components/Footer.tsx";

function App() {

    return (
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <div className='flex-grow'>
                <AdvertisementSection/>
            </div>
            <Footer/>
        </div>
    )
}

export default App
