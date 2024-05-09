import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const Item = ({ expense, onDelete, onEditExpense }) => {
  // const { id, amount, charge } = expense;
  const { id, charge: initialCharge, amount: initialAmount } = expense;
  const [isEditing, setIsEditing] = useState(false);
  const [charge, setCharge] = useState(initialCharge);
  const [amount, setAmount] = useState(initialAmount);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedExpenses = {
      ...expense,
      charge,
      amount,
    };
    onEditExpense(updatedExpenses);
    setIsEditing(false);
  };

  return (
    <li className='item'>
      {isEditing ? (
        <div className='info'>
          <input
            type='text'
            className='expense'
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          ></input>
          <input
            type='text'
            className='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
      ) : (
        <div className='info'>
          <span className='expense'>{charge}</span>
          <span className='amount'>{amount}</span>
        </div>
      )}

      <div>
        {isEditing ? (
          <button
            className='edit-btn'
            aria-label='save button'
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faPen} className='btn-icon' />
          </button>
        ) : (
          <button
            className='edit-btn'
            aria-label='edit button'
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}

        <button
          className='clear-btn'
          aria-label='delete button'
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
};
