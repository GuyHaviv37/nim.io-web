import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SocketContext from './context/socket-context';
import { useContext } from 'react';

const App = () => {
    const socket = useContext(SocketContext);
    return (
        <div className="bg-gray-100 h-screen w-screen">
            <SocketContext.Provider value={socket}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainMenuScreen />} />
                        <Route path="/game/:gameId/:playerId" element={<GameScreen />} />
                    </Routes>
                </BrowserRouter>
            </SocketContext.Provider>
        </div>
    );
}

export default App;
