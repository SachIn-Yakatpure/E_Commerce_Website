import React, {useState} from "react";
import Signup_nav from "../components/Signup_nav";
import Swal from 'sweetalert2'

    let Beauty = () => {

  const [action,setAction] = useState("Login")

  const [formData,setFormData] = useState({

        username:"",
        password:"",
        confirmPassword:"",
        email:"" 

  })

  const changeHandler = (e) =>{

    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Login Function Executed",formData);

    let responseData;
    await fetch('http://localhost:7000/login',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);  // authentication token 
        window.location.replace("/");
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.errors,
          });
       
    }

    
  }

  const signup = async () =>{
    console.log("Signup Function Executed",formData);
    
    let responseData;
    await fetch('http://localhost:7000/signup',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);  // authentication token 
        window.location.replace("/");
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseData.errors,
          });
       
    }

  }


    return(
        
        <div>
          
           <Signup_nav/>
          
            <div className="Signup_page">
                <div className="Signup_Content">
                    <img src="https://images.meesho.com/images/marketing/1661417516766.webp" alt="" width="436" height="200"/>
                    <div className="Signup_profile" >
                        <h5>{action} to view your profile</h5>
                        <div className="Signup__" >

                        {action==="Login"? <div></div> : <div className="inputs_">  
                            <i class="fa-solid fa-user"></i>   <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Full Name"/>
                            </div>}
             
                            <div className="inputs_">
                            <i class="fa-solid fa-envelope"></i> <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email"/>
                            </div>


                            <div className="inputs_">
                            <i class="fa-solid fa-lock"></i>  <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                            </div>

                            {action==="Login"? <div></div> : <div className="inputs_">
                            <i class="fa-solid fa-lock"></i> <input name="confirmPassword" value={formData.password} onChange={changeHandler} type="password" placeholder="Confirm Password"/>
                            </div>}
                            
                          
                        </div>   
                         

                         {action==="Sign Up"? <div> </div> :  <div className="frgt-pass"> Forgot Password</div>}
                        

                         <div className="Continue-btn">
                            <button onClick={()=>{action==="Login"?login():signup()}}>Continue</button>
                        </div>
                            <div className="Signup_btn">
                                <div className={ action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>

                                <div className={ action ==="Sign Up" ? "submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                            </div>

                        </div>    
                            <div className="Signup_terms">
                                <p>By continuing, you agree to Meesho’s <br/> <span>Terms & Conditions</span> and <span>Privacy Policy</span></p>
                            </div>
                        

                    
                </div>
            </div>
        </div>
    )
}

export default Beauty