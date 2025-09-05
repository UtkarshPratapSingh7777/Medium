import { Avatar } from "./BlogCard"
export const Appbar = ({buttoninput , navigateto} : {buttoninput  :string , navigateto : ()=>void}) => {
    return <div className="border border-slate-100 shadow-md rounded-xl flex justify-between px-5">
        <div className="flex items-center">
            <Logo />
            Medium
        </div>
        <div className="p-1 gap-3 flex items-center">
            <Buttoncomponent title={buttoninput} onclick={navigateto}/>
            <Bar/>
            <Notification />
            <Avatar name="Utkarsh" />
        </div>
    </div>
}
function Logo() {
    return <div className="m-3"><svg className="w-6 h-6 text-blue-800 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
        <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
    </svg>
    </div>
}
export function Buttoncomponent({title , onclick} : {title :string , onclick : ()=>void}) {
    return <button onClick={onclick} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center me-2 mb-2">
        {title}
    </button>
}
function Notification() {
    return <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
    </svg>

}
function Bar() {
    return <div>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-400">...</p>
    </div>
}