// Based on https://github.com/Blizzard/node-rdkafka/blob/80df715adf83f10b1c15871dac0c8f8fb105141a/examples/consumer-flow.md

const Kafka = require('node-rdkafka');

const CLOUDKARAFKA_BROKERS = 'rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094';
const CLOUDKARAFKA_USERNAME = 'nx450jmz';
const CLOUDKARAFKA_PASSWORD = 'cmFsKxyvmXBVBIIXARnHochxNo7g2KB4';
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
const topicName = CLOUDKARAFKA_TOPIC_PREFIX + 'default';

var consumer = new Kafka.KafkaConsumer(kafkaConf);

//logging debug messages, if debug is enabled
consumer.on('event.log', function (log) {
  console.log(log.message);
});

//logging all errors
consumer.on('event.error', function (err) {
  console.error('Error from consumer');
  console.error(err);
});

//counter to commit offsets every numMessages are received
var counter = 0;
var numMessages = 5;

consumer.on('ready', function (arg) {
  console.log('consumer ready.' + JSON.stringify(arg));

  consumer.subscribe([topicName]);
  //start consuming messages
  consumer.consume();
  console.log('consumer ready event completed');
});

// docker image inspect --format '{{json .}}' "$IMAGE_ID" | jq -r '. | {Id: .Id, Digest: .Digest, RepoDigests: .RepoDigests, Labels: .Config.Labels}'
// docker image inspect --format '{{json .}}' "$IMAGE_ID" | jq -r '. | {Id: .Id, Digest: .Digest, RepoDigests: .RepoDigests, Labels: .Config.Labels}'
consumer.on('data', function (m) {
  counter++;

  //committing offsets every numMessages
  //if (counter % numMessages === 0) {
  //  console.log('calling commit');
  //  consumer.commit(m);
  //}

  // Output the actual message contents
  console.log('message consumed:');
  console.log(JSON.stringify(m));
  console.log(m.value.toString());

  // consumer.disconnect();
});

consumer.on('disconnected', function (arg) {
  console.log('consumer disconnected. ' + JSON.stringify(arg));
});

//starting the consumer
consumer.connect();

//stopping this example after 30s
// setTimeout(function () {
//   consumer.disconnect();
// }, 30000);