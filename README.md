# Reward points calculator

Project created using [Create React App](https://github.com/facebook/create-react-app).

## Problem statement

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 

**Assumption:- The record could be of many years so displaying the records of the latest three months in descending order and combined points as per customer ID for the last three months.**

## Running the project

### Clone the project from github repository

`https://github.com/abhidig/RewardApp`

### Install the dependencies

`npm install`

### Run the app in development mode.

### Run the app in development mode.

`npm run start`

### Launch the test runner.

`npm run test`

The testcases file can be found in '/workspaces/Assign/src/RewardPointsCaluclator/_tests_/testCases.test.js'

 The code has passed below test cases

calculatePoints function

    ✓ renders User Monthly Rewards tab by default

    ✓ switches to Total Rewards tab
    
    ✓ switches to Transactions tab
    
    
### Build the app for production to the `build` folder.

`npm run build`

## Screen shots of application

### Application running state

**Assumption:- Application assumes that we have large data set and based on that we are processing the data and calculating the reward points.**

![App Screenshot](https://infosystechnologies-my.sharepoint.com/my?id=%2Fpersonal%2Fabhijeet%5Fdighe%5Fad%5Finfosys%5Fcom%2FDocuments%2FAttachments%2Fs1%2Epng&parent=%2Fpersonal%2Fabhijeet%5Fdighe%5Fad%5Finfosys%5Fcom%2FDocuments%2FAttachments&ga=1)
![App Screenshot](https://infosystechnologies-my.sharepoint.com/personal/abhijeet_dighe_ad_infosys_com/Documents/Attachments/s2.png?Web=1)
![App Screenshot](https://infosystechnologies-my.sharepoint.com/personal/abhijeet_dighe_ad_infosys_com/Documents/Attachments/s3.png?Web=1)


### Application error 

**We have created one component for error handling .**

## Sample data

To modify the json-server data, make changes to the file in public/data.json

Here is some dummy data to illustrate the transaction records:

```json
[
  {
    "customerId": "C998",
    "name": "Aaron Foster",
    "date": "2023-07-03",
    "month": "July",
    "product": "Product K",
    "amount": 162.6,
    "transactionId": "T998"
  },
  {
    "customerId": "C999",
    "name": "Fiona Kelly",
    "date": "2021-12-12",
    "month": "December",
    "product": "Product L",
    "amount": 313.9,
    "transactionId": "T999"
  },
  {
    "customerId": "C1000",
    "name": "Ethan James",
    "date": "2022-08-04",
    "month": "August",
    "product": "Product M",
    "amount": 138.92,
    "transactionId": "T1000"
  }
]
```



## Credits
List of contributors:
- Abhijeet Dighe - Developer (abhijeet.dighe@infosys.com)