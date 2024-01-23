import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../../firebase";


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Email / Username</label>
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter Email"
        />
        <label>Password</label>
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />
        <p className="errorMsg">{errorMsg}</p>
        <div className="btnContainer">
          <>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>
              Sign in
            </button>
            <p>
              Don't have an account ?
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </>
        </div>
      </div>
    </section>
  );
};

export default Login;
