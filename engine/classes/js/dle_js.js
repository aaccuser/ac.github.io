var c_cache=[],dle_poll_voted=[];function reload(){var a=(new Date).getTime();document.getElementById("dle-captcha").innerHTML='<img src="'+dle_root+"engine/modules/antibot/antibot.php?rndval="+a+'" width="160" height="80" alt="" />'}function dle_change_sort(a,c){var b=document.getElementById("news_set_sort");b.dlenewssortby.value=a;b.dledirection.value=c;b.submit();return!1}
function doPoll(a,c){var b=document.getElementById("dlepollform_"+c),d=b.status.value,e="";if(1!=dle_poll_voted[c]){if("results"!=a&&1!=d){for(var f=0;f<b.elements.length;f++){var g=b.elements[f];if("radio"==g.type&&1==g.checked){e=g.value;break}"checkbox"==g.type&&1==g.checked&&(e=e+g.value+" ")}if("vote"==a&&""==e)return;dle_poll_voted[c]=1}else d=1,b.status.value=1;1==d&&"vote"==a&&(d=0,b.status.value=0,a="list");ShowLoading("");$.post(dle_root+"engine/ajax/poll.php",{news_id:c,action:a,answer:e,vote_skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");$("#dle-poll-list-"+c).fadeOut(500,function(){$(this).html(a);$(this).fadeIn(500)})})}}function IPMenu(a,c,b,d){var e=[];e[0]='<a href="https://www.nic.ru/whois/?ip='+a+'" target="_blank">'+c+"</a>";e[1]='<a href="'+dle_root+dle_admin+"?mod=iptools&ip="+a+'" target="_blank">'+b+"</a>";e[2]='<a href="'+dle_root+dle_admin+"?mod=blockip&ip="+a+'" target="_blank">'+d+"</a>";return e}
function ajax_save_for_edit(a,c){var b={};"2"==quick_wysiwyg&&tinyMCE.triggerSave();$.each($("#ajaxnews"+a).serializeArray(),function(a,c){b[c.name]=c.value});b.id=a;b.field=c;b.action="save";b.user_hash=dle_login_hash;ShowLoading("");$.post(dle_root+"engine/ajax/editnews.php",b,function(a){HideLoading("");"ok"!=a?DLEalert(a,dle_info):($("#dlepopup-news-edit").dialog("close"),DLEconfirm(dle_save_ok,dle_confirm,function(){location.reload(!0)}))});return!1}
function ajax_prep_for_edit(a,c){for(var b=0,d=c_cache.length;b<d;b++)b in c_cache&&(c_cache[b]||""!=c_cache[b])&&ajax_cancel_comm_edit(b);ShowLoading("");$.get(dle_root+"engine/ajax/editnews.php",{id:a,field:c,action:"edit"},function(b){HideLoading("");var d="none";$("#modal-overlay").remove();$("body").prepend('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn();var e={};e[dle_act_lang[3]]=function(){$(this).dialog("close")};e[dle_act_lang[4]]=function(){ajax_save_for_edit(a,c)};$("#dlepopup-news-edit").remove();$("body").prepend("<div id='dlepopup-news-edit' class='dlepopupnewsedit' title='"+menu_short+"' style='display:none'></div>");$(".dlepopupnewsedit").html("");var k=.9*$(window).height(),h=.9*$(window).width();1024<h&&(h=1024);$("#dlepopup-news-edit").dialog({autoOpen:!0,width:h,height:k,buttons:e,resizable:!1,dialogClass:"modalfixed dle-popup-quickedit",dragStart:function(a,b){d=$(".modalfixed").css("box-shadow");$(".modalfixed").css("box-shadow","none")},dragStop:function(a,b){$(".modalfixed").css("box-shadow",d)},close:function(a,b){$(this).dialog("destroy");$("#modal-overlay").fadeOut(function(){$("#modal-overlay").remove()})}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup-news-edit").dialog("option","position",["0","0"]));$("#dlepopup-news-edit").css({overflow:"auto"});$("#dlepopup-news-edit").css({"overflow-x":"hidden"});$("#dlepopup-news-edit").html(b)},"html");return!1}
function ajax_comm_edit(a,c){for(var b=0,d=c_cache.length;b<d;b++)b in c_cache&&""!=c_cache[b]&&ajax_cancel_comm_edit(b);c_cache[a]&&""!=c_cache[a]||(c_cache[a]=$("#comm-id-"+a).html());ShowLoading("");$.get(dle_root+"engine/ajax/editcomments.php",{id:a,area:c,action:"edit"},function(b){HideLoading("");$("#comm-id-"+a).html(b);setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#comm-id-"+a).offset().top-100},700)},100)},"html");return!1}
function ajax_cancel_comm_edit(a){""!=c_cache[a]&&$("#comm-id-"+a).html(c_cache[a]);c_cache[a]="";return!1}function ajax_save_comm_edit(a,c){"2"==dle_wysiwyg&&tinyMCE.triggerSave();var b=$("#dleeditcomments"+a).val();ShowLoading("");$.post(dle_root+"engine/ajax/editcomments.php",{id:a,comm_txt:b,area:c,action:"save",user_hash:dle_login_hash},function(b){HideLoading("");c_cache[a]="";$("#comm-id-"+a).html(b)});return!1}
function DeleteComments(a,c){DLEconfirm(dle_del_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/deletecomments.php",{id:a,dle_allow_hash:c},function(a){HideLoading("");a=parseInt(a);if(!isNaN(a)){var b=null;b="1"==dle_tree_comm?$("#comments-tree-item-"+a):$("#comment-id-"+a);$("html,body").stop().animate({scrollTop:b.offset().top-70},700);setTimeout(function(){b.hide("blind",{},1400)},700)}})})}
function MarkSpam(a,c){DLEconfirm(dle_spam_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/adminfunction.php",{id:a,action:"commentsspam",user_hash:c},function(a){HideLoading("");"error"!=a&&DLEconfirm(a,dle_confirm,function(){location.reload(!0)})})})}
function doFavorites(a,c,b){ShowLoading("");$.get(dle_root+"engine/ajax/favorites.php",{fav_id:a,action:c,skin:dle_skin,alert:b,user_hash:dle_login_hash},function(c){HideLoading("");b?DLEalert(c,dle_info):$("#fav-id-"+a).html(c)});return!1}function CheckLogin(){var a=document.getElementById("name").value;ShowLoading("");$.post(dle_root+"engine/ajax/registration.php",{name:a,user_hash:dle_login_hash},function(a){HideLoading("");$("#result-registration").html(a)});return!1}
function doCalendar(a,c,b){ShowLoading("");$.get(dle_root+"engine/ajax/calendar.php",{month:a,year:c},function(a){HideLoading("");"left"==b?$("#calendar-layer").hide("slide",{direction:"left"},500,function(){$("#calendar-layer").html(a).show("slide",{direction:"right"},500)}):$("#calendar-layer").hide("slide",{direction:"right"},500,function(){$("#calendar-layer").html(a).show("slide",{direction:"left"},500)})})}
function doRate(a,c){ShowLoading("");$.get(dle_root+"engine/ajax/rating.php",{go_rate:a,news_id:c,skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");if(a.success){var b=a.rating;b=b.replace(/&lt;/g,"<");b=b.replace(/&gt;/g,">");b=b.replace(/&amp;/g,"&");$("#ratig-layer-"+c).html(b);$("#vote-num-id-"+c).html(a.votenum)}else a.error&&DLEalert(a.errorinfo,dle_info)},"json")}
function doCommentsRate(a,c){ShowLoading("");$.get(dle_root+"engine/ajax/ratingcomments.php",{go_rate:a,c_id:c,skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");if(a.success){var b=a.rating;b=b.replace(/&lt;/g,"<");b=b.replace(/&gt;/g,">");b=b.replace(/&amp;/g,"&");$("#comments-ratig-layer-"+c).html(b);$("#comments-vote-num-id-"+c).html(a.votenum)}else a.error&&DLEalert(a.errorinfo,dle_info)},"json")}function ajax_cancel_reply(){$("#dlefastreplycomments").hide("blind",{},1400)}
function ajax_fast_reply(a,c){var b=$("#comments"+a).val(),d=$("#name"+a).val(),e=$("#question_answer"+a).val(),f=$("#sec_code"+a).val(),g=$("#recaptcha"+a).val(),k=$("#subscribe"+a+":checked").val(),h=$("#postid"+a).val(),l="";if(""==d||""==b)return DLEalert(dle_req_field,dle_info),!1;g&&(l=grecaptcha.getResponse(recaptcha_widget));k||(k=0);f||(f="");e||(e="");ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:h,parent:a,indent:c,comments:b,name:d,mail:"",editor_mode:"",skin:dle_skin,sec_code:f,question_answer:e,g_recaptcha_response:l,allow_subscribe:k,user_hash:dle_login_hash},function(b){HideLoading("");$("#blind-animation"+a).remove();$("#dlefastreplyesponse").html(b);"error"!=b&&document.getElementById("blind-animation"+a)&&($("html,body").stop().animate({scrollTop:$("#dlefastreplyesponse").offset().top-100},600),setTimeout(function(){$("#blind-animation"+a).show("blind",{},700);$("#dlefastreplycomments").hide("blind",{},700)},600))},"html");return!1}
function dle_reply(a,c,b){var d={},e="";$("#dlereplypopup").remove();"1"==b&&($("#dlefastreplycomments").remove(),$("#dlefastreplyesponse").remove());d[dle_act_lang[3]]=function(){$(this).dialog("close")};d[dle_p_send]=function(){if("1"==dle_wysiwyg||"2"==dle_wysiwyg)"2"==dle_wysiwyg&&tinyMCE.triggerSave(),e="wysiwyg";var b=$("#comments"+a).val(),d=$("#name"+a).val(),k=$("#mail"+a).val(),h=$("#question_answer"+a).val(),l=$("#sec_code"+a).val(),p=$("#recaptcha"+a).val(),m=$("#subscribe"+a+":checked").val(),q=$("#postid"+a).val(),n="";if(""==d||""==b)return DLEalert(dle_req_field,dle_info),!1;p&&(n=grecaptcha.getResponse(recaptcha_widget));m||(m=0);l||(l="");h||(h="");ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:q,parent:a,indent:c,comments:b,name:d,mail:k,editor_mode:e,skin:dle_skin,sec_code:l,question_answer:h,g_recaptcha_response:n,allow_subscribe:m,user_hash:dle_login_hash},function(b){HideLoading("");$("#blind-animation"+a).remove();$("#comments-tree-item-"+a).length?($("#comments-tree-item-"+a).append(b),"error"!=b&&document.getElementById("blind-animation"+a)&&($("#dlereplypopup").remove(),$("html,body").stop().animate({scrollTop:$("#comments-tree-item-"+a).offset().top+$("#comments-tree-item-"+a).height()-100},600),setTimeout(function(){$("#blind-animation"+a).show("blind",{},700)},600))):$("#comment-id-"+a).length&&($("#comment-id-"+a).append(b),"error"!=b&&document.getElementById("blind-animation"+a)&&($("#dlereplypopup").remove(),$("html,body").stop().animate({scrollTop:$("#comment-id-"+a).offset().top+$("#comment-id-"+a).height()-100},600),setTimeout(function(){$("#blind-animation"+a).show("blind",{},700)},600)))},"html");return!1};ShowLoading("");$.get(dle_root+"engine/ajax/replycomments.php",{id:a,indent:c,skin:dle_skin,user_hash:dle_login_hash},function(c){HideLoading("");"1"==b?($("#comment-id-"+a).append("<div id='dlefastreplyesponse'></div><div id='dlefastreplycomments' style='display:none'></div>"),$("#dlefastreplycomments").html(c),$("html,body").stop().animate({scrollTop:$("#comment-id-"+a).offset().top+$("#comment-id-"+a).height()-100},600),setTimeout(function(){$("#dlefastreplycomments").show("blind",{},700)},600)):($("body").append("<div id='dlereplypopup' title='"+dle_reply_title+"' style='display:none'></div>"),$("#dlereplypopup").html(c),$("#dlereplypopup").dialog({autoOpen:!0,width:800,resizable:!1,dialogClass:"modalfixed dle-popup-replycomments",buttons:d}),$(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlereplypopup").dialog("option","position",["0","0"]))},"html");return!1}
function doAddComments(){var a=document.getElementById("dle-comments-form"),c="",b="",d="",e="",f="0",g="";if("1"==dle_wysiwyg||"2"==dle_wysiwyg)"2"==dle_wysiwyg&&tinyMCE.triggerSave(),c="wysiwyg";if(""==a.comments.value||""==a.name.value)return DLEalert(dle_req_field,dle_info),!1;a.question_answer&&(b=a.question_answer.value);a.sec_code&&(d=a.sec_code.value);"undefined"!=typeof grecaptcha&&(e=grecaptcha.getResponse());a.allow_subscribe&&1==a.allow_subscribe.checked&&(f="1");a.mail&&(g=a.mail.value);ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:a.post_id.value,comments:a.comments.value,name:a.name.value,mail:g,editor_mode:c,skin:dle_skin,sec_code:d,question_answer:b,g_recaptcha_response:e,allow_subscribe:f,user_hash:dle_login_hash},function(b){HideLoading("");$("#dle-ajax-comments").html(b);"error"!=b&&document.getElementById("blind-animation")&&($("html,body").stop().animate({scrollTop:$("#dle-ajax-comments").offset().top-100},600),setTimeout(function(){$("#blind-animation").show("blind",{},700)},600),a.sec_code&&(a.sec_code.value="",reload()),"undefined"!=typeof grecaptcha&&grecaptcha.reset())},"html");return!1}function isHistoryApiAvailable(){return!(!window.history||!history.pushState)}
function CommentsPage(a,c,b){ShowLoading("");$.get(dle_root+"engine/ajax/comments.php",{cstart:a,news_id:c,skin:dle_skin},function(d){HideLoading("");isNaN(a)||isNaN(c)||($("#dle-comm-link").off("click"),$("#dle-comm-link").on("click",function(){CommentsPage(a,c);return!1}));scroll(0,$("#dle-comments-list").offset().top-100);$("#dle-comments-list").html(d.comments);$(".dle-comments-navigation").html(d.navigation);isHistoryApiAvailable()&&window.history.pushState(null,null,b)},"json");return!1}
function dle_copy_quote(a){dle_txt="";window.getSelection?dle_txt=window.getSelection():document.selection&&(dle_txt=document.selection.createRange().text);""!=dle_txt&&(dle_txt="[quote="+a+"]"+dle_txt+"[/quote]")}
function dle_fastreply(a){if(!document.getElementById("dle-comments-form"))return!1;var c=document.getElementById("dle-comments-form").comments,b="";"0"==dle_wysiwyg||"-1"==dle_wysiwyg?(c.value="0"==dle_wysiwyg?c.value+("[b]"+a+"[/b],\n"):c.value+(a+",\n"),c.focus()):(b="<b>"+a+"</b>,<br />","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",b,!0)):tinyMCE.execCommand("mceInsertContent",!1,b));setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-100},700)},100);return!1}
function dle_ins(a){if(!document.getElementById("dle-comments-form"))return!1;var c=document.getElementById("dle-comments-form").comments,b="";""!=dle_txt?("0"==dle_wysiwyg||"-1"==dle_wysiwyg?(c.value+=dle_txt+"\n",c.focus()):(b=dle_txt+"<br />","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",b,!0)):tinyMCE.execCommand("mceInsertContent",!1,b)),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-100},700)},100)):(ShowLoading(""),$.get(dle_root+"engine/ajax/quote.php",{id:a,user_hash:dle_login_hash},function(a){HideLoading("");a=a.replace(/&lt;/g,"<");a=a.replace(/&gt;/g,">");a=a.replace(/&amp;/g,"&");a=a.replace(/&quot;/g,'"');a=a.replace(/&#039;/g,"'");a=a.replace(/&#039;/g,"'");a=a.replace(/&#34;/g,'"');"0"==dle_wysiwyg||"-1"==dle_wysiwyg?(c.value+=a+"\n",c.focus()):(b=a+"<br />","1"==dle_wysiwyg?($("#comments").froalaEditor("events.focus"),$("#comments").froalaEditor("html.insert",b,!0)):tinyMCE.execCommand("mceInsertContent",!1,b));setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-100},700)},100)}));return!1}
function ShowOrHide(a){var c=$("#"+a),b=null;document.getElementById("image-"+a)&&(b=document.getElementById("image-"+a));a=c.height()/200*1E3;3E3<a&&(a=3E3);250>a&&(a=250);"none"==c.css("display")?(c.show("blind",{},a),b&&(b.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-minus.gif")):(2E3<a&&(a=2E3),c.hide("blind",{},a),b&&(b.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-plus.gif"))}
function ckeck_uncheck_all(){for(var a=document.pmlist,c=0;c<a.elements.length;c++){var b=a.elements[c];"checkbox"==b.type&&(b.checked=1==a.master_box.checked?!1:!0)}a.master_box.checked=1==a.master_box.checked?!1:!0}function confirmDelete(a){DLEconfirm(dle_del_agree,dle_confirm,function(){document.location=a})}function setNewField(a,c){a!=selField&&(fombj=c,selField=a)}
function dle_news_delete(a){var c={};c[dle_act_lang[1]]=function(){$(this).dialog("close")};allow_dle_delete_news&&(c[dle_del_msg]=function(){$(this).dialog("close");var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,user_hash:dle_login_hash,text:b},function(b){"ok"==b?document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash:DLEalert("Send Error",dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_notice+"' style='display:none'>"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])});c[dle_act_lang[0]]=function(){$(this).dialog("close");document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_confirm+"' style='display:none'><div id='dlepopupmessage'>"+dle_del_agree+"</div></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-newsdelete",buttons:c});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function MenuNewsBuild(a,c){var b=[];b[0]="<a onclick=\"ajax_prep_for_edit('"+a+"', '"+c+'\'); return false;" href="#">'+menu_short+"</a>";""!=dle_admin&&(b[1]='<a href="'+dle_root+dle_admin+"?mod=editnews&action=editnews&id="+a+'" target="_blank">'+menu_full+"</a>");allow_dle_delete_news&&(b[2]="<a onclick=\"sendNotice ('"+a+'\'); return false;" href="#">'+dle_notice+"</a>",b[3]="<a onclick=\"dle_news_delete ('"+a+'\'); return false;" href="#">'+dle_del_news+"</a>");return b}
function sendNotice(a){var c={};c[dle_act_lang[3]]=function(){$(this).dialog("close")};c[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,user_hash:dle_login_hash,text:b,allowdelete:"no"},function(a){"ok"==a&&DLEalert(dle_p_send_ok,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_notice+"' style='display:none'><br />"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-sendmessage",buttons:c});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function AddComplaint(a,c){var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/complaint.php",{id:a,text:b,action:c,user_hash:dle_login_hash},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_complaint+"' style='display:none'><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEalert(a,c){$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-alert' title='"+c+"' style='display:none'>"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:470,resizable:!1,dialogClass:"modalfixed dle-popup-alert",buttons:{Ok:function(){$(this).dialog("close");$("#dlepopup").remove()}}});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEconfirm(a,c,b){var d={};d[dle_act_lang[1]]=function(){$(this).dialog("close");$("#dlepopup").remove()};d[dle_act_lang[0]]=function(){$(this).dialog("close");$("#dlepopup").remove();b&&b()};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-confirm' title='"+c+"' style='display:none'>"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-confirm",buttons:d});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEprompt(a,c,b,d,e){var f={};f[dle_act_lang[3]]=function(){$(this).dialog("close")};f[dle_act_lang[2]]=function(){if(!e&&1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var a=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();d&&d(a)}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' class='dle-promt' title='"+b+"' style='display:none'>"+a+"<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;' value='"+c+"'/></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed dle-popup-promt",buttons:f});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"]);0<c.length?$("#dle-promt-text").select().focus():$("#dle-promt-text").focus()}var dle_user_profile="",dle_user_profile_link="";
function ShowPopupProfile(a,c){var b={};b[menu_profile]=function(){document.location=dle_user_profile_link};5!=dle_group&&(b[menu_send]=function(){document.location=dle_root+"index.php?do=pm&doaction=newpm&username="+dle_user_profile});1==c&&(b[menu_uedit]=function(){$(this).dialog("close");var a={};$("body").append('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn("slow");$("#dleuserpopup").remove();$("body").append("<div id='dleuserpopup' title='"+menu_uedit+"' style='display:none'></div>");a[dle_act_lang[3]]=function(){$(this).dialog("close");$("#dleuserpopup").remove()};a[dle_act_lang[5]]=function(){window.frames.edituserframe.confirmDelete(dle_login_hash)};a[dle_act_lang[4]]=function(){document.getElementById("edituserframe").contentWindow.document.getElementById("saveuserform").submit()};$("#dleuserpopup").dialog({autoOpen:!0,show:"fade",width:700,resizable:!1,dialogClass:"modalfixed dle-popup-userprofileadmin",buttons:a,open:function(a,b){$("#dleuserpopup").html("<iframe name='edituserframe' id='edituserframe' width='100%' height='400' src='"+dle_root+dle_admin+"?mod=editusers&action=edituser&user="+dle_user_profile+"&skin="+dle_skin+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>")},beforeClose:function(a,b){$("#dleuserpopup").html("")},close:function(a,b){$("#modal-overlay").fadeOut("slow",
function(){$("#modal-overlay").remove()})}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dleuserpopup").dialog("option","position",["0","0"]))});$("#dleprofilepopup").remove();$("body").append(a);$("#dleprofilepopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,dialogClass:"dle-popup-userprofile",buttons:b,width:550});return!1}
function ShowProfile(a,c,b){if(dle_user_profile==a&&document.getElementById("dleprofilepopup"))return $("#dleprofilepopup").dialog("open"),!1;dle_user_profile=a;dle_user_profile_link=c;ShowLoading("");$.get(dle_root+"engine/ajax/profile.php",{name:a,skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");ShowPopupProfile(a,b)});return!1}
function FastSearch(){$("#story").attr("autocomplete","off");$("#story").blur(function(){$("#searchsuggestions").fadeOut()});$("#story").keyup(function(){var a=$(this).val();0==a.length?$("#searchsuggestions").fadeOut():dle_search_value!=a&&3<a.length&&(clearInterval(dle_search_delay),dle_search_delay=setInterval(function(){dle_do_search(a)},600))})}
function dle_do_search(a){clearInterval(dle_search_delay);$("#searchsuggestions").remove();$("body").append("<div id='searchsuggestions' style='display:none'></div>");$.post(dle_root+"engine/ajax/search.php",{query:""+a+"",user_hash:dle_login_hash},function(a){$("#searchsuggestions").html(a).fadeIn().css({position:"absolute",top:0,left:0}).position({my:"left top",at:"left bottom",of:"#story",collision:"fit flip"})});dle_search_value=a}
function ShowLoading(a){$("#loading-layer").remove();$("body").append("<div id='loading-layer' style='display:none'></div>");a?$("#loading-layer").html(a):$("#loading-layer").html(dle_act_lang[6]);a=($(window).width()-$("#loading-layer").width())/2;var c=($(window).height()-$("#loading-layer").height())/2;$("#loading-layer").css({left:a+"px",top:c+"px",position:"fixed",zIndex:"99"});$("#loading-layer").fadeTo("slow",.6)}
function HideLoading(a){$("#loading-layer").fadeOut("slow",function(){$("#loading-layer").remove()})}
function ShowAllVotes(){if(document.getElementById("dlevotespopup"))return $("#dlevotespopup").dialog("open"),!1;$.ajaxSetup({cache:!1});ShowLoading("");$.get(dle_root+"engine/ajax/allvotes.php?dle_skin="+dle_skin,function(a){HideLoading("");$("#dlevotespopup").remove();$("body").append(a);$(".dlevotebutton").button();$("#dlevotespopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,dialogClass:"dle-popup-allvotes",width:600});400<$("#dlevotespopupcontent").height()&&$("#dlevotespopupcontent").height(400);$("#dlevotespopup").dialog("option","height",$("#dlevotespopupcontent").height()+60);$("#dlevotespopup").dialog("option","position","center")});return!1}
function fast_vote(a){var c=$("#vote_"+a+" input:radio[name=vote_check]:checked").val();ShowLoading("");$.get(dle_root+"engine/ajax/vote.php",{vote_id:a,vote_action:"vote",vote_mode:"fast_vote",vote_check:c,vote_skin:dle_skin,user_hash:dle_login_hash},function(b){HideLoading("");$("#dle-vote_list-"+a).fadeOut(500,function(){$(this).html(b);$(this).fadeIn(500)})});return!1}
function AddIgnorePM(a,c){DLEconfirm(c,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"add_ignore",skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");DLEalert(a,dle_info);return!1})})}
function DelIgnorePM(a,c){DLEconfirm(c,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"del_ignore",skin:dle_skin,user_hash:dle_login_hash},function(b){HideLoading("");$("#dle-ignore-list-"+a).html("");DLEalert(b,dle_info);return!1})})}
function subscribe(a){DLEconfirm(dle_sub_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/commentssubscribe.php",{news_id:a,skin:dle_skin,user_hash:dle_login_hash},function(a){HideLoading("");a.success?DLEalert(a.info,dle_info):a.error&&DLEalert(a.errorinfo,dle_info)},"json")});return!1}
function media_upload(a,c,b,d){var e=(new Date).getTime(),f="none";$("#mediaupload").remove();$("body").append("<div id='mediaupload' title='"+text_upload+"' style='display:none'></div>");$("#mediaupload").dialog({autoOpen:!0,width:710,resizable:!1,dialogClass:"modalfixed dle-popup-upload",open:function(f,k){$("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='550' src='"+dle_root+"engine/ajax/upload.php?area="+a+"&author="+c+"&news_id="+b+"&wysiwyg="+d+"&skin="+dle_skin+"&rndval="+e+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>");$(".ui-dialog").draggable("option","containment","")},dragStart:function(a,b){f=$(".modalfixed").css("box-shadow");$(".modalfixed").fadeTo(0,.6).css("box-shadow","none");$("#mediaupload").css("visibility","hidden")},dragStop:function(a,b){$(".modalfixed").fadeTo(0,1).css("box-shadow",f);$("#mediaupload").css("visibility","visible")},beforeClose:function(a,b){$("#mediaupload").html("")}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#mediaupload").dialog("option","position",["0","0"]));return!1}
function dropdownmenu(a,c,b,d){window.event?event.cancelBubble=!0:c.stopPropagation&&c.stopPropagation();c=$("#dropmenudiv");if(c.is(":visible"))return clearhidemenu(),c.fadeOut("fast"),!1;c.remove();$("body").append('<div id="dropmenudiv" style="display:none;position:absolute;z-index:100;width:165px;"></div>');c=$("#dropmenudiv");c.html(b.join(""));d&&c.width(d);b=$(document).width()-30;d=$(a).offset();b-d.left<c.width()&&(d.left-=c.width()-$(a).width());c.css({left:d.left+"px",top:d.top+$(a).height()+"px"});c.fadeTo("fast",.9);c.mouseenter(function(){clearhidemenu()}).mouseleave(function(){delayhidemenu()});$(document).one("click",function(){hidemenu()});return!1}function hidemenu(a){$("#dropmenudiv").fadeOut("fast")}function delayhidemenu(){delayhide=setTimeout("hidemenu()",1E3)}function clearhidemenu(){"undefined"!=typeof delayhide&&clearTimeout(delayhide)}
jQuery(function(a){var c=!1,b=[];a(document).keydown(function(b){if(13==b.which&&b.ctrlKey){b.preventDefault();if(window.getSelection)var c=window.getSelection();else document.getSelection?c=document.getSelection():document.selection&&(c=document.selection.createRange().text);if(""==c)return!1;if(255<c.toString().length)return DLEalert(dle_big_text,dle_info),!1;b={};b[dle_act_lang[3]]=function(){a(this).dialog("close")};b[dle_p_send]=function(){if(1>a("#dle-promt-text").val().length)a("#dle-promt-text").addClass("ui-state-error");else{var b=a("#dle-promt-text").val(),c=a("#orfom").text();a(this).dialog("close");a("#dlepopup").remove();a.post(dle_root+"engine/ajax/complaint.php",{seltext:c,text:b,user_hash:dle_login_hash,action:"orfo",url:window.location.href},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};a("#dlepopup").remove();a("body").append("<div id='dlepopup' class='dle-promt' title='"+dle_orfo_title+"' style='display:none'><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:80px;'></textarea><div id='orfom' style='display:none'>"+c+"</div></div>");a("#dlepopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed dle-popup-complaint",buttons:b});a(".modalfixed.ui-dialog").css({position:"fixed"});a("#dlepopup").dialog("option","position",["0","0"])}});a("img[data-maxwidth]").each(function(){var b=a(this).width(),e=a(this).data("maxwidth");b>e&&(a(this).width(e),a(this).wrap('<a href="'+a(this).attr("src")+'" onclick="return hs.expand(this)"></a>'),"undefined"==typeof hs&&0==c&&(c=!0,a.getScript(dle_root+"engine/classes/highslide/highslide.js",function(){hs.graphicsDir=dle_root+"engine/classes/highslide/graphics/";hs.numberOfImagesToPreload=0;hs.captionEval="this.thumb.alt";hs.showCredits=!1;hs.align="center";hs.transitions=["expand","crossfade"]})))});setTimeout(function(){a("div[data-dlebclicks]").each(function(){var b=a(this).data("dlebid");a(this).find("a").on("click",function(){a.post(dle_root+"engine/ajax/adminfunction.php",{id:b,action:"bannersclick",user_hash:dle_login_hash})})})},400);a("div[data-dlebviews]").each(function(){b.push(a(this).data("dlebid"))});b.length&&setTimeout(function(){a.post(dle_root+"engine/ajax/adminfunction.php",{"ids[]":b,action:"bannersviews",user_hash:dle_login_hash})},1E3)});