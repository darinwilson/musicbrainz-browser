import React, { Component } from "react"
import { SafeAreaView, StatusBar, View } from "react-native"
import { connect } from "react-redux"
import ReduxNavigation from "../Navigation/ReduxNavigation"
import StartupActions from "../Redux/StartupRedux"

const ROOT = {
  flex: 1
}

class RootContainer extends Component {
  componentDidMount() {
    if (console.tron) {
      console.tron.connect()
      console.tron.clear()
    }

    this.props.startup()
  }

  render() {
    return <ReduxNavigation />
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(
  null,
  mapDispatchToProps
)(RootContainer)
