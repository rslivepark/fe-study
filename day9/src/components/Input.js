import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

export const Input = ({ onAddExpense }) => {
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const chargeInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random(), // 고유한 ID 생성
      charge: charge,
      amount: amount,
    };
    onAddExpense(newExpense);
    setAmount('');
    setCharge('');
    chargeInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>항목</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            ref={chargeInputRef}
            placeholder='예) 버스'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>금액</label>
          <input
            type='text'
            className='form-control'
            id='amount'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='예) 1500'
          ></input>
        </div>
      </div>
      <button type='submit' className='btn'>
        입력 <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
      </button>
    </form>
  );
};
