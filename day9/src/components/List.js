import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Item } from './Item';

export const List = ({ expenses, onDelete, onEditExpense }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map((expense) => (
          <Item
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEditExpense={onEditExpense}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={() => onDelete(null)}>
          전체 삭제
          <span className='trash-icon'>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </button>
      )}
    </>
  );
};
