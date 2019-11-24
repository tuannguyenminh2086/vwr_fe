import localforage from 'localforage'
import { env } from '@/config'
let storeConfig = {
  driver: [
    localforage.INDEXEDDB, // first use index db
    localforage.LOCALSTORAGE // if index db not available, use local storage
  ],
  name: env.STORAGE_KEY // this is the name of the local storage database
}
localforage.config(storeConfig)
export default localforage
