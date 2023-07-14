export default function toISOString(s) {
  const months = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
  };
  const b = s.split(' ');

  return `${b[3]}-${months[b[1].toLowerCase()]}-${`0${b[2]}`.slice(-2)}T${b[4]}${b[5].substr(3)}`;
}
