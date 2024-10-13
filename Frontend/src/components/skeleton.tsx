import { Circle } from "./BlogCard"


export const BlogSkeleton = () => {
    return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-3xl cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <div className="shrink-0">
                    <span className="size-12 block bg-gray-200 rounded-full"></span>
                </div>
            </div>
            <div className="flex">
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                    <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col">
                        <div className="w-full h-4 bg-gray-200 rounded-full">

                        </div>
                    </div>

                </div>
            </div>
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
        {/* <div className="bg-slate-200 h-2 w-full">
        </div> */}
    </div>








    // <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-lg cursor-pointer">
    //     <div className="flex animate-pulse justify-center flex-col">
    //         <div className="shrink-0">
    //             <span className="size-12 block bg-gray-200 rounded-full"></span>
    //         </div>

    //         <div className="ms-4 mt-2 w-full">
    //             <div className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></div>

    //             <ul className="mt-5 space-y-3">
    //                 <li className="w-full h-4 bg-gray-200 rounded-full"></li>
    //                 <li className="w-full h-4 bg-gray-200 rounded-full"></li>
    //                 <li className="w-full h-4 bg-gray-200 rounded-full"></li>
    //                 <li className="w-full h-4 bg-gray-200 rounded-full"></li>
    //             </ul>
    //         </div>
    //     </div>
    // </div >
}

