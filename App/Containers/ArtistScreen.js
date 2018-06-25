import React, { Component } from "react"
import { Image, View, ScrollView } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Colors } from "../Themes"
import Text from "../Components/Text"
import AlbumCell from "../Components/AlbumCell"
import { connect } from "react-redux"
import ArtistActions, { ArtistSelectors } from "../Redux/ArtistRedux"

const ROOT = { flex: 1, backgroundColor: Colors.background }
const DETAILS = { paddingBottom: 40 }
const IMAGE = { height: 50, width: 50, alignSelf: "center" }
const TOP_ROW = { paddingTop: 20 }
const NAME_AND_HEART = { paddingLeft: 10 }
const ROW = { flexDirection: "row", paddingHorizontal: 10 }
const RESULTS = { paddingHorizontal: 10 }
const Logo = require("../Images/musicbrainz-logo.png")

class ArtistScreen extends Component {
  static navigationOptions = {
    title: "Artist"
  }

  toggleHeart = () => true

  render() {
    const { artist, navigation } = this.props

    const personImage = { uri: "https://placekitten.com/250/250" }
    pressAlbum = albumId => () =>
      navigation.navigate("album", { albumId })

    const name = artist && artist.name
    const born = "to be wild"
    const died = "rip"

    return (
      <ScrollView style={ROOT}>
        <View style={DETAILS}>
          <View style={{ ...ROW, ...TOP_ROW }}>
            <Image source={personImage} style={IMAGE} />
            <View style={NAME_AND_HEART}>
              <Text text={name} />
              <Text text="❤️" onPress={this.toggleHeart} />
            </View>
          </View>
          <View style={ROW}>
            <Text text="Born:" />
            <Text text={born} />
          </View>
          <View style={ROW}>
            <Text text="Died:" />
            <Text text={died} />
          </View>
        </View>
        <View style={RESULTS}>
          <Text text="Albums" />
          <AlbumCell onPress={pressAlbum(1)} name="Album 1" year="1890" />
          <AlbumCell onPress={pressAlbum(2)} name="Album 2" year="1890" />
          <AlbumCell onPress={pressAlbum(3)} name="Album 2" year="1890" />
          <AlbumCell onPress={pressAlbum(4)} name="Album 2" year="1890" />
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps (state, props) {
  return { artist: ArtistSelectors.getArtist(props.navigation.state.params.artistId, state.artists) }
}

export default connect(mapStateToProps)(ArtistScreen)
