'use strict';

var AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
var MessagesA;

window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash() {
  let urlHash = window.location.hash;
  let stateJSON = decodeURIComponent(urlHash.substr(1));
  if (stateJSON === '') {
    stateJSON = {
      pagename: 'Main'
    };
  } else if (stateJSON !== '') {
    stateJSON = JSON.parse(stateJSON);
  }
  let pageHTML = '';
  switch (stateJSON.pagename) {
    case 'Main':
      pageHTML += '<h1>Memory & attention</h1>'; // + свойства css ( фон, возможно анимация jquery) - как это сделать
      break;
    case 'Play':
      pageHTML += сама игра;
      break;
    case 'Score':
      ShowRecords();
      break;
    case 'Setting':
      ShowSetting();
      break;
    case 'About game':
      pageHTML += '<h1 class="regulation">Об игре</h1>';
      pageHTML += '<p class="reguletion_describe">Игра напрвлена на на эффективное развитие способности к запоминанию и концентрации
                    внимания</p><p class="reguletion_describe"><b>Рекомендуемый возраст </b><span>&#8212;</span> от 2 до 99 лет.</p>';
      pageHTML += '<h3 class="regulation">Правила игры</h3>';
      pageHTML += '<p class="regulation_describe">Вскрываются две карточки.Если изображения на карточках совпадают, то карточки
                    пропадают. В случае, если изображения не совпали, карточки возвращаются в исходное положение. Игра продолжается
                    до тех пор, пока не исчезнут все карточки.</p><p class="regulation_describe">Игра продолжается до момента истечения времени или до завершения жизней, которые
                    теряются в результате неправильных
                    ответов.</p>';
      break;
    case'About project':
      pageHTML += '<h5>About project</h5>';
      pageHTML += '<p>Final project: Memory & attention <br>Author: Mikhnavets Nataliya <br>Trainer: Stashkevich Alexandr' +
        ' <br>Date: July, 2019</p>';
  }
  document.getElementById('article').innerHTML = pageHTML;
}

function RefreshPage() {

}