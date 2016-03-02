(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
})(jQuery);

(function ($) {
    //拖拽插件,参数:id或object
    $.Move = function (_this) {
        if (typeof (_this) == "object") {
            _this = _this;
        } else {
            _this = $("#" + _this);
        }
        if (!_this) {
            return false;
        }

        _this.css({ 'position': "absolute" }).hover(function () { $(this).css("cursor", "move"); }, function () { $(this).css("cursor", "default"); });
        _this.mousedown(function (e) { //e鼠标事件
            var offset = $(this).offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            _this.css({ 'opacity': "0.3" });
            $(document).bind("mousemove", function (ev) { //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
                _this.bind("selectstart", function () { return false; });
                var _x = ev.pageX - x; //获得X轴方向移动的值
                var _y = ev.pageY - y; //获得Y轴方向移动的值
                _this.css({ 'left': _x + "px", 'top': _y + "px" });
            });
        });

        $(document).mouseup(function () {
            $(this).unbind("mousemove");
            _this.css({ 'opacity': "" });
        });
    };
})(jQuery);

jQuery(document).ready(function () {

    jQuery("div[class='xlcd']").eq(0).show();
    jQuery("div[class='xlcd']:first > ul > li").click(function () {
//        var bookmarkname = jQuery(this).attr("bookmarkname");
//
//        var isshow;
//        isshow = jQuery(this).attr("isshow");
//
//        if (isshow == "true") {
//            var TANGER_OCX_OBJ = document.getElementById("TANGER_OCX");
//            TANGER_OCX_OBJ.ActiveDocument.Bookmarks(bookmarkname).Select();
//            return;
//        }

        var isshowli = jQuery("div[class='xlcd']:first > ul > li[isshow='true']");
        var isshowcontent = jQuery("div[class='xlcd']:first > ul > li[isshow='true'] > div[class='xl_content']");
        var isshowa = jQuery(isshowli).children('a:first');

        jQuery(isshowli).attr("isshow", "false");
        jQuery(isshowli).attr("class", "");
        jQuery(isshowcontent).hide();
        jQuery(isshowa).removeClass();

        jQuery(this).attr("isshow", "true");
        jQuery(this).attr("class", "biaoti");
        jQuery(this).children('.xl_content').show();
        jQuery(this).children('a:first').addClass('hover');

//        var TANGER_OCX_OBJ = document.getElementById("TANGER_OCX");
//        TANGER_OCX_OBJ.ActiveDocument.Bookmarks(bookmarkname).Select();
    });
});

jQuery(document).ready(function () {

    if (null != $.getUrlParam("lawdebug")) {
        var headwordname = encodeURI("盗窃罪");
        headwordname = encodeURI(headwordname);
        var featurename = "";
        var casetype = "a1";

        var flframesrc = "http://localhost:9000/getlawout.aspx?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";
        var alframesrc = "http://localhost:8090/ldtcaselibrary/headwordAction!getTCaseListByHeadWordsAndFeature.action?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&CourtName=&UserName=admin";
        var fjfgframesrc = "http://localhost:9000/getlawfromtxt.aspx?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";

        $("#flframe").attr("src", flframesrc);
        $("#alframe").attr("src", alframesrc);

        return;
    }

    var judgetdocid = $.getUrlParam("caseid");
    var filterid = $.getUrlParam("filterid");
    filterid = (filterid == null) ? '' : filterid;
    filterid = (filterid == 'null') ? '' : filterid;

    if (null == judgetdocid) {
        alert("案号不可为空.");
        return;
    }
    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    //check TANGER_OCX_OBJ state
    
    TANGER_OCX_OBJ.Close();
    jQuery.getJSON("../../handlers/JudgetDocHandler.ashx", { action: "createJudgetDoc", judgetdocid: judgetdocid, ran: Math.random(), filterid: filterid }, function (obj) {
        if (1 == obj.status) {
            var judgetdocurl = obj.judgetdocurl;
            
            var headwordname = encodeURI(encodeURI(obj.headwordname));
            var featurename = obj.featurename;
            var casetype = obj.casetype;
            
            TANGER_OCX_OBJ.OpenFromURL(judgetdocurl, false, "Word.Document");

            /* sginit */
            SignalRInit(headwordname, featurename, casetype);

            /*http://192.168.1.112:9000/getlawfromtxt.ashx*/
            /*var flframesrc = "http://" +
                "192.168.1.112:9624/getlawout.aspx?posturl=http://192.168.1.6:10726/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";
            var alframesrc = "http://192.168.1.112:8080/ldtcaselibrary/headwordAction!getTCaseListByHeadWordsAndFeature.action?clientid=&posturl=http://192.168.1.6:10726/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&CourtName=&UserName=";
            var fjfgframesrc = "http://localhost:9000/getlawfromtxt.aspx?posturl=http://localhost:8001/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";

            $("#flframe").attr("src", flframesrc);
            $("#alframe").attr("src", alframesrc);*/


        } else if (0 == obj.status) {
            alert(obj.message);
        }
    });
});

