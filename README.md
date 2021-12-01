## IT5007 Project - Web Game

### Commands

```
git clone git@github.com:Yufei-Zheng/IT5007project-Game-TPLink.git
mongo userbase scripts/init.mongo.js
npm run build
npm run dev
```

\* Note: You may avoid using npm install, since all the pakages needed are already offered in the directory ./node_modules.

### UI Navigation

1. Open *localhost:3000* (i.e. *localhost:3000/mainpage.html*)

   ![mainpage](https://user-images.githubusercontent.com/50799916/144272649-15949ef8-2ea7-462e-aff3-943d98a527fb.PNG)


2. Enter username and password to click 'login' button, it will redirect to *localhost:3000/interfaces.html*; 

   or click 'Sign Up' button to insert your username and password to user database and after that it will redirect to mainpage.html again.

3. There are "Account", "Assets", "Friends", "Ranking", and "Play" interfaces in  interfaces.html. You can click 'Logout' button at the upper right corner to redirect to mainpage.

4. Click 'Play' in the left bar and you will see:

   ![img](https://lh4.googleusercontent.com/fvPdjWLHwrqXW6_BaXQus9ulkz_rl5Y_nJ1K6HlQg5WuUQO8jy-K5J5EDGFF7gw5gjn9hrPkDu7an3pi0SpGtpVpRVCxmF6frgRbr7pBIDB4u2ifkFARgDnzxrHz88i0JfNc-iby)

   By now, only single play mode has been implemented.

5. Click 'Start Now' Button to redirect to *localhost:3000/game.html* and enjoy the journey in Galactic Empire :)

 

### Game Operation

*localhost:3000/ game.html*

1. Click anywhere to start. The game will be running after loading the necessary resources.

2. The spacecraft's position is <u>controlled by your mouse moving</u>. Missiles are automatically fired. 

3. 'Enemies',including planets and other spacecrafts, will appear randomly and move automatically at different speed . Collision with them will impair your life. Your scores will increase when you destroy your enemies.

4. Game over if you run out of three lives.

5. Click anywhere to pause the running game, then click to continue.

**\* Vedio is attached to show the UI navigation and game operation.**
