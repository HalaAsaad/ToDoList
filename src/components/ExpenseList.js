import React from 'react';
import { Item } from '.';
import {MdDelete} from 'react-icons/md'

const ExpenseList = ({expense,clearItems,handleDelete,handleEdit}) => {
    return (
        <>
            <ul className='list'>
                {expense.map(expense => {
                    return (
                      <Item 
                      key={expense.id}
                      expense={expense} 
                      handleDelete={handleDelete}
                      handleEdit={handleEdit} />
                      );
                })}
            </ul>
            {expense.length > 0 && <button className='btn' onClick={clearItems}>
                clear expenses
                <MdDelete className='btn-icon' />
                </button>}
        </>
    );
}
 
export default ExpenseList;