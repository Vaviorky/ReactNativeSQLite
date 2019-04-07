import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainView from "./components/MainView";
import Booking from "./components/Booking";
import Confirmation from "./components/Confirmation";

const MainNavigator = createStackNavigator({
  MainView: {screen: MainView},
  Booking: {screen: Booking},
  Confirmation: {screen: Confirmation},
});

const App = createAppContainer(MainNavigator);

export default App;