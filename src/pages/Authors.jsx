import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [loading,setLoading] =useState(false);

  async function getAuthors(){
    setLoading(true);
    try{
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setAuthors(response.data);
    }catch(err){
       console.log(err);
    }
    setLoading(false);
  }

  useEffect(()=>{
    getAuthors();
  },[])

if(loading){
  return <div>Loading Authors..</div>
}

  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({_id, avatar, name, posts}) => {
            return <Link key={_id} to={`/posts/users/${_id}`} className='author'>
              <div className="author_avatar">
                <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${avatar}`} alt={` Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No users/authors found.</h2>}
    </section>
  )
}

export default Authors