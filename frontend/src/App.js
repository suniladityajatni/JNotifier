import './App.css';
import { useState } from 'react';
import axiosInstance from './axiosInstance';

function App() {
  const [email, setEmail] = useState('');
  const [sucess, setSucess] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  const handleClick = (e) => {
    e.preventDefault();
    console.log(email);
    axiosInstance.post("/user",{email}).then((res) => {

      setSucess(true);
    }).catch((err) => {
      setSucess(false);
      alert(err.response.data.msg);
      console.error(err);
    });
  }
  return (
    <div className="App">
      <h1><em>JNotifier</em></h1>
      <div className="Form">
        <form className="Form2">
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Subscribe</button>
          {sucess && <h2>Sucessfully Subscribed :)</h2>}
        </form>
      </div>
    </div >
  );
}

export default App;
