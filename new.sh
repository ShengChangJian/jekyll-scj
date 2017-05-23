#!/bin/bash

echon()
{
 echo "$*  " | tr -d '\n'
}

echo "The existed categories/tags as follows:"
cd _posts
for file in *
do
    if test -d $file
    then
       echon $file 
    fi
done

echo ""
echo -n "Which do you want or give a new one like above: "
read tag


while [ ! -n "$tag" ]
do
     echo -n "No tags, please input a tags: "
     read tag
done


tag=$(echo $tag | sed 's/^\w\|\_\w/\U&/g')


newtag=1
for file in *
do
    if test -d $file
    then
       if [ "$file"=="$tag" ]; then
          let newtag=0
       fi
    fi
done

if [ $newtag -eq 1 ]; then
  mkdir $tag
  echo "You have a new tag named $tag"
  cd $tag
else
  cd $tag
  echo "\nIn the $tag has files as following: "
  for file in *
  do
    if test -f $file
    then
	var=$file
	var=${var#*-}
	var=${var#*-}
	var=${var#*-}
	var=${var%.*}
       echon $var
    fi
  done
fi

echo ""
echo -n "If you want open a file above( else ENTER), please input one name: "
read name

while [ ! -n "$name" ]
do
   echo -n "Please input a file name like abuve: "
   read name
done

oldfile="*"$name".markdown"
oldfile=$(echo $oldfile)
if [ -f "$oldfile" ]; then
   vim $oldfile
else
   echo -n "title:  "
   read title

   while [ ! -n "$title" ]
   do
     echo -n "No title,please input the title:  "
     read title
   done

   echo -n "layout(chouse one from the \"post/post_0/diary\":  "
   read layout

   if [ ! -n "$layout" ]; then
    layout="post"
   else
    str="post post_0 diary"
    post=($str)
    yes=0;
    n=${#post[@]}
    while [ $yes -eq 0 ]
    do
      for ((i=0;i<$n;i++))
      do
        if [ "$layout" == "${post[$i]}" ]; then
  	  echo "yes"
	  let yes=1
	  let i=$n
        else
          echo -n "layout error! choose one from \"post/post_0/diary\":  "
          read layout
          let i=$n
        fi	
      done
    done
   fi

   datevar=$(date -d "yesterday" +%Y-%m-%d)
   timevar=$(date "+%H:%M:%S")

   line0="---"
   layout="layout: "$layout
   title="title:  \""$title"\""
   datetime="date:   "$datevar" "$timevar
   categories="categories: "$tag" Update"
   tags="tags: "$tag" Update"
   line1=$line0

   filename=$datevar"-"$name".markdown"
   echo "$line0" > $filename
   echo "$layout" >> $filename
   echo "$title" >> $filename
   echo "$datetime" >> $filename
   echo "$categories" >> $filename
   echo "$tags" >> $filename
   echo "$line1" >> $filename

   vim $filename
fi
