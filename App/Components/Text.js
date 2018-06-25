import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, Text } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"

const ROOT = {
  color: Colors.palette.black,
  fontSize: Fonts.size.medium
}

export default class RoundedButton extends Component {

  render() {
    const { text, style: styleOverride, children, ...rest } = this.props
    const content = text || children || ""
    const style = {...ROOT, ...styleOverride}
    return (
      <Text style={style} {...rest}>{content}</Text>
    )
  }
}
