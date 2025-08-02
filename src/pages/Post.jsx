import React, { useState ,useEffect} from "react";
import { useNavigate, useParams ,Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container,Button } from "../components";
import parse from "html-react-parser";
function Post(){
    const slug = useParams()
    const navigate = useNavigate()
    const [post,setPost] = useState(null);
    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((res)=>{
                if(res){
                    setPost(res);
                }else{
                    navigate(`post/${slug}`);
                }
            })
        }else{
            navigate('/');
        }
    },[slug])

    const deletePost = ()=>{
        appwriteService.deletePost(post.$id).then((res)=>{
            if(res){
                appwriteService.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    };

    const userData = useSelector((state)=>state.auth.userData);

    const isAuthor = post && userData ? (userData.$id === post.userId):false;

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ):null;
}
export default Post;
