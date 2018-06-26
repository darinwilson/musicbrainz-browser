import { groupBy, head, map, prop } from "ramda"
import { createActions, createReducer } from "reduxsauce"

const groupById = collection => map(head, groupBy(prop("id"), collection))

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchArtistRequest: ["query"],
  searchArtistSuccess: ["results"],
  searchArtistFailure: null,
  artistRequest: ["artistId"],
  artistSuccess: ["artist", "releaseGroups"],
  artistFailure: null,
  releaseGroupRequest: ["artistId", "releaseGroupId"],
  releaseGroupSuccess: ["artistId", "releaseGroupId", "album"],
  releaseGroupFailure: ["artistId", "releaseGroupId", "error"]
})

export const ArtistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: false,
  error: undefined,
  artists: {},
  results: [],
  releaseGroups: {},
  albums: {}
}

/* ------------- Selectors ------------- */

export const ArtistSelectors = {
  selectSearchResults: artistsState => artistsState.results,
  getArtist: (id, artistsState) =>
    artistsState.artists[id] || artistsState.results.find(artist => artist.id),
  getReleaseGroupsByArtist: (artistId, artistsState) => {
    const artist = artistsState.artists[artistId] || {}
    const { releaseGroups = [] } = artist
    return releaseGroups.map(rg => artistsState.releaseGroups[rg])
  }
}

/* ------------- Reducers ------------- */

const searchRequest = state => ({
  ...state,
  fetching: true,
  results: [],
  error: undefined
})
const searchSuccess = (state, { results }) => ({
  ...state,
  fetching: false,
  error: undefined,
  results
})
const searchFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error
})

const artistRequest = state => ({
  ...state,
  fetching: true,
  error: undefined
})

const artistSuccess = (state, { artist, releaseGroups }) => ({
  ...state,
  fetching: false,
  error: undefined,
  artists: {
    ...state.artists,
    [artist.id]: {
      ...state.artists[artist.id],
      ...artist,
      releaseGroups: releaseGroups.map(x => x.id)
    }
  },
  releaseGroups: {
    ...state.releaseGroups,
    ...groupById(releaseGroups)
  }
})

const artistFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error
})

const releaseGroupRequest = state => ({
  ...state,
  fetching: true,
  error: undefined
})

const releaseGroupSuccess = (state, { releaseGroupId, album }) => ({
  ...state,
  fetching: false,
  albums: {
    ...state.albums,
    [album.id]: {
      ...state.albums[album.id],
      ...album
    }
  }
})

const releaseGroupFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_ARTIST_REQUEST]: searchRequest,
  [Types.SEARCH_ARTIST_SUCCESS]: searchSuccess,
  [Types.SEARCH_ARTIST_FAILURE]: searchFailure,
  [Types.ARTIST_REQUEST]: artistRequest,
  [Types.ARTIST_SUCCESS]: artistSuccess,
  [Types.ARTIST_FAILURE]: artistFailure,
  [Types.RELEASE_GROUP_REQUEST]: releaseGroupRequest,
  [Types.RELEASE_GROUP_SUCCESS]: releaseGroupSuccess,
  [Types.RELEASE_GROUP_FAILURE]: releaseGroupFailure
})
