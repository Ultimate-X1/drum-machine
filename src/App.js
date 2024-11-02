import store from "./redux/store";
import { Provider } from "react-redux";
import DrumMaster from "./components/drum machine";
import './styles/app.css'

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <DrumMaster />
      </div>
    </Provider>
  );
}

export default App;
