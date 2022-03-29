const findItem = function (items, resolve) {
  return items.find(item => item.id.toString() === resolve);
};

const findItemByText = function (items, resolve) {
  return items.find(item => item.qustionText.toString() === resolve);
};

const getRandomInt = (min, max) => {
  if (min >= max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const clearQuestionArea = () => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }
  if (document.querySelector('.question-text')) {
    document.querySelector('.question-text').remove();
  }
}

const renderTextQuestion = (parent, data) => {
  const span = document.createElement('span');
  span.className = 'question-text';
  span.innerHTML = data.qustionText;
  span.onselectstart = 'return false';
  span.onmousedown = 'return false';
  parent.appendChild(span);
}

const shuffleArray = (basicArray) => {
  let newArr = new Array();
  for (let elementBasicArray of basicArray) {
    newArr.push(elementBasicArray);
  }
  return newArr.sort(() => Math.random() - 0.5);
  // return newArr;
};

// // установить значение для ключа
// localStorage.test = 2;
// // получить значение по ключу
// alert( localStorage.test ); // 2
// // удалить ключ
// delete localStorage.test;

let i = 0;

const choosenAnswers = [];
const renderAnswerArray = (data, parent, item) => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }

  const div = document.createElement('div');
  div.classList.add('area-choose-answer');
  if (item.length <= 4) {
    div.classList.add('grid-2x2');
  } else {
    div.classList.add('grid-3x3');
  }

  for (const answer of shuffleArray(item)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.textContent = answer;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false';

    button.onclick = (evt) => {
      document.querySelector('.progress-bar__item--active').disabled = 'true';
      // localStorage.testValue = evt.target.textContent;
      choosenAnswers.push(evt.target.textContent);
      clearQuestionArea();
      const allProgressItems = document.querySelectorAll('.progress-bar__item');

      console.log(`i=${i} allProgressItems.length=${allProgressItems.length} allProgressItems=${allProgressItems[0]}`);

      // if (i !== allProgressItems.length) {
        allProgressItems[i].classList.add('progress-bar__item--active');
        let obj = findItemByText(data, data[i].qustionText);
        renderTextQuestion(document.querySelector('.js-init-game'), obj);
        renderAnswerArray(data, document.querySelector('.js-init-game'), obj.arrayAnswers);
      // }

      if (i >= allProgressItems.length) {
        clearQuestionArea();
        showAnswers(data, choosenAnswers);
      }


      i++;
    }

    div.appendChild(button);
  }
  parent.appendChild(div);

};

const showLocal = () => {
  for (let key in localStorage) {
    console.log(`key=${key}`);
  }
};

const DATA_GET_URL = './questions.json';

const getData = (onSuccess) => {
  fetch(DATA_GET_URL)
    .then((response) => response.json())
    .then((questionsArray) => {
      onSuccess(questionsArray);
    });
};


const showAnswers = (arrayRightAnswer, arrayGetAnswer) => {

  document.querySelector('.js-init-game').classList.add('hidden');

  const div = document.createElement('div');
  div.className = 'frame-resault-game';
  div.onselectstart = 'return false';
  div.onmousedown = 'return false';


  for (let i = 0; i <= arrayGetAnswer.length; i++) {
    const spanElement = document.createElement('span');
    spanElement.classList.add('resaultAnswer');
    spanElement.onselectstart = 'return false';
    spanElement.onmousedown = 'return false';

    // console.log(`arrayGetAnswer.length=${arrayGetAnswer.length}`);
    // console.log(`'arrayRightAnswer[0]=${arrayRightAnswer[0]} arrayRightAnswer[15]=${arrayRightAnswer[15]}`)

    // console.log(`arrayRightAnswer.length=${arrayRightAnswer.length}`);

    if (choosenAnswers[i] === arrayRightAnswer[i].arrayAnswers[1]) {
      // console.log(`i=${i} === solve right`);
      spanElement.classList.add('rightResaultAnswer');
      spanElement.innerHTML = `В вопросе №${i + 1}. Ваш ответ правильный:   <span class="corrent-answer">${arrayRightAnswer[i].arrayAnswers[1]}</span>`;
    } else {
      spanElement.classList.add('loseResaultAnswer');
      spanElement.innerHTML = `В вопросе №${i + 1}. Ваш ответ неправильный:  <span class="not-corrent-answer">${arrayGetAnswer[i]}</span>`;
    }

    div.appendChild(spanElement);
  }


  document.body.appendChild(div);

  console.log(`choosenAnswers=${choosenAnswers[0]} choosenAnswers.length=${choosenAnswers.length}`);
  // console.log(`arrayGetAnswer=${arrayGetAnswer} arrayGetAnswer.length=${arrayGetAnswer.length}`);
  // console.log(`arrayRightAnswer=${arrayRightAnswer} arrayRightAnswer.length=${arrayRightAnswer.length}`);



  // console.log(`arrayRightAnswer=${arrayRightAnswer.arrayAnswers[1]}`);

};


export { getData, showLocal, findItem, clearQuestionArea, shuffleArray, renderTextQuestion, getRandomInt, renderAnswerArray };
