import React, { Component } from 'react';
import styles from './modalResponse.module.css'
import { FaCheck, FaTimes, FaExclamationTriangle, FaQrcode } from 'react-icons/fa';

class ModalResponse extends Component {
    render() {
        const {status, message, callback} = this.props;
        return (
            <div className={styles.modal}>
                {status > 300 ? <FaTimes size={30} color={'#ff5555'} /> : status < 300 ? <FaCheck size={30} color={'#2b7e3e'} /> : <FaExclamationTriangle size={30} color={'#f5cc0d'} />}
                {status > 300 ? <div><strong>{message}</strong></div> : status < 300 ? <div><strong>Presenza registrata, il delegato può accedere al congresso</strong></div> : <div><strong>L'utente ha già effettuato il check-in</strong></div>}
                <div onClick={callback} className={styles.button}><FaQrcode /> Scannerizza nuovo QrCode </div>
            </div>
        );
    }
}

export default ModalResponse;