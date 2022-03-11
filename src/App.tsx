import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {useErrors} from './useErrors';

const App = () => {
    const {errorCallback, errorsQueue} = useErrors();
    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Routes>
                <Route path="/" element={<MainMenuScreen />}/>
                <Route path="/game/:gameId/:playerId" element={<GameScreen errorCallback={errorCallback}/>} />
            </Routes>
            {/* Error Footer */}
        </div>
    );
}

export default App;
