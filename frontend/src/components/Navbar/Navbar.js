import './Navbar.scss'
import { useState} from 'react'
    
function Navbar() {
    
    const [soundBanksListState, setSoundBanksListState]= useState(false)
    function handleOpenSoundBanks() {
        if (soundBanksListState===false) {
            setSoundBanksListState(true)
        } else {
            setSoundBanksListState(false)
        }
        console.log(soundBanksListState)
    }

    return (
        <div className="navbar">
            <div className="navbar_nav">
                <h1 className="navbar_nav_title">USEFUL LIBRARIES</h1>
                <ul className="navbar_nav_list">
                    <li className="navbar_nav_list_item">
                        <p onClick={() => handleOpenSoundBanks()} className="navbar_nav_list_item_navtext">BANQUES DE SONS</p>
                    </li>
                    {/* <li className="navbar_nav_list_item">
                        <p className="navbar_nav_list_item_navtext">CONTACT</p>
                    </li> */}
                </ul>
            </div>
            <ul className={soundBanksListState===false?'navbar_nav_soundbanksList navbar_nav_soundbanksList--close':'navbar_nav_soundbanksList navbar_nav_soundbanksList--open'}>
                <li className="navbar_nav_soundbanksList_item navbar_nav_soundbanksList_item--b">
                    <p className="navbar_nav_soundbanksList_item_navtext">RAIN</p>
                </li>
                <li className="navbar_nav_soundbanksList_item navbar_nav_soundbanksList_item--a">
                    <p className="navbar_nav_soundbanksList_item_navtext">FOOTSTEPS</p>
                </li>
                <li className="navbar_nav_soundbanksList_item navbar_nav_soundbanksList_item--c">
                    <p className="navbar_nav_soundbanksList_item_navtext">URBAN SOUNDSCAPES</p>
                </li>
            </ul>
        </div>
    )
}

export default Navbar