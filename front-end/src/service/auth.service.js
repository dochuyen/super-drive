export const getLogin= async()=>{
    const request={
        headers:{
            "Content-Type": "application/json",
            Authorization: 
            `Bearer ${localStorage.getItem('token')}` 
        },

    };
    const response=await fetch(
        "http://localhost:8080/api/v1/students",request
    );
    const {data}= await response.json();
    return data
}
export const createUser= async(user)=>{
    const request={
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: 
            `Bearer ${localStorage.getItem('token')}` 
        },
        body:JSON.stringify(user)
    };
    const response=await fetch(
        "http://localhost:8080/api/v1/students",request
    );
    const {data}= await response.json();
    return data
}