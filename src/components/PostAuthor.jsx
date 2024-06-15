import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru)

const PostAuthor = ({authorID,createdAt}) => {

  const [author,setAuthor]=useState({});
  const [isLoading,setIsLoading]=useState(false);

  async function getAuthor(){
    setIsLoading(true);
   try{
     const response =await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
     setAuthor(response?.data);
     
   }catch(err){
       console.log(err);
   }
   setIsLoading(false);
  }

   useEffect(()=>{
        getAuthor();
   },[])

   if(isLoading){
    return <div>
      loading author
    </div>
   }

  return (
    <div>
      <Link to={`/posts/users/${authorID}`} className='post_author'>
        <div className="post_author-avatar">
        <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${author.avatar}`} alt={"author-avatar"} />
        </div>
        <div className="post_author-details">
            <h5>By: {author.name}</h5>
            <small><ReactTimeAgo date={createdAt} locale="en-US"/></small>
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor