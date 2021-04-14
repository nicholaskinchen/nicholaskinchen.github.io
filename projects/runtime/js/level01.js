var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       
        

        function createSawBlade(x, y){
         var hitZoneSize = 15;
        var damageFromObstacle = 50;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);    
        var obstacleImage = draw.bitmap('img/Ouch (1).png');
        obstacleImage.x = -15;
        obstacleImage.y = -15;
        sawBladeHitZone.addChild(obstacleImage);
            }
       
        
        createSawBlade(1000, 250);
        createSawBlade(2000, 300);
        createSawBlade(3000, 350);
        
        function createEnemy(x, y){
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        game.addGameItem(enemy);
        enemy.x = x;
        enemy.y = y;
        enemy.velocityX = -1;
        rotationalVelocity = 10;
    }

        
        createEnemy(300, 250);

        enemy.onPlayerCollision = function() {
            game.changeIntegrity(-25);
            enemy.fadeOut();
            
};

 enemy.onProjectileCollision = function() {
     game.increaseScore(50);
     enemy.fadeOut();
 }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
