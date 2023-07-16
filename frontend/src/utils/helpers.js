export function toISOString(s) {
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

export function arrCalendar() {
  const array = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 32; i++) {
    array.push(i);
  }
  // eslint-disable-next-line prefer-const
  let [list, chunkSize] = [array, 7];
  // eslint-disable-next-line no-unused-vars
  list = [...Array(Math.ceil(list.length / chunkSize))].map((_) => list.splice(0, chunkSize));

  return list;
}
