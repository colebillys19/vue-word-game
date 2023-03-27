const getLetter = (num) => String.fromCharCode(num + 97)

const getRowData = (rowIndex) =>
  new Array(26).fill().map((e, i) => {
    const data = { indices: `${rowIndex}-${i}`, navObj: {}, val: '' };
    if (rowIndex) {
      data.navObj.up = `${rowIndex - 1}-${i}`;
    }
    if (rowIndex < 25) {
      data.navObj.down = `${rowIndex + 1}-${i}`;
    }
    if (i) {
      data.navObj.left = `${rowIndex}-${i - 1}`;
    }
    if (i < 25) {
      data.navObj.right = `${rowIndex}-${i + 1}`;
    }
    return data;
  })

export default () =>
  new Array(26).fill().map((e, i) => ({ id: getLetter(i), data: getRowData(i) }))
