const generateButton = document.querySelector('.generate-pw');

generateButton.addEventListener('click', () => {
  const pwLengthInput = document.getElementById('pw-length');
  const pwLength = parseInt(pwLengthInput.value);

  const includeNumbers = document.getElementById('numbers').checked;
  const includeLowercase = document.getElementById('small-letters').checked;
  const includeUppercase = document.getElementById('capital-letters').checked;
  const includeSymbols = document.getElementById('symbols').checked;

  let characters = '';

  if (includeNumbers) characters += '0123456789';
  if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeSymbols) characters += '!@#$%^';

  let password = '';

  if (pwLength >= 5 && pwLength < 50) {
    for (let i = 0; i < pwLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const copyPaste = document.querySelector('.copy-paste');
    copyPaste.textContent = password;

    copyPaste.addEventListener('click', () => {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        console.error('클립보드에 접근할 수 없습니다.');
        return;
      }
      if (!password) {
        console.error('비밀번호가 생성되지 않았습니다.');
        return;
      }
      navigator.clipboard
        .writeText(password)
        .then(() => {
          const copiedAlert = document.createElement('div');
          copiedAlert.classList.add('copied-alert', 'active');
          copiedAlert.textContent = '복사!';
          document.body.appendChild(copiedAlert);
          setTimeout(() => {
            copiedAlert.remove();
          }, 1000);
        })
        .catch((err) => {
          console.error('비밀번호 복사 실패:', err);
        });
    });
  } else {
    const toastMessage = document.createElement('div');
    toastMessage.classList.add('toast-message');
    toastMessage.textContent = '5이상 숫자 입력하세요.';
    document.body.appendChild(toastMessage);
    setTimeout(() => {
      toastMessage.remove();
    }, 1000);
  }

  if (
    !(includeNumbers || includeLowercase || includeUppercase || includeSymbols)
  ) {
    const toastMessage = document.createElement('div');
    toastMessage.classList.add('toast-message');
    toastMessage.textContent = '포함할 문자 하나 이상 선택해주세요.';
    document.body.appendChild(toastMessage);
    setTimeout(() => {
      toastMessage.remove();
    }, 1000);
  }

  pwLengthInput.focus();
  pwLengthInput.value = '';
});

const checkAll = document.querySelector('.checkAll');

let isChecked = false;

function updateCheckAllText() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const anyChecked = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );
  checkAll.textContent = anyChecked ? '선택 해제' : '전체 선택';
}

checkAll.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  isChecked = !isChecked;
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
  updateCheckAllText();
});

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const allChecked = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ).every((checkbox) => checkbox.checked);
    isChecked = allChecked;
    updateCheckAllText();
  });
});

updateCheckAllText(); // 페이지 로딩 시 전체 선택 상태 업데이트

checkAll.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  if (checkAll.textContent === '선택 해제') {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  } else if (checkAll.textContent === '전체 선택') {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
  updateCheckAllText();
});
