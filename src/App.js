import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      email: '',
      image: null,
      users: []

     }
  }

  componentDidMount() {
    this.getData()
    
  }

  getData = () => {

    axios.get('http://localhost:3001/api/users')
    .then(res => {
      this.setState(prevState => {
        this.setState({ users: res.data.users})
      })
    })
    .catch(err => console.log(err))

  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleImageChange = e => {
    this.setState({image: e.target.files[0]})
  }

  handleOnSubmit = e => {
    const data = new FormData()

    data.append('user_data', JSON.stringify({name: this.state.name, email: this.state.email}))
    data.append('user_image', this.state.image)

    axios.post('http://localhost:3001/api/users', data ,{
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
  })
  .then(res => {
    this.getData()
  })
  .catch(err => console.log(err))
  }

  handleDelete = id => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then(() => this.getData())
      .catch(err => console.log(err))

  }
  

  render() { 
    return ( 
      <div>
        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
        <input type="email" name="email" onChange={this.handleChange} value={this.state.email}/>
        <input type="file" name="image" onChange={this.handleImageChange}/>
        <button onClick={this.handleOnSubmit}>submit</button>

        {this.state.users.map((user, i) =>(
          <div key={i}>
              <p> nama gw : {user.name} </p>
              <p> email : {user.email} </p>
              <img src={`https://albetmonmon.s3.amazonaws.com/${user.image}`} />
              <button onClick={() => this.handleDelete(user.id)}> Delete </button>
          </div>
        ) )}
      </div>
     );
  }
}
 
export default App;


