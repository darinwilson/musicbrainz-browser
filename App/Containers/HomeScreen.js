import React, { Component } from "react"
import { Image, View } from "react-native"
import RoundedButton from "../Components/RoundedButton"
import { Colors } from "../Themes"
import Reactotron from 'reactotron-react-native'

const ROOT = { flex: 1, backgroundColor: Colors.background }
const IMAGE = { marginTop: 40, marginBottom: 30, alignSelf: "center" }
const BUTTONS = { paddingHorizontal: 10 }
const BUTTON_SPACE = { marginTop: 20 }

const Logo = require("../Images/musicbrainz-logo.png")

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "MusicBrainz"
  }

  componentDidMount() {
    //Reactotron.log('Hello Chain React!')

    // console.tron.display({
    //   name: 'OHAI',
    //   important: true,
    //   preview: 'this shows up at the top!',
    //   value: {a: 1, b: [1,2,3]},
    //   image: 'http://placekitten.com/g/400/400'
    // })
  }

  pressSearch = () => this.props.navigation.navigate("artistSearch")
  pressFavs = () => this.props.navigation.navigate("favorites")

  render() {
    return (
      <View style={ROOT}>
        <Image source={Logo} style={IMAGE} />
        <View style={BUTTONS}>
          <RoundedButton text="Artist Search" onPress={this.pressSearch} />
          <RoundedButton
            style={BUTTON_SPACE}
            text="Favorites"
            onPress={this.pressFavs}
          />
        </View>
      </View>
    )
  }
}
