import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import {apiCall, BASE_PATH} from '../../lib/utils'

const toast_settings =  {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        
    }
   
    async onSubmit(evt) {
        evt.preventDefault();
        try{
            const auth = await apiCall(BASE_PATH + '/auth', 'POST', {'Content-type': 'application/json'}, {username: this.state.email, password: this.state.password});
            if(!auth.error){
                toast.success('Accesso effettuato', toast_settings);
                setTimeout(() => {
                    this.props.callback
                }, 1000);
            }else{
                toast.error('Credenziali errate!', toast_settings);
            }
            
        }catch(e){
            consoler.error(e);
            toast.error('Credenziali errate!', toast_settings);
        }
    }

    onChange(evt){
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <>
            <ToastContainer />
            <form onSubmit={(e) => this.onSubmit(e)}>
                <label><small>Email</small></label>
                <input type="email" name="email" placeholder="E-mail" onChange={(e) => this.onChange(e)} />
                <label><small>Password</small></label>
                <input type="password" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
                <button type="submit" name="login">Login</button>
            </form>
            </>
        );
    }
}

export default Login;