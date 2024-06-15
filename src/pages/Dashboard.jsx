import { useState,useContext,useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { UserContext } from "../context/userContext";
import axios from 'axios';
import DeletePost from './DeletePost';

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

 const {currentUser}=useContext(UserContext);
 const token=currentUser?.token;
 const id=currentUser.id;

//redirect any user that isn't loged in
useEffect(()=>{
if(!token){
  navigate('/login');
}
},[])

useEffect(()=>{
  async function fetchPosts(){
    setLoading(true);
        try{
          const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, 
            {withCredentials:true,
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          setPosts(response.data);
        }catch(err){
           console.log(err);
        }
        setLoading(false);
   }
    
   fetchPosts();
  },[id])


if(loading){
  return <div>loading post..</div>
}

  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard_container">
          {
            posts.map(post => {
              return <article key={post.id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                 <DeletePost postID={post._id} />
                </div>
              </article>
            })
          }
        </div> : <h2 className="center">You have no posts yet.</h2>
      }
    </section>
  )
}

export default Dashboard