jQuery(document).ready(function () {

    jQuery("#savelocalbtn").click(function () {
        var path = prompt("save local path");
        judgetdocSaveToLocal(path);
    });

    jQuery("#printdocument").click(function () {
        printDocument();
    });

    jQuery("#bzyslinkbutton").click(function () {
        judgetdocMetaTemplate();
    });

    jQuery(".menu a[class=clia]").click(function () {
        var b = $(".menu a[class=clia]").index(this);
        $(".xlcd").hide();
        $(".xlcd").eq(b).show();
    });

    jQuery(".box_navright").click(function () {
        jQuery("#bzysframe").attr("src", "");
        $(".background").hide();
    });
    
});

jQuery(document).ready(function () {
    $(".btnbox_zhong a").click(function () {
        var b = $(".btnbox_zhong a").index(this);
        $(".content_right .list_content").hide();
        $(".content_right .list_content").eq(b).show();
        $(".btnbox_zhong a").removeClass("a2");
        $(".btnbox_zhong a").eq(b).addClass("a2");
    });
});

function SignalRInit(headwordname, featurename, casetype) {
    var hub = jQuery.connection.judgetDocBuildHub;
    hub.client.RectiveLaw = function (message) {
        var TANGER_OCX_OBJ = document.all("TANGER_OCX");
        var selection = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
        selection.TypeText(message);
        TANGER_OCX_OBJ.focus();
    };
    jQuery.connection.hub.start().done(function () {
        var clientid = hub.connection.id;
        var flframesrc = JudgetDocConfig.UrlParams["LawURI"]+
            "/getlawout.aspx?posturl=" + JudgetDocConfig.UrlParams["PostURI"] + "/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&clientid=" + clientid + "&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";
        var alframesrc = JudgetDocConfig.UrlParams["CaseURI"] + "/ldtcaselibrary/headwordAction!getTCaseListByHeadWordsAndFeature.action?clientid=" + clientid + "&posturl=" + JudgetDocConfig.UrlParams["PostURI"] + "/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&CourtName=&UserName=";
        var fjfgframesrc = "http://localhost:9000/getlawfromtxt.aspx?posturl=http://localhost:8001/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";

        $("#flframe").attr("src", flframesrc);
        $("#alframe").attr("src", alframesrc);
    });
}

/*jQuery(document).ready(
    function () {
        var hub = jQuery.connection.judgetDocBuildHub;
        hub.client.RectiveLaw = function (message) {
            alert(message);
            var TANGER_OCX_OBJ = document.all("TANGER_OCX");
            var selection = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
            selection.TypeText(message);
            TANGER_OCX_OBJ.focus();
        };
        jQuery.connection.hub.start().done(function() {
        });
    }
);*/

function openModal(tabname, url, bookmarkname, iframewidth, iframeheight) {

}

function trialsIdentifiedRedirect(tabname, url) {
    jQuery("#box_span").text(tabname);
    jQuery("#bzysframe").attr("src", url);
    var b = $(".btnbox_top_right a").index(this);
    $(".background").show();
}

function judgetdocworldredirect(tabname, url, bookmarkname) {
    jQuery("#box_spanyoumian").text(tabname);
    jQuery("#bzysframe").attr("src", "JudgetDocWorld.html?uri=" + url + "&bookmarkname=" + bookmarkname);
    $("#youmiandiv").show();
}

function judgetdocMetaTemplate() {
    var judgetdocid = $.getUrlParam("caseid");
    if (null == judgetdocid) {
        return;
    }

    jQuery("#box_span").text("标准样式");
    jQuery("#bzysframe").attr("src", "JudgetDocMetaTemplate.html?caseid=" + judgetdocid);
    var b = $(".btnbox_top_right a").index(this);
    $(".background").show();
}

