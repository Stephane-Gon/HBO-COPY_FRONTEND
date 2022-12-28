import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectPersona, selectUser } from "../auth/authSlice"
import { setNotification } from "../notifications/notificationSlice"
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../auth/authApiSlice"

const AddBtn = ({ data, type, showId = null }) => {
  const dispatch = useDispatch()
  const persona = useSelector(selectPersona)
  const user = useSelector(selectUser)
  const [addFavorite] = useAddFavoriteMutation('favourites')
  const [deleteFavorite] = useDeleteFavoriteMutation('favorites')
  
  let itemIsFav = persona.favorites.some((fav) => Number(fav.id) === Number(data.id))
  const [isFavorite, setIsFavorite] = useState(itemIsFav)

  const handleAdd = async () => {
    if(persona === null)  return dispatch(setNotification({status: 403, message: 'You must be logged in!'}))
    
    try {
      await addFavorite({
        type,
        img: type === 'episode' ? data.still_path : data.backdrop_path,
        name: type === 'movie' ? data.title : data.name,
        id: Number(data.id),
        seasonN: type === 'episode' ? data.season_number : null,
        epN: type === 'episode' ? data.episode_number : null,
        userId: user._id,
        personaId: persona._id,
        showId: type === 'episode' ? Number(showId) : null,
      }).unwrap()
      
    } catch {}
    setIsFavorite(true)
  }
  const handleDelete = async () => {
    if(persona === null) return dispatch(setNotification({status: 403, message: 'You must be logged in!'}))
    
    try {
      await deleteFavorite({
        type,
        id: Number(data.id),
        userId: user._id,
        personaId: persona._id,
      }).unwrap()
      
    } catch {}
    setIsFavorite(false)
  }

  return (
    <>
      {
        isFavorite  ? (
          <i 
            onClick={handleDelete}
            className="fa-solid fa-check"
          ></i>
        ) : (
          <i 
            onClick={handleAdd}
            className="fa-regular fa-plus"
          ></i>
        )
      }
    </>
  )
}

export default AddBtn