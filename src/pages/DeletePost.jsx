import React from 'react';
import { useContext,useEffect,useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { UserContext } from "../context/userContext";
import axios from 'axios';

const DeletePost = ({postID}) => {

  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const location =useLocation();

  const {currentUser}=useContext(UserContext);
  const token=currentUser?.token;
 
 //redirect any user that isn't loged in
 useEffect(()=>{
 if(!token){
   navigate('/login');
 }
 },[])

 async function removePost(){
  setLoading(true);
  try{
   const response= await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postID}`,
    {withCredentials:true,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(response.status==200){
      if(location.pathname == `/myposts/${currentUser.id}` ){
        navigate(0);
      }else{
        navigate('/');
      }
    }

  }catch{
    console.log("Couldn't Delete Post");
  }
  setLoading(false);
 }

 if(loading==true){
  return <div>deleting post...</div>
 }

  return (
    <Link className='btn sm danger' onClick={removePost} >Delete</Link>
  )
}

export default DeletePost