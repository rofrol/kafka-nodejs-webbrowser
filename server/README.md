# server

- https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md
- https://github.com/edenhill/librdkafka/wiki/Using-SASL-with-librdkafka

## Add image from registry.redhat.io

You can search here for image https://catalog.redhat.com/software/containers.

Example images:
- https://catalog.redhat.com/software/containers/ubi8/nodejs-12/5d3fff015a13461f5fb8635a
- https://catalog.redhat.com/software/containers/ubi7/nodejs-12/5da023db5a134626e5ee2d79

On tab [Get this image](https://catalog.redhat.com/software/containers/ubi8/nodejs-12/5d3fff015a13461f5fb8635a?container-tabs=gti) are instructions how to pull image from registry.redhat.io.

But first we need Red Hat Developer Account:
1. Create normal Red Hat account on https://redhat.com.
2. Then Sing up for Developer Account on https://developers.redhat.com/.
3. Then go to your account settings https://sso.redhat.com/auth/realms/redhat-external/account/ and copy your Red Hat Login ID
4. `docker login registry.redhat.io` and provide Red Hat Login ID and password.
5. You don't need to pull image manually with `docker pull registry.redhat.io/ubi7/nodejs-12` if it is in Dockerfile in `FROM`.

I once had problem with connecting to redhat registry. It was working after couple of hours.

## Docker local development

```
./docker_build.sh
./docker_run.sh
# in another terminal, to enter the running container
./docker_exec.sh
```

## Test kerberos

```shell
sh-4.2$ kinit -R -t "/path/to/file.keytab" -k <your@REALM>
sh-4.2$ klist
Ticket cache: FILE:/tmp/krb5cc_1000280000
Default principal: <your@REALM>


Valid starting     Expires            Service principal
10/08/20 19:20:22  10/09/20 05:20:22  krbtgt/<CUT>
renew until 10/15/20 19:20:22
```

## Test openssl

```shell
$ openssl s_client -host <host> -port <port> -CAfile /path/to/file.cer -tls1_2 -state
```

## Test kafka

First you need to start consumer:

```shell
cd server
node test_kafka_consumer.js
```

Then in another terminal:

```shell
cd server
node test_kafka_producer.js
```
