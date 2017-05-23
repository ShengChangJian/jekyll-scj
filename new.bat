@echo off

::前一天的日期，格式化输出
echo Wscript.echo dateadd("d",-1,date)>vbs.vbs
for /f %%a in ('cscript //nologo vbs.vbs') do del vbs.vbs&&set yyyymmdd=%%a
for /f "tokens=1,2,3* delims=// " %%i in ('echo %yyyymmdd%') do set yyyy=%%i&set mm=%%j&set dd=%%k
if   %mm%   LSS   9   set   mm=0%mm%
if   %dd%   LSS   9   set   dd=0%dd%
set datevar=%yyyy%-%mm%-%dd%
::日期代码结束

set timevar=%time:~0,2%
if /i %timevar% LSS 10 (
set timevar=0%time:~1,1%
)
set timevar=%timevar%:%time:~3,2%:%time:~6,2%

:a
set /p a_filename=filename(ex: jekyll-setup): 
if defined a_filename (set file_0=%datevar%-%a_filename%.markdown) else (call :a)

echo=
@echo 已经存在类似文件：
for /f "usebackq" %%i in (`"@dir/s/b *%a_filename%*.markdown"`) do (@set var=%%i && echo %%i)

echo=
echo 若此时要退出请输入 q (默认打开最后一个文件) 再回车
echo 如要打开指定文件请复制上面需要的一行，再回车
echo 若继续请直接回车
echo=

set/p ch= 请按照前面的提示输入：
echo=
if "%ch%"=="q" (
gvim %var%
cmd)
if "%ch%"=="" (echo 你最开始输入的文件名为：%a_filename% && echo 请继续完成以下信息 && echo=) else (
gvim %ch%
cmd)

set date=date: %datevar% %timevar%


setlocal enabledelayedexpansion
set dirname=
cd _posts
for /f "delims=" %%a in ('dir /ad/b') do (
set dirname=!dirname!  %%a
)

@echo Exited tags as follows: 
@echo !dirname!
echo=
endlocal

:c
set /p a_tags=tags(cannot be null): 
if defined a_tags (set tags=tags: %a_tags% Update) else (call :c)
set a_tags_1=%a_tags:~0,1%
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do call set a_tags_1=%%a_tags_1:%%i=%%i%%
set a_tags=%a_tags_1%%a_tags:~1%
set tags=tags: %a_tags% Update
set categories=categories: %a_tags% Update

cd _posts
if not exist %a_tags% (md %a_tags%)

set file=%cd%\%a_tags%\%file_0%
set fileDir=%cd%\%a_tags%
set var=
for /f "usebackq" %%i in (`"@dir/s/b %fileDir%\*%a_filename%*.markdown"`) do (@set var=%%i)

if "%var%"=="%file%" (cd..
start gvim %var%
exit) else (echo=
@echo 你之前输入的文件名为：
@echo %a_filename%
echo=
@echo 该文件的 tag 为:
@echo %a_tags%
echo=
@echo 请继续完成以下信息 
echo=
)
set tag=---

:u
set /p a_layout=layout(post/post_0/diary,default: post): 
if not defined a_layout (set a_layout=post
call :L)
if "%a_layout%"=="post" (@set right=1
call :L)
if "%a_layout%"=="post_0" (@set right=1
call :L)
if "%a_layout%"=="diary" (@set right=1
call :L)
if defined right (echo=) else (set a_layout=<nul
@echo 输入错误！目前只支持三种：
@echo post、post_0、diary
echo=
@echo 请重新输入
call :u)

:L
set layout=layout: %a_layout%

:b
set /p a_title=title: 
if defined a_title (set title=title: "%a_title%") else (call :b)

chcp 65001

@echo %tag%>%file%
@echo %layout%>>%file%
@echo %title%>>%file%
@echo %date%>>%file%
@echo %categories%>>%file%
@echo %tags%>>%file%
@echo %tag%>>%file%
cd..
start gvim %file%
@chcp 936
exit
