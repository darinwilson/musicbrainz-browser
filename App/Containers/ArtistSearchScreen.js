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
import { connect } from "react-redux"
import ArtistActions, { ArtistSelectors } from "../Redux/ArtistRedux"

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
const RESULTS = { flex: 1, paddingHorizontal: 10 }

const Logo = require("../Images/musicbrainz-logo.png")

class ArtistSearchScreen extends Component {
  static navigationOptions = {
    title: "Artist Search"
  }
  state = {
    query: "The Police"
  }

  changeText = value => this.setState({ query: value })

  render() {
    const { search, getArtist, navigation, artists = [] } = this.props
    const { query } = this.state
    pressArtist = artistId => () => {
      navigation.navigate("artist", { artistId })
      getArtist(artistId)
    }

    return (
      <ScrollView style={ROOT} keyboardShouldPersistTaps="handled">
        <View style={SEARCH_PANEL}>
          <TextInput
            value={query}
            onChangeText={this.changeText}
            style={SEARCH_FIELD}
          />
          <RoundedButton
            text="Search"
            style={SEARCH_BUTTON}
            onPress={() => search(query)}
          />
        </View>
        <View style={RESULTS}>
          {artists.map(artist => (
            <ArtistCell
              key={artist.id}
              onPress={pressArtist(artist.id)}
              name={artist.name}
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    searching: state.artists.fetching,
    artists: ArtistSelectors.selectSearchResults(state.artists)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: query => dispatch(ArtistActions.searchArtistRequest(query)),
    getArtist: id => dispatch(ArtistActions.artistRequest(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistSearchScreen)
