import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BackendUrl } from "../config"
import type { SignupInput } from "zod-validation-by-utkarsh"
// import type { SigninInput } from "zod-validation-by-utkarsh"
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();
    const [loader,setloader]=useState(false);
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest(){
        setloader(c=>!c);
        try{
            const response=await axios.post(`${BackendUrl}/api/v1/user/${type==="signin"?"signin":"signup"}`,postInputs);
            const jwt=response.data;
            if(!jwt.token){
                alert("user not found");
                return;
            }
            localStorage.setItem("token",jwt.token);
            navigate("/blogs");
        }
        catch(e){
            alert("failed to send request!try again");
        }
        finally{
            setloader(c=>!c);
        }
        
    }
    return <div className="h-screen flex justify-center flex-col items-center gap-3 p-4 bg-gray-100">
        {/* {JSON.stringify(postInputs)} */}
        <div className="text-3xl font-semibold text-orange-400">
            Create An Account
        </div>
        <div className="text-sm font-semibold text-blue-500">
            {type === "signup" ? "Already Have an Account ? " : "Don't Have an Account ? "} <Link to={type === "signin" ? "/signup" : "/signin"} className="fond-bold underline hover:text-blue-500">{type === "signup" ? "Login" : "Sign Up"}</Link>
        </div>
        <div className="w-full max-w-sm bg-white p-7 rounded-2xl shadow-lg">
            <div className="flex flex-col gap-4">
                {type === "signup" ? (
                    <LabelledInput label="Username" placeholder="Enter your Username" onChange={(e) => {
                        setpostInputs((c: SignupInput) => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} />
                ) : null}

                <LabelledInput label="Email" placeholder="Enter your Email" onChange={(e) => {
                    setpostInputs((c: SignupInput) => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />

                <LabelledInput label="Password" type="password" placeholder="Enter your Password" onChange={(e) => {
                    setpostInputs((c: SignupInput) => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />

                <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold text-md rounded-lg  px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {loader ? ("...") : (type === "signup" ? "Sign Up" : "Sign In")}
                </button>
            </div>
        </div>




    </div>
}
interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-md font-semibold  text-blue-500 dark:text-slate font-sans">{label}</label>
        <input onChange={onChange} type={type || "text"} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}