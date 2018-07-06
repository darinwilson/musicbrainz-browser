import { AsyncStorage } from 'react-native'
import { put, call } from 'redux-saga/effects'
import ArtistActions from "../Redux/ArtistRedux"

// process STARTUP actions
export function * startup (action) {
  // yield call(AsyncStorage.setItem, "mbb.favorites",
  //   JSON.stringify([{id: 'b625448e-bf4a-41c3-a421-72ad46cdb831', name: 'John Coltrane'}]))
  // yield call(AsyncStorage.setItem, "mbb.searches",
  //   JSON.stringify(['Eliane Elias']))

  const favorites = yield call(AsyncStorage.getItem, 'mbb.favorites')

  yield put.resolve(ArtistActions.setFavorites(JSON.parse(favorites || '[]')))
}
