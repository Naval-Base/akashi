FROM node:9-alpine

LABEL name "akashi"
LABEL version "0.1.0"
LABEL maintainer "iCrawl <icrawltogo@gmail.com>"

WORKDIR /usr/src/akashi

COPY package.json yarn.lock .yarnclean ./

RUN apk add --update \
&& apk add --no-cache --virtual .build-deps git curl \
\
&& yarn install \
\
&& apk del .build-deps

COPY . .

EXPOSE 9901

ENV NODE_ENV= \
	PORT= \
	DISCORD_TOKEN=

CMD ["node", "src/index.js"]
