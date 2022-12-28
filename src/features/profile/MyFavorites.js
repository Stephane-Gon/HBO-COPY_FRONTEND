import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import { selectPersona } from "../auth/authSlice";
import { selectConfig } from "../tmdb/tmdbSlice";

import AddBtn from "../tmdb/AddBtn";

const MyFavorites = () => {
  const [isLink, setIsLink] = useState('fav')
  const config = useSelector(selectConfig)
  const persona = useSelector(selectPersona)

  let content
  if(persona.favorites.length === 0) {
    content = (
      <div className="no-fav-box">
        <h3 className="my-heading">You have no favorites.</h3>
        <p>Add titles to your favorites so you can store and watch them latter in any device connected to this account.</p>
        <Link className='action-add my-btn' to="/">Search Titles</Link>
      </div>
    )
  } else {
    content = persona.favorites.map((fav) => (
     <div key={fav.id} className="fav-item slider-item">
        <div className="slider-img-holder">
          <img 
            style={{width: "280px"}}
            className="slider-img"
            src={`${config?.base_url}/${fav.type === 'episode' ? config?.still_sizes[3] : config?.poster_sizes[3]}/${fav.img}`} 
            alt={fav.name}
          />
        </div>
        <div className="slider-actions">
          <Link
            to={
              fav.type === 'episode' ? 
                `/tmdb/show/${fav.showId}/season/${fav.seasonN}/episode/${fav.epN}`
              :
                `/tmdb/${fav.type === 'movie' ? 'movie' : 'show'}/${fav.id}`
            } 
          >
            <i className="fa-solid fa-info"></i>
          </Link>
          <AddBtn 
            data={{ id: fav.id }} 
            type={fav.type}
            showId={fav.showId} 
          />
        </div>
        <h3>{fav.name}</h3>
      </div>
    ))
  }

  return (
    <div className="profile-container">
      <div 
        key={persona.name} 
        className='persona-box' 
        data-personid={persona._id} 
      >
        <div className='persona-back'>
          <div className='persona-front'>
            <h1 className='my-heading persona-char'>{persona.name.replaceAll(' ', '').charAt(0)}</h1>
            { 
              persona.isChild && <i className="fa-solid fa-lock"></i>
            }
          </div>
        </div>
        <h3 className='persona-name'>{persona.name}</h3>
      </div>
      <Link style={{textAlign: "center"}} className='my-btn' to="/auth/profile/manage">Change Profile</Link>
      
      <div className="favorites-separator">
        <div className="favorites-items">
          <div 
            onClick={() => setIsLink('fav')} 
            className={`separator-item ${isLink === 'keep' ? 'special' : ''}`}
          >
            <h2 className="my-heading">Favorites</h2>
            <hr className="favorites-s-ruller" />
          </div>
          <div 
            onClick={() => setIsLink('keep')} 
            className={`separator-item ${isLink === 'fav' ? 'special' : ''}`}
            style={{marginLeft: '50px'}}
          >
            <h2 className="my-heading">Keep Watching</h2>
            <hr className="favorites-s-ruller" />
          </div>
        </div>
        
      <hr className="favorites-ruller" />      

      </div>

      <div className="favorites-list">
        { content }
      </div>
    </div>
  )
}

export default MyFavorites