import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { ArtistTypes } from '../Redux/ArtistRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { searchArtist, getArtist, getReleaseGroup, addFavorite } from "./ArtistSagas"

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ArtistTypes.SEARCH_ARTIST_REQUEST, searchArtist, api),
    takeLatest(ArtistTypes.ARTIST_REQUEST, getArtist, api),
    takeLatest(ArtistTypes.RELEASE_GROUP_REQUEST, getReleaseGroup, api),
    takeLatest(ArtistTypes.ADD_FAVORITE, addFavorite),
  ])
}
