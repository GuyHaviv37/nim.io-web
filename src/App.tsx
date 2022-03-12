import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import {
    Routes,
    Route,
} from "react-router-dom";
import {useErrors} from './useErrors';
import ErrorsFooter from './components/ErrorsFooter';

const mockErrorsQueue = [
    {type: 'NO_USER_FOUND', msg: `No user with id: 123456789 was found - 2`},
    {type: 'USER_WITHOUT_ROOM', msg: `User with id: 123456789 is currently not in any - 1`}
]

const App = () => {
    const {errorCallback, errorsQueue, removeFromQueue} = useErrors();
    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Routes>
                <Route path="/" element={<MainMenuScreen />}/>
                <Route path="/game/:gameId/:playerId" element={<GameScreen errorCallback={errorCallback}/>} />
            </Routes>
            <ErrorsFooter errorsQueue={errorsQueue} removeFromQueue={removeFromQueue}/>
        </div>
    );
}

export default App;
