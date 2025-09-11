import React, {useEffect, useState} from "react";
import {Building2, ChevronDown, Search} from "lucide-react";
import {Company} from '../types/model/types.ts'
import {ApiGetCompaniesResponse} from '../types/api/types.ts'
import {SearchBarProps} from '../types/props/types.ts'


export function SearchBar(
    {
        searchId,
        placeholder = "Search",
        onCompanySelect,
    }: SearchBarProps) {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [companies, setCompanies] = useState<Company[]>([]);
    const [, setSelectedCompany] = useState<Company | null>(null);
    const [isOpen, setIsOpen] = useState(false);


    // TODO: pridat fetch niekde do vlastneho priecinka
    const fetchCompanies = async (query: string) => {
        try {
            // TODO: for now
            const serverUrl: string = "http://localhost:8000";


            if (!serverUrl) {
                throw new Error('REACT_APP_SERVER_URL is not defined');
            }

            const response = await fetch(`${serverUrl}/api/company/get-companies.php?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiGetCompaniesResponse = await response.json();
            console.log('Companies data:', data);
            console.log('Search query:', query);

            if (data.success && data.data.companies) {
                setCompanies(data.data.companies);
                setIsOpen(true);
            } else {
                setCompanies([]);
                setIsOpen(false);
            }


        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    // useEffect with debouncing
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!searchQuery.trim() || searchQuery.trim().length < 3){
                setIsOpen(false)
                return
            }

            try {
                fetchCompanies(searchQuery)

            } catch (exception) {
                console.log(exception)
            }

        }, 100);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSelectedCompany(null)
    };

    const handleCompanySelect = (company: Company) => {
        // todo, treba mi setSelectedCompany vobec ?
        setSelectedCompany(company);
        setIsOpen(false);
        setSearchQuery('');
        setCompanies([]);

        if (onCompanySelect) {
            onCompanySelect(company);
        }
    };

    const handleInputFocus = () => {
        if (companies.length > 0) {
            setIsOpen(true);
        }
    };

    return (
        <div className="relative w-[50vw] mx-auto mb-10">
            <p className="text-left text-xl mb-3">Search Company</p>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input
                    type="search"
                    id={searchId}
                    value={searchQuery}
                    onChange={handleFilter}
                    onFocus={handleInputFocus}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 shadow-sm"
                />

            </div>

            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {companies.length === 0 && searchQuery.length >= 3 && (
                        <div className="p-4 text-center text-gray-500">
                            No companies found for "{searchQuery}"
                        </div>
                    )}

                    {companies.map((company, index) => (
                        <div
                            key={`${company.ico}-${index}`}
                            onClick={() => handleCompanySelect(company)}
                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        >
                            <div className="flex-shrink-0 mr-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-blue-600"/>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-left text-gray-900 truncate text-sm">
                                    {company.name}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                    <span className="font-mono">ICO: {company.ico}</span>
                                    {company.city && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <span className="truncate">{company.city}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <ChevronDown className="w-3 h-3 text-gray-400 transform -rotate-90"/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;