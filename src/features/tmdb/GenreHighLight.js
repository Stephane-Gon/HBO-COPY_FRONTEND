import NormalSlider from '../tmdb/NormalSlider';
import ItemDisplay from '../tmdb/ItemDisplay';

const GenreHighLight = ({ shows = {}, movies = {} }) => {
  return (
    <div className='highlights-wrapper'>
      {
        movies !== {} && (
          <>
            <NormalSlider title="Action Movies!" sToShow={7} data={movies} /> 
            <ItemDisplay title="Need some action!?" data={movies} isMovie={true}/>
          </>
        )
      }
      {
        shows !== {} && (
          <>
              <NormalSlider title="Action Shows!" sToShow={5} data={shows} isMovie={false} /> 
              <ItemDisplay title="Action Show!" data={shows} isMovie={false}/>
          </>
        )
      }
        
    </div>
  )
}

export default GenreHighLight