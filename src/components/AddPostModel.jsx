import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function AddPostModel({posts, setPosts}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
    setBody("")
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
        console.log("Submitting");
        
        setLoading(true);
        const res = await axios.post("https://jsonplaceholder.typicode.com/posts",
             {
                title: title,
                body: body,
                userId: 1,
             });
             setPosts([res.data, ...posts]);
             toast.success("Post created");
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
      <Button 
      onClick={() => setOpenModal(true)}
      className="cursor-pointer bg-blue-500 my-2"
        >+Add Post</Button>
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
                    className="border px-1 w-full"
                    onChange={(e)=>setTitle(e.target.value)}
                     />
                </div>
                <div className="mb-2 w-full">
                    <input 
                    type="text"
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
