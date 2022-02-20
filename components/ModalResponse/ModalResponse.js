import React, { Component } from 'react';
import styles from './modalResponse.module.css'
import { FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

class ModalResponse extends Component {
    render() {
        const {status, message} = this.props;
        return (
            <div className={styles.modal}>
                {status > 300 ? <FaTimes size={30} color={'#ff5555'} /> : status < 300 ? <FaCheck size={30} color={'#2b7e3e'} /> : <FaExclamationTriangle size={30} color={'#f5cc0d'} />}
                {status > 300 ? <div>{message}</div> : status < 300 ? <div>Successo</div> : <div>Warning</div>}
            </div>
        );
    }
}

export default ModalResponse;