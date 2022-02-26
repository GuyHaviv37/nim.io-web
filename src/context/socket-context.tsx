import React from 'react';
import {io ,Socket} from 'socket.io-client';

// @TODO: add to io call the ENDPOINT of production server URL
export default React.createContext<Socket>(io('http://localhost:8080'));