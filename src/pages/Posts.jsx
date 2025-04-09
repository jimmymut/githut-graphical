import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      {/* {loading && <p>Loading...</p>}
{!loading && <p>Page is ready</p>} */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-3 my-5 mx-10 flex-wrap">
          {posts.length === 0 && <p>No posts yet</p>}
          {posts.map((pst, index) => (
            <div
              className="flex gap-2 bg-blue-400 h-[250px] pr-10 rounded-xl w-[350px]"
              key={pst.id}
            >
              <div className="flex items-center justify-center font-medium bg-violet-400 text-white w-40 p-5 rounded-l-xl">
                <h2 className="text-lg">{pst.title}</h2>
              </div>

              <div className="">
                <p className="my-8">{pst.body.substring(0, 50) + "..."}</p>
                <Link
                  to={`/posts/${pst.id}`}
                  className="bg-black rounded text-white px-2 py-1"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
