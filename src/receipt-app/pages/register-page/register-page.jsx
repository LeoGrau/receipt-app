// React Stuff
import { Link, useNavigate } from "react-router-dom";

// React Hook Forms
import { Controller, useForm } from "react-hook-form";

// Styles
import "./register-page.css";

// PrimeReact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

// Prime Utils
import { classNames } from "primereact/utils";

// Models
import { RegisterUser } from "../../models/register.model";

// Services
import { userService } from "../../services/user.service";

function RegisterPage() {
  // Consts
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    description: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  // Inputs
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [description, setDescription] = useState("");

  // Methods
  function registerUser(data) {
    const newUser = new RegisterUser(
      data.firstname,
      data.password,
      data.firstname,
      data.lastname,
      data.description
    );
    console.log(newUser);
    userService.signUp(newUser).then((res) => {
      console.log(res);
    });

    // Blank spaces
    reset()

    navigate("/login");
  }

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // Template
  // Part of Dialog
  const title = (
    <>
      <div className="mb-3">
        <h3>Sign Up</h3>
      </div>
    </>
  );


  return (
    <>
      <div
        style={{}}
        className="register-page flex justify-content-center align-items-center way-big-height text-center"
      >
        <Card title={title} className="card">
          <form action="" onSubmit={handleSubmit(registerUser)}>
            <section className="grid-2-cols column-gap-3">
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="mb-3">
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Username</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="mb-3">
                    <span className="p-float-label">
                      <Password
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Password</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
              <Controller
                name="firstname"
                control={control}
                rules={{ required: "Firstname is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="mb-3">
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Firstname</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
              <Controller
                name="lastname"
                control={control}
                rules={{ required: "Lastname is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="mb-3">
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Lastname</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
            </section>
            <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="mb-3">
                    <span className="p-float-label">
                      <InputTextarea
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Description</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
              <Button type="submit" label="Sign Up"></Button>
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
