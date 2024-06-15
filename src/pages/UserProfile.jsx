import React, { useState,useContext,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios';


const UserProfile = () => {
  const [avatar,setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isAvatarTouched,setIsAvatarTouched]=useState(false);
  const [error,setError]=useState('');

  const {currentUser}=useContext(UserContext);

  const navigate=useNavigate();
  const token=currentUser?.token;
 
  //redirect any user that isn't loged in
  useEffect(()=>{
  if(!token){
    navigate('/login');
  }
  },[])

  async function changeAvatarHandler(){
   setIsAvatarTouched(false);
   try{
    const postData=new FormData(); 
    postData.set('avatar',avatar);

    const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`,postData,
      {withCredentials:true,
        headers:{Authorization:`Bearer ${token}`}
       }
    );
      setAvatar(response.data.avatar); 

   }catch(err){
    console.log(err);
   }

  }

  useEffect(()=>{
   const getUser = async ()=>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
      {withCredentials:true,
        headers:{Authorization:`Bearer ${token}`}
       })
    const {name,email,avatar}=response.data;
    setName(name);
    setEmail(email);
    setAvatar(avatar);

   }
   
   getUser();
  },[])

  async function updateUserDetail(e){
   e.preventDefault();
   try{
   const userData=new FormData(); 
   userData.set('name',name);
   userData.set('email',email);
   userData.set('currentPassword',currentPassword);
   userData.set('newPassword',newPassword);
   userData.set('confirmNewPassword',confirmNewPassword);
   
   
    const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user/`,userData,
      {withCredentials:true,
        headers:{Authorization:`Bearer ${token}`}
       }
    );
    if(response.status==200){
        navigate('/logout');
    }   

   }catch(err){
    setError(err.response.data.message);
   }

  }


  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${avatar}`} alt="" />
            </div>
            {/* Form to update avatar  */}
            <form className="avatar_form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])}
               accept='png, jpg, jpeg' />
              <label htmlFor="avatar" onClick={()=>{setIsAvatarTouched(true)}} ><FaEdit/></label>
            </form>
            {isAvatarTouched && <button className='profile_avatar-btn' onClick={changeAvatarHandler} ><FaCheck/></button>}
          </div>
          <h1>{currentUser.name}</h1>
          {/* form to update user details */}
          <form className="form profile_form" onSubmit={updateUserDetail} >
          { error && <p className="form_error-message">{error}</p> }
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm new Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
            <button type="submit" className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile