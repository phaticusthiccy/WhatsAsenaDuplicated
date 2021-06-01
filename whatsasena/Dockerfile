FROM fusuf/whatsasena:latest

RUN git clone https://github.com/KioniNdungu/bot /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV REPO="https://github.com/KioniNdungu/bot.git"
ENV TZ=Europe/Istanbul

RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["run.sh"]
