import { Blogcard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlog } from "../hooks"
import type { Blog } from "../hooks"
import { useNavigate } from "react-router-dom"
export const Blogs = () => {
    const navigate = useNavigate();
    const { loading, blogs } = useBlog();
    if (loading) {
        return <div className="flex flex-col justify-center items-center gap-3 m-2 w-full">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
        </div>
    }
    return <div className="flex flex-col items-center justify-center mx-100 bg-gray-100 h-vh">
        <div className="w-full">
            <Appbar buttoninput="Add Blog" navigateto={() => navigate(`/publish`)} />
        </div>
        <div>
            {blogs.map((blog: Blog) => <Blogcard
                id={blog.id}
                authorname={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publisheddate="23 feb 2001"
            />)}
        </div>

    </div>
}
export const LoadingSkeleton = () => (
        <div role="status" className="animate-pulse flex flex-col h-lvh">
            <Appbar buttoninput="Edit Blog" navigateto={() => {}}/>
            <div className="flex w-screen h-lvh">
                <div className="flex flex-col items-start justify-start w-2/3 p-10 mx-10 gap-3">
                    <div className="flex flex-col">
                        <div className="h-10 bg-gray-200 rounded-full w-96 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-48 mb-2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-2.5"></div>
                </div>

                <div className="flex flex-col items-start justify-start w-1/3 p-10">
                    <div className="flex flex-col m-2">
                        <div className="h-6 bg-gray-200 rounded-full w-28 mb-4"></div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-20 self-center"></div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
export function Skeleton() {

    return <div className="p-4 border rounded-lg bg-white shadow animate-pulse space-y-3">
            {/* Top section: Avatar + name + date */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col space-y-2">
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Title */}
            <div className="w-full h-4 bg-gray-200 rounded"></div>

            {/* Description */}
            <div className="w-full/2 h-3 bg-gray-200 rounded"></div>

            {/* Footer (like "1min read") */}
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </div>

}