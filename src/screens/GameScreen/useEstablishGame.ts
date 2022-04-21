import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Game, GameLogEntry } from './types';
import { EMPTY_GAME } from '../../constants';
import { NimSocketError } from '../../useErrors';

export function useEstablishGame(
      socket: Socket, gameId: string, playerId: number,
      errorCallback: (e: NimSocketError) => void, heaps?: number[]) {
   const [playerNo, setPlayerNo] = useState(playerId);
   const [game, setGame] = useState<Game>(EMPTY_GAME);
   const [winnerId, setWinnerId] = useState<string | undefined>();
   const [gameLog, setGameLog] = useState<GameLogEntry[]>([])

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
      socket.on('gameUpdate', ({ update, isRestart, gameLogEntry }) => {
         if (isRestart) {
             setWinnerId(undefined);
             setGameLog([]);
         }
         setGame(game => {
            return { ...game, ...update }
         });
         if (gameLogEntry) {
            setGameLog(gameLog => [gameLogEntry, ...gameLog]);
         }
      })
   }, [setGame])

   useEffect(() => {
      socket.on('gameOver', ({ winner }) => {
         setGame(game => {
            return { ...game, heaps: [0, 0, 0] }
         })
         setWinnerId(winner);
         // setShowGame(false);
      })
   }, [setGame]);

   return { playerNo, game, winnerId, gameLog };
};