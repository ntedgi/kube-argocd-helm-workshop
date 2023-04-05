FROM node:18-alpine3.16
WORKDIR /usr/local/app
COPY . .
EXPOSE 5400
RUN npm install
ENV PORT=5400
CMD ["node", "app.js"]
