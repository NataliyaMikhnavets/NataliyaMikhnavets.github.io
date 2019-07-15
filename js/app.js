'use strict';

let AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
let MessagesA;// элемент массива

window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash() {
  let urlHash = window.location.hash;
  let stateJSON = decodeURIComponent(urlHash.substr(1));
  if (stateJSON === '') {
    stateJSON = {
      pageName: 'Main'
    };
  } else if (stateJSON !== '') {
    stateJSON = JSON.parse(stateJSON);
  }
  let pageHTML = '';
  switch (stateJSON.pageName) {
    case 'Main':
      pageHTML += `<article class="wrap-regulation">
                    <p class="reguletion_describe">Игра <b>Training for memory</b> напрвлена на на эффективное развитие
                     способности к запоминанию и концентрации внимания</p>
                    <p class="reguletion_describe"><b>Рекомендуемый возраст </b><span>&#8212;</span> от 2 до 99 лет.</p>
                   </article>`;
      break;
    case 'Play':
      pageHTML += `<div class="wrapPlay">
                   <div class="wrapScore">
                     <h3>Time:  <span id="timeDown"></span></h3>
                     <h3>Score:  <span id="score"></span></h3>
                   </div>
                   <div id="memoryGame"></div>
                   <div class="wrapPause">
                     <button class="buttonPause" id="timePause">Pause Time</button>
                     <button class="buttonPause" id="continPause">Start Time</button>
                     <button class="buttonPause" id="sound">Sound off/on</button>
                   </div></div>`;
      break;
    case 'Score':
      showRecords();
      break;
    case 'Rules':
      pageHTML += `<article class="wrap-regulation">
                    <h3 class="regulation">Правила игры</h3>
                    <p class="reguletion_describe">Вскрываются две карточки. Если изображения на карточках совпадают,
                     то карточки пропадают. В случае, если изображения не совпали, карточки возвращаются в 
                     исходное положение.
                     Игра продолжается до тех пор, пока не исчезнут все карточки.</p>
                    <p class="reguletion_describe">Игра продолжается до момента истечения времени или до исчезновения 
                     всех карточек.</p>
                   </article>`;
      break;
    case'AboutProject':
      pageHTML += `<div class="wrapPage"><p class="aboutProject"><b>Final project:</b> Training for memory</p>
                   <p class="aboutProject"><b>Author:</b> Mikhnavets Nataliya</p>
                   <p class="aboutProject"><b>Trainer:</b> Stashkevich Alexandr</p>
                   <p class="aboutProject"><b>Date:</b> July, 2019</p></div>`;
      break;
  }
  document.getElementById('article').innerHTML = pageHTML;
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToMain() {
  switchToState({pageName: 'Main'});
}

function switchToPlay() {
  switchToState({pageName: 'Play'});
  document.location.reload(true);
}

function switchToScore() {
  switchToState({pageName: 'Score'});
}

function switchToRules() {
  switchToState({pageName: 'Rules'});
}

function switchToAboutProject() {
  switchToState({pageName: 'AboutProject'});
}

SwitchToStateFromURLHash();

function showRecords() {
  $.ajax(
    {
      url: AjaxHandlerScript,
      type: 'POST',
      data: {f: 'READ', n: 'MIKHNAVETS_NATALIYA_PROJECT_GAME'},
      cache: false,
      success: ReadReady,
      error: ErrorHandler
    }
  );
}

function ReadReady(ResultH) {
  if (ResultH.error !== undefined)
    alert(ResultH.error);
  else {
    MessagesA = [];
    if (ResultH.result !== "") {
      MessagesA = JSON.parse(ResultH.result);
      if (!MessagesA.length)
        MessagesA = [];
    }
    AddRecords();
  }
}

function AddRecords() {
  $('#article').empty();
  let contTable = `<div class="wrapPage"><table class="tableRecords">
  <tr>
    <th>Имя игрока</th>
    <th>Количество ходов</th>
    <th>Дата</th>
  </tr>
  <tr><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td></tr>
  <tr><td></td><td></td><td></td></tr></table></div>`;

  for (let m = MessagesA.length - 1; m >= 0; --m) {
    let fillPlayer = MessagesA[m];
    let name;
    let score;
    let date;
    for (let k in fillPlayer) {
      if (k === 'name') {
        name = fillPlayer[k];
      } else if (k === 'score') {
        score = fillPlayer[k];
      } else if (k === 'date') {
        date = fillPlayer[k];
      }
    }
    contTable += `<tr>
    <td>${name}</td>
    <td>${score}</td>
    <td>${date}</td>
  </tr>`;
  }
  contTable += `</table>`;
  document.querySelector('#article').innerHTML = contTable;
}

function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(StatusStr + ' ' + ErrorStr);
}


