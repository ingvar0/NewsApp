export default function getMeeting() {
  const date = new Date();
  const hours = date.getHours();
  let greeting = 'Good day';
  if (hours >= 7 && hours < 12) greeting = 'Good morning';
  else if (hours >= 12 && hours < 18) greeting = 'Good afternoon';
  else if ((hours >= 18 && hours < 24) || (hours >= 0 && hours < 7)) greeting = 'Good evening';
  return greeting;
}
