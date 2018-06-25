import React, { Component } from "react"
import { Image, ScrollView, View } from "react-native"
import Text from "../Components/Text"
import TrackCell from "../Components/TrackCell"
import { Colors } from "../Themes"

const ROOT = { flex: 1, backgroundColor: Colors.background }
const DETAILS = { paddingBottom: 40 }
const ROW = { flexDirection: "row", paddingHorizontal: 10 }
const TOP_ROW = { paddingTop: 20 }
const IMAGE = { width: 150, height: 150, marginRight: 10 }
const RESULTS = {}

const Logo = require("../Images/musicbrainz-logo.png")

export default class AlbumScreen extends Component {
  static navigationOptions = {
    title: "Album"
  }

  render() {
    const albumImage = { uri: "https://placekitten.com/401/401" }
    const released = "December 1959"
    const name = "Giant Steps"

    return (
      <ScrollView style={ROOT}>
        <View style={DETAILS}>
          <View style={{ ...ROW, ...TOP_ROW }}>
            <Image source={albumImage} style={IMAGE} />
            <Text text={name} />
          </View>
          <View style={ROW}>
            <Text text="released:" />
            <Text text={released} />
          </View>
        </View>

        <View style={RESULTS}>
          <Text text="Tracks" />
          <TrackCell number={1} name="Track 1 Name" time="6:09" />
          <TrackCell number={2} name="Track 2 Name" time="6:09" />
          <TrackCell number={3} name="Track 3 Name" time="6:09" />
          <TrackCell number={4} name="Track 4 Name" time="6:09" />
          <TrackCell number={5} name="Track 5 Name" time="6:09" />
          <TrackCell number={6} name="Track 6 Name" time="6:09" />
          <TrackCell number={7} name="Track 7 Name" time="6:09" />
        </View>
      </ScrollView>
    )
  }
}
