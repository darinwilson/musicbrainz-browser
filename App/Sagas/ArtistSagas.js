import { call, put } from "redux-saga/effects"
import { path } from "ramda"
import ArtistActions from "../Redux/ArtistRedux"

export function* searchArtist(api, action) {
  const { query } = action
  // make the call to the api
  const response = yield call(api.artistSearch, query)

  if (response.ok) {
    const results = (response.data.artists || []).map(raw => ({
      id: raw.id,
      name: raw.name,
      lifeSpanBegin: path(["life-span", "begin"], raw),
      lifeSpanEnd: path(["life-span", "end"], raw),
      tags: (raw.tags || []).map(t => t.name || "").filter(Boolean)
    }))

    yield put.resolve(ArtistActions.searchArtistSuccess(results))
  } else {
    yield put.resolve(ArtistActions.searchArtistFailure())
  }
}

export function* getArtist(api, action) {
  const { id } = action
  const response = yield call(api.getArtist, id)

  if (response.ok) {
    const raw = response.data
    const artist = {
      id: raw.id,
      name: raw.name,
      lifeSpanBegin: path(["life-span", "begin"], raw),
      lifeSpanEnd: path(["life-span", "end"], raw)
      // tags isn't available here
    }
    yield put.resolve(ArtistActions.artistSuccess(artist))
  } else {
    yield put.resolve(ArtistActions.artistFailure())
  }
}
