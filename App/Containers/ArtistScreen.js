import React, { Component } from "react"
import { Image, View, ScrollView, Dimensions } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Fonts, Colors } from "../Themes"
import Text from "../Components/Text"
import AlbumCell from "../Components/AlbumCell"
import { connect } from "react-redux"
import ArtistActions, { ArtistSelectors } from "../Redux/ArtistRedux"

const w = Dimensions.get("screen").width

const ROOT = { flex: 1, backgroundColor: Colors.background }
const DETAILS = { paddingBottom: 40 }
const IMAGE = { alignSelf: "center" }
const TOP_ROW = { paddingTop: 20, paddingBottom: 20 }
const NAME_AND_HEART = { }
const TITLE = { fontSize: Fonts.size.h2, fontWeight: 'bold' }
const BAND_DATE = { fontWeight: 'bold' }
const ROW = { flexDirection: "row", paddingHorizontal: 10 }
const ALBUMS_HEADER = {
  backgroundColor: Colors.palette.purple,
  color: Colors.palette.white,
  fontWeight: 'bold',
  fontSize: Fonts.size.h5,
  padding: 4
}
const RESULTS = { paddingHorizontal: 10 }
const Logo = require("../Images/musicbrainz-logo.png")

class ArtistScreen extends Component {
  static navigationOptions = {
    title: "Artist"
  }

  toggleHeart() {
    const { artist, addFavorite } = this.props
    addFavorite({id: artist.id, name: artist.name})
  }

  render() {
    const { artist, navigation, releaseGroups } = this.props

    pressAlbum = albumId => () => navigation.navigate("album", { albumId })

    const name = artist && artist.name
    const imageUrl = artist && artist.imageUrl
    const born = artist && artist.lifeSpanBegin
    const died = artist && artist.lifeSpanEnd
    const isBand = artist && artist.name.match(/Coltrane/) === null

    return (
      <ScrollView style={ROOT}>
        <View style={DETAILS}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={IMAGE}
              width={w}
              height={200}
              resizeMode="contain"
            />
          )}
          <View style={{ ...ROW, ...TOP_ROW }}>
            <View style={NAME_AND_HEART}>
              <Text style={TITLE} text={name} />
              <Text text="❤️" onPress={this.toggleHeart.bind(this)} />
            </View>
          </View>
          <View style={ROW}>
            <Text style={BAND_DATE} text={`${isBand ? 'Started' : 'Born'}: `} />
            <Text text={born} />
          </View>
          <View style={ROW}>
            <Text style={BAND_DATE} text={`${isBand ? 'Ended' : 'Died'}: `} />
            <Text text={died} />
          </View>
        </View>
        <View style={RESULTS}>
          <Text style={ALBUMS_HEADER} text="Albums" />
          {releaseGroups.map(rg => (
            <AlbumCell
              key={rg.id}
              onPress={pressAlbum(rg.id)}
              name={rg.title}
              releaseDate={rg.releaseDate}
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state, props) {
  const { artistId } = props.navigation.state.params
  const { getArtist, getReleaseGroupsByArtist } = ArtistSelectors
  return {
    artist: getArtist(artistId, state.artists),
    releaseGroups: getReleaseGroupsByArtist(artistId, state.artists)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addFavorite: newFavorite => dispatch(ArtistActions.addFavorite(newFavorite))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistScreen)
