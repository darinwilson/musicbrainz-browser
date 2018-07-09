import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, Image } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"
import Text from "./Text"

const ROOT = { flexDirection: "row", alignItems: "center", paddingVertical: 10 }
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
    return (
      <TouchableOpacity style={ROOT} onPress={this.props.onPress}>
        <Text style={NAME}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}
