import React, { Component } from 'react';
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default class Reader extends Component {

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
                result: data
            })
            try{
                const response = await fetch(``)
            }catch(err){
                console.error(err);
            }
        }
    }

    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width:'50%'}}
                />
                <p>{this.state.value}</p>
            </div>
        );
    }
}

