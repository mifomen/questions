import { DATA } from "./DATA.js";

// document.title='asd'
// const btnStartTest = document.querySelector('.btn-start-test');
// btnStartTest.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   document.querySelector('.frame-init-game').remove();
//   document.querySelector('.js-init-game').classList.remove('hidden')
// })

const fremeInitGame = document.querySelector(".js-init-game");
const showQuestion = (DATA, evt) => {
  // console.log(`item.includes(evt.target)={item.includes(evt.target)}`);
  // for (const item of items) {
  //   const h2 = document.createElement('h2');
  //   h2.className = 'progress-bar';
  //   h2.textContent = item.qustionText;
  //   document.querySelector('.js-init-game').appendChild(h2);
  // }
  // console.log()
};

const renderAnswerArray = (parent, arrayAnswers) => {
  for (let answer of arrayAnswers) {
    const span = document.createElement("span");
    span.className = "answer";
    span.textContent = answer;
    parent.appendChild(span);
  }
};

const countQuestionBar = (countItems) => {
  const ul = document.createElement("ul");
  ul.className = "progress-bar";

  if (document.querySelector(".js-init-game")) {
    document.querySelector(".js-init-game").appendChild(ul);
  }
  for (const countItem of countItems) {
    let obj;

    const li = document.createElement("li");
    li.className = "progress-bar__item";
    li.textContent = `${countItem.id}`;
    li.onclick = (evt) => {
      if (
        evt.target.classList.contains("progress-bar__item") &&
        !evt.target.classList.contains("progress-bar__item--active")
      ) {
        const activeBtnElement = document.querySelector(
          ".progress-bar__item--active"
        );
        evt.target.classList.add("progress-bar__item--active");
        activeBtnElement.classList.remove("progress-bar__item--active");
      }

      if (document.querySelector(".question-text")) {
        document.querySelector(".question-text").remove();
      }

      DATA.forEach((item) => {
        if (item.id.toString() === evt.target.textContent) {
          obj = item;
        }
      });

      const span = document.createElement("span");
      span.className = "question-text";
      span.innerHTML = obj.qustionText;
      fremeInitGame.appendChild(span);

      if (document.querySelector(".area-choose-answer")) {
        document.querySelector(".area-choose-answer").remove();
      }

      const div = document.createElement("div");

      if (obj.arrayAnswers <= 4) {
        div.className = "area-choose-answer grid-3x3";
      } else {
        div.className = "area-choose-answer grid-2x2";
      }
      fremeInitGame.appendChild(div);

      renderAnswerArray(div, obj.arrayAnswers);
      // for (let answer of obj.arrayAnswers) {
      //   const span = document.createElement('span');
      //   span.className = 'answer';
      //   span.textContent = answer;
      //   div.appendChild(span);
      // }
    };

    //here fucntio n gen answers
    ul.appendChild(li);
  }
  // console.log(`obj.arrayAnswers=${obj.arrayAnswers}`);
  // renderAnswerArray(ul,obj.arrayAnswers);
  document
    .querySelector(".progress-bar__item")
    .classList.add("progress-bar__item--active");

  // const span = document.createElement("span");
  // span.className = "question-text";
  // span.innerHTML = countItems[0].qustionText;
  // ul.appendChild(span);
};

countQuestionBar(DATA);
