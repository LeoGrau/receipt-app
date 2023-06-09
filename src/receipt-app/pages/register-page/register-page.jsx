// React Stuff
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import "./register-page.css";

// PrimeReact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

// Models
import { RegisterUser } from "../../models/register.model";

// Services
import { userService } from "../../services/user.service";

function RegisterPage() {

  // Inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");

  // Consts
  const navigate = useNavigate();

  // Methods
  function registerUser() {
    const newUser = new RegisterUser(username, password, firstname, lastname, description);
    console.log(newUser);
    userService.signUp(newUser).then(res => { console.log(res) });

    // Blank spaces 
    setUsername("");
    setPassword("")
    setFirstname("")
    setLastname("")
    setDescription("")
    
    navigate("/login")
  }

  // Template
  // Part of Dialog
  const title = (
    <>
      <div className="mb-3">
        <h3>Sign Up</h3>
      </div>
    </>
  );

  const footer = (
    <>
      <div>
        <Button className="p-button" onClick={registerUser}> Sign Up </Button>
      </div>
    </>
  );

  return (
    <>
      <div
        style={{}}
        className="register-page flex justify-content-center align-items-center way-big-height text-center"
      >
        <Card title={title} footer={footer} className="card">
          <form action="">
            <section className="grid-2-cols column-gap-3">
            <div className="p-float-label mb-5">
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="p-float-label mb-5">
              <Password
                className="test"
                toggleMask
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="username">Password</label>
            </div>
            <div className="p-float-label mb-5">
              <InputText
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label htmlFor="username">Firstname</label>
            </div>
            <div className="p-float-label mb-5">
              <InputText
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor="username">Lastname</label>
            </div>
            </section>
            <span className="p-float-label">
              <InputTextarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={30}
              />
              <label htmlFor="description">Description</label>
            </span>
          </form>
          <div className="mt-5 text-center">
            <p className="text-xs">
              <span>Do not have an account?</span>{" "}
              <Link to="/login"> Sign In </Link>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

export { RegisterPage };
