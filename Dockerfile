FROM node:10-alpine AS build
WORKDIR /usr/src/akashi
COPY package.json yarn.lock .yarnclean ./
RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& yarn install --ignore-engines \
&& apk del .build-deps

FROM node:10-alpine
LABEL name "akashi"
LABEL version "0.1.0"
LABEL maintainer "iCrawl <icrawltogo@gmail.com>"
WORKDIR /usr/src/akashi
COPY --from=build /usr/src/akashi .
COPY . .
EXPOSE 9901
ENV NODE_ENV= \
	PORT= \
	DISCORD_TOKEN=
CMD ["node", "src/index.js"]
