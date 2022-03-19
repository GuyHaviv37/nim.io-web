# nim.io-web
### What's Nim.io?
[Nim.io](https://clever-panini-c8e22f.netlify.app/) is a 2-player turn-based online game based on the famous computer-science game [Nim](https://en.wikipedia.org/wiki/Nim).\
Head over to https://clever-panini-c8e22f.netlify.app/ to read the rules and play with friends !

### Development Story
I started working on Nim.io right after I finished an online React course and looked for a project to make.\
I also knew that I wanted to experiment with [sockets](https://socket.io/) and decided to match the two into this project.\
I made great progress in the backend and made a starter React client, but then school resumed, I started working in a student position and this project was put to the side.\
After graduation and moving to full-time position, I had some free time on weekends to "complete" this project, only now I'm a much more mature React developer.\
I gave the backend a refactor and started the client from scratch, here's the result.

### Development stack
As I was looking for a well-rounded React project I went with:
- TS React built on [vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/) for UI (first time trying it out)
- [socket.io](socket.io) for client (and backend) sockets communication
- deployed on [Netlify](https://www.netlify.com/)

You can check the backend repo [here](https://github.com/GuyHaviv37/nim.io-server)

### What's next?
To further improve this project I'd probably go for:
- Actually learning some UX/UI practices (I went with my guts here)
- Add a feature to randomize heap sizes at creation and restart game
- Adding a chat to game rooms
- Adding public rooms (lobby of players seeking opponents)
- Better accessability and SEO
- [server] better error handling design
- [server] flow tests
- [server] actually supporting some DB for users/games like [firebase](https://firebase.google.com/) (it was not the main thing I wanted to practice)
