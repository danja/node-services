Running using pm2

see https://blog.appsignal.com/2022/03/09/a-complete-guide-to-nodejs-process-management-with-pm2.html

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04#step-3-installing-pm2

https://pm2.keymetrics.io/docs/usage/quick-start/

pm2 start echo.js

or

pm2-dev start echo.js

On the server, if I do
curl http://localhost:3050/users/
I get the desired result.
nginx has :
location /users/ {
proxy_pass http://localhost:3050/;
proxy_set_header Host $host;
}
in a browser, it needs an extra bit of path,
https://hyperdata.it/users/users/
how do I get this to respond at
https://hyperdata.it/users/
?
