import {useEffect, useState} from "react";


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        //${ isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm border-border/50' : 'bg-transparent'
        //         }
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-indigo-900`}>
            <nav className="px-8 py-8">
                <div className="flex items-center justify-center">
                    <div className="text-3xl font-bold text-white">
                        RPO Advert
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;