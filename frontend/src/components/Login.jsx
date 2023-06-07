import React from "react";

import { useContext, useState } from "react";
import Card, { UserContext } from "../context/context";

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-dark"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [password, setPassword] = React.useState("");
  const { setIsLoggedIn, setId, email, setEmail } = useContext(UserContext);

  function handle() {
    //e.preventDefault(); 

    console.log("Login fired")
    
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
            console.log(text);
          const data = JSON.parse(text);
          setId(data._id);
          console.log(data);
          props.setStatus("");
          props.setShow(false);
          setIsLoggedIn(true); // Set isLoggedIn to true
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
          console.log(err);
        }
      });
  }

  return (
    <div>
      <div className="container" style={{ maxWidth: 300 }}>
        Email
        <br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="btn btn-dark"
            onClick={handle}
            style={{ margin: 20 }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

function Logincorner() {
  const { isLoggedIn, email } = useContext(UserContext);

  return <>{isLoggedIn ? <p>{email}</p> : <p>Please log in first</p>}</>;
}

export default Login;
