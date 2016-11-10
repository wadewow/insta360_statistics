FROM nginx:stable-alpine

RUN rm /usr/share/nginx/html/*.*
ADD dist /usr/share/nginx/html
RUN mv /usr/share/nginx/html/statistics.html /usr/share/nginx/html/index.html 