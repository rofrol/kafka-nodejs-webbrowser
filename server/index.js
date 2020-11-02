const express = require("express");
const app = express();
const port = 8080;
const ws = require('ws');
const http = require('http');

const Kafka = require('node-rdkafka');
console.log('Kafka.features');
console.log(Kafka.features);

const server = http.createServer(app);
server.listen(port, () =>
  console.log(`USCC API server listening on port ${port}`)
);

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => {
    console.log(message);
    socket.send(message);
    socket.send('Message1');
  });
  socket.on("error", (err) => {
    console.log(err.stack);
  });

  const CLOUDKARAFKA_BROKERS = 'rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094';
  const CLOUDKARAFKA_USERNAME = process.env.CLOUDKARAFKA_USERNAME;
  const CLOUDKARAFKA_PASSWORD = process.env.CLOUDKARAFKA_PASSWORD;
  const CLOUDKARAFKA_TOPIC_PREFIX = 'nx450jmz-';
  const CONSUMER_GROUP_ID = "node-consumer-1"

  var kafkaConf = {
    'group.id': CONSUMER_GROUP_ID,
    'enable.auto.commit': true,
    "metadata.broker.list": CLOUDKARAFKA_BROKERS,
    'security.protocol': 'SASL_SSL',
    "sasl.mechanisms": "SCRAM-SHA-256",
    'sasl.username': CLOUDKARAFKA_USERNAME,
    'sasl.password': CLOUDKARAFKA_PASSWORD,
    "socket.keepalive.enable": true,
    'debug': 'broker,metadata'
  };
  const topics = CLOUDKARAFKA_TOPIC_PREFIX + 'default';

  let stream = new Kafka.KafkaConsumer.createReadStream(kafkaConf, { "auto.offset.reset": "earliest" }, { topics })
  stream.on('data', function (message) {
    const messageString = message.value.toString();
    console.log(`Consumed message on Stream: ${messageString}`); 3
    socket.send(messageString);
  });
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});