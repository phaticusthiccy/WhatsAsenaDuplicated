FROM fusuf/whatsasena:latest

RUN git clone https://github.com/MRwolfia/DKWBOT /root/DKWBOT
WORKDIR /root/DKWBOT/
ENV EN=English
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
