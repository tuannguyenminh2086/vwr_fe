export default class FanData {
  constructor () {
    this.list = []
  }
  isEmpty () {
    return this.list.reduce((acc, cur) => acc || cur.checked, false)
  }
  getDataToSubmit () {
    return this.list.filter(x => x.checked && x.value).map(x => ({ label: x.label, value: x.value }))
  }
}
