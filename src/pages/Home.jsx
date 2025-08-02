import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"

function Home() {
    const [posts, setPosts] = useState([])
    const isLoggedIn = useSelector((state)=>state?.auth.status);
    useEffect(() => {
        if(isLoggedIn){
            appwriteService.getAllPost().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [])
    if (!isLoggedIn) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        if (posts.length === 0) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Currently No Post Are available to read
                                    <br></br> 
                                    Please Try Again 
                                    <br></br>
                                    Or 
                                    <br></br>

                                    <Link to="/add-post" className="text-blue-400">Create New Post</Link>
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    }

    

export default Home