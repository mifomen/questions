import { DATA } from './DATA.js';

const fremeInitGame = document.querySelector('.js-init-game');

const findItem = (items,resolve) => {
  return items.find(item => item.id.toString() == resolve);
}


const renderAnswerArray = (parent, arrayAnswers) => {
  for (let answer of arrayAnswers) {
    const span = document.createElement('span');
    span.className = 'answer';
    span.textContent = answer;
    parent.appendChild(span);
  }
};

const countQuestionBar = (countItems) => {
  const ul = document.createElement('ul');
  ul.className = 'progress-bar';

  if (document.querySelector('.js-init-game')) {
    document.querySelector('.js-init-game').appendChild(ul);
  }
  for (const countItem of countItems) {
    let obj;

    const li = document.createElement('li');
    li.className = 'progress-bar__item';
    li.textContent = `${countItem.id}`;
    // li.addEventListener('click',)
    li.onclick = (evt) => {
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

      const span = document.createElement('span');
      span.className = 'question-text';
      span.innerHTML = obj.qustionText;
      fremeInitGame.appendChild(span);
      if (document.querySelector('.area-choose-answer')) {
        document.querySelector('.area-choose-answer').remove();
      }
      const div = document.createElement('div');
      if (obj.arrayAnswers <= 4) {
        div.className = 'area-choose-answer grid-3x3';
      } else {
        div.className = 'area-choose-answer grid-2x2';
      }
      fremeInitGame.appendChild(div);
      renderAnswerArray(div, obj.arrayAnswers);
    };

    //here fucntio n gen answers
    ul.appendChild(li);
  }
  // console.log(`obj.arrayAnswers=${obj.arrayAnswers}`);
  // renderAnswerArray(ul,obj.arrayAnswers);
  document
    .querySelector('.progress-bar__item')
    .classList.add('progress-bar__item--active');

  // const span = document.createElement('span');
  // span.className = 'question-text';
  // span.innerHTML = countItems[0].qustionText;
  // ul.appendChild(span);
};

countQuestionBar(DATA);
