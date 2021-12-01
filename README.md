## IT5007 Project - Web Game

### Commands

```
git clone https://github.com/Yufei-Zheng/IT5007project-Game-TPLink.git
mongo userbase scripts/init.mongo.js
npm run build
npm run dev
```

\* Note: please don’t use npm install, since all the pakages needed are already in the file ./node_modules.

### UI Navigation

1. Open *localhost:3000* (i.e. *localhost:3000/mainpage.html*)

   ![img](https://lh5.googleusercontent.com/xJ_GS11LcybbmrIaRreX_PNinroF1q2tejDT7mAjMPHL2sugaeGThrhMGElnoDGDUXaErqiohWxPSOl-cuqBt0LPOtqKa7hf178Q3DmlCz-Bs-NyIyxHYtk05TRMJ0GI7yBeX4qU)

2. Enter username and password to click 'login' button, it will redirect to *localhost:3000/interfaces.html*; 

   or click 'Sign Up' button to insert your username and password to user database and after that it will redirect to mainpage.html again.

3. There are "Account", "Assets", "Friends", "Ranking", and "Play" interfaces in  interfaces.html. You can click 'Logout' button at the upper right corner to redirect to mainpage.

4. Click 'Play' at the left side and you will see:

   ![img](https://lh4.googleusercontent.com/fvPdjWLHwrqXW6_BaXQus9ulkz_rl5Y_nJ1K6HlQg5WuUQO8jy-K5J5EDGFF7gw5gjn9hrPkDu7an3pi0SpGtpVpRVCxmF6frgRbr7pBIDB4u2ifkFARgDnzxrHz88i0JfNc-iby)

   We now have only implemented single play mode for the game.

5. Click 'Start Now' Button to redirect to *localhost:3000/game.html* and enjoy the journey in Galactic Empire :)

 

### Game Operation

*localhost:3000/ game.html*

1. Click anywhere to start. The game will running after loading.

2. The plane's position is <u>controlled by your mouse moving</u>. Missiles are automatically fired. 

3. 'Enemies' including planets and other aircrafts will appear and move automatically. Collision with them will impair your life. Your scores will increase as you hit your enemies.

4. Game over if you run out of three lives.

<<<<<<< HEAD
5. Click anywhere to pause the running game.
=======
5. Click anywhere to pause the running game.

**\* Vedio is attached to show the UI navigation and game operation.**
>>>>>>> 6bbeb934ddb483f2a0f152ad81a0dde78be92e99
