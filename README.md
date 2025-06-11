# Tracker.GG

A web app designed to track and display game stats for players, similar to OP.GG. Users can search profiles and view detailed statistics such as match history, in-game performance, rank stats, and more.

https://trackergg.vercel.app/

## Features

- **Player Search**: Search for players by their game ID, and region.
- **Detailed Stats**: View player stats including ranked stats, win rates, and match history.
- **Live Data**: Get real-time data from the game API.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind, SCSS
- **Backend:** Next.js, RSC, TypeScript, Zod 
- **Data:** Riot Games REST API (v4)
- **Cloud Hosting:** Vercel

## Usage

1. Visit the web app in your browser.
2. Enter a player's game ID - ```summonerName#tag``` in the search bar and set the correct region.
3. View details about the player and their past games
4. Screenshot for reference

![Screenshot 2025-03-01 at 1 25 05 AM](https://github.com/user-attachments/assets/1b8eaccf-421e-48a2-8731-1b0f2a3658e3)

  
## Local Installation

To run this project locally, follow the steps below:

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

- You will need to register for a developer account at https://developer.riotgames.com/apis to get the API key
- Create a `.env` file in the root of the project and add the following variables:

```
API_KEY=your-developer-api-key
```

4. Run the app
   
- For development:

```bash
npm run dev
```

- Run tests
```bash
npm run test
```

- For production:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE).

## Acknowledgments

- Thanks to the API provider - Riot Games for the data that powers this app, their game assets, as well as their commitment to providing a good developer experience.
- Inspired by OP.GG and other popular LoL analytics sites for design.

