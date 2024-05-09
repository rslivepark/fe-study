import React, { useEffect } from 'react';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 지정된 시간(1초) 후에 onClose 콜백 호출하여 알림 닫기
    }, 1000); // 1초 후에 알림 창을 자동으로 닫음

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어하여 메모리 누수 방지
  }, [onClose]);

  return (
    <div className='alert show'>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
