import numeral from 'numeral'
const dollar = (value: string | null) => {
  if (!value) {
    return '$ 0'
  }
  return numeral(Number(value)).format('($ 0.00a)')
}

const percent = (value: string | null) => {
  if (!value) {
    return '0%'
  }
  return `${Number(value).toFixed(2)}%`
}

export { dollar, percent }
