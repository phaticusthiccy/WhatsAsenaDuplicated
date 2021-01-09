FROM fusuf/whatsasena:latest

RUN git clone https://github.com/phaticusthiccy/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN apk add sqlite
RUN npm i -g sqlite3@4.0.1 --unsafe-perm
RUN npm install -g npm@7.4.0
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
