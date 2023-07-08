import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

const { userAuth } = require("./Auth")


function PrivateRoute() {
    const user = useContext(userAuth)
    console.log(user)
 
    if(!user.isloggedin){    
        console.log("Dont by pass the Routes")   
        return <Navigate to='/'/>
        
    }else{
        return <Outlet/>
    }   
}

export default PrivateRoute