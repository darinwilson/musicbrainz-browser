import { groupBy, head, map, prop } from "ramda"
import { createActions, createReducer } from "reduxsauce"

const groupById = artists => map(head, groupBy(prop("id"), artists))

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchArtistRequest: ["query"],
  searchArtistSuccess: ["results"],
  searchArtistFailure: null,
  artistRequest: ["id"],
  artistSuccess: ["artist"],
  artistFailure: null,
})

export const ArtistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: false,
  error: undefined,
  artists: {}, // a map of all the data
  results: [],
}

/* ------------- Selectors ------------- */

export const ArtistSelectors = {
  selectSearchResults: artistState => artistState.results,
  getArtist: (id, artistState) => artistState.artists[id] || artistState.results.find(artist => artist.id)
}

/* ------------- Reducers ------------- */

export const searchRequest = state => ({
  ...state,
  fetching: true,
  results: [],
  error: undefined
})
export const searchSuccess = (state, { results }) => ({
  ...state,
  fetching: false,
  error: undefined,
  results
})
export const searchFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error
})

export const artistRequest = state => ({
  ...state,
  fetching: true,
  error: undefined
})

export const artistSuccess = (state, { artist }) => ({
  ...state,
  fetching: false,
  error: undefined,
  artists: { ...state.artists, [artist.id]: artist }
})

export const artistFailure = (state, { error }) => ({
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
  [Types.ARTIST_FAILURE]: artistFailure
})
