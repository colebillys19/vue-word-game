const getLetter = (num) => String.fromCharCode(num + 97)

const getRowData = (rowIndex) =>
  new Array(26).fill().map((e, i) => {
    const data = { x: i, y: rowIndex, navObj: {}, val: '' }
    if (rowIndex) {
      data.navObj.up = rowIndex - 1
    }
    if (rowIndex < 25) {
      data.navObj.down = rowIndex + 1
    }
    if (i) {
      data.navObj.left = i - 1
    }
    if (i < 25) {
      data.navObj.right = i + 1
    }
    return data
  })

export default () => new Array(26).fill().map((e, i) => ({ id: getLetter(i), data: getRowData(i) }))
