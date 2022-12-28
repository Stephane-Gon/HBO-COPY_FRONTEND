import React from 'react'

const Pagination = ({page, total_pages, setPage}) => {

  const handleChangePage = (e) => {
    setPage(Number(e.target.value))
  }

   // PAGINATION LOGIC
   let content = (
    <>
      <li onClick={handleChangePage}  value={page - 1}><i className="fa-solid fa-caret-left"></i></li>
      { 
        page > 2
        && (
          <>
            <li onClick={handleChangePage} value={1} >1</li>
            <p>...</p>
          </>
        )
      }

      { 
        !(page - 1) <= 0 
        && <li onClick={handleChangePage} value={page - 1} >{page - 1}</li>
      }
      <li className="selected" onClick={handleChangePage} value={page} >{page}</li>
      {
        !(page + 1 >= total_pages) 
        && <li onClick={handleChangePage} value={page + 1} >{page + 1}</li>
      }
      <li onClick={handleChangePage} value={page + 1}><i className="fa-solid fa-caret-right"></i></li>
    </>
  )

  return (
    <div className='pagination-container'>
      {content}
    </div>
  )
}

export default Pagination