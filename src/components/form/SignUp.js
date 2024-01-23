import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "./InputControl";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";

const Signup = ()=> {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;

        await updateProfile(user, {
          displayName: values.name,
        });
        set(ref(db, "users/" + user.uid), {
          email: values.email,
          id: user.uid,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <div>
          <h1 className="text-white text-bold">Sign Up</h1>
        </div>
        <label> Username</label>
        <InputControl
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <label>Email </label>
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
              Already have an account ?
              <span>
                <Link to="/">Sign In</Link>
              </span>
            </p>
          </>
        </div>
      </div>
    </section>
  );
}

export default Signup;
