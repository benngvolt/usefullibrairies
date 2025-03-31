import './Navbar.scss'
import { Link } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import { LibrariesContext } from '../../utils/LibrariesContext'


    
function Navbar() {
    
    const { sounds, categories } = useContext(LibrariesContext);
    const [soundBanksListState, setSoundBanksListState]= useState(false)
    function handleOpenSoundBanks() {
        if (soundBanksListState===false) {
            setSoundBanksListState(true)
        } else {
            setSoundBanksListState(false)
        }
        console.log(soundBanksListState)
    }

    const usedCategoryIds = [...new Set(sounds.map(sound => sound.categoryId))];
    const usedCategories = categories.filter(category =>
        usedCategoryIds.includes(category._id)
      );

    return (
        <div className="navbar">
            <div className="navbar_nav">
                <h1 className="navbar_nav_title">USEFUL LIBRARIES</h1>
                <ul className="navbar_nav_list">
                    <li className="navbar_nav_list_item">
                        <p onClick={() => handleOpenSoundBanks()} className="navbar_nav_list_item_navtext">BANQUES DE SONS</p>
                    </li>
                    <li className="navbar_nav_list_item">
                        <Link aria-label='Accéder à la page Compagnie'className="navbar_nav_list_item_navtext" to="/edit"><p>EDIT</p></Link>
                    </li>
                </ul>
            </div>
            <ul className={soundBanksListState===false?'navbar_nav_soundbanksList navbar_nav_soundbanksList--close':'navbar_nav_soundbanksList navbar_nav_soundbanksList--open'}>
                {usedCategories.map(category => (
                    <li className="navbar_nav_soundbanksList_item navbar_nav_soundbanksList_item--b">
                        <p className="navbar_nav_soundbanksList_item_navtext">{category.name}</p>
                    </li>
                ))}
               
            </ul>
        </div>
    )
}

export default Navbar