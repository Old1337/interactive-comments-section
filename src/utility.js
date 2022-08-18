export default function convertTimeToString(time) {
  const currentTime = new Date().getTime();

  const dateDiff = currentTime - time;

  const secs = Math.floor(dateDiff / 1000);
  const minutes = Math.floor(dateDiff / 1000 / 60);
  const hours = Math.floor(dateDiff / 1000 / 60 / 60);
  const days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);

  if (secs <= 60) {
    return `${secs} ${days === 1 ? "sec" : "secs"} ago`;
  } else if (minutes <= 60) {
    return `${minutes}  ${minutes === 1 ? "minute" : "minutes"}  ago`;
  } else if (hours <= 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${days}  ${days === 1 ? "day" : "days"}  ago`;
  }
}
