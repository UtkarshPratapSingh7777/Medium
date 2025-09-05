interface BlogCardprops {
    id:number,
    authorname: string,
    title: string,
    content: string,
    publisheddate: string
}
import { Link } from "react-router-dom"
export const Blogcard = ({
    id,
    authorname,
    title,
    content,
    publisheddate
}: BlogCardprops) => {

    return <Link to={`/blog/${id}`} className="flex flex-col w-screen justify-center items-center">
     <div className=" flex flex-col border border-gray-100 rounded-xl shadow-lg justify-start w-1/2 m-3 gap-2 bg-white">
            <div className="flex justify-start mt-1"><Avatar name={authorname} />
                <div className="font-extralight p-1">
                    {authorname}
                </div> . <div className="text-slate-400 p-1">
                    {publisheddate}
                </div>
            </div>
            <div className="font-bold text-2xl">
                {title}
            </div>
            <div>{content.slice(0, 100) + "..."}</div>
            <div>{Math.ceil(content.length / 100) + "min read"}</div>
            <div className="h-0.5 bg-slate-200"></div>
        </div>
        </Link>
}
export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-orange-100 rounded-full dark:bg-orange-400">
        <span className="font-medium text-white dark:text-white">{(name.slice(0, 2).toUpperCase())}</span>
    </div>
}