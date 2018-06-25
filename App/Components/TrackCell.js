import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"
import Text from "../Components/Text"

const ROOT = { paddingHorizontal: 10, flexDirection: "row", alignItems: "center" }
const NUMBER = { width: 20 }
const NAME = { paddingLeft: 10, flex: 1}
const TIME = {}

export default class TrackCell extends Component {
  render() {
    return (
      <View style={ROOT}>
        <Text style={NUMBER}>{this.props.number}.</Text>
        <Text style={NAME}>{this.props.name} ({this.props.time})</Text>
      </View>
    )
  }
}
