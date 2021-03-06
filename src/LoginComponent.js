import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Card, Button, CardTitle, CardBody, Row, Col, Input, Label, Form, FormGroup } from 'reactstrap';
import { districts } from './data.js'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			authorityPassword: '',
			officialPassword: '',
			district: 'Mainpuri',
			market: 'Mainpuri',
			month: '7',
			prediction: '',
			modal: '',
			curDistrict:'',
			curMarket: '',
		};

		this.handleAuthorityLogin = this.handleAuthorityLogin.bind(this);
		this.handleOfficialLogin = this.handleOfficialLogin.bind(this);
		this.predict = this.predict.bind(this);
		// this.changedState = this.changedState.bind(this);
	}


	handleAuthorityLogin(){
		this.props.authorityLogin(this.state.authorityPassword);
	}

	handleOfficialLogin(){
		this.props.officialLogin(this.state.officialPassword);
	}

	predict(){
		
	    const details = {
	        district: this.state.curDistrict,
	        market: this.state.curMarket,
	        mth: this.state.month,
	    }
	    // console.log(JSON.stringify(details));
	    return fetch('http://localhost:5000/predict_api',{
	        method: 'POST',
	        body: JSON.stringify(details),
	        headers: { 
	            'Content-Type':'application/json',
	            "Access-Control-Allow-Origin": "*"
	        }
	    })
	    .then(response => response.json())
	      .then(text => {
	        this.setState({prediction: text[0]});
	        this.setState({modal: text[1]});
	        console.log(text);
	      })
	    .catch((err) => {
	        console.log(err);
	    })
	}


	

	render(){

		const changedMarket = (event) => {
			this.setState({
				curMarket: event.target.value
			})
		}

		const markets = (district) => district.markets.map( (market, i) => {
			return(
				<option key={i}>{market.name}</option>
			);
		});

		const getMarkets = districts.map( (district,i) => {
			if(district.name == this.state.curDistrict){
				return(
					<React.Fragment>
						<Row>
						<Label for="market" className = "col-md-5 my-auto">Select Market : </Label>
						<Input type="select" name="market" className = "col-md" id="market" onChange={changedMarket}>
							<option>Select Constituency</option>
				        	{markets(district)}
				        </Input>
				        </Row>
				    </React.Fragment>
				);
			}
			
		});

		const loadDistricts = districts.map( (district, i) => {
			return(
				<option key={i}>{district.name}</option>
			);
			
		});

		const changedDistrict = (event) => {
			this.setState({
				curDistrict: event.target.value,
				curMarket: ''
			})
		}

		return(
			<React.Fragment>
				<Row style={{ marginTop: "25vh"}}>
					<Col className="col-md-5 mx-5">
						<Card style={{borderColor: "black", borderWidth: "3px"}}>
							<CardTitle className="text-center" style={{backgroundColor: "#1b5e20", color: 'white', fontSize: 30}}>
								Central Authority Login
							</CardTitle>
							<CardBody>
								<Row>
									<Col className = "col-md-4 my-auto">
										Enter Password : 
									</Col>
									<Col className = "col-md">
										<Input placeholder="Password" type="password" onChange={(event) => this.setState({authorityPassword: event.target.value})}/>
									</Col>
								</Row>
								<Row style={{justifyContent: 'center'}} className="mt-3">
									<Button style={{backgroundColor: "#1b5e20"}} onClick={this.handleAuthorityLogin}>
										Login
									</Button>
								</Row>
							</CardBody>
						</Card>
					</Col>

					<Col className="col-md-5 mx-5">
						<Card style={{borderColor: "black", borderWidth: "3px"}}>
							<CardTitle className="text-center" style={{backgroundColor: "#1b5e20", color: 'white', fontSize: 30}}>
								Government Official Login
							</CardTitle>
							<CardBody>
								<Row>
									<Col className = "col-md-4 my-auto">
										Enter Password : 
									</Col>
									<Col className = "col-md">
										<Input placeholder="Password" type="password" onChange={(event) => this.setState({officialPassword: event.target.value})}/>
									</Col>
								</Row>
								<Row style={{justifyContent: 'center'}} className="mt-3">
									<Button style={{backgroundColor: "#1b5e20"}} onClick={this.handleOfficialLogin}>
										Login
									</Button>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
				
			</React.Fragment>
		);
	}
}

export default Login;