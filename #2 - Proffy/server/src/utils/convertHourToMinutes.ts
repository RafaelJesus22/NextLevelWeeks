export default function convertTimeToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinustes =  (hour * 60) + minutes;
  return timeInMinustes;
}