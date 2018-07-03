import React, { Component } from "react"
import { Image, View, ScrollView, Dimensions } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Colors } from "../Themes"
import Text from "../Components/Text"
import AlbumCell from "../Components/AlbumCell"
import { connect } from "react-redux"
import ArtistActions, { ArtistSelectors } from "../Redux/ArtistRedux"

const w = Dimensions.get("screen").width

const ROOT = { flex: 1, backgroundColor: Colors.background }
const DETAILS = { paddingBottom: 40 }
const IMAGE = { alignSelf: "center" }
const TOP_ROW = { paddingTop: 20 }
const NAME_AND_HEART = { paddingLeft: 10 }
const ROW = { flexDirection: "row", paddingHorizontal: 10 }
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
              <Text text={name} />
              <Text text="❤️" onPress={this.toggleHeart.bind(this)} />
            </View>
          </View>
          <View style={ROW}>
            <Text text="Started: " />
            <Text text={born} />
          </View>
          <View style={ROW}>
            <Text text="Ended: " />
            <Text text={died} />
          </View>
        </View>
        <View style={RESULTS}>
          <Text text="Albums" />
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
