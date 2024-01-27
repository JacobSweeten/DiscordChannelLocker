FROM debian

RUN apt update && apt install -y \
	curl

RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
	apt-get install -y nodejs

COPY ./bot /bot

WORKDIR /bot

RUN npm install

ENV TZ=US/Central

COPY ./config.json /bot/config.json