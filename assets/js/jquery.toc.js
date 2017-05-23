/*
 * jQuery Table of Content Generator for Markdown v1.0
 *
 * https://github.com/dafi/tocmd-generator
 * Examples and documentation at: https://github.com/dafi/tocmd-generator
 *
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2013 Davide Ficano
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    var toggleHTML = '<div id="toctitle"><h2>%1</h2> <span class="toctoggle">[<a id="toctogglelink" class="internal" href="#">%2</a>]</span></div>';
    var tocContainerHTML = '<div id="toc-container"><table class="toc" id="toc"><tbody><tr><td>%1<ul id="ul_0">%2</ul></td></tr></tbody></table></div>';

    function createLevelHTML(anchorId, tocLevel, tocSection, tocNumber, tocText, tocInner) {
        var link = '<a href="#%1"><span class="tocnumber">%2　</span><span class="toctext">%3</span></a>%4'
            .replace('%1', anchorId)
            .replace('%2', tocNumber)
            .replace('%3', tocText)
            .replace('%4', tocInner ? tocInner : '');
        return '<li class="toclevel-%1 tocsection-%2">%3</li>\n'
            .replace('%1', tocLevel)
            .replace('%2', tocSection)
            .replace('%3', link);
    }

    $.fn.toc = function(settings) {
        var config = {
            renderIn: 'self',
            renderIn_1: 'self',
            anchorPrefix: 'tocItem-',
            showAlways: false,
            minItemsToShowToc: 2,
            saveShowStatus: true,
            contentsText: 'Contents',
            hideText: 'hide',
            showText: 'show',
            hideText_1: 'hide',
            showText_1: 'show',
            showCollapsed: false};

        if (settings) {
            $.extend(config, settings);
        }

        var tocHTML = '';
        var tocLevel = 1;
        var tocSection = 1;
        var itemNumber = 1;

        var tocContainer = $(this);

        tocContainer.find('h1').each(function() {
            var levelHTML = '';
            
            var innerSection = 0;
            
            var h1 = $(this);

            h1.nextUntil('h1').filter('h2').each(function() {
                ++innerSection;
                var h2 = $(this);
                var levelHTML_3 = '';
                var innerSection_3 = 0;
                
                h2.nextUntil('h2').filter('h3').each(function() {
                    ++innerSection_3;
                    
                    var anchorId = config.anchorPrefix + tocSection + '-' + innerSection + '-' + innerSection_3;//每个achorId都阐述了第二项 + tocLevel 
                    $(this).attr('id', anchorId);
             
                    levelHTML_3 += createLevelHTML(anchorId,
                        tocLevel + 1,
                        tocSection + innerSection + innerSection_3,
                        itemNumber + '.' + innerSection + '.' + innerSection_3,
                        $(this).text());

                    $(this).text(itemNumber+ '.'+ innerSection + '.' + innerSection_3 + ' '+$(this).text());  
                    
                });
               
                if (levelHTML_3) {
                    levelHTML_3 = '<ul>' + levelHTML_3 + '</ul>\n';
                } 
               
                var anchorId = config.anchorPrefix + tocSection + '-'  + innerSection;
                    $(this).attr('id', anchorId);
                    levelHTML += createLevelHTML(anchorId,
                        tocLevel + 1,
                        tocSection + innerSection,
                        itemNumber + '.' + innerSection,
                        $(this).text(),levelHTML_3);
                $(this).text(itemNumber+ '.'+ innerSection+' '+$(this).text());
                
            });

            if (levelHTML) {
                levelHTML = '<ul>' + levelHTML + '</ul>\n';
            }
            
            var anchorId = config.anchorPrefix + tocSection;
            h1.attr('id', anchorId);
            tocHTML += createLevelHTML(anchorId,
                tocLevel,
                tocSection,
                itemNumber,
                h1.text(),
                levelHTML);
            h1.text(itemNumber+'　'+h1.text());
            tocSection += 1;
            ++itemNumber;
          tocLevel++;
         
        });

        // for convenience itemNumber starts from 1
        // so we decrement it to obtain the index count
        var tocIndexCount = itemNumber - 1;

        var show = config.showAlways ? true : config.minItemsToShowToc <= tocIndexCount;

        // check if cookie plugin is present otherwise doesn't try to save
        if (config.saveShowStatus && typeof($.cookie) == "undefined") {
            config.saveShowStatus = false;
        }

        if (show && tocHTML) {
            var replacedToggleHTML = toggleHTML
                .replace('%1', config.contentsText)
                .replace('%2', config.hideText);
            var replacedToggleHTML_1 = toggleHTML
                .replace('%1', config.contentsText)
                .replace('%2', config.hideText_1);
            var replacedTocContainer = tocContainerHTML
                .replace('%1', replacedToggleHTML)
                .replace('%2', tocHTML);
            var replacedTocContainer_1 = tocContainerHTML
                .replace('%1', replacedToggleHTML_1)
                .replace('%2', tocHTML);
            // Renders in default or specificed path
            if (config.renderIn != 'self') {
              $(config.renderIn).html(replacedTocContainer);
            } else {
              tocContainer.prepend(replacedTocContainer);
            }

            if (config.renderIn_1 != 'self') {
              $(config.renderIn_1).html(replacedTocContainer_1);
              var height = $(window).height()*0.4;
              if($(config.renderIn_1+' #ul_0').height()>height)
              {
                $(config.renderIn_1+' #ul_0').css("height",height);
              }
            } else {
              tocContainer.prepend(replacedTocContainer_1);
            }
            
            var width=null; 
            $('#toctogglelink').click(function() {
                var ul = $($('#toc ul')[0]);
                
                $(config.renderIn+' #ul_0').css("overflow","auto");
                if (ul.is(':visible')) {
                    ul.hide();
                    $(this).text(config.showText);
                    if (config.saveShowStatus) {
                        $.cookie('toc-hide', '1', { expires: 365, path: '/' });
                    }
                    
                    $(config.renderIn+' #ul_0').css("height","auto");
                    $('#toc').addClass('tochidden');
                } else {
                    ul.show();
                    $(this).text(config.hideText);
                    if (config.saveShowStatus) {
                        $.removeCookie('toc-hide', { path: '/' });
                    }
                    
                    var height = $(window).height()*0.7;
                    if(!width){
                      width = $(config.renderIn+' #ul_0').width()+25;
                    }
                    if($(config.renderIn+' #ul_0').height()>height)
                    {
                        $(config.renderIn+' #ul_0').css("height",height);
                        $(config.renderIn+' #ul_0').css("width",width);
                    }
                    $('#toc').removeClass('tochidden');
		    
                }
                return false;
            });

            $(config.renderIn_1+' #toctogglelink').click(function() {
                var ul = $($(config.renderIn_1+' #toc ul')[0]);
                
                $(config.renderIn_1+' #ul_0').css("overflow","auto");
                if (ul.is(':visible')) {
                    ul.hide();
                    $(this).text(config.showText_1);
                    if (config.saveShowStatus) {
                        $.cookie('toc-hide', '1', { expires: 365, path: '/' });
                    }
                    $(config.renderIn_1+' #toc').addClass('tochidden');
                } else {
                    ul.show();
                    $(this).text(config.hideText_1);
                    if (config.saveShowStatus) {
                        $.removeCookie('toc-hide', { path: '/' });
                    }
                    $(config.renderIn_1+' #toc').removeClass('tochidden');
                }
                return false;
            });
            if (config.saveShowStatus && $.cookie('toc-hide')) {
                var ul = $($('#toc ul')[0]);
                var ul_1 = $($(config.renderIn_1+' #toc ul')[0]);
                ul.hide();
                ul_1.hide();
                $('#toctogglelink').text(config.showText);
                $('#toc').addClass('tochidden');
                $(config.renderIn_1+' #toctogglelink').text(config.showText_1);
                $(config.renderIn_1+' #toc').addClass('tochidden');
            }

            if (config.showCollapsed) {
                $('#toctogglelink').click();
            }
            
        }
        return this;
    }
})(jQuery);
