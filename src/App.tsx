import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <div className="bg-gray-100 h-screen w-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainMenuScreen />} />
                    <Route path="/game/:gameId/:playerId" element={<GameScreen />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
