import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function PostDetails(){
    const params = useParams();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
        .then((res)=>{
            setPost(res.data);
        }).catch((err)=>{
            console.log(err);
            
        }).finally(()=>{
            setLoading(false);
        })
    }, []);

    if(loading){
        return(
            <p>Loading...</p>
        )
    }


    return(
        <div className="">
            {!post && <p>Post Not Found</p>}
            {post && (
                <div className="p-10">
                    <h1 className="text-2xl text-center font-bold">{post.title}</h1>
                    <p className="text-center">{post.body}</p>
                </div>
            )}
        </div>
    )
}