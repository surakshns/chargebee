import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const urlEncode = function(data) {
  var str = [];
  for (var p in data) {
      if (data.hasOwnProperty(p) && (!(data[p] == undefined || data[p] == null))) {
          str.push(encodeURIComponent(p) + "=" + (data[p] ? encodeURIComponent(data[p]) : ""));
      }
  }
  return str.join("&");
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {cbInstance: window.Chargebee.init({
      site: "clinikk-test"
    })};

    this.state.cbInstance.setPortalSession(() => {
      // we have used axios for performing http requests
            // Hit your end point that returns portal session object as response
      // This sample end point will call the below api
      // https://apidocs.chargebee.com/docs/api/portal_sessions#create_a_portal_session
      return axios.post("https://db92-2401-4900-3698-8ea9-d4de-c297-573c-2ec.ngrok.io/api/generate_portal_session", urlEncode({})).then((response) => response.data);
    });

    this.handleCheckout = this.handleCheckout.bind(this);
  }
  
  handleCheckout() {
    this.state.cbInstance.openCheckout({
      hostedPage() {
        return axios.post("https://db92-2401-4900-3698-8ea9-d4de-c297-573c-2ec.ngrok.io/api/generate_checkout_new_url", urlEncode({plan_id: "cbdemo_scale"})).then((response) => response.data)
      },
      success(hostedPageId) {
        console.log(hostedPageId);
      },
      close() {
        console.log("checkout new closed");
      },
      step(step) {
        console.log("checkout", step);
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="bodyContainer">
          <a href="#" onClick={this.handleCheckout}>Subscribe</a>
        </div>
      </div>
    );
  }
}

export default App;
