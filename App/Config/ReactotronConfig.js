import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

if (Config.useReactotron) {
  Reactotron
    .configure({ name: 'MusicBrainz Browser' })
    .useReactNative()
    .use(reduxPlugin({}))
    .use(sagaPlugin())

  console.tron = Reactotron
}
