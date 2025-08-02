import React, { useEffect, useState } from 'react'
import {PostCard,Container} from '../components'
import appwriteService from '../appwrite/config';
function AllPost(){
    const [posts,setPosts] = useState([])
    // useEffect(()=>{},[])
    appwriteService.getAllPost([]).then((res)=>{
        if(res)setPosts(res.documents);
    });
    return (
        <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                })}
            </div>
        </Container>
    )
}

export default AllPost;