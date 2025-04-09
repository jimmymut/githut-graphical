import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function EditPostModal({post, posts, setPosts}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
    setBody("")
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
        setLoading(true);
        const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
             {
                title: title,
                body: body,
                userId: post.userId,
                id: post.id,
             });
             console.log(res.data);
             
            const updatedPosts = posts.map((pst)=>{
              if(pst.id == post.id){
                return res.data;
              }
              return pst;
            });
            setPosts(updatedPosts);
             toast.success("Post updated succesfully");
             onCloseModal();
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }

  return (
    <>  
      <Pencil
      onClick={() => setOpenModal(true)}
      className="cursor-pointer text-blue-500"
        />
      <Modal show={openModal} size="sm" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
            <form 
            className="flex flex-col items-center justify-center rounded-md"
            onSubmit={(e)=>handleSubmit(e)}
            >
                <h1 className="w-full text-center text-xl">Add Post</h1>
                {/* <input type="hidden" className="border" /> */}
                <div className="mb-2 w-full">
                    <input 
                    type="text" 
                    placeholder="Title"
                    defaultValue={post.title}
                    className="border px-1 w-full"
                    onChange={(e)=>setTitle(e.target.value)}
                     />
                </div>
                <div className="mb-2 w-full">
                    <input 
                    type="text"
                    defaultValue={post.body}
                    className="border px-1 w-full"
                    placeholder="Body"
                    onChange={(e)=>setBody(e.target.value)} 
                    />
                </div>

                <Button
                 className="w-full my-2 rounded-none" type="submit"
                 disabled={loading}
                 >
                {
                    loading?
                    <>
                    <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
                    Loading...
                    </>:"Submit"
                }

                    </Button>
            </form>
     
        </ModalBody>
      </Modal>
    </>
  );
}
