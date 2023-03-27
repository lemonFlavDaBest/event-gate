# dEvents
A solution for event ticketing. Gives users and event planners an easy interface to handle admissions for events.


## Project Description
dEvent is a dapp meant to be used for event ticketing in web3. Our aim is to bring you decentralized ticketing that is fast and easy. Events can created by anyone - all you need is a contract address(erc721 compliant) and a name for your event. It is meant to be very easy to setup, lightweight, and designed for mobile.

### For event planners:

1) Simply create your event with the correct contract address(ticket/nft address) you want to check for and an event name.
2) Once you want ticketing/admissions to begin, make sure your event has started in the contract, so that people can enter. This can be done easily through our ui.
3) Have the person in charge of admissions/ticketing navigate to url.../guard/YOUR_EVENT_ID.
4) Ask the entrant for their token id..... wait a couple seconds... and let them in

### For Attendants:
1) Make sure you have your token in the correct wallet and your token Id ready.
2) navigate to url.../entrance/YOUR_EVENT_ID. You will be able to get the event Id easily from the event or our UI.
3) Give your token Id to the admissions person prior to clicking enter event.
4) Click Enter Event ..... and you're ready to party!

## How it's Made
This project is designed as an L2 dapp because it requires the speed and cost that a L1 could not provide. The smart contract is mean to be cheap, lightweight, and quick. In order to work effectively, our dapp relies on Event/Emit in solidity and monitoring those events on the front end. By focusing on events in our smart contract, we make it cheaper and quicker for users.

Our project is a monorepo built from Scaffold-eth v2. As a one person team, I needed to be strategic about where I spent time. Scaffold-eth does a great job of being able to spin up smart contracts with a front end quickly. So, many thanks go out to Scaffold-eth for helping me in this project.
