# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN yarn add

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]