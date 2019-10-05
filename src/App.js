import React, { Component } from 'react';
import './App.css';

import Web3 from 'web3';
import { Keccak } from 'sha3';
import { Navbar, Nav, NavItem, Card, Button, CardTitle, CardBody, Row, Col, Input } from 'reactstrap';

import Login from './LoginComponent';
import Authority from './AuthorityComponent';
import Official from './OfficialComponent';
import { KISAAN_ABI, KISAAN_ADDRESS } from './config';


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            account: '',
            authorityLoggedIn: localStorage.getItem('al'),
            officialLoggedIn: localStorage.getItem('ol'),
            authorityPassword: localStorage.getItem('ap'),
            officialPassword: localStorage.getItem('op'),
        }

        this.authorityLogin = this.authorityLogin.bind(this);
        this.officialLogin = this.officialLogin.bind(this);
        this.addOfficial = this.addOfficial.bind(this);
        this.addFarmer = this.addFarmer.bind(this);
        this.payFarmer = this.payFarmer.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        // const hash = new Keccak(256);
        // hash.update('hello');
        // console.log(hash.digest('hex'));
        // localStorage.setItem('pass','abc');
        this.loadBlockchainData();
        // changePassword();
        // console.log(localStorage.getItem('pass'));

    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({account : accounts[0]});
        const kisaan = new web3.eth.Contract(KISAAN_ABI, KISAAN_ADDRESS);
        this.setState({kisaan});
    }

    authorityLogin(password){
        console.log(this.state.account);
        const hash = new Keccak(256);
        hash.update(password);
        this.state.kisaan.methods.ownerLogin(hash.digest('hex')).send({from: this.state.account})
        .once('transactionHash', (transactionHash) => {
            console.log(transactionHash);
            this.setState({authorityLoggedIn : true});
            this.setState({authorityPassword : hash.digest('hex')});
            localStorage.setItem('al',true);
            localStorage.setItem('ap',hash.digest('hex'));
        })
        .catch(err => console.log("ERROR OCCURRED" + err));
    }


    officialLogin(password){
        const hash = new Keccak(256);
        hash.update(password);
        this.state.kisaan.methods.officialLogin(hash.digest('hex')).send({from: this.state.account})
        .once('transactionHash', (transactionHash) => {
            console.log(transactionHash);
            this.setState({officialLoggedIn : true});
            this.setState({officialPassword : hash.digest('hex')});
            localStorage.setItem('ol',true);
            localStorage.setItem('op',hash.digest('hex'));
        })
        .catch(err => console.log("ERROR OCCURRED" + err));
    }

    logout(){
        localStorage.removeItem('ol');
        localStorage.removeItem('op');
        localStorage.removeItem('al');
        localStorage.removeItem('ap');
        this.setState({officialLoggedIn : false});
        this.setState({officialPassword : ''});
        this.setState({authorityLoggedIn : false});
        this.setState({authorityPassword : ''});
    }

    addOfficial(address,name,password,isValidator){
        const hash = new Keccak(256);
        hash.update(password);
        this.state.kisaan.methods.addOfficial(this.state.authorityPassword,address, name, hash.digest('hex'), isValidator).send({from: this.state.account})
        .once('transactionHash', async (transactionHash) => {
            console.log(transactionHash);           
        })
        .catch(err => console.log("ERROR OCCURRED" + err));
    }

    async addFarmer(address,name,password){
        const hash = new Keccak(256);
        hash.update(password);
        this.state.kisaan.methods.addFarmer(this.state.officialPassword,address, name, hash.digest('hex')).send({from: this.state.account})
        .once('transactionHash', async (transactionHash) => {
            console.log(transactionHash);
        })
        .catch(err => console.log("ERROR OCCURRED" + err));
    }

    async payFarmer(address, password, amount){
        const hash = new Keccak(256);
        hash.update(password);
        this.state.kisaan.methods.deposit().send({from: this.state.account, value: amount * Math.pow(10,18)})
        .once('transactionHash', async (transactionHash) => {
            console.log(transactionHash);
        })
        .catch(err => console.log("ERROR OCCURRED" + err));
        this.state.kisaan.methods.receivedGoods(this.state.officialPassword, hash.digest('hex'), address, amount).send({from: this.state.account})
        .once('transactionHash', async (transactionHash) => {
            console.log(transactionHash);

        })
        .catch(err => {
            console.log("ERROR OCCURRED" + err);
            this.state.kisaan.methods.withdraw(this.state.account).send({from: this.state.account})
            .once('transactionHash', async (transactionHash) => {
                console.log(transactionHash);
            })
            .catch(err => console.log("ERROR OCCURRED IN WITHDRAW" + err));
        });
    }

    render(){
        

        return (
            <React.Fragment>
                <img src = './images/bg.jpg' style={{position: "fixed", height: "100%", width: "100%", opacity: 0.5}}/>
                <Navbar style={{backgroundColor: "#1b5e20"}}>
                    <Nav className="flex-row" navbar>
                        <NavItem>
                            <h1 style={{color: "white"}}>AGRITECH</h1>
                        </NavItem>
                        <NavItem className="ml-auto">
                            {this.state.authorityLoggedIn || this.state.officialLoggedIn ? 
                             <Button color="primary" style={{marginLeft: 1050, marginTop: 10}} onClick={this.logout}>Logout</Button>
                            :
                            null
                            }
                        </NavItem>
                    </Nav>
                </Navbar>
                {!this.state.authorityLoggedIn && !this.state.officialLoggedIn 
                ?
                <Login authorityLogin={this.authorityLogin} officialLogin={this.officialLogin} />
                :
                this.state.authorityLoggedIn 
                ?
                <Authority addOfficial = {this.addOfficial}/>
                :
                this.state.officialLoggedIn
                ?
                <Official addFarmer = {this.addFarmer} payFarmer = {this.payFarmer}/>
                :
                null
                }
            </React.Fragment>   
            

        );
    }
}

export default App;
