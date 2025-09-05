import { Appbar } from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, type ChangeEvent } from "react";
import { BackendUrl } from "../config";
import axios from "axios";
import { Buttoncomponent } from "../components/Appbar";

export const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blog on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (e) {
        alert("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const editBlog = async () => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/v1/blog/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data) {
        alert("Blog not updated");
        return;
      }

      alert("Blog Updated! Redirecting...");
      setTimeout(() => {
        navigate(`/blog/${response.data.id}`);
      }, 2000);
    } catch (e) {
      alert("Connection to backend failed! Try again");
    }
  };

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="flex flex-col">
      <Appbar buttoninput="Home" navigateto={() => navigate("/blogs")} />

      <div className="flex flex-col justify-center items-center w-full gap-5 pt-3">
        <div className="text-4xl font-extrabold mt-10 mx-10 pb-2">Edit Blog</div>

        <div className="w-full">
          <TextArea
            rows={3}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full">
          <TextArea
            rows={15}
            value={content}
            onchange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <Buttoncomponent title="Update" onclick={editBlog} />
        </div>
      </div>
    </div>
  );
};

function TextArea({
  rows,
  value,
  onchange,
}: {
  rows: number;
  value: string;
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="px-10 flex flex-col justify-center items-center">
      <textarea
        onChange={onchange}
        value={value}
        rows={rows}
        className="block p-2.5 w-1/2 text-sm shadow-lg text-gray-900 bg-gray-50 rounded-lg border border-white 
          focus:outline-none focus:ring-0 focus:border-white 
          dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black font-semibold 
          dark:focus:ring-0 dark:focus:border-gray-100"
      />
    </div>
  );
}
