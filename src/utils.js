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

export {findItem,renderAnswerArray}
