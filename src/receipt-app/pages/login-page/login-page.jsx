// React Stuff
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Primereact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

// Models
import { AuthUser } from "../../models/auth.model"

// Service
import { userService } from "../../services/user.service"

// Styles
import "./login-page.css"

// Template
function LoginPage() {
  const title = (
    <>
      <div className="mb-3">
        <h3>Sign In</h3>
      </div>
    </>
  );
  

  // Inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Navigate
  const navigate = useNavigate();



  // Methods
  
  function signIn(authUser) {
    return userService.signIn(authUser).then(res => { localStorage.setItem("user", JSON.stringify(res.data.resource)); navigate('/');  });
  }
  const handleSignIn = () => {
    event.preventDefault(); // Prevent form submission and page reload
    const authUser = new AuthUser(username, password);
    signIn(authUser);
  }

  return (
    <>
      <div
        style={{}}
        className="login-page flex justify-content-center align-items-center way-big-height text-center"
      >
        <Card title={title} className="card">
          <form action="" onSubmit={handleSignIn}>
          <div className="p-float-label mb-5 login-input">
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="p-float-label login-input">
            <Password
              className="test"
              toggleMask 
              feedback={false}
              id="password"
              value={password}
              inputStyle={{ widht: "100%"}}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="username">Password</label>
          </div>
          <div className="mt-5 text-center">
            <p className="text-xs"><span>Do not have an account?</span> <Link to="/register"> Sign Up </Link></p>
          </div>
          <div>
      <Button type="submit" className="p-button mt-3"> Sign In </Button>
    </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export { LoginPage };
