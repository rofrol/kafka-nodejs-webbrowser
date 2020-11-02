// Based on https://github.com/Blizzard/node-rdkafka/blob/80df715adf83f10b1c15871dac0c8f8fb105141a/examples/high-level-producer.md

const Kafka = require('node-rdkafka');

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
const topicName = CLOUDKARAFKA_TOPIC_PREFIX + 'default';

var producer = new Kafka.HighLevelProducer(kafkaConf);


// Throw away the keys
producer.setKeySerializer(function (v) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, 20);
  });
});

// Take the message field
producer.setValueSerializer(function (v) {
  return Buffer.from(v.message);
});

producer.connect(null, function () {
  const message = `${(new Date()).toISOString()} test from PRE UI`;
  producer.produce(topicName, null, {
    message
  }, null, Date.now(), function (err, offset) {
    // The offset if our acknowledgement level allows us to receive delivery offsets
    setImmediate(function () {
      producer.disconnect();
    });
  });
  console.log(`message produced: ${message}`);
});
