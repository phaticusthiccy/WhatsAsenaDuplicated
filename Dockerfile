FROM fusuf/whatsasena:publicbeta

RUN git clone https://github.com/phaticusthiccy/WhatsAsenaDuplicated /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN apk add sqlite
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
