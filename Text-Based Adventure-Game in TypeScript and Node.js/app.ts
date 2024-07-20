// Text-Based Adventure-Game in TypeScript and Node.js
// This project is not GUI based. It is a console-based game. 
// The video here shows how to develop the game in Java. 
// You will take the requirements of the game from the video 
// and develop the game in TypeScript and Node.js

class Player {
      name: string;
      health: number;
      inventory: string[];
    
      constructor(name: string) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
      }
    
      take(item: string) {
        this.inventory.push(item);
      }
    
      use(item: string) {
        // Implement item usage logic
      }
    
      checkHealth() {
        return this.health;
      }
    }


    class Room {
      description: string;
      exits: { [direction: string]: Room };
      items: string[];
    
      constructor(description: string) {
        this.description = description;
        this.exits = {};
        this.items = [];
      }
    
      addItem(item: string) {
        this.items.push(item);
      }
    
      removeItem(item: string) {
        this.items = this.items.filter(i => i !== item);
      }
    
      setExits(exits: { [direction: string]: Room }) {
        this.exits = exits;
      }
    }

    class Game {
      player: Player;
      currentRoom: Room;
    
      constructor(player: Player, startingRoom: Room) {
        this.player = player;
        this.currentRoom = startingRoom;
      }
    
      start() {
        console.log('Welcome to the game!');
        this.showCurrentRoom();
      }
    
      showCurrentRoom() {
        console.log(this.currentRoom.description);
        console.log('Exits: ', Object.keys(this.currentRoom.exits).join(', '));
      }
    
      handleCommand(command: string) {
        const [action, ...args] = command.split(' ');
        switch (action) {
          case 'go':
            this.move(args[0]);
            break;
          case 'look':
            this.showCurrentRoom();
            break;
          case 'take':
            this.takeItem(args[0]);
            break;
          case 'use':
            this.useItem(args[0]);
            break;
          case 'inventory':
            console.log('Inventory: ', this.player.inventory.join(', '));
            break;
          case 'health':
            console.log('Health: ', this.player.checkHealth());
            break;
          default:
            console.log('Unknown command.');
        }
      }
    
      move(direction: string) {
        if (this.currentRoom.exits[direction]) {
          this.currentRoom = this.currentRoom.exits[direction];
          this.showCurrentRoom();
        } else {
          console.log('You can\'t go that way.');
        }
      }
    
      takeItem(item: string) {
        if (this.currentRoom.items.includes(item)) {
          this.currentRoom.removeItem(item);
          this.player.take(item);
          console.log(`You take the ${item}.`);
        } else {
          console.log('There is no such item here.');
        }
      }
    
      useItem(item: string) {
        if (this.player.inventory.includes(item)) {
          this.player.use(item);
          console.log(`You use the ${item}.`);
        } else {
          console.log('You don\'t have such an item.');
        }
      }
    }

    const player = new Player('Hero');
const startingRoom = new Room('You are in a small, dark room.');

// Setup rooms and their exits
const secondRoom = new Room('You are in a brightly lit room.');
startingRoom.setExits({ north: secondRoom });
secondRoom.setExits({ south: startingRoom });

// Add items to rooms
startingRoom.addItem('key');
secondRoom.addItem('potion');

const game = new Game(player, startingRoom);
game.start();

// To handle user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.on('line', (input:string) => {
  game.handleCommand(input);
});

    