import FanData from './fanData'

export default class FanGenderData extends FanData {
  constructor () {
    super()
    this.list = [
      {
        id: 1,
        label: 'Ha Noi',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 2,
        label: 'Ho Chi Minh',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 3,
        label: 'Others',
        value: null,
        defaultValue: 0,
        checked: false
      }
    ]
  }
}
