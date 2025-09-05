import { useBlogId } from "../hooks" 
import { Skeleton } from "./Blogs";
import { useParams } from "react-router-dom";
import { LoadingSkeleton } from "./Blogs";
import { BlogComponent } from "../components/blogcomponent";
// import type { Blog } from "../hooks";
export const FullBlog =()  =>{
    const {id}=useParams();
    const {loading,blog} =useBlogId({
        id : id || ""
    });
    if(loading){
        return <div><LoadingSkeleton/>
        <LoadingSkeleton/>
        <LoadingSkeleton/>
        <LoadingSkeleton/>
        </div>
        
    }

    return <div>
        <BlogComponent blog={blog}/>
    </div>
}