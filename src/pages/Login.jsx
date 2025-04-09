import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPsd, setShowPsd] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
  //     setEmailError("Invalid email");
  //     return;
  //   }
  //   if (password === "") {
  //     setPasswordError("Password is required");
  //     return;
  //   }

  //   if (password.length < 5) {
  //     setPasswordError("Password must be at least 5 characters");
  //     return;
  //   }
  //   // localStorage.setItem("email", email);
  //   // localStorage.setItem("password", password);
  //   // const userData = localStorage.getItem("user");
  //   // if(!userData){
  //   //   toast.error("User not found")
  //   //   return;
  //   // }
  //   // const userObject = JSON.parse(userData);
  //   // const isEmailCorrect = email === userObject.email;
  //   // const isPasswordCorrect = password === userObject.password;

  //   // if(!isEmailCorrect || !isPasswordCorrect){
  //   //   toast.error("invalid credentials");
  //   //   return;
  //   // }
  //   toast.success("Login is successiful");
  //   navigate("/dashboard");
  // }

  async function handleSubmit(ev){
    ev.preventDefault();
    try {
      //Ip address of localhost is 127.0.0.1
      const res = await axios.post("http://localhost:3500/login", {
        email: email,
        password: password,
      });

      toast.success("Login is successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user-info", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  }

  return (
    <div className="bg-blue-400 w-screen h-screen flex items-center justify-center">
      <form
        className="w-80 h-80 p-5 bg-white rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-3xl w-full text-center py-8 font-semibold">
          Login
        </h1>
        <div className="w-full mb-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border"
            onChange={(event) => {
              setEmail(event.target.value);
              if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                setEmailError(null);
                return;
              }
            }}
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
          {/* <button onClick={setShowPsd(!showPsd)}>View Password</button> */}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 mt-5 py-2 rounded text-white hover:bg-black hover:transform cursor-pointer"
        >
          Submit
        </button>
        {/* <input
        type=""
        // checked={showPsd}
        
        onChange={setShowPsd(!showPsd)}
        /> */}
      </form>
    </div>
  );
}
