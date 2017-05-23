@echo off
git pull origin master&&git add .&&git commit * -m "at %date% %time%"&&git push origin master
::先同步远程文件，后面的参数会自动连接你远程的文件
::git pull origin master
::添加远程不存在的git文件
::git add .
::提交
::git commit * -m "at %date% %time%"
::更新到远程服务器上
::git push origin master