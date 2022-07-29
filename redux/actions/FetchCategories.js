import Axios from "axios"
import cookieCutter from "cookie-cutter"
import { PATH } from "@constant/Path"
import {AUTH_UPDATED, WINDOW_LOADED, WINDOW_LOADING} from "./Types"

// const path = "http://127.0.0.1:8000/api/v1"

const FetchCategories = async (query = "") => {
    const csrfToken = cookieCutter.get("csrftoken")
    // Header
    const config = {
        headers : {
            "Content-Type" : "application/json",
            'X-CSRFToken' : csrfToken    
        }
    }
    const token = cookieCutter.get("token")
    if (token){
        config.headers["Authorization"] = `Token ${token}`
    }
    const res = await Axios.get(`${PATH}/monitor/categories?q=${query}`,config)
    return await res
        
}

export const submitCategories = ({tags}) => dispatch => {
    dispatch({ type: WINDOW_LOADING })
    const csrfToken = cookieCutter.get("csrftoken")
    const config = {
        headers : {
            "Content-Type" : "application/json",
            'X-CSRFToken' : csrfToken
        }
    }
    const token = cookieCutter.get("token")
    if (token){
        config.headers["Authorization"] = `Token ${token}`
    }
    
    const body = {
        "tags" : tags
    }
    
    const res = Axios.post(`${PATH}/monitor/submit_categories`,body,config) //
    res.then(data=> {
        dispatch({
            type:AUTH_UPDATED
        })
        dispatch({ type: WINDOW_LOADED })
    }).catch(e=>{
        console.log(e)
        dispatch({ type: WINDOW_LOADED })
    })
}
    
    export default FetchCategories
    
    export const sendActivationMail = async ({username,email}) => {
        const csrfToken = cookieCutter.get("csrftoken")
        const config = {
            headers : {
                "Content-Type" : "application/json",
                'X-CSRFToken' : csrfToken
            }
        }
        const token = cookieCutter.get("token")
        if (token){
            config.headers["Authorization"] = `Token ${token}`
        }
        
        const body = {
            username,
            email
        }
        
        const res = await Axios.post(`${PATH}/auth/send_activation_mail`,body,config)
        return res
}