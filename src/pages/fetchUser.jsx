import axios from "axios";
import { useEffect, useState } from "react"
import { AddPostModel } from "../components/AddPostModel";
import { EditPostModal } from "../components/EditPostModal";
import { DeletePost } from "../components/DeletePost";
import { fetchUsers} from "../components/fetchUsers";

export default function fetchUser(){
    const [fetchUsers, setfetchUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUsers() {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setfetchUsers(res.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUsers();
    }, []);

    if(loading){
        return(
            <p className="">Loading...</p>
        )
    }
    return(
        <div className="px-5">
            <AddUserModel posts={Users} Users={fetchUsers}/>
            <table className="border">
                <thead>
                    <tr>
                        <th className="border">ID</th>
                        <th className="border">Email</th>
                        <th className="border">password</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {Users.map((pst)=>(
                        <tr key={pst.id}>
                            <td className="border">{user.id}</td>
                            <td className="border">{user.Email}</td>
                            <td className="border">{user.Password}</td>
                         
                            <td align="center" className="border">
                                <div className="flex gap-2">
                                <EdituserModal user={pst} Users={Users} setUsers={hUsers}/>
                                <Deleteuser id={Users.id} Users={Users} setusers={setPosts}/>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}