FROM arm64v8/node:16.14
WORKDIR /app
COPY . .
RUN npm install -g nodemon
RUN npm install
EXPOSE 443
CMD ["npm", "start"]