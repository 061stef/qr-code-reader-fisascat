import React, { Component } from 'react';
import dynamic from "next/dynamic";
import { apiCall } from '../../lib/utils';
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });
import styles from './qrReader.module.css'

export default class ReaderQr extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleScan = async (data) => {
        if (data) {
            this.setState({
                value: data
            })
            try {
               await this.props.callback(data)
            } catch (err) {
                console.error(err);
                await this.props.callback(data);
            }
        }
    }

    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <div className={styles.container}>
                <QrReader
                    facingMode='front'
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.value}</p>
            </div>
        );
    }
}

