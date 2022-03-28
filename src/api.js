import { DATA,points } from './data.js';
import { shuffleArray,findItem,renderTextQuestion,renderAnswerArray,clearQuestionArea } from './utils.js';

const randomLineQuests = shuffleArray(DATA);
const btnStartTest = document.querySelector('.btn-start-test');


const countQuestionBar = (countItems) => {
  const ul = document.createElement('ul');
  ul.className = 'progress-bar';

  if (document.querySelector('.js-init-game')) {
    document.querySelector('.js-init-game').appendChild(ul);
  }

  for (let j=1; j<= randomLineQuests.length; j++) {
    const button = document.createElement('button');
    button.className = 'progress-bar__item';
    button.textContent = j;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false'
    button.disabled = 'true';
    ul.appendChild(button);
  }
};


const startGame = () => {
  document.querySelector('.frame-init-game').classList.add('hidden');
  countQuestionBar(DATA);
  document.querySelector('.js-init-game').classList.remove('hidden');
  document.querySelector('.progress-bar__item').classList.add('progress-bar__item--active');
  const fremeInitGame = document.querySelector('.js-init-game');
  renderTextQuestion(fremeInitGame,randomLineQuests[0]);
  const divUl = document.querySelector('.progress-bar'); //render 1 question
  renderAnswerArray(randomLineQuests,fremeInitGame,randomLineQuests[0].arrayAnswers);

  if (!localStorage.userName) {

    localStorage.userName = document.querySelector('.tester-info').value;
  };
  // localStorage.userName
};

btnStartTest.addEventListener('click',startGame);


document.querySelector('body').onselectstart = 'return false';
document.querySelector('body').onmousedown = 'return false';

const stateBtnStartTest = (value) => {
  const btn = document.querySelector('.js-btn-start');
  if (value > 0 ) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

const valueToArray = function(item) {
  return item.value.split(' ');
};

const templateData = /[A-Za-zА-Яа-яЁё]/;

const testName = (item) => {
  if (templateData.test(item)) {
    return true;
  }
};

const checkEveryName = (item) => {
  if ( item.length > 3 ) {
    return(valueToArray(item).every(testName));
  }
};

const inputTesterName = document.querySelector('.tester-info');
inputTesterName.focus();
inputTesterName.addEventListener('input', () => {
  const valueLength = inputTesterName.value.length;



  if ( valueToArray(inputTesterName).length >= 2 && valueToArray(inputTesterName)[1].length >= 2 ) {
    inputTesterName.value = inputTesterName.value.trim();
    document.querySelector('.js-btn-start').disabled = false;
  } else {
    document.querySelector('.js-btn-start').disabled = true;
    inputTesterName.setCustomValidity('Должно быть только фамилия и имя, 2 слова');
  }

  inputTesterName.reportValidity();
});
