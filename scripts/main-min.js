$(document).ready(function(){function e(){a.__call("trends_place",n,function(e,t,a){r.each(function(t){if(a)$(this).append("<p>"+localStorage.getItem("topic"+t)+"</p>"),$(this).addClass(localStorage.getItem("class"+t));else{var n=e[0].trends[t].name.replace(/\s+/g,"").replace("#","");$(this).append("<p>"+e[0].trends[t].name+"</p>"),$(this).addClass(n),localStorage.setItem("topic"+t,e[0].trends[t].name),localStorage.setItem("class"+t,n)}})},!0)}function t(e,t){$.ajax(e).done(function(e){if(console.log(e),e.result.docs)for(var a=0;3>a;a++){var n=e.result.docs[a].source.enriched.url.title.substring(0,100),r=e.result.docs[a].source.enriched.url.url,c=$("<a href="+r+">"+n+"</a>");$("."+t.replace(/\s+/g,"")+"> p").hide(),$("."+t.replace(/\s+/g,"")).append(c),$("."+t.replace(/\s+/g,"")+"> a").css({color:"white","font-size":"150%","text-decoration":"none",padding:"10px 0"})}else $.ajax({url:"https://www.reddit.com/search.json?q="+t,success:function(e){for(var a=0;3>a;a++){var n=e.data.children[a].data.title.substring(0,100),r=e.data.children[a].data.url,c=$("<a href='"+r+"'>"+n+"</a>");$("."+t.replace(/\s+/g,"")+"> p").hide(),$("."+t.replace(/\s+/g,"")).append(c),$("."+t.replace(/\s+/g,"")+"> a").css({color:"white","font-size":"150%","text-decoration":"none",padding:"10px 0"})}},dataType:"json"})}).fail(function(){})}var a=new Codebird;a.setBearerToken("AAAAAAAAAAAAAAAAAAAAAK97igAAAAAAL6M3uxb0OEWglYZcJpxq89e46zY%3Dt682yccM1IgilC04xfWysYugpZ2ZzmaLpIcvNTB9L6xhdjaAXC");var n={id:23424977},r=$(".trend");e(),r.on("click","a",function(e){e.preventDefault(),window.open($(this).attr("href"))}),r.on("click","p",function(){var e=$(this).text().replace("#",""),a="https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text="+e+"&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";t(a,e)}),$("footer").on("click","h1",function(){r.empty(),e()})});