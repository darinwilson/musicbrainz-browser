import React, { Component } from "react"
import { Image, Text, View, ScrollView } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Colors } from "../Themes"
import ArtistCell from "../Components/ArtistCell"

const ROOT = { flex: 1, backgroundColor: Colors.background }
const IMAGE = { marginTop: 40, marginBottom: 30, alignSelf: "center" }

export default class FavoritesScreen extends Component {
  static navigationOptions = {
    title: "Favorites"
  }

  render() {
    pressArtist = artistId => () =>
      this.props.navigation.navigate("artist", { artistId })

    return (
      <ScrollView style={ROOT}>
        <ArtistCell onPress={pressArtist(1)} name="Nikki" />
        <ArtistCell onPress={pressArtist(2)} name="Brittney" />
        <ArtistCell onPress={pressArtist(3)} name="Christina" />
        <ArtistCell onPress={pressArtist(4)} name="Arianna" />
        <ArtistCell onPress={pressArtist(4)} name="Miley" />
      </ScrollView>
    )
  }
}
