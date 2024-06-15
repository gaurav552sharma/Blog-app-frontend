import React, { useEffect, useState } from 'react'
import PostItem from './PostItem';
import axios from 'axios';

const Posts = () => {

    const [posts,setPosts]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

   async function fetchPosts(){
    setIsLoading(true);
        try{
          const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
          setPosts(response?.data);
        }catch(err){
           console.log(err);
        }
        setIsLoading(false);
   }

    useEffect(()=>{
      fetchPosts();
    },[])

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

export default Posts;