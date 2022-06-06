import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onSelectDatePicker(selectedDates[0]);
  },
};
let timerID = null;
let callender = flatpickr(refs.dateInput, options);

refs.startButton.disabled = true;

function onSelectDatePicker(selectDate) {
  const currentDate = new Date();
  if (currentDate > selectDate) {
    window.alert('Please choose a date in the future');
    return;
  }
  refs.startButton.disabled = false;
  refs.startButton.addEventListener('click', onStartButtonClick);

  function onStartButtonClick(e) {
    if (e.target === refs.startButton) {
      refs.startButton.disabled = true;
      timer(selectDate);
    }
  }
}

function timer(selectDate) {
  timerID = setInterval(() => {
    const deltaTime = delta(selectDate);
    const timeObj = convertMs(deltaTime);
    onTimerDraw(timeObj);
  }, 1000);
}

function delta(future) {
  const date = new Date();
  if (future.getTime() - date.getTime() < 1000) {
    clearInterval(timerID);
    return 0;
  }
  return future.getTime() - date.getTime();
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
function onTimerDraw({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
