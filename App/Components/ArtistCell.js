import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, Text, Image } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"

const ROOT = { flexDirection: "row", alignItems: "center" }
const IMAGE = {
  marginRight: 10,
  height: 50,
  width: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: Colors.line
}
const NAME = {}

export default class RoundedButton extends Component {
  render() {
    const personImage = { uri: "https://placekitten.com/300/300" }
    return (
      <TouchableOpacity style={ROOT} onPress={this.props.onPress}>
        <Image source={personImage} style={IMAGE} />
        <Text style={NAME}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}
