export const AppErrors= ({
    message="error",
    options={
        cause:{stats:400}
    }
}={})=>{
    throw new Error(message , options) 

}


export const Conflict =(message='Confilct Account' , issues={} )=>{
    return AppErrors({
        message,
        options :{
            cause :{status :409 ,issues}
        }
})
}
export const NotFound =(message='User Not Found' , issues={} )=>{
    return AppErrors({
        message,
        options :{
            cause :{status :404 ,issues}
        }
})
}
export const Forbbiden =(message='Forbbiden Account' , issues={} )=>{
    return AppErrors({
        message,
        options :{
            cause :{status :403 ,issues}
        }
})
}
export const Unauthorized =(message='Unauthorized Account' , issues={} )=>{
    return AppErrors({
        message,
        options :{
            cause :{status :401 ,issues}
        }
})
}