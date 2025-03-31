import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
import axios from "axios";
export const LibrariesContext = createContext();
export const LibrariesProvider = ({ children }) => {

    const [sounds, setSounds] = useState([])
    const [categories, setCategories] = useState([])
   
    useEffect(() => {
        getAllSounds();
        getAllCategories();
      }, []);

    /*---------------------------------------------
    ----- Chargement des projets et stockage ------
    ---------------------------------------------*/
    const getAllSounds = async (e) => {
        
      try {
        const response = await axios.get(`${API_URL}/api/sounds`);
        const allSounds = response.data;
        // 👉 Utilise les données comme tu veux :
        setSounds(allSounds); // ou console.log(allSounds)
      } catch (err) {
        console.error("Erreur lors de la récupération des sons :", err.message);
        // Optionnel : afficher une alerte ou message d’erreur
      }
    };

    const getAllCategories = async (e) => {
      
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        const allCategories = response.data;
        // 👉 Utilise les données comme tu veux :
        setCategories(allCategories); // ou console.log(allSounds)
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories :", err.message);
        console.error("Erreur Axios :", err.response?.data || err.message);
        // Optionnel : afficher une alerte ou message d’erreur
      }
    };

    return (
        <LibrariesContext.Provider value={{ 
                sounds,
                categories
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
        </LibrariesContext.Provider>
    )
}