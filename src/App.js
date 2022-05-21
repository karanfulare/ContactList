import React, { useEffect, useState } from "react";
import { Button,Table } from "react-bootstrap";


function App() {
  ///here we are using usestate hook to handle state 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

/// these are for update form
  const [id,setId]=useState();
  const [updatename, setNameupdate] = useState("");
  const [updateemail, setEmailupdate] = useState("");
  const [updatephone, setPhoneupdate] = useState("");
  /// using this to show/hide update form 
  const[show,setshow]=useState(false);
  const [user,setuser]=useState('');
  const [data, setData] = useState([]);

  // using this hook it will run after every render and state change 
  //we are calling our function  which get us data here so it updates data every time on state change
  useEffect(() => {
    getuser();
  }, []);

  /////////////// GET REQUEST ///////////////
  // this function will get the data , used GET request here 
  function getuser() {
    fetch("https://jsonplaceholder.typicode.com/users").then((results) => {
      results.json().then((resp) => {
        console.log(resp);
        setData(resp);
        setuser(resp)
        setNameupdate(resp[0].name);
        setEmailupdate(resp[0].email);
        setPhoneupdate(resp[0].phone);
        setId(resp[0].id);
      });
    });
  }

 /////////////// POST REQUEST ///////////////
 // this function will post/send data to server, used POST request here
 // we can not see the change on screen because we are not allowed to write to the server
 // but we do get a response , we can see it in networks tab on clicking the req 
  function saveuser() {
    console.log({ name, email, phone });
    let data = { name, email, phone };
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((results) => console.log(results));
  }

/////////////// DELETE REQUEST ///////////////
// here we send delete req to server again we are not allowed to write to server ,
// but we get a response 

  function deleteuser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then((results) => {
      results.json().then((res) => {
        console.log(res);
        getuser();
      });
    });
  }

/////////////// PUT REQUEST ///////////////
// here we are doing two things firstly in the selectuser function we are filling the respective data
// on which the update call is made into our update form 
  function  selectuser(id) {
    console.log(user[id-1]);
    setNameupdate(user[id-1].name);
        setEmailupdate(user[id-1].email);
        setPhoneupdate(user[id-1].phone);
        setId(user[id-1].id);
  }

  // here we are doing our put req .
  function updateuser(id){
    console.log(updatename,updatephone,updateemail,id);
    let name = updatename;
    let phone =updatephone;
    let email=updateemail;
    let data = {name,email,phone,id};
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': "application/json",
        'Content-type': "application/json"
      },
      body: JSON.stringify(data)
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp);
      })
    }
    );
  }

  ////////////////////////////////////////// on screen elements ///////////////////////////////////////////////
  return (
    <div  className="app">
      <div className="data">
        <div className="datatable">
        <h2>Contact List </h2>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Mobile</td>
                  <td>Operations</td>
                </tr>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>  <Button variant="danger" onClick={() => deleteuser(item.id)} > Delete</Button>
                     <Button variant="seondary" onClick={() => {selectuser(item.id)
                    setshow(true)}}> Update </Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
</div>
      </div>
      <div className="input">
      <hr></hr>
      <div className="adduser">
      <input type="text"  value={name}  onChange={(e) => setName(e.target.value)} name="name"  placeholder="name"  />
      <br />
      <br />
      <input  type="text" value={email}  onChange={(e) => setEmail(e.target.value)} name="email" placeholder="email"  />
      <br />
      <br />
      <input type="text"  value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" placeholder="phone" />
      <br />
      <br />
      <Button variant="success" type="button" onClick={saveuser}>Add new User  </Button>
      
      </div>
      {show?<div className="update">
        <input type="text" placeholder="enter name" value={updatename}  onChange={(e)=>setNameupdate(e.target.value)}/>
        <br /> <br />
        <input type="text" placeholder="enter email" value={updateemail}  onChange={(e)=>setEmailupdate(e.target.value)}/>
        <br /> <br />
        <input type="text" placeholder="enter phone" value={updatephone} onChange={(e)=>setPhoneupdate(e.target.name)} />
        <br />  <br />
        <Button onClick={()=>updateuser(id)}> Update User</Button>
      </div>:null}
      
      </div>
    </div>
  )
        }

export default App;
