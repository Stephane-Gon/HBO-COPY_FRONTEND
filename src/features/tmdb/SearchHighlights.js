import { useGetPopPersonQuery } from "../tmdbMovie/moviesApiSlice"

import NormalSlider from "./NormalSlider"
import ItemDisplay from "./ItemDisplay"
import PeopleSlider from "./PeopleSlider"

const SearchHighlights = ({topShows, popShows, topMovies, popMovies}) => {
  const people = useGetPopPersonQuery('getPerson')
  return (
    <div className='highlights-wrapper'>
      <PeopleSlider  data={people} sToShow={5} title="Top Popular Persons:" />
      <NormalSlider title="Popular Movies!" sToShow={7} data={popMovies} /> 
      <NormalSlider title="Top rated Movies!" sToShow={5} data={topMovies} isRate={true} /> 
      <ItemDisplay title="Searching for popular movie?" data={popMovies} isMovie={true}/>
      <NormalSlider title="Popular Shows!" sToShow={5} data={popShows} isMovie={false} /> 
      <NormalSlider title="Top rated Shows!" sToShow={7} data={topShows} isMovie={false} isRate={true} /> 
      <ItemDisplay title="Searching for top rated show?" data={topShows} isMovie={false}/>
    </div>
  )
}

export default SearchHighlights