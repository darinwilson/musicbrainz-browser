import { AsyncStorage } from 'react-native'
import { call, put } from "redux-saga/effects"
import { path, sortBy, prop, last, keys, head } from "ramda"
import ArtistActions from "../Redux/ArtistRedux"
import { parse } from "date-fns"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

function* findWikipediaImageForArtist(api, rawArtistData) {
  try {
    const relation = rawArtistData.relations.find(x => x.type === "image" && x['target-type'] === "url")
    const wikipediaId = last(relation.url.resource.split("/"))
    const response = yield call(api.getArtistImageUrl, wikipediaId)
    if (response.ok) {
      const pages = path(["data", "query", "pages"], response)
      const firstKey = head(keys(pages))
      console.tron.log(pages, firstKey, pages[firstKey])
      return image = path(["imageinfo", 0, "url"], pages[firstKey])
    }
  } catch (e) {
    console.tron.log(e.message)
  }
}

export function* getArtist(api, action) {
  const { artistId } = action
  const response = yield call(api.getArtist, artistId)

  if (response.ok) {
    const raw = response.data
    // grab the wikipedia image url
    const imageUrl = yield call(findWikipediaImageForArtist, api, raw)
    const artist = {
      id: raw.id,
      name: raw.name,
      lifeSpanBegin: path(["life-span", "begin"], raw),
      lifeSpanEnd: path(["life-span", "end"], raw),
      imageUrl,
      // tags isn't available here
    }
    const releaseGroups = sortBy(prop("releaseDate"), (raw["release-groups"] || []).map(x => ({
      id: x.id,
      title: x.title,
      releaseDate: parse(x["first-release-date"] + "T00:00:00-07:00")
    })))

    // attempt to find the wikipedia image


    yield put.resolve(ArtistActions.artistSuccess(artist, releaseGroups))

    // for (const rg of releaseGroups) {
    //   yield call(getReleaseGroup, api, { releaseGroupId: rg.id, artistId })
    //   yield call(delay, 3000)
    // }
  } else {
    yield put.resolve(ArtistActions.artistFailure())
  }
}

export function* getReleaseGroup(api, action) {
  const { releaseGroupId, artistId } = action
  const response = yield call(api.getAlbumReleases, releaseGroupId)

  if (response.ok) {
    const raw = response.data
    const album = {
      id: "dunnoyet"
    }
    yield put.resolve(
      ArtistActions.releaseGroupSuccess(artistId, releaseGroupId, album)
    )
  } else {
    yield put.resolve(ArtistActions.releaseGroupFailure())
  }
}

export function* addFavorite(action) {
  const { newFavorite } = action
  const currentFavorites = JSON.parse(yield call(AsyncStorage.getItem, 'mbb.favorites'))
  const newFavorites = [...currentFavorites, newFavorite]

  // we'll just assume this works...LOL
  yield call(AsyncStorage.setItem, 'mbb.favorites', JSON.stringify(newFavorites))

  yield put.resolve(ArtistActions.setFavorites(newFavorites))
}
