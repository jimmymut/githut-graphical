import axios from "axios";
import { useEffect, useState } from "react"
import { AddPostModel } from "../components/AddPostModel";
import { EditPostModal } from "../components/EditPostModal";
import { DeletePost } from "../components/DeletePost";

export default function Dashboard(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchPosts() {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setPosts(res.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPosts();
    }, []);

    if(loading){
        return(
            <p className="">Loading...</p>
        )
    }
    return(
        <div className="px-5">
            <AddPostModel posts={posts} setPosts={setPosts}/>
            <table className="border">
                <thead>
                    <tr>
                        <th className="border">ID</th>
                        <th className="border">User ID</th>
                        <th className="border">Title</th>
                        <th className="border">Body</th>
                        <th className="border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((pst)=>(
                        <tr key={pst.id}>
                            <td className="border">{pst.id}</td>
                            <td className="border">{pst.userId}</td>
                            <td className="border">{pst.title}</td>
                            <td className="border">{pst.body}</td>
                            <td align="center" className="border">
                                <div className="flex gap-2">
                                <EditPostModal post={pst} posts={posts} setPosts={setPosts}/>
                                <DeletePost id={pst.id} posts={posts} setPosts={setPosts}/>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}