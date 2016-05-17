HEIGHT = 606;
WIDTH = 505;


var Entity = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}


Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function() {
    Entity.apply(this, arguments);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    if (this.x < WIDTH ) {
        this.x += this.speed * dt;
    } else {
        this.x = -50;
    };
};


var Player = function() {
    Entity.apply(this, arguments);
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.height = 80;
Player.prototype.width = 40;


Player.prototype.isInField = function(movings) {
    var x = this.x + this.speed * movings[0];
    var y = this.y + this.speed * movings[1];
    return x > -15 && x < WIDTH - 100 && y > -15 && HEIGHT - 150;
}

Player.prototype.handleInput = function(movings) {
    if (this.isInField(movings)) {
        this.x += this.speed * movings[0];
        this.y += this.speed * movings[1];
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(20,20,50)];
var player = new Player(200,200,50);


var checkCollisions = function() {
    for (enemy in allEnemies){
        if (Math.abs(allEnemies[enemy].x - player.x) < 60 && Math.abs(allEnemies[enemy].y - player.y) < 60  ){
            return true;
        };
    };
    return false;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: [-1, 0],
        38: [0, -1],
        39: [1, 0],
        40: [0, 1]
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
