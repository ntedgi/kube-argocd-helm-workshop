FROM node:18-alpine3.16
COPY . .
EXPOSE 5400
RUN npm install
ENV PORT=5400
CMD ["node", "not-working-app.js"]
