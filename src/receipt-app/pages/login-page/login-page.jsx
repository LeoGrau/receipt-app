// React Stuff
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// React Hook Forms
import { Controller, useForm } from "react-hook-form";

// Primereact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

//Models
import { AuthUser } from "../../models/auth.model";

// Service
import { userService } from "../../services/user.service";

// Styles
import "./login-page.css";
import { classNames } from "primereact/utils";

// Template
function LoginPage() {
  // Default Input Values
  const defaultValues = {
    username: "",
    password: "",
  };

  // Form Parameters
  const {
    control,
    formState: { errors },
    handleSubmit,
    // getValues,
    reset,
  } = useForm({ defaultValues });

  // Methods

  function handleSignIn(authUser) {
    return userService.signIn(authUser).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.resource));
      reset();
      navigate("/");
    });
  }
  const signIn = (data) => {
    event.preventDefault(); // Prevent form submission and page reload
    const authUser = new AuthUser(data.username, data.password);
    handleSignIn(authUser);
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const title = (
    <>
      <div className="mb-3">
        <h3>Sign In</h3>
      </div>
    </>
  );

  // Navigate
  const navigate = useNavigate();


  return (
    <>
      <div
        style={{}}
        className="login-page flex justify-content-center align-items-center way-big-height text-center"
      >
        <Card title={title} className="card">
          <form action="" onSubmit={handleSubmit(signIn)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mb-3">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label">
                    <Password
                      className={classNames({ "p-invalid": fieldState.error })}
                      toggleMask
                      feedback={false}
                      id={field.name}
                      value={field.value}
                      inputStyle={{ width: "100%" }}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Password</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <div className="mt-5 text-center">
              <p className="text-xs">
                <span>Do not have an account?</span>{" "}
                <Link to="/register"> Sign Up </Link>
              </p>
            </div>
            <div>
              <Button type="submit" className="p-button mt-3">
                {" "}
                Sign In{" "}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export { LoginPage };
