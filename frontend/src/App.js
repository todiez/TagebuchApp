import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handle() {
    // Email validation logic
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   alert("Invalid email address");
    //   return;
    // }
    const url = `/account/create/${name}/${email}/${password}`;
	
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
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("/register", {
      method: "post",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
    }
  };

  return (
    
    //   <div className="container">
    //     <form action="">
    //     <input
    //       type="text"
    //       placeholder="name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //       type="email"
    //       placeholder="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <button type="submit" onClick={handleOnSubmit}>
    //       submit
    //     </button>
    //   </form>
    //   </div>

	  <div className="container" style={{margin: 50}}>
      <div className="text-center">
        <h1>Tagebuch Create Account</h1>
      </div>
      <div className="container" style={{maxWidth: 300, marginTop: 20}}>
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
        <button type="submit" className="btn btn-dark" onClick={handle}>
          Create Account
        </button>
      </div>
	  </div>
    
  );
}

export default App;
