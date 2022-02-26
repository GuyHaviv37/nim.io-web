import {Socket} from 'socket.io-client';
import {useEffect, useState} from 'react';
import {Game} from './types';
import {EMPTY_GAME} from '../../constants';

//@TODO: add meaningful error callback
const errorCallback = (e: any) => e && console.error(e);

export function useEstablishGame(socket: Socket, gameId: string, playerId: string, heaps?: number[]) {
   const [playerNo, setPlayerNo] = useState(playerId);
   const [game, setGame] = useState<Game>(EMPTY_GAME);

   useEffect(() => {
     if (playerId === '1') {
        socket.emit('newGame', {roomId: gameId, heaps}, errorCallback);
     } else if (playerId === '2') {
        socket.emit('joinGame', {roomId: gameId}, errorCallback);
     }
    }, [gameId, playerId]);
    
   useEffect(() => {
      socket.on('init',({newGame})=>{
         setGame(game => {
             return {...game,...newGame}
         });
     })

     socket.on('roleUpdate',({userRole})=>{
         setPlayerNo(userRole);
     })
      
      return () => {
         socket.disconnect()
      };
   }, [])

   return {playerNo, game, setGame};
};