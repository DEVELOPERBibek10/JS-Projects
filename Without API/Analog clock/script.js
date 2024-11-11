let hours = document.querySelector("#Hours");
let minutes = document.querySelector("#Minutes");
let seconds = document.querySelector("#Seconds");

setInterval(() => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let hRotation = 30 * hour + minute / 2;
  let mRotation = 6 * minute;
  let sRotation = 6 * second;

  hours.style.transform = `rotate(${hRotation}deg)`;
  minutes.style.transform = `rotate(${mRotation}deg)`;
  seconds.style.transform = `rotate(${sRotation}deg)`;
}, 1000);
