import { useContext } from "react"
import { AppContext } from "../context/AppContext";


const ThemeToggle = () => {
    const {theme,toggleTheme} = useContext(AppContext);

    return(
    <button
        onClick={toggleTheme} 
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
            {theme === 'dark' ? "Light Mode" : "Dark Mode"}
    </button>
    );
}

export default ThemeToggle;