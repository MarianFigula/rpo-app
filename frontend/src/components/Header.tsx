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
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-1 border-border/50 ${
            isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm border-border/50' : 'bg-transparent'
        }`}>
            <nav className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <div className="text-3xl font-bold">
                        Company advertisement manager
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;