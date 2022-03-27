const findItem = function (items,resolve) {
  return items.find( item => item.id.toString() === resolve );
};

const findItemByText = function (items,resolve) {
  return items.find( item => item.qustionText.toString() === resolve );
};

const getRandomInt = (min, max) => {
  if (min >= max) {
    return Math.floor(Math.random() * ( min - max + 1 )) + max;
  }
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
};

const clearQuestionArea = () => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }
  if (document.querySelector('.question-text')) {
    document.querySelector('.question-text').remove();
  }
}

const renderTextQuestion = (parent,data) => {
  const span = document.createElement('span');
  span.className = 'question-text';
  span.innerHTML = data.qustionText;
  span.onselectstart = 'return false';
  span.onmousedown = 'return false';
  parent.appendChild(span);
}

const shuffleArray = ( basicArray ) => {
  let newArr = new Array();
  for (let elementBasicArray of basicArray ) {
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

let i = 2;
const renderAnswerArray = (data,parent,item) => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }

  const div = document.createElement('div');
  div.classList.add('area-choose-answer');
  if ( item.length <= 4) {
    div.classList.add('grid-2x2');
  } else {
    div.classList.add('grid-3x3');
  }

  for ( const answer of shuffleArray(item) ) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.textContent = answer;
    button.onselectstart="return false";
    button.onmousedown="return false"

    button.onclick = (evt) => {

      clearQuestionArea();
      document.querySelector('.progress-bar__item--active').disabled = 'true';

      if ( item[0] === evt.target.textContent ) {
        console.log(`item[0]=${item[0]}`);
        console.log(`Вы выбрали 1 вариант ответа и он верный`);
        localStorage.test = 2;
      }
      const allProgressItems = document.querySelectorAll('.progress-bar__item');

      allProgressItems[i].classList.add('progress-bar__item--active');

      let obj = findItemByText(data,data[i].qustionText);
      renderTextQuestion(document.querySelector('.js-init-game'),obj);
      renderAnswerArray(data,document.querySelector('.js-init-game'), obj.arrayAnswers);
      i++;
      if (i >= allProgressItems.length) {
        clearQuestionArea();
      }
    };
    div.appendChild(button);
  }
  parent.appendChild(div);

};

export {findItem,clearQuestionArea,shuffleArray,renderTextQuestion,getRandomInt,renderAnswerArray};
