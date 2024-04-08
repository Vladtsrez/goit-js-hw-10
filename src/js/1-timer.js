import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = new Date();

const startBtn = document.querySelector('[data-start]');

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates && selectedDates.length > 0) {
      userSelectedDate = selectedDates[0];
      console.log('Обрана дата:', userSelectedDate);

      const currentDate = new Date();
      if (userSelectedDate.getTime() <= currentDate.getTime()) {
        window.alert('Please choose a date in the future');
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', startCount);

function startCount() {
  startBtn.disabled = true;

  const dateTimePicker = document.querySelector('.flatpickr-input');
  dateTimePicker.disabled = true;

  const timerInterval = setInterval(() => {
    const currentDate = new Date();

    const timeDifference = userSelectedDate.getTime() - currentDate.getTime();

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minutesTimer.textContent = addLeadingZero(minutes);
    secondsTimer.textContent = addLeadingZero(seconds);

    if (timeDifference < 1000) {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      dateTimePicker.disabled = false;
    }
    console.log(timeDifference);
  }, 1000);
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
