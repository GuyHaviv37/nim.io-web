import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Game } from './types';
import { EMPTY_GAME } from '../../constants';
import { errorCallback } from '.';

export function useEstablishGame(socket: Socket, gameId: string, playerId: number, heaps?: number[]) {
   const [playerNo, setPlayerNo] = useState(playerId);
   const [game, setGame] = useState<Game>(EMPTY_GAME);

   useEffect(() => {
      if (playerNo === 1) {
         socket.emit('newGame', { roomId: gameId, heaps }, errorCallback);
      } else if (playerNo === 2) {
         socket.emit('joinGame', { roomId: gameId }, errorCallback);
      }
   }, [gameId, playerNo]);

   useEffect(() => {
      socket.on('init', ({ newGame }) => {
         setGame(game => {
            return { ...game, ...newGame }
         });
      })

      socket.on('roleUpdate', ({ userRole }) => {
         setPlayerNo(userRole);
      })

      return () => {
         socket.disconnect()
      };
   }, [setGame])

   useEffect(() => {
      socket.on('gameUpdate', ({ update, isRestart }) => {
         // if(update.player2 === null){
         //     setInfoDisplay('Your friend can join this game with the Game ID listed above !');
         // }
         // if (isRestart) {
         //     setShowGame(true);
         // }
         console.log('update: ', update);
         setGame(game => {
            return { ...game, ...update }
         });
      })
   }, [setGame])

   useEffect(() => {
      socket.on('gameOver', ({ winner }) => {
         setGame(game => {
            return { ...game, heaps: [0, 0, 0] }
         })
         // setInfoDisplay(`Your winner is ${winner}`);
         // setShowGame(false);
      })
   }, [setGame]);

   return { playerNo, game, setGame };
};