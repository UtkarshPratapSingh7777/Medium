import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom"
import { useState, type ChangeEvent, type ChangeEventHandler } from "react";
import { BackendUrl } from "../config";
import axios from "axios";
import type { Blog } from "../hooks";
import { Buttoncomponent } from "../components/Appbar";
export const Publish = () => {
    const navigate = useNavigate();
    const [title, setitle] = useState("");
    const [content, setcontent] = useState("");
    const publishpost = async () => {

        try {
            const response=await axios.post(`${BackendUrl}/api/v1/blog`, {
                title,
                content
            },{
                headers:{
                    Authorization : localStorage.getItem("token")
                }
            })
            if(!response.data){
                alert("Blog not published");
                return;
            }
            alert("Blog Published ! Redirecting ...");
            setTimeout(() => {
                navigate(`/blog/${response.data.id}`);
            }, 2000);

        } catch (e) {
            alert("Connection to backend failed ! try again ")
        }

    }
    return <div className="flex flex-col">
        <Appbar buttoninput="Home" navigateto={() => navigate("/blogs")} />
        <div className="flex flex-col justify-center items-center w-full gap-5 pt-3">
            <div className="text-4xl font-extrabold mt-10 mx-10 pb-2">
                Create Blog
            </div>
            <div className="w-full">
                <Title rows="3" placedefault="Blog Title" onchange={(e)=>{
                    setitle(e.target.value);
                }}/>
            </div>
            <div className="w-full">
                <Title rows="15" placedefault="Blog ...." onchange={(e)=>{
                    setcontent(e.target.value)
                }}/>
            </div>
            <div>
                <Buttoncomponent title="Publish" onclick={publishpost} />
            </div>
        </div>

    </div>
}
function Title({ rows, placedefault ,onchange }: { rows: string, placedefault: string , onchange:(e : ChangeEvent<HTMLTextAreaElement>)=>void }) {
    return <div className="px-10 flex flex-col justify-center items-center">
        <textarea onChange={onchange}
            id="message"
            rows={parseInt(`${rows}`)}
            className="block p-2.5 w-1/2 text-sm shadow-lg text-gray-900 bg-gray-50 rounded-lg border border-white 
             focus:outline-none focus:ring-0 focus:border-white 
             dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black font-semibold 
             dark:focus:ring-0 dark:focus:border-gray-100"
            placeholder={`${placedefault}`}
        />


    </div>
}