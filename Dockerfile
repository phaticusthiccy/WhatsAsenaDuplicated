FROM fusuf/whatsasena:latest

RUN git clone $GITHUB_REPO_URL /root/WhatsAsena
WORKDIR /root/WhatsAsena/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]