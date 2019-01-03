# Js-Ajax
前端实现从后台数据库获取数据在前端页面分页显示，主要ajax
## 分页思想下的查询语句
利用sql语句的select top查询 按需求每次查询 
select top " + pageRows + " * from test_table where id not in (select top " + dataRows + " id from test_table)
其中 pageRows dataRows为变量，即每页显示数据量和数据总的条数，dataRows=(index-1)*pageRows    每次检索前pageRows，前提是必须不在已经显示检索过的数据里面
## 表格是动态添加  
每次查询新的数据时，在绑定的点击事件里面会先将之前的添加的html清空，我之前在这里遇到问题就是你每次点不同页码时，信息会不断往上叠加，如果想要实现一点击一换页就要求清除前面的html
 即： $("#template").empty();
