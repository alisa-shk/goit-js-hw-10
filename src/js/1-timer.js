import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");
let userDate;
let timerInterval;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userDate = selectedDates[0];
      const currentDate = new Date();
      if (userDate <= currentDate) {
        startBtn.disabled = true;
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
});
      } else {
        startBtn.disabled = false;
      }
},
};

flatpickr('#datetime-picker', options);


startBtn.addEventListener("click", function () {
  startBtn.disabled = true;
  timerInterval = setInterval(() => {
    const nowTime = new Date().getTime();
    const difference = userDate.getTime() - nowTime;

    if (difference < 0) {
      clearInterval(timerInterval);
      updateCountdown(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(difference);
      updateCountdown(days, hours, minutes, seconds);
    }
  }, 1000)
});



function updateCountdown(days, hours, minutes, seconds) {
    document.querySelector("[data-days]").textContent = String(days).padStart(2, '0');
    document.querySelector("[data-hours]").textContent = String(hours).padStart(2, '0');
    document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, '0');
    document.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, '0');
}

updateCountdown(0, 0, 0, 0);



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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}