function judgetdocSaveToLocal(path) {
    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    try {
        TANGER_OCX_OBJ.ActiveDocument.SaveAs(path, 0);
    } catch (e) {
        alert(e.message);
    }
}

function printDocument() {
    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    try {
        TANGER_OCX_OBJ.ActiveDocument.PrintOut();
    } catch (e) {
        alert(e.message);
    }
}

function fjfgsubmit() {
    getFjfgContent();

    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    var postcontent = encodeURI(encodeURI(TANGER_OCX_OBJ.ActiveDocument.Content.Text));

    $('#wordcontent').val(postcontent);
    $('#fjfgform').submit();
}

function slcmshow() {
    var judgetdocid = $.getUrlParam("caseid");
    window.open('../TrialsIdentifiedMake/TrialsIdentifiedView.aspx?type=1&caseid=' + judgetdocid);
}

function byrwshow() {
    var judgetdocid = $.getUrlParam("caseid");
    window.open('../CourtConsiderMake/CourtonsiderView.aspx?type=1&caseid=' + judgetdocid);
}

function shuaxin() {
    var caseid = $.getUrlParam("caseid");
    $.get('../../handlers/JudgetDocHandler.ashx', { action: "xqzdU", caseid: caseid }, function (data) {

    });
}

function xqzdtest() {
    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    var postcontent = TANGER_OCX_OBJ.ActiveDocument.Content.Text;
    jQuery.post('../../handlers/JudgetDocHandler.ashx', {
        action: 'xqzdU',
        ran: Math.random(),
        content: postcontent,
        caseid: $.getUrlParam("caseid")
    }, function () {
        if (null != $.getUrlParam("lawdebug")) {
            var headwordname = encodeURI("盗窃罪");
            headwordname = encodeURI(headwordname);
            var featurename = "";
            var casetype = "a1";

            var flframesrc = "http://localhost:9000/getlawout.aspx?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";
            var alframesrc = "http://localhost:8090/ldtcaselibrary/headwordAction!getTCaseListByHeadWordsAndFeature.action?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&CourtName=&UserName=admin";
            var fjfgframesrc = "http://localhost:9000/getlawfromtxt.aspx?posturl=http://localhost:11213/Handlers/JudgetDocHandler.ashx&actionname=rectivelaw&urlType=1&HeadWordName=" + headwordname + "&FeatureName=" + featurename + "&PNName=&CaseType=" + casetype + "&CourtName=&UserName=&Ysmc=";

            $("#flframe").attr("src", flframesrc);
            $("#alframe").attr("src", alframesrc);

            return;
        }

        var judgetdocid = $.getUrlParam("caseid");
        var filterid = $.getUrlParam("filterid");
        filterid = (filterid == null) ? '' : filterid;
        filterid = (filterid == 'null') ? '' : filterid;

        if (null == judgetdocid) {
            alert("案号不可为空.");
            return;
        }
        var TANGER_OCX_OBJ = document.all("TANGER_OCX");
        //check TANGER_OCX_OBJ state
        TANGER_OCX_OBJ.Close();
        jQuery.getJSON("../../handlers/JudgetDocHandler.ashx", { action: "createJudgetDoc", judgetdocid: judgetdocid, ran: Math.random(), filterid: filterid }, function (obj) {
            if (1 == obj.status) {
                var judgetdocurl = obj.judgetdocurl;
                
                TANGER_OCX_OBJ.OpenFromURL(judgetdocurl, false, "Word.Document");

                /*http://192.168.1.112:9000/getlawfromtxt.ashx*/

            } else if (0 == obj.status) {
                alert(obj.message);
            }
        });
    });
}


function getFjfgContent() {

    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    var postcontent = TANGER_OCX_OBJ.ActiveDocument.Content.Text;

    var fjfgform = jQuery("<form>", {
        action: "../../handlers/JudgetDocHandler.ashx",
        method: "post",
        name: "fjfgcontentform",
        style: "display:none"
    }).append(
        jQuery("<input>", {
            type: "text",
            value: postcontent,
            name: "Content"
        })).appendTo("body");

    jQuery.post("../../handlers/JudgetDocHandler.ashx?action=getFjfgContent", fjfgform.serialize(), function (data) {
        var selection = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
        selection.TypeText(data);
        TANGER_OCX_OBJ.focus();

        jQuery("body").remove(fjfgform);
    });

}