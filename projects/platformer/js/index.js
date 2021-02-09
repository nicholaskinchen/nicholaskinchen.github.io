/* global Phaser */
$(document).ready(function () {
    var randoms = Math.random(1, 100);
  
    if (randoms <= .80){
        randoms = 1;
    }{if (randoms < .81)
        randoms = 2;
    }{if  (randoms < .82)
        randoms = 3;
    }{if (randoms < .83)
        randoms = 4;
    }{if (randoms < .84)
        randoms = 5;
    }{if (randoms < .85)
        randoms = 6;
    }{if (randoms < .86)
        randoms = 7;
    }{if (randoms < .87)
        randoms = 8;
    }{if (randoms < .88)
        randoms = 9;
    }{if (randoms < .89)
        randoms = 10;
    }
     
        
   
    
    'use strict';
    window.opspark = window.opspark || {};
    let 
        opspark = window.opspark,
        game = opspark.createGame(create, update),
        lives = randoms 
        
    function create() {
        game.opspark.init();
        
        opspark.platform.factory(game);
        opspark.platform.init(game);
        
        opspark.collectable.factory(game);
        opspark.collectable.init(game);
        
        opspark.cannon.factory(game);
        opspark.cannon.init(game);
        
        opspark.player.init(game);
        
        const textOpts = { fontSize: '32px', fill: '#000' };
        game.score = game.add.text(16, 16, 'Score: 0', textOpts);
        game.lives = game.add.text(16, 70, 'Lives: ' + lives, textOpts);
        game.title = game.add.text(16, 100, 'Hey you can knock the balls out the way and kill the turrets!');
        game.title = game.add.text(16, 150, 'When on floor dont press down :]');
       
    }


    function update() {
        const asset = game.player.asset,
              playerManager = game.playerManager,
              collectable = game.collectable;
        
        game.physics.arcade.collide(asset, game.platforms);
        game.physics.arcade.collide(asset, game.projectile);
        game.physics.arcade.collide(collectable, game.platforms);
        game.physics.arcade.overlap(asset, collectable, collectDb, null, this);
        game.physics.arcade.overlap(asset, game.projectile, onProjectileOverlap, null, this);
        
        playerManager.update();
    }

    function onProjectileOverlap() {
        console.log('Halle hit!');
        game.player.die();
        decrementLives();
        if(lives > 0){
            opspark.player.init(game);
        } 
    }
    function decrementLives(){
        if(lives !== 0){
            lives--;
            game.lives.text = 'Lives ' + lives;            
        } else {
            setTimeout(() => game.lives.text = "Game Over: Refresh Your Browser to Play Again", 500);
        } 
    }

    function collectDb(player, collectable) {
        game.score.text = 'Score: ' + (parseInt(/\s+(\S*)$/.exec(game.score.text)[1], 10) + collectable.type.points);
        collectable.kill();
    }

});
