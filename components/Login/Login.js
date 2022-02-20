import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { apiCall, BASE_PATH } from '../../lib/utils';
import styles from './login.module.css';

const toast_settings = {
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
            password: null,
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {

    }

    async onSubmit(evt) {
        evt.preventDefault();
        this.setState({loading: true})
        try {
            const auth = await apiCall(BASE_PATH + '/auth', 'POST', { 'Content-type': 'application/json' }, { email: this.state.email, password: this.state.password });
            if (!auth.error) {
                toast.success('Accesso effettuato', toast_settings);
                setTimeout(() => {
                    this.props.callback()
                    this.setState({loading: false})
                }, 1000);
                
            } else {
                toast.error('Credenziali errate!', toast_settings);
                this.setState({loading: false})
            }
            

        } catch (e) {
            consoler.error(e);
            toast.error('Credenziali errate!', toast_settings);
            this.setState({loading: false})
        }
    }

    onChange(evt) {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <>
                <ToastContainer />
                <form onSubmit={(e) => this.onSubmit(e)} className={styles.form}>
                    <label htmlFor='email'><small>Email</small>
                        <input id="email" type="email" name="email" required placeholder="E-mail" onChange={(e) => this.onChange(e)} />
                    </label>
                    <label htmlFor="password"><small>Password</small>
                        <input id="passwrod" type="password" name="password" required placeholder="Password" onChange={(e) => this.onChange(e)} />
                    </label>
                    <button type="submit" disabled={this.state.loading} name="login">{!this.state.loading ? 'Login' : 'Attendi'}</button>
                   
                </form>
            </>
        );
    }
}

export default Login;