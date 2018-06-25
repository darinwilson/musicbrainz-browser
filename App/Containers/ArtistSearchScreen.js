import React, { Component } from "react"
import {
  SafeAreaView,
  Image,
  View,
  TextInput,
  ScrollView,
  FlatList
} from "react-native"
import Text from "../Components/Text"
import RoundedButton from "../Components/RoundedButton"
import { Colors, Fonts } from "../Themes"
import ArtistCell from "../Components/ArtistCell"

const ROOT = { flex: 1, backgroundColor: Colors.background }
const IMAGE = { marginTop: 40, marginBottom: 30, alignSelf: "center" }
const SEARCH_PANEL = {
  marginTop: 20,
  flexDirection: "row",
  paddingHorizontal: 10,
  alignItems: "center"
}
const SEARCH_FIELD = {
  height: 44,
  flex: 1,
  borderWidth: 1,
  borderColor: Colors.line,
  fontSize: Fonts.size.medium
}
const SEARCH_BUTTON = { marginLeft: 10 }
const RESULTS = { flex: 1 }

const Logo = require("../Images/musicbrainz-logo.png")

export default class ArtistSearchScreen extends Component {
  static navigationOptions = {
    title: "Artist Search"
  }

  render() {
    const search = "John Coltrane"
    pressArtist = artistId => () =>
      this.props.navigation.navigate("artist", { artistId })

    return (
      <ScrollView style={ROOT}>
        <View style={SEARCH_PANEL}>
          <TextInput style={SEARCH_FIELD} value={search} />
          <RoundedButton text="Search" style={SEARCH_BUTTON} />
        </View>
        <View style={RESULTS}>
          <ArtistCell onPress={pressArtist(1)} name="Johnny C 1" />
          <ArtistCell onPress={pressArtist(2)} name="Johnny C 2" />
          <ArtistCell onPress={pressArtist(3)} name="Johnny C 3" />
          <ArtistCell onPress={pressArtist(4)} name="Johnny C 4" />
        </View>
      </ScrollView>
    )
  }
}
