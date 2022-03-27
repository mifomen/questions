import { DATA,points } from './data.js';
import { findItem,renderTextQuestion,renderAnswerArray,clearQuestionArea } from './utils.js'

const fremeInitGame = document.querySelector('.js-init-game');

document.querySelector('body').onselectstart = 'return false';
document.querySelector('body').onmousedown = 'return false';

const countQuestionBar = (countItems) => {
  const ul = document.createElement('ul');
  ul.className = 'progress-bar';

  if (document.querySelector('.js-init-game')) {
    document.querySelector('.js-init-game').appendChild(ul);
  }
  for (const countItem of countItems) {
    let obj;

    const button = document.createElement('button');
    button.className = 'progress-bar__item';
    button.textContent = `${countItem.id}`;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false'
    // button.addEventListener('click',)
    button.onclick = (evt) => {
      // evt.target.disabled = 'true';
      if (
        evt.target.classList.contains('progress-bar__item') &&
        !evt.target.classList.contains('progress-bar__item--active')
      ) {
        const activeBtnElement = document.querySelector(
          '.progress-bar__item--active'
        );
        evt.target.classList.add('progress-bar__item--active');
        activeBtnElement.classList.remove('progress-bar__item--active');
      }

      if (document.querySelector('.question-text')) {
        document.querySelector('.question-text').remove();
      }

      obj = findItem(DATA,evt.target.textContent);
      clearQuestionArea();
      renderTextQuestion(fremeInitGame,obj);
      renderAnswerArray(fremeInitGame, obj.arrayAnswers);
    };

    //here fucntio n gen answers
    ul.appendChild(button);
  }
  // console.log(`obj.arrayAnswers=${obj.arrayAnswers}`);
  // renderAnswerArray(ul,obj.arrayAnswers);
  document.querySelector('.progress-bar__item').classList.add('progress-bar__item--active');
    // const value = '1';
    // console.log(`findItem(DATA,1.toString())=${findItem(DATA,'1')}`)

    renderTextQuestion(fremeInitGame,findItem(DATA,'1'));
    const divUl = document.querySelector('.progress-bar')
    renderAnswerArray(fremeInitGame,findItem(DATA,'1').arrayAnswers);

    // const span = document.createElement('span');
  // span.className = 'question-text';
  // span.innerHTML = countItems[0].qustionText;
  // ul.appendChild(span);
};

countQuestionBar(DATA);
