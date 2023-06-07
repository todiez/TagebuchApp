import { useContext, useState } from "react";
import templateImg from "../assets/Vorlage.png";
import Card from "../context/context";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );

  function CreateForm(props) {
    //use states
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handle() {
      //Email validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
      }
      const url = `/account/create/${name}/${role}/${email}/${password}`;

      try {
        console.log("inside try");
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
        alert("Email address is already in use");
        return;
      }
      props.setShow(false);
    }

    return (
      <div>
        <div className="container" style={{ maxWidth: 300 }}>
          Name
          <br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <br />
          Role
          <br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter role, e.g. teacher"
            value={role}
            onChange={(e) => setRole(e.currentTarget.value)}
          />
          <br />
          Email address
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
              type="submit"
              className="btn btn-dark"
              onClick={handle}
              style={{ margin: 20 }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  function CreateMsg(props) {
    return (
      <>
        <h5>Success</h5>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => props.setShow(true)}
        >
          Add another account
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-dark"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/login";
          }}
        >
          Go to Login
        </button>
      </>
    );
  }
}
export default CreateAccount;
