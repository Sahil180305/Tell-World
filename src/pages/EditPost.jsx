import React, { useEffect } from 'react'
import {Postform , Container} from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function EditPost(){
    const [post,setPost] = useEffect(null)
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(async ()=>{
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }else{
                navigate(`/post/${slug}`)
            }
        });
    },[slug,navigate])
    return post?(
        <div className='py-8'>
            <Container>
                <Postform post={post} />
            </Container>
        </div>
    ):null
}

export default EditPost;