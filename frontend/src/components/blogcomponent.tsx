import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { BackendUrl } from "../config"
export const BlogComponent = ({ blog }: { blog: Blog }) => {
    const navigate=useNavigate();
    return <div className="flex flex-col h-lvh">
        <Appbar buttoninput="Edit Blog" navigateto={()=>navigate(`/editblog/${blog.id}`)}/>
        <div className="flex w-screen h-lvh">
            <div className="flex flex-col items-start justify-start w-2/3 p-10 mx-10 gap-3">
                <div className="flex flex-col">
                    <div className="font-extrabold text-4xl">{blog.title}</div>
                    <div className="font-semibold">Published on : 25th Aug 2006</div>

                </div>

                <div className="font-light text-xl">
                    {blog.content}
                </div>
            </div>
            <div className="flex flex-col items-start justify-start w-1/3 p-10">

                <div className="flex flex-col m-2">
                    <div className=" font-extrabold text-2xl">Author</div>
                    <div className="flex gap-2">
                        <Link to={`/blogs`}>
                            <div className="flex items-center">
                                <Avatar name={blog.author.name} />
                            </div>
                        </Link>
                        <div className="flex items-center font-semibold">{blog.author.name}</div>

                    </div>

                </div>
            </div>
        </div>
    </div>
}