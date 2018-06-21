// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const mbapi = apisauce.create({
    baseURL: 'https://musicbrainz.org/ws/2',
    headers: {
    },
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})


  // MusicBrainz API calls

  // searches MusicBrainz's artist records for the given query
  const artistSearch = (query) => mbapi.get('artist', {query: query})

  // fetches an artist record, including "release-groups" (which is what the world calls an "album")
  const getArtist = (artistId) => mbapi.get(`artist/${artistId}`, {inc: 'release-groups', type: 'album'})

  // given a release group id, this returns all of the "releases" of an album (e.g. the US version,
  // the Japan version, the remastered version with bonus tracks, etc) - for our purposes, we'll
  // call the chronologically oldest of these the "official" release
  const getAlbumReleases = (releaseGroupId) => mbapi.get(`release-group/${releaseGroupId}`,
    {inc: 'releases', status: 'official'})

  // given a particular release, this returns the "recordings" (i.e. tracks) on that release
  const getTracks = (releaseId) => mbapi.get(`release/${releaseId}`, {inc: 'recordings'})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    artistSearch,
    getArtist,
    getAlbumReleases,
    getTracks
  }
}

// let's return back our create method as the default.
export default {
  create
}
