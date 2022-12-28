import SpinningLoader from "../../components/SpinningLoader";

const Cast = ({ data }) => {
  const { 
    data: items,
    isLoading,
    isSuccess,
  } = data
  
  let content
  if(isLoading) {
    content = <SpinningLoader/>
  }

  if(isSuccess) {
    const actors = items?.cast.filter((person) => person.known_for_department === 'Acting').map((actor, i) =>  {
      return <p key={actor.id + (i * Math.random())}>{actor.name}</p>
    })
    const producers = items?.crew.filter((person) => person.known_for_department === 'Production').map((producer, i) =>  {
      return <p key={producer.id + (i * Math.random())}>{producer.name}</p>
    })
    const directors = items?.crew.filter((person) => person.known_for_department === 'Directing').map((director, i) =>  {
      return <p key={director.id + (i * Math.random())}>{director.name}</p>
    })
    const writers = items?.crew.filter((person) => person.known_for_department === 'Writing').map((writter, i) =>  {
      return <p key={writter.id + (i * Math.random())}>{writter.name}</p>
    })

    content = (
      <div className="item-cast">
        <span className="cast-group actors">
          <h2>Acting team:</h2>
          { actors }
        </span>

        <div className="item-cast-side">
          {
            producers.length >= 1 && (
              <span className="cast-group">
                <h2>Producers:</h2>
                { producers }
              </span>
            )
          }
          {
            directors.length >= 1 && (
              <span className="cast-group">
                <h2>Directors:</h2>
                { directors }
              </span>
            )
          }
          {
            writers.length >= 1 && (
              <span className="cast-group">
                <h2>Writers:</h2>
                { writers }
              </span> 
            )
          }
        </div>
      </div>
    )
  }



  return (
    <>
      {content}
    </>
  )
}

export default Cast