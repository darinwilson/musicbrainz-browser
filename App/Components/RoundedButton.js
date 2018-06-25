import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"
import Text from "./Text"

const ROOT = {
  height: 45,
  borderRadius: 4,
  backgroundColor: Colors.palette.purple,
  justifyContent: "center"
}
const TEXT = {
  color: Colors.palette.white,
  textAlign: "center",
  fontWeight: "bold",
  fontSize: Fonts.size.medium,
  paddingHorizontal: 10
}

export default class RoundedButton extends Component {
  render() {
    const text = this.props.text || this.props.children || ""
    const rootStyle = { ...ROOT, ...this.props.style }
    const textStyle = { ...TEXT, ...this.props.textStyle }
    return (
      <TouchableOpacity style={rootStyle} onPress={this.props.onPress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    )
  }
}
