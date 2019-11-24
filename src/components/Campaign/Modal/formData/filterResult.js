export default class FilterResult {
  constructor () {
    this.list = []
    this.total = 0
    this.selectedList = []
  }
  addChecked () {
    this.list.forEach(x => {
      if (this.selectedList.length > 0) {
        // Compare with selectedList
        this.selectedList.forEach(sX => {
          if (x._id === sX._id) {
            x['checked'] = sX.checked
          }
        })
      } else {
        x['checked'] = false
      }
    })
  }
  toggleChecked (item) {
    this.list.find(x => x._id === item._id)['checked'] = !item.checked
    this.updateSelectedList(item)
  }
  updateSelectedList (item) {
    let isAdd = item.checked
    if (isAdd) {
      this.selectedList.push(item)
    } else { // Remove
      this.selectedList.splice(this.selectedList.findIndex(x => x._id === item._id), 1)
    }
  }
  cleanSelectedList () {
    this.selectedList = []
  }
  cleanResult () {
    this.list = []
    this.total = 0
    this.selectedList = []
  }
}
