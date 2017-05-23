#!/bin/bash

mouth=$(date "+%Y-%m")

cd _posts/Diary

oldfile=$mouth"-*.markdown"
oldfile=$(echo $oldfile)

if [ -f "$oldfile" ]; then
  vim "$oldfile"
else
   datevar=$(date -d "yesterday" +%Y-%m-%d)
   timevar=$(date "+%H:%M:%S")
   line0="---"
   layout="layout: diary"
   title="title: \""$mouth"\""
   datetime="date:   "$datevar" "$timevar
   categories="categories: Diary Update"
   tags="tags: Diary Update"
   line1=$line0
   diarylist="	说说列表"
   cont="* 目录"
   toc="{:toc}"

   filename=$datevar"-diary.markdown"
   echo "$line0" > $filename
   echo "$layout" >> $filename
   echo "$title" >> $filename
   echo "$datetime" >> $filename
   echo "$categories" >> $filename
   echo "$tags" >> $filename
   echo "$line1" >> $filename
   echo "$diarylist" >> $filename
   echo "" >> $filename
   echo "$cont" >> $filename
   echo "$toc" >> $filename
   echo "" >> $filename

   vim $filename
fi
