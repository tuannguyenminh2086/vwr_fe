import FanData from './fanData'

export default class FanAgeData extends FanData {
  constructor () {
    super()
    this.list = [
      {
        id: 1,
        label: '13-17',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 2,
        label: '18-24',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 3,
        label: '25-34',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 4,
        label: '35-44',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 5,
        label: '45-56',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 6,
        label: '55-64',
        value: null,
        defaultValue: 0,
        checked: false
      },
      {
        id: 7,
        label: '65+',
        value: null,
        defaultValue: 0,
        checked: false
      }
    ]
  }
}
