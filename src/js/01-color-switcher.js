const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerId;

refs.stopButton.setAttribute('disabled', 'true');

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStorButtonClick);

function onStartButtonClick() {
  refs.startButton.setAttribute('disabled', 'true');
  refs.stopButton.removeAttribute('disabled');
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStorButtonClick() {
  refs.stopButton.setAttribute('disabled', 'true');
  refs.startButton.removeAttribute('disabled');
  clearTimeout(timerId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
