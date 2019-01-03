using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business;
using System.Data;
using System.Web.SessionState;
using Newtonsoft.Json;

namespace TLRTDA.ashx
{
    /// <summary>
    /// getSplitPageData 的摘要说明
    /// </summary>
    public class getSplitPageData : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain;charset=UTF-8";
            var index_str = context.Request.Form["index"];
            var index = int.Parse(index_str);
            if (index==1) {
                GetSqlData(context);
            } else {
                GetPageCount(context);
            }
        }
        /// <summary>
        /// 获取指定每页的数据
        /// </summary>
        /// <param name="context"></param>
        public void GetSqlData(HttpContext context)
        {
            context.Response.ContentType = "text/plain;charset=UTF-8";
            var pageIndex_str = context.Request.Form["pageIndex"];//获取当前页数
            var pageIndex = int.Parse(pageIndex_str);//将获取的数值型字符串转换成int类型,便于计算
            var pageRows = 3;//每页可以展示的数据数
            var dataRows = (pageIndex - 1) * pageRows;//计算下次从哪里开始获取数据
            // DataSet ds1 = DbHelperSQL.Query("select * from test_chart into #temp");
            DataSet ds = DbHelperSQL.Query("select top " + pageRows + " * from test_table where id not in (select top " + dataRows + " id from test_table)");
            //var totalNum = ds2.Tables[0].Rows.Count;
            context.Response.Write(DataTableToJsonWithJsonNet(ds.Tables[0]));
        
        }
        public string DataTableToJsonWithJsonNet(DataTable table)
        {
            string jsonString = string.Empty;
            jsonString = JsonConvert.SerializeObject(table);
            return jsonString;
        }
   
        /// <summary>
        /// 获取数据总数和页面的分页页数
        /// </summary>
        /// <param name="context"></param>
        public void GetPageCount(HttpContext context)
        {
            var totalNum = DbHelperSQL.GetSingle("select COUNT(1) from test_table ");
            context.Response.Write(totalNum);
        
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}