FROM registry.redhat.io/ubi7/nodejs-12:1-21

USER 0

# diffutils contains cmp
# iputils contains ping
RUN yum --disableplugin=subscription-manager -y install rh-python36 cyrus-sasl-gssapi cyrus-sasl-devel krb5-workstation openssl vim

USER 1001

# Add application sources
COPY . .

# https://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work/31536755#31536755
RUN echo "source /opt/rh/rh-python36/enable" >> $HOME/.profile

# Install the dependencies
RUN /bin/bash --login -c "npm install"

# Run script uses standard ways to run the application
CMD npm run -d start
