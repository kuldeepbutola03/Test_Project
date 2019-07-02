import React, { Component } from 'react';
// import paytm from 'react-native-paytm';
// import paytm from 'react-native-paytm';
// import paytm from 'react-native-paytm';
// import paytm from 'react-native-paytm';


import {
  Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter,
  View
} from 'react-native';

// Data received from PayTM
const paytmConfig = {
  MID: 'ialDMt31687026429999',
  WEBSITE: 'Value from PayTM dashboard',
  CHANNEL_ID: 'WAP',
  INDUSTRY_TYPE_ID: 'Retail',
  CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='
};

// CALLBACK_URL
// String(255) Mandatory	Staging Environment: 
// "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>" 
// Production Environment: 
// "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>"
// Merchant_id  ialDMt31687026429999
// Secret Key CwRKD3o#Yl&xzhFJ

// QSEmQb71240204557720
// wq_ohWz7fdb1&X3g
export default class PaytmScreen extends Component {
  constructor(props) {
    super(props);
    this.emitter = null;
  }
  //  componentDidMount() {
  componentWillMount() {
    // if (Platform.OS === 'ios') {
    //   const { RNPayTm } = NativeModules;

    //   this.emitter = new NativeEventEmitter(RNPayTm);
    //   this.emitter.addListener('PayTMResponse', this.onPayTmResponse);
    // } else {
    //   DeviceEventEmitter.addListener('PayTMResponse', this.onPayTmResponse);
    // }
    // // setTimeout(function () {
    //   this.runTransaction('1', 'cust123', 'orderId123', '9729483089', 'gauravyadav333@gmail.com', '')
    // }, 100)

  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.emitter.removeListener('PayTMResponse', this.onPayTmResponse);
    } else {
      DeviceEventEmitter.removeListener('PayTMResponse', this.onPayTmResponse);
    }
  }

  onPayTmResponse = (resp) => {
    const { STATUS, status, response } = resp;

    if (Platform.OS === 'ios') {
      if (status === 'Success') {
        const jsonResponse = JSON.parse(response);
        const { STATUS } = jsonResponse;

        if (STATUS && STATUS === 'TXN_SUCCESS') {
          // Payment succeed!
        }
      }
    } else {
      if (STATUS && STATUS === 'TXN_SUCCESS') {
        // Payment succeed!
      }
    }
  };

  runTransaction(amount, customerId, orderId, mobile, email, checkSum) {
    // const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
    // const details = {
    //   mode: 'Staging', // 'Staging' or 'Production'
    //   MID: paytmConfig.MID,
    //   INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
    //   WEBSITE: paytmConfig.WEBSITE,
    //   CHANNEL_ID: paytmConfig.CHANNEL_ID,
    //   TXN_AMOUNT: `${amount}`, // String
    //   ORDER_ID: orderId, // String
    //   EMAIL: email, // String
    //   MOBILE_NO: mobile, // String
    //   CUST_ID: customerId, // String
    //   // CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility 
    //   CALLBACK_URL: callbackUrl,
    // };

    // paytm.startPayment(details);
  }
  render() {
    return <View />
  }
}