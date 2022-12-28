import { 
  useGetPopularShowsQuery,
  useGetTopShowsQuery,
  useGetAiringTodayQuery,
  useGetOnAirQuery
} from './showsApiSlice';

import NormalSlider from '../tmdb/NormalSlider';
import ItemDisplay from '../tmdb/ItemDisplay';

const ShowsHighlights = () => {
  const popularShows = useGetPopularShowsQuery('getShows')
  const airingShows = useGetAiringTodayQuery('getShows')
  const topShows = useGetTopShowsQuery('getShows')
  const onAirShows = useGetOnAirQuery('getShows')

  return (
    <div className='highlights-wrapper'>
      <NormalSlider title="Popular Shows!" sToShow={7} data={popularShows} isMovie={false} /> 
      <NormalSlider title="Airing Today!" sToShow={5} data={airingShows} isMovie={false} /> 
      <ItemDisplay title="Currenty Popular!" data={popularShows} isMovie={false}/>
      <NormalSlider title="Top Rated Shows!" sToShow={7} data={topShows} isRate={true} isMovie={false} /> 
      <NormalSlider title="Now on Air!" sToShow={5} data={onAirShows} isMovie={false} /> 
      <ItemDisplay title="In the Tv!" data={onAirShows} isMovie={false}/>
    </div>  
  )
}

export default ShowsHighlights