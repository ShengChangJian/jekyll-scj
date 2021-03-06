﻿
<!--toc开始-->

    $(function() {
      $('#tocTree').toc({
        showAlways:true,
        renderIn:'#context_table',
        renderIn_1:'#markdown-toc',
        contentsText:"",
        hideText:'曰',
        showText:'田',
        hideText_1:'隐藏文章目录',
        showText_1:'展开文章目录',
        showCollapsed:true,
        saveShowStatus:false,
        minItemsToShowToc:3 
      });
    });

<!--toc结束-->

<!--语法高亮开始-->

 (function(){
    $('[class*="language-"]').addClass('prettyprint pre-scrollable linenums');
    prettyPrint();
})();


<!--评论按钮开始-->
function Lock_CheckForm(theForm){   
    var divcss_close = {
    "position": "relative",
    "top": "",
    "bottom": "",
    "width": "",
    "z-index": "",
    "background-color": ""
  }
    $('#ds_close').hide();
    $('#ds_comment').css(divcss_close);
    $('#ds-thread').css({"overflow":"scroll","overflow-y":"hidden","overflow-x":"hidden"});

    return false;   
} 

function ds_comment(){
  $('#ds_close').show();
  var divcss_open = {
    "position": "fixed",
    "top": "38%",
    "bottom": "8%",
    "width": $('#ds_comment').width(),
    "z-index": "",
    "background-color": "#122e29"
  }
  
  $('#ds_comment').css(divcss_open);
  $('#ds-thread').css({"overflow":"auto","overflow-y":"auto"});

}
<!--评论按钮结束-->


<!--语法高亮结束-->

<!--代码窗口和代码折叠开始-->

$("figure").each(function(index)
     {
       $(this).before('<input type="button" title="最多允许同时打开4个代码窗口！" onclick="runCode();"  class="copyButton" value="代码窗口" id="copy_' + index + '" style="margin-left:4em;color:blue;"/>');
       $(this).before('<input type="button" title="最多允许同时打开4个代码窗口！" onclick="foldCode();"  class="copyButton" value="展开代码" id="fold_'+ index + '" style="margin-left:1em;color:blue;"/>');
       $(this).attr("id","code_"+index);
     });


 $(".copyButton").hover(
     function(){$(this).css('background-color', '#A1D87D');},
     function(){$(this).css('background-color', '#E5E5E5');}
 );


var i=0;
var codeValue = null;
function runCode(){
  var v_id=event.srcElement.id;
  var copy=v_id.replace("copy_","code_");
  if(!codeValue)
  {
    codeValue = $('#'+copy).html();
  }
  var rng = window.open('','codeWin_'+i, 'height=400, width=700, top=100,left=100, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no,status=no');
      rng.opener=null;
      codeValue+='<style>li{font-size:1.2em;border-left:2px solid green;text-indent: 1em;}li.L0, li.L1, li.L2, li.L3,li.L5, li.L6, li.L7, li.L8{ list-style-type: decimal !important }</style>';
      codeValue+='<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js">'+'</'+'script>';
      rng.document.write("<title>代码窗口</title>");
      rng.document.write(codeValue);
      rng.document.close();
      i++;
      i=i%4;
  codeValue='';
};
$('figure').hide();

function foldCode(){
  var v_id=event.srcElement.id;
  fold=v_id.replace("fold_","code_");
  if(!codeValue)
  {
    codeValue = $('#'+fold).html();
  }
  if ($("#"+v_id).attr("value")== "展开代码") {
                  $("#"+fold).show();
                  $("#"+v_id).attr("value", "折叠代码");
                  var height=$(window).height()*0.75;
                  if($('#'+fold+' pre').height()>height)
                  {
                     $('#'+fold+' pre').css("height",height);
                     $('#'+fold+' pre').css("overflow",'auto');
                     $('#'+fold+' pre').css("width","100%");
                  }
                 
              }
              else {
                  $("#"+fold).hide();
                  $("#"+v_id).attr("value", "展开代码");

                 
              } 
};

<!--代码窗口和代码折叠结束-->

<!--显示或隐藏侧边按钮，以便清爽阅读，开始-->
function foldButton(){
  
  if ($("#foldBut").attr("value")== ">+<") {
                  $("#menu").show();
                  $("#display_top").show();
                  $("#display_comment").show();
                  $(".ds-share").show();
                  $("#foldBut").attr("value", "<->");
              }
              else {
                  $("#menu").hide();
                  $("#display_top").hide();
                  $("#display_comment").hide();
                  $(".ds-share").hide();
                  $("#foldBut").attr("value", ">+<");
              } 
};
<!--显示或隐藏侧边按钮，以便清爽阅读,结束-->
var height_left_tags = $(window).height();
height_left_tags = height_left_tags*0.6;
$('#sidebar-tags').css("height",height_left_tags);
