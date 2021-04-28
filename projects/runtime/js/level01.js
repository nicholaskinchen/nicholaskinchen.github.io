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
                { "type": "sawblade", "x": 600, "y": groundY - 120 },
                { "type": "sawblade", "x": 800, "y": groundY - 100},
                { "type": "sawblade", "x": 1000, "y": groundY - 10 },
                { "type": "sawblade", "x": 1200, "y": groundY - 120 },
                { "type": "sawblade", "x": 1400, "y": groundY - 100},
                { "type": "sawblade", "x": 1600, "y": groundY - 10 },
                { "type": "sawblade", "x": 1800, "y": groundY - 120 },
                { "type": "sawblade", "x": 2000, "y": groundY - 100},
                { "type": "sawblade", "x": 2200, "y": groundY - 10 },
                { "type": "sawblade", "x": 2400, "y": groundY - 120 },
                { "type": "sawblade", "x": 2600, "y": groundY - 100},
                { "type": "sawblade", "x": 2800, "y": groundY - 10 },
                { "type": "reward", "x": 900, "y": groundY - 25 },
                { "type": "enemy", "x":  2000, "y": groundY - 25 },

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       
        

        function createSawBlade(x, y){
            var hitZoneSize = 15;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap('img/Ouch (1).png');
            obstacleImage.x = -15;
            obstacleImage.y = -15;
            sawBladeHitZone.addChild(obstacleImage);
        }
       
        
      
        
        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25);
            var enemyImage = draw.bitmap("img/vbucks50.png");
            enemyImage.x = -25;
            enemyImage.y = -25;
            enemy.addChild(enemyImage);
            game.addGameItem(enemy);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -1;
            rotationalVelocity = 10;

            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-25);
                enemy.fadeOut();                
            };
             enemy.onProjectileCollision = function() {
                game.increaseScore(50);
                enemy.fadeOut();
            }
        }

        
    
        
         function createReward (x, y) {
            var reward = game.createGameItem('reward',25);
            var smile = draw.bitmap('img/cringe.png');
            smile.x = -40;
            smile.y = -75;
            smile.scaleX = 3;
            smile.scaleY = 3;
            reward.addChild(smile);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1.5;
            rotationVelocity = 10;

            reward.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(100);
                reward.fadeOut();
            }
        }

        for (var key = 0; key <  levelData.gameItems.length; key++) {
            var gameItemObject = levelData.gameItems[key];
            if (gameItemObject.type === 'sawblade'){
                createSawBlade(gameItemObject.x, gameItemObject.y);
            } else if (gameItemObject.type === 'enemy'){
                createEnemy(gameItemObject.x, gameItemObject.y);
            } else {
                createReward(gameItemObject.x, gameItemObject.y);
            }
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
