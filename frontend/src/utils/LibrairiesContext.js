import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
export const LibrairiesContext = createContext();

export const LibrairiesProvider = ({ children }) => {

    // const [projects, setProjects] = useState([])
   
    // const [loadProjects, setLoadProjects] = useState(false)
    
    // const [loaderDisplay, setLoaderDisplay] = useState(false)
    
    // const [currentPage, setCurrentPage] = useState('')

    /*---------------------------------------------
    ----- Chargement des projets et stockage ------
    ---------------------------------------------*/
    
    return (
        <LibrairiesContext.Provider value={{ 
                // handleLoadProjects,
                // projects,
                // handleLoadTrips,
                // handleLoadDrawings,
                // trips,
                // drawings,
                // displayNavSection,
                // setDisplayNavSection,
                // loaderDisplay,
                // setLoaderDisplay,
                // welcomeDisplay,
                // setWelcomeDisplay,
                // currentPage,
                // setCurrentPage
                }}>
            {children}
        </LibrairiesContext.Provider>
    )
}