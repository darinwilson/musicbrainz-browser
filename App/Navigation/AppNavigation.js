import { StackNavigator } from "react-navigation"
import HomeScreen from "../Containers/HomeScreen"
import ArtistSearchScreen from "../Containers/ArtistSearchScreen"
import FavoritesScreen from "../Containers/FavoritesScreen"
import ArtistScreen from "../Containers/ArtistScreen"
import AlbumScreen from "../Containers/AlbumScreen"

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    home: { screen: HomeScreen },
    artistSearch: { screen: ArtistSearchScreen },
    favorites: { screen: FavoritesScreen },
    artist: { screen: ArtistScreen },
    album: { screen: AlbumScreen }
  },
  {
    // Default config for all screens
    navigationOptions: {}
  }
)

export default PrimaryNav
