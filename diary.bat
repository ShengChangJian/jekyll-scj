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
set file_0=%datevar%-diary.markdown
set find=%file_0:~0,7%
cd .\_posts\Diary
set file=%find%*-diary.markdown

IF EXIST %file% (start gvim %file% 
goto OUT)

cd ..
set tag=---
set layout=layout: diary
set title_0=%date:~0,4%-%date:~5,2%
set title=title: "%title_0%"
set date=date: %datevar% %timevar%
set a_tags=Diary
set tags=tags: %a_tags% Update
set categories=categories: %a_tags% Update

set file=%cd%\%a_tags%\%file_0%

set "cont=	说说列表"
set list=* 目录
set toc={:toc}

@chcp 65001
@echo %tag%>%file%
@echo %layout%>>%file%
@echo %title%>>%file%
@echo %date%>>%file%
@echo %categories%>>%file%
@echo %tags%>>%file%
@echo %tag%>>%file%
@echo %cont%>>%file%
@echo. >>%file%
@echo %list%>>%file%
@echo %toc%>>%file%


start gvim %file%
cd ..
goto Finish
:OUT
cd ..
cd..
:Finish
@chcp 936
