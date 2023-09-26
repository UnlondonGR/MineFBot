const mineflayer = require('mineflayer');
var AutoAuth = require('mineflayer-auto-auth');
var readline = require('readline');

const bot = mineflayer.createBot({
  host: 'ReplaceWithIP',
  port: 25565,
  username: 'ReplaceMe',
  version: '1.19.4',
  plugins: [AutoAuth],
  AutoAuth: 'ReplaceMe'
});

bot.once('spawn', () => {
  const path = [bot.entity.position.clone()];
  bot.on('move', () => {
    if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
      path.push(bot.entity.position.clone());
    }
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(message) {
  bot.chat(message);
});

bot.on('chat', function(username, message) {
  if (username === bot.username) return;

  const formattedMessage = formatChatMessage(username, message);
  console.log(formattedMessage);
});

bot.on('serverAuth', function() {
  // Here bot should be already authorized
});

// Log errors and kick reasons:
bot.on('kicked', console.log);
bot.on('error', console.log);

// Function to format chat messages
function formatChatMessage(username, message) {
  return `<${username}> ${message}`;
}

const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
})
