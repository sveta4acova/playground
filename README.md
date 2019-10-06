#Учим Node.js, создавая блог

+ install node.js and mongodb
+ npm i
+ run mongod
+ npm run dev


##nodemon.json - при запуске nodemon он перезапишет переменные окружения (которые в файле .env) в поле env (process.env). Реагировать будет на обновление файлов, расширение которых соответсвует ext

###Деплой на Heroku - выполнены инстукции с Heroku и MongoDB.Atlas, но были некоторые проблемы с: 
+ проект находится в ветке, а не в мастере, поэтому пушиться надо так git push heroku feature/blog:master, а не git push heroku master
+ используется MongoDB.Atlas, нужно убедиться что в Security-Network Access добавлен IP 0.0.0.0
+ в package.json добавлен postinstall для сбора gulp стилей и js
+ теперь это тут https://test-project-blog.herokuapp.com
