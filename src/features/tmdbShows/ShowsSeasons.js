import { useState } from 'react'

import { useGetSeasonQuery } from './showsApiSlice';

import EpisodesDisplay from './EpisodesDisplay';

const ShowsSeasons = ({ data }) => {
  const [currentSeason, setCurrentSeason] = useState(1)
  const [showDropdown, setShowDropdown] = useState(false)
  
  const seasonItems = useGetSeasonQuery({ id : data.id, season: currentSeason })

  const handleClick = (e) => {
    setCurrentSeason(e.target.value)
    setShowDropdown(false)
  }

  let seasons_list = []
  for(let i = 0; i < data.number_of_seasons; i++) {
    seasons_list.push(
      <li 
        key={i}
        value={i + 1}
        onClick={(e) => handleClick(e)}
        className={`${currentSeason === (i + 1) ? 'active' : '' }`}
      >
        <p>Season {i + 1}</p>
        {
          currentSeason === (i + 1) && <i className="fa-solid fa-check"></i>
        }
      </li>
    )
  }

  let content = (
    <> 
      <button data-close={true} onClick={() => setShowDropdown((prevState) => !prevState)} className='my-btn seasons-btn'>
        Season {currentSeason}
        {
          showDropdown ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )
        }
      </button>
      {
        showDropdown && <div className='seasons-dropdown'> { seasons_list} </div>
      }
      <EpisodesDisplay data={seasonItems} showId={data.id}/>
    
    </>
  )


  return (
    <div className='seasons-wrapper'>
        { content }
    </div>
  )
}

export default ShowsSeasons