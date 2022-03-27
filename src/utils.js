const findItem = function (items,resolve) {
  return items.find( item => item.id.toString() === resolve );
};

const getRandomInt = (min, max) => {
  if (min >= max) {
    return Math.floor(Math.random() * ( min - max + 1 )) + max;
  }
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
};

const shuffleArray = ( array   ) => {
  array.sort(() => Math.random() - 0.5);
};

const renderAnswerArray = (parent, arrayAnswers) => {
  const copyArrayAnswers = arrayAnswers;
  shuffleArray(copyArrayAnswers);
  for ( const answer of copyArrayAnswers ) {
    const span = document.createElement('span');
    span.className = 'answer';
    span.textContent = answer;
    parent.appendChild(span);
  }
};

export {findItem,getRandomInt,renderAnswerArray};
