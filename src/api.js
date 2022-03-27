import { DATA,points } from './data.js';
import { shuffleArray,findItem,renderTextQuestion,renderAnswerArray,clearQuestionArea } from './utils.js'

const fremeInitGame = document.querySelector('.js-init-game');
// const randomLineQuests = shuffleArray(DATA);
// console.log(`DATA=${DATA[0].qustionText} \n randomLineQuests=${randomLineQuests[0].qustionText}`)

document.querySelector('body').onselectstart = 'return false';
document.querySelector('body').onmousedown = 'return false';

const countQuestionBar = (countItems) => {
  const ul = document.createElement('ul');
  ul.className = 'progress-bar';

  if (document.querySelector('.js-init-game')) {
    document.querySelector('.js-init-game').appendChild(ul);
  }

  const randomLineQuests = shuffleArray(countItems);

  for (let j=1; j<= randomLineQuests.length; j++) {
    const button = document.createElement('button');
    button.className = 'progress-bar__item';
    button.textContent = j;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false'
    button.disabled = 'true';
    ul.appendChild(button);
  }
  document.querySelector('.progress-bar__item').classList.add('progress-bar__item--active');
  renderTextQuestion(fremeInitGame,randomLineQuests[1]);
  const divUl = document.querySelector('.progress-bar'); //render 1 question
  renderAnswerArray(randomLineQuests,fremeInitGame,randomLineQuests[1].arrayAnswers);
};

countQuestionBar(DATA);
