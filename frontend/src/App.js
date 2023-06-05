import { useState } from 'react'

const test = process.env.REACT_APP_TESTVAR;

function App() {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	  const [password, setPassword] = useState('');
	  async function handle() {
		// Email validation logic
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
		  alert("Invalid email address");
		  return;
		}
	  
		const url = `/account/create/${name}/${email}/${password}`;
		try {
		  const res = await fetch(url);
		  const data = await res.json();
		  console.log(data);
		} catch (error) {
		  alert("Email address is already in use");
		  return;
		}
	  }
	


	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let result = await fetch(
		'/register', {
			method: "post",
			body: JSON.stringify({ name, email }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
		console.warn(result);
		if (result) {
			alert("Data saved succesfully");
			setEmail("");
			setName("");
		}
	}
	return (
		<>
			<h1>This is React WebApp, let's create a Tagebuch for Schorschy</h1>
			<form action="">
				<input type="text" placeholder="name"
				value={name} onChange={(e) => setName(e.target.value)} />
				<input type="email" placeholder="email"
				value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type="submit"
				onClick={handleOnSubmit}>submit</button>
			</form>
			<h2>{test}</h2>

			Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>Create Account</button>

		</>
	);
}

export default App;







// import React, { Component } from 'react'
// import './App.css'
// class App extends Component {
//   state = {
//     cow: '',
//     text: ''
//   }
// componentDidMount() {
//     this.fetchCow()
//   }
// fetchCow = async () => {
//     const response = await fetch(`/api/cow`)
//     const initialCow = await response.json()
//     const cow = initialCow.moo
//     this.setState({ cow })
//   }
// customCow = async evt => {
//     evt.preventDefault()
//     const text = this.state.text
//     const response = await fetch(`/api/cow/${text}`)
//     const custom = await response.json()
//     const cow = custom.moo
//     this.setState({ cow, text: '' })
//   }
// handleChange = evt => {
//     this.setState({ [evt.target.name]: evt.target.value })
//     console.log(this.state.text)
//   }
// render() {
//     return (
//       <div className="App">
//         <h3>Text Cow. Moo</h3>
//         <code>{this.state.cow}</code>
//         <form onSubmit={this.customCow}>
//           <label>Custom Cow Text:</label>
//           <input
//             type="text"
//             name="text"
//             value={this.state.text}
//             onChange={this.handleChange}
//           />
//           <button type="submit">Show me a talking cow!</button>
//         </form>
//       </div>
//     )
//   }
// }
// export default App
