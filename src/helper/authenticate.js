import localforage from '../services/storage'
// Endpoint constants

const ACCESS_TOKEN = 'access-token'
const IS_LOGGED_IN = 'is-logged'
const LOGGED_EMAIL = 'current-user-email'
const LOGGED_NAME = 'current-user-full-name'
const LOGGED_ROLE = 'current-user-role'
const LOGGED_COMPANY_ID = 'company-id'
const LOGGED_COMPANY_NAME = 'company-name'
const LOGGED_COMPANY_CODE = 'company-code'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false,
    role: 'guest',
    accessToken: '',
    company: {
      _id: '',
      name: '',
      code: ''
    }
  },
  // logged user
  // logout user
  // --- local storage
  // set access token
  async setLoginToken (creds) {
    await localforage.setItem(ACCESS_TOKEN, creds)
    await localforage.setItem(IS_LOGGED_IN, true)
    this.user.authenticated = true
    return true
  },
  // logout
  async setLogout () {
    await localforage.removeItem(ACCESS_TOKEN)
    await localforage.removeItem(IS_LOGGED_IN)
    await localforage.removeItem(LOGGED_EMAIL)
    await localforage.removeItem(LOGGED_NAME)
    await localforage.removeItem(LOGGED_ROLE)
    await localforage.removeItem(LOGGED_COMPANY_ID)
    await localforage.removeItem(LOGGED_COMPANY_CODE)
    await localforage.removeItem(LOGGED_COMPANY_NAME)
  },
  // set logged data
  async setLoggedToken (creds) {
    await localforage.setItem(LOGGED_EMAIL, creds.email)
    await localforage.setItem(LOGGED_NAME, creds.fullName)
    await localforage.setItem(LOGGED_ROLE, creds.roleName)
    await localforage.setItem(LOGGED_COMPANY_ID, creds.company._id)
    await localforage.setItem(LOGGED_COMPANY_CODE, creds.company.client_id)
    await localforage.setItem(LOGGED_COMPANY_NAME, creds.company.name)
    this.user.role = creds.roleName
    this.user.company._id = creds.company._id
    this.user.company.name = creds.company.name
    this.user.company.code = creds.company.client_id
  },
  // check Auth
  checkAuth () {
    localforage.getItem(ACCESS_TOKEN).then(value => {
      if (value) {
        this.user.authenticated = true
        this.user.accessToken = value
      } else {
        this.user.authenticated = false
        this.user.accessToken = ''
      }
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err)
    })
  }
}
