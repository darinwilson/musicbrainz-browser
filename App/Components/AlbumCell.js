import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, Image, View } from "react-native"
import { Fonts, Colors, Metrics } from "../Themes"
import { format } from "date-fns"
import Text from "./Text"

const ROOT = { flexDirection: "row", alignItems: "center" }
const DETAILS = { paddingVertical: 10 }
const IMAGE = {
  marginRight: 10,
  height: 50,
  width: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: Colors.line
}
const NAME = { fontWeight: 'bold' }
const RELEASE_DATE = { fontSize: Fonts.size.mediumSmall }

export default class AlbumCell extends Component {
  render() {
    const albumImage = { uri: "https://placekitten.com/300/300" }
    return (
      <TouchableOpacity style={ROOT} onPress={this.props.onPress}>
        <View style={DETAILS}>
          <Text style={NAME}>{this.props.name}</Text>
          <Text style={RELEASE_DATE}>
            {format(this.props.releaseDate, "YYYY")}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
