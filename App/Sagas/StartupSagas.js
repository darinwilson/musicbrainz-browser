import { AsyncStorage } from 'react-native'
import { put, call } from 'redux-saga/effects'
import ArtistActions from "../Redux/ArtistRedux"

// process STARTUP actions
export function * startup (action) {
  const favorites = yield call(AsyncStorage.getItem, 'mbb.favorites')

  yield put.resolve(ArtistActions.setFavorites(JSON.parse(favorites || '[]')))
}
