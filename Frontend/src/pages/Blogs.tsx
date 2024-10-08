
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
            <div className="flex animate-pulse">
                <div className="shrink-0">
                    <span className="size-12 block bg-gray-200 rounded-full"></span>
                </div>

                <div className="ms-4 mt-2 w-full">
                    <div className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></div>

                    <ul className="mt-5 space-y-3">
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    </ul>
                </div>
            </div>

        </div >
    }


    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"blog.publishedDate"} />)}


            </div>
        </div>
    </div>
}

