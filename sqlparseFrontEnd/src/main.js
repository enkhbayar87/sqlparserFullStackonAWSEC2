import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
  state = {
    originalText: '',
    parseText: '',
    password: null,
    error: null,
    loading: false,
  }
  onHandleType = (e) => {
    const { name, value} = e.target;
    this.setState({[name]: value})
  }

  onHandleParser = () => {
    this.setState({
      error: null
    })
    axios.post('http://localhost:4000/api/v1/categories/', {
      originalText: this.state.originalText
    }).then(({ data }) => {
        this.setState({ parseText: data.parseText });
    }).catch((err) => {
      this.setState({ error: err.response.data.message })
    });
  }
    render() {
    return (
      <div>
            <div className='field' class="container is-max-desktop" >{ this.state.error }</div>
            <div className='field' class="container is-max-desktop pt-5">
                <label className='label'>Copy this text: SELECT a, b FROM test WHERE a = 5; </label>
            </div>
            <div className='field' class="container is-max-desktop">
                <label className='label' class= 'pt-5'>Input SQL:</label>
                <input value={this.state.originalText} className='input' name='originalText' type='text' onChange={this.onHandleType}/>  
            </div>   
            <div className='field' class="container is-max-desktop" >
                <button className='button is-link mt-3' onClick={this.onHandleParser}>Convert hashed query</button>
            </div>   
            <div className='field' class="container is-max-desktop mt-5">
                <label className='label'>Modified SQL:</label>
                <input value={this.state.parseText} className='input' name='parseText' type='text' onChange={this.handleType} />  
            </div>  
      </div>
    )
  }
}
