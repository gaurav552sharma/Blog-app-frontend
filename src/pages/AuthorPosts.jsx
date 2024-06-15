import React, { useState,useEffect } from 'react';
import PostItem from '../components/PostItem.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorPosts = () => {
  const [posts,setPosts]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

    const {id}=useParams();

   async function fetchPosts(){
    setIsLoading(true);
        try{
          const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
          setPosts(response?.data);
        }catch(err){
           console.log(err);
        }
        setIsLoading(false);
   }

    useEffect(()=>{
      fetchPosts();
    },[id])

    console.log({posts});
    const renderedPost=posts.map(({_id, thumbnail, category, title, description, creator,createdAt}) => {
        return  <PostItem key={_id} postID={_id} thumbnail={thumbnail} createdAt={createdAt}
        category={category} title={title} description={description} authorID={creator}/>
    });

  if(isLoading){
    return <div>loading page</div>;
  }


  return (

   <section className='posts' >
    <div className="container posts_container">
    {renderedPost}
    </div>
   </section>
  )
}

export default AuthorPosts