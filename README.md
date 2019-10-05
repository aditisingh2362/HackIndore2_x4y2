# Hackindore
AgriTech is an effort to make the best use of the 2 of the most world-changing technologies, viz., Machine Learning and Blockchain to enhance the lives of farmers.

We use Machine Learning to predict the crop which would have the highest selling price given your location and month.

We extend this project using Blockchain to carry forward the supply chain, to help farmers receive all the revenue they are supposed to receive instead of those funds being stolen by middlemen.

# Steps to Reproduce
Pre Requisites :- Python, Scikit Learn, Pandas (for Machine Leraning Model) and Flask (for API).
Metamask Chrome Extension(to interact with the blockchain), Ganache(to create a local blockchain), Yarn(Package Manager), NPM(Package Manager), Truffle Environment(to Deploy Smart Contract).

Clone the repository and run ```npm install``` to install all the dependencies.
Make sure Ganache is up and running, metamask is connected to a private network HTTP://127.0.0.1:7545 and then run ```truffle compile``` and ```truffle migrate --reset``` to generate Address and ABI of the Smart Contract which will be available at build/contracts/kisaan.json. Copy the Address and ABI and paste the same in config.js.
Run ```python model.py``` and then ```python app.py``` to start the Flask server.
Run ```yarn start``` to run the React server.
