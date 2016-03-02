<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication1.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%=System.Web.Optimization.Styles.Render("~/Content/Cssoo") %>
    <%=System.Web.Optimization.Scripts.Render("~/Script/Judgetdoc") %>
</head>
<body>
    <form id="form1" runat="server">
    <div>
<%--        <image src="<%=System.Web.Optimization.BundleTable.Bundles.GetRegisteredBundles().FirstOrDefault(n => n.Path == "~/Images").CdnPath %>close.png" />--%>
    </div>
        
    </form>
</body>
</html>
