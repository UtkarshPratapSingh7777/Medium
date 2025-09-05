import { useEffect, useState } from "react"
import axios from "axios";
import { BackendUrl } from "../config";
export interface Blog {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: {
        name: string;
    };
}
export const useBlog = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BackendUrl}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setblogs(response.data.posts);
                setloading(false);
            })
            .catch(err => {
                console.error("API Error:", err.response?.data || err.message);
                // setloading(false);
            });

    }, [])
    return {
        loading, blogs
    }

}

export const useBlogId=({id} :{id:string})=>{
    const [loading,setloading]=useState(true);
    const [blog,setblog]=useState<Blog>();
    useEffect(()=>{
        axios.get(`${BackendUrl}/api/v1/blog/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
            .then((response)=>{
                setblog(response.data.post);
                setloading(false);
            })
            .catch(err =>{
                console.log("error occured" + err);
            });
    },[])
    return {
        loading,blog
    }

}