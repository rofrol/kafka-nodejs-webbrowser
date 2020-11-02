```bash
cp .env.example .env
```

Add to `.env` your login and password for cloudkarafka.com.

```bash
cd server
npm i
npm start
```

```bash
cd client
npm i
npm start
```

```
cd server
node test_kafka_producer.js
```

Here I am producing multiple messages:

![](screenshots/producer.png)

Nodejs receive them all:

![](screenshots/nodejs_received.png)

Not all messages sent from nodejs are recevied by google chrome:

![](screenshots/google_chrome_received.png)

And not even one is received by Internet Explorer 11.