ARG ARCH=x86_64
ARG DOCKERSRC=alpine-openjdk8
ARG USERNAME=woahbase
#
FROM ${USERNAME}/${DOCKERSRC}:${ARCH}
#
ARG SDK_TOOLS_VERSION="3859397"
ARG GRADLE_VERSION="5.6"
ARG NPM_VERSION="latest"
#
ARG SDK_TARGET="28"
ARG SDK_API_VERSION="28.0.2"
#
USER root

ENV \
    JAVA_OPTS=" -Djava.net.useSystemProxies=true -Dhttp.noProxyHosts=${no_proxy} " \
    ANDROID_HOME=/opt/android-sdk-linux \
    ANDROID_SDK_ROOT=/opt/android-sdk-linux \
    GRADLE_HOME=/opt/gradle-$GRADLE_VERSION
#
RUN set -xe \
    && apk add --no-cache --purge -uU \
    openjdk8 \
    curl nss openssl git make libc-dev gcc libstdc++ \
    nodejs nodejs-npm \
    unzip \
    && mkdir -p \
    ${ANDROID_HOME} \
    ${GRADLE_HOME} \
    && curl -o /tmp/sdk-tools-linux-${SDK_TOOLS_VERSION}.zip \
    -jkSL https://dl.google.com/android/repository/sdk-tools-linux-${SDK_TOOLS_VERSION}.zip \
    && unzip -q -d ${ANDROID_HOME} \
    /tmp/sdk-tools-linux-${SDK_TOOLS_VERSION}.zip \
    && chown -Rh alpine:alpine ${ANDROID_HOME} \
    && curl -o /tmp/gradle-${GRADLE_VERSION}-bin.zip \
    -jkSL https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
    && unzip -q -d /opt \
    /tmp/gradle-${GRADLE_VERSION}-bin.zip \
    && chown -Rh alpine:alpine ${GRADLE_HOME} \
    && npm install -g \
    npm@${NPM_VERSION} \
    cordova \
    && rm -rf /var/cache/apk/* /tmp/* /root/.npm /root/.node-gyp
#
ENV PATH=$PATH:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${GRADLE_HOME}/bin
#

#
RUN set -xe \
    && mkdir -p ~/.android ~/.gradle \
    && touch ~/.android/repositories.cfg \
    && echo "org.gradle.daemon=false" >> ~/.gradle/gradle.properties \
    && yes | sdkmanager --licenses 1>/dev/null \
    && sdkmanager --update \
    && sdkmanager \
    "platforms;android-${SDK_TARGET}" \
    "build-tools;${SDK_API_VERSION}" \
    "platform-tools" \
    "tools" 1>/dev/null

RUN echo "export ANDROID_HOME=/opt/android-sdk-linux" >> ~/.bashrc \
    && echo "export ANDROID_SDK_ROOT=/opt/android-sdk-linux" >> ~/.bashrc \
    && echo "export PATH=${PATH}:/opt/android-sdk-linux/platform-tools:/opt/android-sdk-linux/tools:/opt/android-sdk-linux/tools/bin" >> ~/.bashrc \
    && echo "export GRADLE_HOME=/opt/android-studio/gradle" >> ~/.bashrc \
    && echo "export PATH=$PATH:/opt/gradle-5.6/bin" >> ~/.bashrc \
    && echo "export PATH=$PATH:$GRADLE_HOME/m2repository" >> ~/.bashrc 

RUN gradle -v
# && sdkmanager --uninstall "emulator" \
#
# COPY root/ /
#
#VOLUME /home/alpine/
#WORKDIR /home/alpine/project/
#
#EXPOSE 5037 8100
#
ENTRYPOINT ["/bin/bash", "-l", "-c"]