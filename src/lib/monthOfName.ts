export default function monthOfName(num: number) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[num - 1];
  return monthName;
}
