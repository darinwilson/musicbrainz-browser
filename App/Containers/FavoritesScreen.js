import React, { Component } from "react"
import { Image, Text, View, ScrollView } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Colors } from "../Themes"
import ArtistCell from "../Components/ArtistCell"
import { connect } from "react-redux"
import ArtistActions, { ArtistSelectors } from "../Redux/ArtistRedux"

const ROOT = { flex: 1, backgroundColor: Colors.background, paddingLeft: 10 }
const IMAGE = { marginTop: 40, marginBottom: 30, alignSelf: "center" }

class FavoritesScreen extends Component {
  static navigationOptions = {
    title: "Favorites"
  }

  render() {
    const { getArtist, navigation, favorites } = this.props
    pressArtist = artistId => () => {
      navigation.navigate("artist", { artistId })
      getArtist(artistId)
    }

    return (
      <ScrollView style={ROOT}>
        {favorites.map(artist => (
          <ArtistCell
            key={artist.id}
            onPress={pressArtist(artist.id)}
            name={artist.name}
          />
        ))}
      </ScrollView>
    )
  }
}

function mapStateToProps(state, props) {
  const { getFavorites } = ArtistSelectors
  return {
    favorites: getFavorites(state.artists)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getArtist: id => dispatch(ArtistActions.artistRequest(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesScreen)
