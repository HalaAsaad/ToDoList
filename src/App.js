import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { Alert, Form, List } from './components';
import { v4 as uuidv4 } from 'uuid';
/*
const initialExpense =[
  { id: uuidv4(), charge: "rent",amount: 1600 },
  { id: uuidv4(), charge: "car payment",amount: 400 },
  { id: uuidv4(), charge: "credit card bill",amount: 1200}
];
*/
const initialExpense = localStorage.getItem('expense') 
? JSON.parse(localStorage.getItem('expense'))
: [] ;
function App() {
  const [expense ,setExpense] = useState(initialExpense);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit ,setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect (()=> {
    localStorage.setItem('expense',JSON.stringify(expense))
  },[expense])
  const handleAlert = ({text,type}) => {
    setAlert({show:true, text,type});
    setTimeout (()=>{
      setAlert({show:false})
    },2000)
  }

  const handleCharge = e => {
    setCharge(e.target.value);
  }
  const handleAmount = e => {
    setAmount(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if ( charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expense.map(item => {
          return item.id === id ? {...item, charge,amount} : item
        })
        setExpense(tempExpense);
        setEdit(false);
        handleAlert({type:'success', text:'item edited'})
      } else {
        const singleExpense = {id: uuidv4(), charge, amount};
        setExpense([...expense, singleExpense]);
        handleAlert({type:'success', text:'item added'})
      }
      setCharge('');
      setAmount('');
    } else {
      // handle alert
      handleAlert({type:'danger',
       text:"charge cant't be empty value and amount value has to be bigger than zero"})
    }
  }

  const handleAdd = () => {
    if ( charge !== "" && amount > 0) {
      const singleExpense = {id: uuidv4(), charge, amount};
      setExpense([...expense, singleExpense]);
      handleAlert({type:'success', text:'item added'})
    } else {
      // handle alert
      handleAlert({type:'danger',
       text:"charge cant't be empty value and amount value has to be bigger than zero"})
    }
  }
  //clear all items
  const clearItems = () => {
    console.log("clear all items");
    setExpense([]);
    handleAlert({type:'danger', text:' all items deleted'})
  }
  //handle delete 
  const handleDelete  = (id) => {
    console.log(`item deleted ${id}`);
    const tempExpense = expense.filter(item => item.id !== id) ;
    setExpense(tempExpense);
    handleAlert({type:'danger', text:'item deleted'})
  }
  //handle edit
  const handleEdit  = (id) => {
    let itemExpense = expense.find(item => item.id === id)
    let {charge, amount} = itemExpense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className='App'>
        <Form 
          charge={charge}
          amount={amount}
          handleCharge={handleCharge} 
          handleAmount={handleAmount} 
          handleSubmit={handleSubmit} 
          edit={edit} />
        <List 
          expense={expense}
          clearItems={clearItems} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}/>
      </main>
      <h1>
        total spending : <span className='total'>
          $ {expense.reduce((acc, curr) => {
            return ( acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </Fragment>
  );
}

export default App;
