import { Link } from "react-router-dom"


interface BlogCardType {
    id: number
    authorName: string
    title: string
    content: string
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardType) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-3xl cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            {/* <div className="bg-slate-200 h-2 w-full">
        </div> */}
        </div>
    </Link>
}

export function Circle() {
    return <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
}