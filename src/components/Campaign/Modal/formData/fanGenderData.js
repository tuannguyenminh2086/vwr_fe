import FanData from './fanData'

export default class FanGenderData extends FanData {
  constructor () {
    super()
    this.list = [
      {
        id: 1,
        label: 'Female',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 2,
        label: 'Male',
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
