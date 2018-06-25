import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, Text, Image, View } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"

const ROOT = { flexDirection: "row", alignItems: "center" }
const DETAILS = { paddingLeft: 10 }
const IMAGE = {
  marginRight: 10,
  height: 50,
  width: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: Colors.line
}
const NAME = {}
const YEAR = {}

export default class AlbumCell extends Component {
  render() {
    const albumImage = { uri: "https://placekitten.com/300/300" }
    return (
      <TouchableOpacity style={ROOT} onPress={this.props.onPress}>
        <Image source={albumImage} style={IMAGE} />
        <View style={DETAILS}>
          <Text style={NAME}>{this.props.name}</Text>
          <Text style={YEAR}>{this.props.year}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
