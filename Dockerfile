FROM node:20.11.0 as build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --freeze-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]