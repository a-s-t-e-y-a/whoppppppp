const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const PORT = process.envPORT || 3000;
server.listen(PORT, () => {
  console.log(`your server start running on ${PORT}`);
});
