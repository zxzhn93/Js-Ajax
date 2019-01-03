//分页插件
/**
2014-08-05 ch
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
				    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				    obj.append('<a href="javascript:;" class="fist">首页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
					obj.append('<span class="disabled fist">首页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				            //下一页
	            if (args.current < args.pageCount) {
	                obj.append('<a href="javascript:;" class="last">尾页</a>');
	                obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
	                obj.append('<span >共' + args.totalNum + '条数据</span>');
				} else {
				    obj.append('<span class="disabled last">尾页</span>');
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
					obj.append('<span >共' + args.totalNum + '条数据</span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj, { "current": current, "pageCount": args.pageCount, "totalNum": args.totalNum });
                     $.ajax({
                        //要用post方式    
                        type: "Post",
                        //方法所在页面和方法名   
                        url: "../ashx/getSplitPageData.ashx",
                        cache: false,
                        async: false,
                        //index 1表示请求的是取得整个数据  pageindex表示的是当前是哪一页
                        data: {"index":1, "pageIndex": $('.current').text()},
                        datatype: 'json',
                        success: function (data) {
                           $("#template").empty();
                           //alert(data);
                           data=jQuery.parseJSON(data);
                           for(i=0;i<data.length;i++){
                                if (data[i].id % 2 == 0) {
                                    var row = " <tr style='color: #565454;background-color: #F4F2F2;'><td id='id'>" +data[i].id +
                                           "</td><td id='url'>" +data[i].url +
                                           "</td><td id='urlname'>" +data[i].urlname +
                                           "</td><td id='date'>" +data[i].date +
                                           "</td><td id='pid'>" + data[i].pid +
                                           "</td><td id='operation'>" +data[i].operation +
                                           "</td></tr>";
                                    $("#template").append(row);
                                } else {
                                    var row = " <tr style='color: #565454;'><td id='id'>" + data[i].id +
                                          "</td><td id='url'>" + data[i].url +
                                          "</td><td id='urlname'>" + data[i].urlname +
                                          "</td><td id='date'>" + data[i].date +
                                          "</td><td id='pid'>" + data[i].pid +
                                          "</td><td id='operation'>" + data[i].operation +
                                          "</td></tr>";
                                    $("#template").append(row);
                                }
                            };
                        },
           
                    });
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
		             }
                    
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj, { "current": current - 1, "pageCount": args.pageCount, "totalNum": args.totalNum });
                    var pageIndex=$('.current').text();
                   // alert(pageIndex);
                    $.ajax({
                        //要用post方式    
                        type: "Post",
                        //方法所在页面和方法名   
                        url: "../ashx/getSplitPageData.ashx",
                        cache: false,
                        async: false,
                        //index 1表示请求的是取得整个数据  pageindex表示的是当前是哪一页
                        data: {"index":1, "pageIndex": $('.current').text()},
                        datatype: 'json',
                        success: function (data) {
                           $("#template").empty();
                            //alert(data);
                           data=jQuery.parseJSON(data);
                            for(i=0;i<data.length;i++){
                                if (data[i].id % 2 == 0) {
                                    var row="";
                                    var row = " <tr style='color: #565454;background-color: #F4F2F2;'><td id='id'>" + data[i].id +
                                           "</td><td id='url'>" + data[i].url +
                                           "</td><td id='urlname'>" + data[i].urlname +
                                           "</td><td id='date'>" + data[i].date +
                                           "</td><td id='pid'>" + data[i].pid +
                                           "</td><td id='operation'>" + data[i].operation +
                                           "</td></tr>";
                                    $("#template").append(row);
                                } else {
                                    var row = " <tr style='color: #565454;'><td id='id'>" + data[i].id +
                                          "</td><td id='url'>" + data[i].url +
                                          "</td><td id='urlname'>" + data[i].urlname +
                                          "</td><td id='date'>" + data[i].date +
                                          "</td><td id='pid'>" + data[i].pid +
                                          "</td><td id='operation'>" + data[i].operation +
                                          "</td></tr>";
                                    $("#template").append(row);
                                }
                            };
                        },
                        error: function (data) {
                                alert("错误");
                            }
           
                    });
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
                });
                //首页
                obj.on("click", "a.fist", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": 1, "pageCount": args.pageCount, "totalNum": args.totalNum });
                    $.ajax({
                        //要用post方式    
                        type: "Post",
                        //方法所在页面和方法名   
                        url: "../ashx/getSplitPageData.ashx",
                        cache: false,
                        async: false,
                        //index 1表示请求的是取得整个数据  pageindex表示的是当前是哪一页
                        data: {"index":1, "pageIndex": $('.current').text()},
                        datatype: 'json',
                        success: function (data) {
                           $("#template").empty();
                           //alert(data);
                           data=jQuery.parseJSON(data);
                           for(i=0;i<data.length;i++){
                                if (data[i].id % 2 == 0) {
                                    var row="";
                                    var row = " <tr style='color: #565454;background-color: #F4F2F2;'><td id='id'>" + data[i].id +
                                           "</td><td id='url'>" + data[i].url +
                                           "</td><td id='urlname'>" + data[i].urlname +
                                           "</td><td id='date'>" + data[i].date +
                                           "</td><td id='pid'>" + data[i].pid +
                                           "</td><td id='operation'>" + data[i].operation +
                                           "</td></tr>";
                                    $("#template").append(row);
                                } else {
                                    var row = " <tr style='color: #565454;'><td id='id'>" + data[i].id +
                                          "</td><td id='url'>" +data[i].url +
                                          "</td><td id='urlname'>" + data[i].urlname +
                                          "</td><td id='date'>" + data[i].date +
                                          "</td><td id='pid'>" + data[i].pid +
                                          "</td><td id='operation'>" + data[i].operation +
                                          "</td></tr>";
                                    $("#template").append(row);
                                }
                            };
                        },
           
                    });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(1);
                    }
                });
                //尾页
                obj.on("click", "a.last", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": args.pageCount, "pageCount": args.pageCount, "totalNum": args.totalNum });
                    $.ajax({
                        //要用post方式    
                        type: "Post",
                        //方法所在页面和方法名   
                        url: "../ashx/getSplitPageData.ashx",
                        cache: false,
                        async: false,
                        //index 1表示请求的是取得整个数据  pageindex表示的是当前是哪一页
                        data: {"index":1, "pageIndex": $('.current').text()},
                        datatype: 'json',
                        success: function (data) {
                           $("#template").empty();
                           data=jQuery.parseJSON(data);
                            for(i=0;i<data.length;i++){
                                if (data[i].id % 2 == 0) {
                                    var row="";
                                    var row = " <tr style='color: #565454;background-color: #F4F2F2;'><td id='id'>" + data[i].id +
                                           "</td><td id='url'>" +data[i].url +
                                           "</td><td id='urlname'>" + data[i].urlname +
                                           "</td><td id='date'>" + data[i].date +
                                           "</td><td id='pid'>" + data[i].pid +
                                           "</td><td id='operation'>" + data[i].operation +
                                           "</td></tr>";
                                    $("#template").append(row);
                                } else {
                                    var row = " <tr style='color: #565454;'><td id='id'>" + data[i].id +
                                          "</td><td id='url'>" + data[i].url +
                                          "</td><td id='urlname'>" + data[i].urlname +
                                          "</td><td id='date'>" + data[i].date +
                                          "</td><td id='pid'>" + data[i].pid +
                                          "</td><td id='operation'>" + data[i].operation +
                                          "</td></tr>";
                                    $("#template").append(row);
                                }
                            };
                        },
           
                    });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(args.pageCount);
                    }
                });
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj, { "current": current + 1, "pageCount": args.pageCount, "totalNum": args.totalNum });
                    $.ajax({
                        //要用post方式    
                        type: "Post",
                        //方法所在页面和方法名   
                        url: "../ashx/getSplitPageData.ashx",
                        cache: false,
                        async: false,
                        //index 1表示请求的是取得整个数据  pageindex表示的是当前是哪一页
                        data: {"index":1, "pageIndex": $('.current').text()},
                        datatype: 'json',
                        success: function (data) {
                            $("#template").empty();
                            data=jQuery.parseJSON(data);
                            for(i=0;i<data.length;i++){
                                //alert(data[i]);
                                if (data[i].id % 2 == 0) {
                                    var row="";
                                    var row = " <tr style='color: #565454;background-color: #F4F2F2;'><td id='id'>" + data[i].id +
                                           "</td><td id='url'>" + data[i].url +
                                           "</td><td id='urlname'>" + data[i].urlname +
                                           "</td><td id='date'>" + data[i].date +
                                           "</td><td id='pid'>" + data[i].pid +
                                           "</td><td id='operation'>" +data[i].operation +
                                           "</td></tr>";
                                    $("#template").append(row);
                                } else {
                                    var row = " <tr style='color: #565454;'><td id='id'>" + data[i].id +
                                          "</td><td id='url'>" + data[i].url +
                                          "</td><td id='urlname'>" + data[i].urlname +
                                          "</td><td id='date'>" + data[i].date +
                                          "</td><td id='pid'>" + data[i].pid +
                                          "</td><td id='operation'>" + data[i].operation +
                                          "</td></tr>";
                                    $("#template").append(row);
                                }
                            }
                        },
           
                    });
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
	    var args = $.extend({
            totalNum:30,
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);
