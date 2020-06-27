import { createStore } from 'redux'
import handleState from '../reducers/reducer'

const store = createStore(handleState)
export default store
