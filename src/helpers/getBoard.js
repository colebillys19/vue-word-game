const getLetter = (num) => String.fromCharCode(num + 97)

const getRowData = (rowIndex) =>
  new Array(26).fill().map((e, i) => ({ indices: `${rowIndex}-${i}`, val: '' }))

export default () =>
  new Array(26).fill().map((e, i) => ({ id: getLetter(i), data: getRowData(i) }))
  