import axios from "axios";
import { Spinner } from "flowbite-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function DeletePost({posts, setPosts, id}){
    const [loading, setLoading] = useState(false);

    async function handleDelete(){
        try {
            setLoading(true);
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const updPosts = posts.filter((pst)=>pst.id !== id);
            setPosts(updPosts);
            toast.success("Post deleted");
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
        {loading? <Spinner color="failure" size="sm" light/>:
        <Trash2 
        className="text-red-600 cursor-pointer"
        onClick={handleDelete}
        />}
        </>
    )
}