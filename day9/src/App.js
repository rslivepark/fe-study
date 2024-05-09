import React, { useState } from 'react';
import './App.css';
import { Input } from './components/Input';
import { List } from './components/List';
import Alert from './components/Alert';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [alert, setAlert] = useState(null);

  // 아이템 추가 시 총 지출 업데이트
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setTotalExpense(totalExpense + parseInt(newExpense.amount));
    setAlert('아이템이 추가되었습니다!'); // 아이템 추가 메시지 설정
  };

  // 아이템 수정 시 총 지출 업데이트
  const handleEditExpense = (editedExpense) => {
    const index = expenses.findIndex(
      (expense) => expense.id === editedExpense.id
    );
    if (index !== -1) {
      const updatedExpenses = [...expenses];
      updatedExpenses[index] = editedExpense;
      setExpenses(updatedExpenses);
      setAlert('아이템이 수정되었습니다!'); // 아이템 수정 메시지 설정
      updateTotalExpense(updatedExpenses); // 수정된 금액을 반영하여 총 지출 업데이트
    }
  };

  // 수정된 금액을 반영하여 총 지출 업데이트
  const updateTotalExpense = (updatedExpenses) => {
    const total = updatedExpenses.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );
    setTotalExpense(total);
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {alert && <Alert message={alert} onClose={handleCloseAlert} />}

      <h1>지출 계산기</h1>
      <main className='App'>
        <Input
          onAddExpense={addExpense}
          onEditExpense={handleEditExpense} // onEditExpense props 전달
        ></Input>
        <List
          expenses={expenses}
          onEditExpense={handleEditExpense} // onEditExpense props 전달
        ></List>
      </main>
      <h1>
        총지출
        <span className='total'> {totalExpense} </span>원
      </h1>
    </>
  );
}

export default App;
