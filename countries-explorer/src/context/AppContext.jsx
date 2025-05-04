import { Children, createContext,useEffect,useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [theme,setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    },[theme]);

    const [session,setSession] = useState(()=>
        JSON.parse(localStorage.getItem("session")) || {}
    );

    useEffect(()=> {
        localStorage.setItem("session", JSON.stringify(session));
    },[session])

    const [favourites,setFavorites] = useState(()=>{
        return JSON.parse(localStorage.getItem("favorites")) || []
    });

    const toggleFavourits = (code) => {
        const update = favourites.includes(code) ? 
        favourites.filter((c) => c !== code) : [...favourites,code];
        setFavorites(update);
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favourites));
    },[favourites])


    return (
        <AppContext.Provider value={{theme,toggleTheme,session,setSession,favourites,toggleFavourits}}>
            {children}
        </AppContext.Provider>
    );
}


