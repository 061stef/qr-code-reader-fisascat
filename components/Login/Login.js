import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";


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
        toast.success('OK!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
   
    async onSubmit(evt) {
        evt.preventDefault();
        try{
            
        }catch(e){
            consoler.error(e);
            toast.error('Utente non esistente!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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