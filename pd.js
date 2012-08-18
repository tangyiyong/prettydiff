/*prettydiff.com api.topcoms: true*/
/*jslint nomen: true */
/*global document, localStorage, window, prettydiff, XMLHttpRequest, location, ActiveXObject, FileReader*/
var exports = "",
    pd = {},

    //test for localStorage and assign the result of the test
    ls = (typeof localStorage === "object" && localStorage !== null && typeof localStorage.getItem === "function" && typeof localStorage.hasOwnProperty === "function") ? true : false,
    fs = (typeof FileReader === "function" && typeof new FileReader().readAsText === "function") ? true : false,
    _gaq = _gaq || [],
    bounce = true,
    $$ = function (x) {
        "use strict";
        if (document.getElementById === undefined) {
            return;
        }
        return document.getElementById(x);
    },

    //o Stores a reference to everything that is needed from the DOM
    o = {
        ao: $$("addOptions"),
        an: $$("additional_no"),
        ay: $$("additional_yes"),
        ba: $$("beau-tab"),
        bb: $$("modebeautify"),
        bc: $$("beau-char"),
        bd: $$("Beautify"),
        bf: $$("bforce_indent-no"),
        bg: $$("bforce_indent-yes"),
        bi: $$("beautyinput"),
        bl: $$("baselabel"),
        bn: $$("beau-line"),
        bo: $$("baseText"),
        bq: $$("beau-quan"),
        bs: $$("beau-space"),
        bt: $$("diffBase"),
        bx: $$("beautyoutput"),
        bw: $$("beau-other"),
        bz: $$("bo"),
        ch: $$("csvchar"),
        ci: $$("codeInput"),
        cn: 4,
        cs: $$("colorScheme"),
        cz: " ",
        da: $$("diff-tab"),
        db: $$("diffbeautify"),
        dc: $$("diff-char"),
        dd: $$("modediff"),
        df: $$("dforce_indent-no"),
        dg: $$("dforce_indent-yes"),
        dm: $$("diffscolony"),
        dn: $$("diffscolonn"),
        dp: $$("diffwide"),
        dq: $$("diff-quan"),
        dr: $$("diffquotey"),
        ds: $$("diff-space"),
        dt: $$("difftall"),
        du: $$("diffcontentn"),
        dw: $$("diff-other"),
        dx: $$("diffcontenty"),
        dy: $$("diffquoten"),
        dz: $$("diff-line"),
        hd: $$("htmld-yes"),
        he: $$("htmld-no"),
        hm: $$("htmlm-yes"),
        hn: $$("htmlm-no"),
        hy: $$("html-yes"),
        hz: $$("html-no"),
        id: $$("inscriptd-yes"),
        ie: $$("inscriptd-no"),
        is: $$("inscript-yes"),
        it: $$("inscript-no"),
        iy: $$("incomment-yes"),
        iz: $$("incomment-no"),
        jd: $$("jsindentd-all"),
        je: $$("jsindentd-knr"),
        js: $$("jsindent-all"),
        jt: $$("jsindent-knr"),
        la: $$("language"),
        mb: $$("topcoms-no"),
        mc: $$("topcoms-yes"),
        md: $$("Minify"),
        mi: $$("minifyinput"),
        ml: $$("minifyinputlines"),
        mm: $$("modeminify"),
        mn: $$("minifywindiff"),
        mo: $$("minifyoutputsize"),
        mr: $$("minifywinratiosize"),
        ms: $$("minifyinputsize"),
        mt: $$("minifyratiosize"),
        mu: $$("minifyunixdiff"),
        mw: $$("minifywinsize"),
        mx: $$("minifyoutput"),
        nl: $$("newlabel"),
        nt: $$("diffNew"),
        nx: $$("newText"),
        nz: $$("no"),
        op: $$("options"),
        ps: $$("diff-save"),
        re: $$("diffreport"),
        rf: $$("diffreportbody"),
        rg: $$("beaureport"),
        rh: $$("beaureportbody"),
        ri: $$("minreport"),
        rj: $$("minreportbody"),
        rk: $$("statreport"),
        rl: $$("statreportbody"),
        sh: $$("hideOptions"),
        to: $$("top"),
        wb: document.getElementsByTagName("body")[0],
        bcv: "",
        dcv: "",
        dqp: $$("diffquanp"),
        dqt: $$("difftypep"),
        htd: $$("htmlspecificd"),
        stvisit: $$("stvisit"),
        stusage: $$("stusage"),
        stfdate: $$("stfdate"),
        stavday: $$("stavday"),
        stcouse: $$("stcouse"),
        stdiff: $$("stdiff"),
        stbeau: $$("stbeau"),
        stminn: $$("stminn"),
        stmarkup: $$("stmarkup"),
        stjs: $$("stjs"),
        stcss: $$("stcss"),
        stcsv: $$("stcsv"),
        sttext: $$("sttext"),
        stlarge: $$("stlarge"),
        bops: $$("beauops"),
        csvp: $$("csvcharp"),
        disp: $$("displayOps"),
        dops: $$("diffops"),
        mops: $$("miniops"),
        stat: {
            visit: 0,
            usage: 0,
            fdate: "",
            avday: "1",
            diff: 0,
            beau: 0,
            minn: 0,
            markup: 0,
            js: 0,
            css: 0,
            csv: 0,
            text: 0,
            pdate: "",
            large: 0
        },
        css: {
            body: "body{font-family:\"Arial\";font-size:10px}",
            core: "h1{float:left;font-size:2em;margin:0 .5em .5em 0}h2{background:#fff;border-style:solid;border-width:.075em;float:left;font-size:1.8em;font-weight:bold;margin:0 .5em .5em 0;padding:0 .2em}p{clear:both;font-size:1.2em;margin:0 0 1em}table.diff{border-collapse:collapse}table.diff tbody{font-family:'Courier New',Courier,'Lucida Console',monospace;font-size:1.1em}table.diff tbody th{font-family:verdana,arial,'Bitstream Vera Sans',helvetica,sans-serif;font-weight:normal;padding:.5em .6em 0 2.4em;text-align:right;vertical-align:top}table.diff thead{font-family:Verdana;text-align:left}table.diff thead{border-bottom-style:solid;border-bottom-width:.1em}table.diff thead th{border-left-style:solid;border-left-width:.1em;padding-left:2em}table.diff tbody td{letter-spacing:.1em;padding:.5em .5em 0;vertical-align:top;white-space:pre}table.diff tbody td em{font-style:normal;margin:0 -.09em;padding:.05em 0}table.diff th.author{border-top-style:solid;border-top-width:.1em;padding:.4em;text-align:right}table.diff .replace em,table.diff .delete em,table.diff .insert em,table.diff .skip,table.diff tbody th,table.diff{border-style:solid;border-width:.1em}@media print{p,ul{display:none}div{width:100%}html td{font-size:.8em;white-space:normal}}",
            sdefault: "body.default{background:url(\"images/body.gif\") repeat-x #a8b8c8;color:#000}.default a{color:#f00}.default h2{border-color:#000}.default table.diff{border-color:#bbc}.default table.diff tbody th{background:#eed;border-color:#bbc;color:#886}.default table.diff thead{background:#efefef;border-bottom-color:#bbc}.default table.diff thead th{border-left-color:#bbc}.default table.diff .empty{background-color:#ddd}.default table.diff .replace{background-color:#fd8}.default table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.default table.diff .delete{background-color:#e99}.default table.diff .delete em{background-color:#fdd;border-color:#700;color:#600}.default table.diff .equal{background-color:#fff}.default table.diff .skip{background-color:#efefef;border-color:#aaa #bbc #aaa #aaa}.default table.diff .insert{background-color:#9e9}.default table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.default table.diff th.author{background:#efefef;border-top-color:#bbc}",
            scoffee: "body.coffee{background:#dcb;color:#321}.coffee a{color:#900}.coffee h2{border-color:#600}.coffee table.diff{border-color:#966}.coffee table.diff tbody th{background:#edc;border-color:#966;color:#633}.coffee table.diff thead{background:#cba;border-bottom-color:#966}.coffee table.diff thead th{border-left-color:#966}.coffee table.diff .empty{background-color:#ddd}.coffee table.diff .replace{background-color:#fda}.coffee table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.coffee table.diff .delete{background-color:#ebb}.coffee table.diff .delete em{background-color:#fee;border-color:#700;color:#600}.coffee table.diff .equal{background-color:#fff8ee}.coffee table.diff .skip{background-color:#eee;border-color:#966}.coffee table.diff .insert{background-color:#cec}.coffee table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.coffee table.diff th.author{background:#cba;border-top-color:#966}",
            sdark: "body.dark{background:#333;color:#eee}.dark a{color:#9cf}.dark h2{background:#def;border-color:#006;color:#036}.dark table.diff{border-color:#036}.dark table.diff tbody th{background:#369;border-color:#036;color:#def}.dark table.diff tbody td{border-color:#036}.dark table.diff thead{background:#036;border-bottom-color:#036;color:#def}.dark table.diff thead th{border-left-color:#abc}.dark table.diff .empty{background-color:#456}.dark table.diff .replace{background-color:#468;color:#def}.dark table.diff .replace em{background-color:#dff;border-color:#036;color:#036}.dark table.diff .delete{background-color:#600;color:#fbb}.dark table.diff .delete em{background-color:#fbb;border-color:#600;color:#600}.dark table.diff .equal{background-color:#024;color:#def}.dark table.diff .skip{background-color:#333;border-color:#036}.dark table.diff .insert{background-color:#696;color:#dfd}.dark table.diff .insert em{background-color:#efc;border-color:#060;color:#050}.dark table.diff th.author{background:#036;border-bottom-color:#036;color:#def}",
            scanvas: "body.canvas{background:#e8e8e8;color:#666}.canvas a{color:#450}.canvas h2{background:#f8f8ef;border-color:#664;box-shadow:0 .1em .2em rgba(128,128,92,0.75)}.canvas table.diff{border-color:#664}.canvas table.diff tbody th{background:#c8c8bf;border-color:#664}.canvas table.diff tbody td{background:#f8f8ef;border-color:#664}.canvas table.diff thead{background:#c8c8bf;border-bottom-color:#664;color:#664}.canvas table.diff thead th{border-left-color:#664}.canvas table.diff .empty{background-color:#ccc}.canvas table.diff .replace{background-color:#dda;color:#660}.canvas table.diff .replace em{background-color:#ffd;border-color:#664;color:#880}.canvas table.diff .delete{background-color:#da9;color:#600}.canvas table.diff .delete em{background-color:#fbc;border-color:#600;color:#933}.canvas table.diff .equal{background-color:#f8f8ef;color:#666}.canvas table.diff .skip{background-color:#eee;border-color:#664}.canvas table.diff .insert{background-color:#bd9;color:#040}.canvas table.diff .insert em{background-color:#efc;border-color:#060;color:#464}.canvas table.diff th.author{background:#f8f8ef;border-bottom-color:#664;color:#666}",
            sshadow: "body.shadow{background:#222;color:#eee}.shadow a{color:#9cf}.shadow button{background:#456;border-color:#789;color:#cde}.shadow button:hover,.shadow button:active{background:#ddd;color:#333}.shadow #update,.shadow #title_text{background:#ddd;border-color:#fff;color:#222}.shadow h1 img{border-color:#fff}.shadow h2{background:#eee;border-color:#333;box-shadow:0 .1em .2em rgba(0,0,0,0.75);color:#222}.shadow table.diff tbody th{background:#bbb;border-color:#999;color:#333}.shadow table.diff thead,.shadow table.diff thead th{background:#555;border-color:#999;color:#ddd}.shadow table.diff tbody td{background:#666;border-color:#999;color:#ddd}.shadow table.diff .empty{background-color:#999}.shadow table.diff .replace{background-color:#664;color:#bb8}.shadow table.diff .replace em{background-color:#440;border-color:#220;color:#cc9}.shadow table.diff .delete{background-color:#300;color:#c66}.shadow table.diff .delete em{background-color:#700;border-color:#c66;color:#f99}.shadow table.diff .equal{background-color:#333;color:#ddd}.shadow table.diff .skip{background-color:#000;border-color:#999}.shadow table.diff .insert{background-color:#040;color:#6c6}.shadow table.diff .insert em{background-color:#363;border-color:#6c0;color:#cfc}.shadow table.diff th.author{background:#555;border-bottom-color:#999;color:#ddd}.shadow table td{border-color:#999}.shadow table.diff{background:#333;border-color:#999;color:#ddd}",
            swhite: "body.white{color:#333}.white a{color:#009}.white h2,.white h3{border-color:#333}.white textarea{border-color:#333}.white textarea:hover{background:#eef8ff}.white table.diff{border-color:#333}.white table.diff tbody th{background:#eed;border-color:#bbc;color:#886}.white table.diff thead{background:#ddd;border-bottom-color:#333}.white table.diff thead th{border-left-color:#333}.white table.diff .empty{background-color:#ddd}.white table.diff .replace{background-color:#fea}.white table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.white table.diff .delete{background-color:#fbb}.white table.diff .delete em{background-color:#fdd;border-color:#700;color:#600}.white table.diff .equal{background-color:#fff}.white table.diff .skip{background-color:#efefef;border-color:#aaa #bbc #aaa #aaa}.white table.diff .insert{background-color:#bfb}.white table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.white table.diff th.author{background:#efefef;border-top-color:#bbc}"
        },
        pdlogo: $$("pdlogo"),
        color: "shadow",
        context: $$("contextSize"),
        inline: $$("inline"),
        sideby: $$("sidebyside"),
        option: $$("option_comment"),
        zindex: 10
    },

    //recycle bundles arguments in preparation for executing prettydiff
    recycle = function (e) {
        "use strict";
        var api = {},
            output = [],
            domain = /^(https?:\/\/|file:\/\/\/)/,
            event = e || window.event,
            pstyle = {};

        //do not execute from alt, home, end, or arrow keys
        if (typeof event === "object" && event.type === "keyup" && (event.altKey || event.keyCode === 18 || event.keyCode === 35 || event.keyCode === 36 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
            return;
        }
        if (ls) {
            o.stat.usage += 1;
            o.stusage.innerHTML = o.stat.usage;
        }

        //set defaults for all arguments
        api.comments = "indent";
        api.content = false;
        api.diff = "";
        api.diffview = "sidebyside";
        api.force_indent = false;
        api.html = false;
        api.insize = 4;
        api.indent = "";
        api.lang = "auto";
        api.mode = "beautify";
        api.quote = false;
        api.semicolon = false;
        api.style = "indent";
        api.topcoms = false;

        //gather updated dom nodes
        o.bb = $$("modebeautify");
        o.jd = $$("jsindentd-all");
        o.js = $$("jsindent-all");
        o.ch = $$("csvchar");
        o.dd = $$("modediff");
        o.la = $$("language");
        o.mm = $$("modeminify");
        o.dx = $$("diffcontenty");
        o.sh = $$("hideOptions");
        o.la = $$("language");
        api.lang = o.la[o.la.selectedIndex].value;
        api.csvchar = o.ch.value;

        //determine operations based upon mode of operations
        if (o.bb.checked) {
            o.hy = $$("html-yes");
            o.ba = $$("beau-tab");
            o.bn = $$("beau-line");
            o.bw = $$("beau-other");
            o.bc = $$("beau-char");
            o.bi = $$("beautyinput");
            o.bq = $$("beau-quan");
            o.is = $$("inscript-yes");
            o.iz = $$("incomment-no");
            o.bg = $$("bforce_indent-yes");
            o.bx.value = "";
            if (o.bg.checked) {
                api.force_indent = true;
            }
            if (o.ba.checked) {
                o.cz = "\t";
            } else if (o.bn.checked) {
                o.cz = "\n";
            } else if (o.bw.checked) {
                o.cz = o.bc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
            } else {
                o.cz = " ";
            }
            api.inchar = o.cz;
            if (!isNaN(o.bq.value)) {
                o.cn = Number(o.bq.value);
                api.insize = o.cn;
            }
            if (o.it.checked) {
                api.style = "noindent";
            }
            if (o.hy.checked) {
                api.html = "html-yes";
            }
            if (o.iz.checked) {
                api.comments = "noindent";
            }
            if (o.js.checked) {
                api.indent = "allman";
            }
            api.source = o.bi.value;
            api.mode = "beautify";
            if (ls && o.bi.value.length < 2096000) {
                localStorage.setItem("bi", api.source);
            } else if (ls) {
                localStorage.setItem("bi", "");
            }
        } else if (o.mm.checked) {
            o.hm = $$("htmlm-yes");
            o.mc = $$("topcoms-yes");
            o.mi = $$("minifyinput");
            o.mx.value = "";
            if (o.hm.checked) {
                api.html = "html-yes";
            }
            if (o.mc.checked) {
                api.topcoms = true;
            }
            api.source = o.mi.value;
            api.mode = "minify";
            if (ls && o.mi.value.length < 2096000) {
                localStorage.setItem("mi", api.source);
            } else if (ls) {
                localStorage.setItem("mi", "");
            }
        } else if (o.dd) {
            o.context = $$("contextSize");
            o.inline = $$("inline");
            o.bl = $$("baselabel");
            o.nl = $$("newlabel");
            o.hd = $$("htmld-yes");
            o.bo = $$("baseText");
            o.nx = $$("newText");
            o.dn = $$("diffscolonn");
            o.dy = $$("diffquoten");
            o.da = $$("diff-tab");
            o.dw = $$("diff-other");
            o.dz = $$("diff-line");
            o.dc = $$("diff-char");
            o.dq = $$("diff-quan");
            o.du = $$("diffcontentn");
            o.id = $$("inscriptd-yes");
            o.ps = $$("diff-save");
            o.dg = $$("dforce_indent-yes");
            api.difflabel = o.nl.value;
            api.sourcelabel = o.bl.value;
            if (o.dg.checked) {
                api.force_indent = true;
            }
            if (o.du.checked) {
                api.content = true;
            }
            if (o.da.checked) {
                o.cz = "\t";
            } else if (o.dz.checked) {
                o.cz = "\n";
            } else if (o.dw.checked.checked) {
                o.cz = o.dc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
            } else {
                o.cz = " ";
            }
            api.inchar = o.cz;
            if (!isNaN(o.dq.value)) {
                o.cn = Number(o.dq.value);
                api.insize = o.cn;
            }
            if (!o.id.checked) {
                api.style = "noindent";
            }
            if (o.hd.checked) {
                api.html = "html-yes";
            }
            if (o.dy.checked) {
                api.quote = true;
            }
            if (o.dn.checked) {
                api.semicolon = true;
            }
            if (o.inline.checked) {
                api.diffview = "inline";
            }
            if (o.context.value === "" || isNaN(Number(o.context.value))) {
                o.context.value = "";
                api.context = "";
            } else {
                api.context = Number(o.context.value);
            }
            if (o.jd.checked) {
                api.indent = "allman";
            }
            if (o.bo.value === "" || o.bo.value === "Error: source code is missing.") {
                o.bo.value = "Error: source code is missing.";
                return;
            }
            if (o.nx.value === "" || o.nx.value === "Error: diff code is missing.") {
                o.nx.value = "Error: diff code is missing.";
                return;
            }
            api.source = o.bo.value;
            api.diff = o.nx.value;
            api.mode = "diff";
            if (ls && o.bo.value.length < 2096000 && o.nx.value.length < 2096000) {
                localStorage.setItem("bo", api.source);
                localStorage.setItem("nx", api.diff);
                localStorage.setItem("bl", api.sourcelabel);
                localStorage.setItem("nl", api.difflabel);
            } else if (ls) {
                localStorage.setItem("bo", "");
                localStorage.setItem("nx", "");
                localStorage.setItem("bl", "");
                localStorage.setItem("nl", "");
            }
            if (domain.test(api.diff) && (typeof XMLHttpRequest === "function" || typeof ActiveXObject === "function")) {
                (function () {
                    var a = (api.diff.indexOf("file:///") === 0) ? api.diff.split(":///")[1] : api.diff.split("://")[1],
                        b = a ? a.indexOf("/") : 0,
                        c,
                        xhr = (typeof XMLHttpRequest === "function") ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    if (location && location.href) {
                        c = location.href.split("://")[0];
                    }
                    if (!a || c !== api.diff.split("://")[0]) {
                        return;
                    }
                    if (b !== 0 && b !== -1) {
                        xhr.open("GET", "proxy.php?x=" + api.diff.replace(/(\s*)$/, "").replace(/%26/g, "&").replace(/%3F/, "?"), false);
                        xhr.send();
                        if (xhr.status === 200 || xhr.status === 0) {
                            api.diff = xhr.responseText;
                        }
                    }
                }());
            }
        }
        if (domain.test(api.source) && (typeof XMLHttpRequest === "function" || typeof ActiveXObject === "function")) {
            (function () {
                var a = (api.source.indexOf("file:///") === 0) ? api.source.split(":///")[1] : api.source.split("://")[1],
                    b = a ? a.indexOf("/") : 0,
                    c,
                    xhr = (typeof XMLHttpRequest === "function") ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                if (location && location.href) {
                    c = location.href.split("://")[0];
                }
                if (!a || c !== api.source.split("://")[0]) {
                    return;
                }
                if (b !== 0 && b !== -1) {
                    xhr.open("GET", "proxy.php?x=" + api.source.replace(/(\s*)$/, "").replace(/%26/g, "&").replace(/%3F/, "?"), false);
                    xhr.send();
                    if (xhr.status === 200 || xhr.status === 0) {
                        api.source = xhr.responseText;
                    }
                }
            }());
        }

        //this is where prettydiff is executed
        output = prettydiff(api);
        o.zindex += 1;
        if (o.bb.checked) {
            o.bx.value = output[0];
            if (o.sh.innerHTML === "Maximize Inputs") {
                o.rh.innerHTML = output[1];
                o.rg.style.zIndex = o.zindex;
                o.rg.style.display = "block";
            }
            if (ls) {
                o.stat.beau += 1;
                o.stbeau.innerHTML = o.stat.beau;
            }
        } else if (o.dd && o.dd.checked) {
            if (/^(<p><strong>Error:<\/strong> Please try using the option labeled ((&lt;)|<)em((&gt;)|>)Plain Text \(diff only\)((&lt;)|<)\/em((&gt;)|>)\.)/.test(output[0])) {
                o.rf.innerHTML = "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (diff only)</em>. <span style='display:block'>The input does not appear to be markup, CSS, or JavaScript.</span></p>";
            } else if (o.ps && o.ps.checked) {
                pstyle.layout = "";
                pstyle.cdefault = "";
                pstyle.coffee = "";
                output[2] = output[1] + "<p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a &quot;.html&quot; file.</p><textarea rows='40' cols='80' id='textreport'>";
                output[0] = "<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool</title><meta name='robots' content='index, follow'/> <meta name='DC.title' content='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://prettydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' content='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' content='text/css'/><style type='text/css'>" + o.css.body + o.css.core + o.css["s" + o.color] + "</style></head><body class='" + o.color + "'><h1><a href='http://prettydiff.com/'>Pretty Diff - The difference tool</a></h1>" + output[1] + "<p>Accessibility note. &lt;em&gt; tags in the output represent character differences per lines compared.</p>" + output[0] + "</body></html>";
                o.rf.innerHTML = output[2] + output[0].replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;") + "</textarea>";
            } else {
                o.rf.innerHTML = output[1] + output[0];
            }
            pd.top(o.re);
            o.re.style.display = "block";
            if (o.re.getElementsByTagName("p")[0].style.display === "none") {
                pd.minimize(o.re.getElementsByTagName("button")[1]);
            }
            o.re.style.right = "auto";
            if (ls) {
                o.stat.diff += 1;
                o.stdiff.innerHTML = o.stat.diff;
            }
        } else if (o.mm.checked) {
            o.mx.value = output[0];
            if (o.sh.innerHTML === "Maximize Inputs") {
                o.rj.innerHTML = output[1];
                o.ri.style.zIndex = o.zindex;
                o.ri.style.display = "block";
            }
            if (ls) {
                o.stat.minn += 1;
                o.stminn.innerHTML = o.stat.minn;
            }
        }
        if (ls) {
            (function () {
                var stat = [],
                    lang = "",
                    lango = {},
                    langv = o.la[o.la.selectedIndex].value,
                    size = 0;
                if (langv === "auto" && typeof output[1] === "string") {
                    lango = (/Language set to <strong>auto<\/strong>\. Presumed language is <em>\w+<\/em>\./).exec(output[1]);
                    if (lango !== null) {
                        lang = lango.toString();
                        lang = lang.substring(lang.indexOf("<em>") + 4, lang.indexOf("</em>"));
                        if (lang === "JavaScript" || lang === "JSON") {
                            o.stat.js += 1;
                            o.stjs.innerHTML = o.stat.js;
                        } else if (lang === "CSS") {
                            o.stat.css += 1;
                            o.stcss.innerHTML = o.stat.css;
                        } else if (lang === "HTML" || lang === "markup") {
                            o.stat.markup += 1;
                            o.stmarkup.innerHTML = o.stat.markup;
                        }
                    }
                } else if (langv === "csv") {
                    o.stat.csv += 1;
                    o.stcsv.innerHTML = o.stat.csv;
                } else if (langv === "text") {
                    o.stat.text += 1;
                    o.sttext.innerHTML = o.stat.text;
                } else if (langv === "javascript") {
                    o.stat.js += 1;
                    o.stjs.innerHTML = o.stat.js;
                } else if (langv === "markup" || langv === "html") {
                    o.stat.markup += 1;
                    o.stmarkup.innerHTML = o.stat.markup;
                } else if (langv === "css") {
                    o.stat.css += 1;
                    o.stcss.innerHTML = o.stat.css;
                }
                if (api.mode === "diff" && api.diff.length > api.source.length) {
                    size = api.diff.length;
                } else {
                    size = api.source.length;
                }
                if (size > o.stat.large) {
                    o.stat.large = size;
                    o.stlarge.innerHTML = size;
                }
                stat.push(o.stat.visit);
                stat.push(o.stat.usage);
                stat.push(o.stat.fdate);
                stat.push(o.stat.avday);
                stat.push(o.stat.diff);
                stat.push(o.stat.beau);
                stat.push(o.stat.minn);
                stat.push(o.stat.markup);
                stat.push(o.stat.js);
                stat.push(o.stat.css);
                stat.push(o.stat.csv);
                stat.push(o.stat.text);
                stat.push(o.stat.large);
                stat.push(o.stat.pdate);
                localStorage.setItem("statdata", stat.join("|"));
            }());
        }
    };

//pd object contains all the interactive functions.  pd is just a
//collection to keep all these functions organized and together
(function () {
    "use strict";
    pd = {

        //stores position information of floating report windows without
        //looking to localStorage each and every time
        position: {
            diffreport: {},
            beaureport: {},
            minreport: {},
            statreport: {}
        },

        //stores option information without looking into localStorage each
        //and every time
        optionString: [],

        //stores webtool information without looking into localStorage each
        //and every time
        webtool: [],

        //intelligently raise the z-index of the report windows
        top: function (x) {
            var a = o.zindex,
                b = [Number(o.re.style.zIndex), Number(o.rg.style.zIndex), Number(o.ri.style.zIndex), Number(o.rk.style.zIndex)],
                c = Math.max(a, b[0], b[1], b[2], b[3]) + 1;
            o.zindex = c;
            x.style.zIndex = c;
        },

        //read from files if the W3C File API is supported
        file: function (x) {
            var a = x.files[0],
                b = {},
                c = function () {},
                d = function () {},
                f = {};
            o.dd = $("modediff");
            if (fs && a !== null && typeof a === "object") {
                b = x.parentNode.parentNode.getElementsByTagName("textarea")[0];
                c = function (e) {
                    e = e || window.event;
                    b.value = e.target.result;
                    if (!o.dd.checked) {
                        recycle();
                    }
                };
                d = function (e) {
                    e = e || window.event;
                    b.value = "Error reading file. This is the browser's descriptiong: " + e.target.error.name;
                };
                f = new FileReader();
                f.readAsText(a, "UTF-8");
                f.onload = c;
            }
        },

        //change the color scheme of the web UI
        colorScheme: function (x) {
            var a = x.selectedIndex,
                b = x.getElementsByTagName("option"),
                c = b[a].innerHTML.toLowerCase().replace(/\s+/g, ""),
                d = "";
            o.wb.className = c;
            o.color = c;
            if (o.pdlogo !== null) {
                switch (c) {
                case "default":
                    d = "234";
                    break;
                case "coffee":
                    d = "654";
                    break;
                case "dark":
                    d = "8ad";
                    break;
                case "canvas":
                    d = "664";
                    break;
                case "shadow":
                    d = "999";
                    break;
                case "white":
                    d = "666";
                    break;
                default:
                    d = "000";
                    break;
                }
                o.pdlogo.style.borderColor = "#" + d;
                o.pdlogo.getElementsByTagName("g")[0].setAttribute("fill", "#" + d);
            }
            pd.options("colorScheme");
        },

        //minimize report windows to the default size and location
        minimize: function (x) {
            var a = x.parentNode,
                b = a.parentNode,
                c = b.getElementsByTagName("div")[0],
                d = b.getElementsByTagName("h3")[0],
                f = b.getAttribute("id"),
                test = (b === o.re) ? true : false,
                g = (test) ? a.getElementsByTagName("button")[1] : a.getElementsByTagName("button")[0],
                h = (test) ? a.getElementsByTagName("button")[2] : a.getElementsByTagName("button")[1];

            //shrink
            if (x.innerHTML === "\u035f") {
                if (!pd.position[f]) {
                    pd.position[f] = {};
                }
                if (h.innerHTML === "\u2191") {
                    pd.position[f].top = (b.offsetTop / 10);
                    pd.position[f].left = (b.offsetLeft / 10);
                    pd.position[f].height = (c.clientHeight / 10) - 3.7;
                    pd.position[f].width = (c.clientWidth / 10) - 0.4;
                } else {
                    h.innerHTML = "\u2191";
                }
                g.innerHTML = "\u2191";
                b.style.left = "auto";
                a.style.display = "none";
                b.style.borderWidth = "0em";
                b.style.top = "auto";
                b.style.zIndex = "2";
                if (b === o.re) {
                    b.style.right = "57.8em";
                } else if (b === o.rg) {
                    b.style.right = "38.8em";
                } else if (b === o.ri) {
                    b.style.right = "19.8em";
                } else if (b === o.rk) {
                    b.style.right = ".8em";
                }
                if (o.zindex > 2) {
                    o.zindex -= 3;
                    a.style.zIndex = o.zindex;
                }
                c.style.display = "none";
                d.style.borderLeftStyle = "solid";
                d.style.borderTopStyle = "solid";
                d.style.cursor = "pointer";
                d.style.width = "17em";
                d.style.margin = "0em 0em -3.2em 0.1em";
                x.innerHTML = "\u2191";

                //grow
            } else {
                pd.top(b);
                g.innerHTML = "\u2191";
                a.style.display = "block";
                b.style.borderWidth = ".1em";
                c.style.display = "block";
                d.style.cursor = "move";
                d.style.borderLeftStyle = "none";
                d.style.borderTopStyle = "none";
                d.style.margin = "0.1em 1.7em -3.2em 0.1em";
                if (pd.position && pd.position[f] && pd.position[f].top) {
                    b.style.right = "auto";
                    b.style.top = pd.position[f].top + "em";
                    b.style.left = pd.position[f].left + "em";
                    if (b === o.re) {
                        d.style.width = (pd.position[f].width - 9.71) + "em";
                    } else {
                        d.style.width = (pd.position[f].width - 6.71) + "em";
                    }
                    c.style.width = pd.position[f].width + "em";
                    c.style.height = pd.position[f].height + "em";
                } else {
                    b.style.left = (b.offsetLeft / 10) + "em";
                    if (b === o.re) {
                        d.style.width = "65.24em";
                    } else {
                        d.style.width = "68.24em";
                    }
                    b.style.right = "auto";
                    c.width = "75em";
                }
                x.innerHTML = "\u035f";
            }
            pd.options(b);
        },

        //maximize report window to available browser window
        maximize: function (x) {
            var a = x.parentNode.parentNode,
                b = a.getElementsByTagName("h3")[0],
                c = a.getElementsByTagName("div")[0],
                d = (document.body.parentNode.scrollTop > document.body.scrollTop) ? document.body.parentNode.scrollTop : document.body.scrollTop,
                e = (document.body.parentNode.scrollLeft > document.body.scrollLeft) ? document.body.parentNode.scrollLeft : document.body.scrollLeft,
                f = a.getAttribute("id"),
                g = x.parentNode.getElementsByTagName("button"),
                h = g[g.length - 1];
            pd.top(a);
            if (x.innerHTML === "\u2191") {
                x.innerHTML = "\u2193";
                x.setAttribute("title", "Return this dialogue to its prior size and location.");
                pd.position[f] = {};
                pd.position[f].top = (a.offsetTop / 10);
                pd.position[f].left = (a.offsetLeft / 10);
                pd.position[f].height = (c.clientHeight / 10) - 3.7;
                pd.position[f].width = (c.clientWidth / 10) - 0.4;
                pd.position[f].zindex = a.style.zIndex;
                a.style.top = (d / 10) + "em";
                a.style.left = (e / 10) + "em";
                if (window.innerHeight) {
                    c.style.height = ((window.innerHeight / 10) - 5.5) + "em";
                    if (a === o.re) {
                        b.style.width = ((window.innerWidth / 10) - 13.76) + "em";
                    } else {
                        b.style.width = ((window.innerWidth / 10) - 10.76) + "em";
                    }
                    c.style.width = ((window.innerWidth / 10) - 4.1) + "em";
                } else {
                    c.style.height = ((window.screen.availHeight / 10) - 21) + "em";
                    if (a === o.re) {
                        b.style.width = ((window.screen.availWidth / 10) - 17.76) + "em";
                    } else {
                        b.style.width = ((window.screen.availWidth / 10) - 14.76) + "em";
                    }
                    c.style.width = ((window.screen.availWidth / 10) - 5.1) + "em";
                }
                h.style.display = "none";
            } else {
                x.innerHTML = "\u2191";
                x.setAttribute("title", "Maximize this dialogue to the browser window.");
                if (pd.position && pd.position[f] && pd.position[f].top) {
                    a.style.top = pd.position[f].top + "em";
                    a.style.left = pd.position[f].left + "em";
                    if (a === o.re) {
                        b.style.width = (pd.position[f].width - 9.76) + "em";
                    } else {
                        b.style.width = (pd.position[f].width - 6.76) + "em";
                    }
                    c.style.width = pd.position[f].width + "em";
                    c.style.height = pd.position[f].height + "em";
                }
                a.style.zIndex = pd.position[f].zindex;
                h.style.display = "block";
                pd.options(a);
            }
        },

        //resize report window to custom width and height on drag
        resize: function (e, x) {
            var a = x.parentNode.parentNode,
                b = a.getElementsByTagName("div")[0],
                c = a.getElementsByTagName("h3")[0],
                bx = b.clientWidth,
                by = b.clientHeight,
                drop = function (g) {
                    document.onmousemove = null;
                    bx = b.clientWidth;
                    by = b.clientHeight;
                    g = null;
                    pd.options(a);
                    document.onmouseup = null;
                },
                boxsize = function (f) {
                    f = f || window.event;
                    b.style.width = ((bx + ((f.clientX - 4) - b.mouseX)) / 10) + "em";
                    if (a === o.re) {
                        c.style.width = (((bx + (f.clientX - b.mouseX)) / 10) - 10.24) + "em";
                    } else {
                        c.style.width = (((bx + (f.clientX - b.mouseX)) / 10) - 7.24) + "em";
                    }
                    b.style.height = ((by + ((f.clientY - 36) - b.mouseY)) / 10) + "em";
                    document.onmouseup = drop;
                };
            pd.top(a);
            e = e || window.event;
            b.mouseX = e.clientX;
            b.mouseY = e.clientY;
            document.onmousemove = boxsize;
            document.onmousedown = null;
        },

        //toggle between parsed html diff report and raw text representation
        save: function (x) {
            var a = o.rf.innerHTML,
                b = [],
                c = "",
                d = [];
            pd.top(o.re);
            if (/Please try using the option labeled ((&lt;)|<)em((&gt;)|>)Plain Text \(diff only\)((&lt;)|<)\/em((&gt;)|>)\./.test(a) && !/table class\=("|')diff("|')/.test(a)) {
                o.rf.innerHTML = "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (diff only)</em>. <span style='display:block'>The input does not appear to be markup, CSS, or JavaScript.</span></p>";
                return;
            }
            if (x.innerHTML === "S") {
                o.ps.checked = true;
                if (a !== "") {
                    c = "<table";
                    d = a.split(c);
                    c = c + d[1];
                    a = d[0];
                    b.push(a);
                    b.push(" <p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a &quot;.html&quot; file.</p> <textarea rows='40' cols='80' id='textreport'>");
                    b.push("&lt;?xml version='1.0' encoding='UTF-8' ?&gt;&lt;!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'&gt;&lt;html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'&gt;&lt;head&gt;&lt;title&gt;Pretty Diff - The difference tool&lt;/title&gt;&lt;meta name='robots' content='index, follow'/&gt; &lt;meta name='DC.title' content='Pretty Diff - The difference tool'/&gt; &lt;link rel='canonical' href='http://prettydiff.com/' type='application/xhtml+xml'/&gt;&lt;meta http-equiv='Content-Type' content='application/xhtml+xml;charset=UTF-8'/&gt;&lt;meta http-equiv='Content-Style-Type' content='text/css'/&gt;&lt;style type='text/css'&gt;" + o.css.body + o.css.core + o.css["s" + o.color] + "&lt;/style&gt;&lt;/head&gt;&lt;body class='" + o.color + "'&gt;&lt;h1&gt;&lt;a href='http://prettydiff.com/'&gt;Pretty Diff - The difference tool&lt;/a&gt;&lt;/h1&gt;");
                    b.push(a.replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;"));
                    b.push("&lt;p&gt;Accessibility note. &amp;lt;em&amp;gt; tags in the output represent character differences per lines compared.&lt;/p&gt;");
                    b.push(c.replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;"));
                    b.push("&lt;/body&gt;&lt;/html&gt;</textarea>");
                }
                x.innerHTML = "H";
                x.setAttribute("title", "Convert diff report to an HTML table.");
            } else {
                o.ps.checked = false;
                c = "<p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a \".html\" file.</p>";
                if (a !== "") {
                    a = a.replace(/ xmlns\="http:\/\/www\.w3\.org\/1999\/xhtml"/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                    d = a.split(c);
                    b.push(d[0]);
                    c = (d[1].indexOf("table class=\"diff\"") === -1) ? "table class='diff'" : "table class=\"diff\"";
                    d[1] = d[1].substring(d[1].indexOf(c) + c.length, d[1].length);
                    d[1] = "<table class=\"diff\"" + (d[1].substring(0, d[1].length - 25));
                    b.push(d[1]);
                }
                x.innerHTML = "S";
                x.setAttribute("title", "Convert diff report to text that can be saved.");
            }
            o.rf.innerHTML = b.join("");
            pd.options(x.parentNode);
        },

        //basic drag and drop for the report windows
        grab: function (e, x) {
            var a = x.parentNode,
                b = a.getElementsByTagName("p")[0].style.display,
                c = {},
                d = a.lastChild,
                h = a.firstChild,
                i = 0,
                ax = a.offsetLeft,
                ay = a.offsetTop,
                drop = function (g) {
                    document.onmousemove = null;
                    ax = a.offsetLeft;
                    ay = a.offsetTop;
                    g = null;
                    pd.options(a);
                    document.onmouseup = null;
                    d.style.opacity = "1";
                    a.style.height = "auto";
                    h.style.top = "100%";
                },
                boxmove = function (f) {
                    f = f || window.event;
                    a.style.right = "auto";
                    a.style.left = ((ax + (f.clientX - a.mouseX)) / 10) + "em";
                    a.style.top = ((ay + (f.clientY - a.mouseY)) / 10) + "em";
                    document.onmouseup = drop;
                };
            if (b === "none") {
                if (a === o.re) {
                    c = a.getElementsByTagName("button")[1];
                } else {
                    c = a.getElementsByTagName("button")[0];
                }
                a.style.left = "auto";
                pd.minimize(c);
                return;
            }
            pd.top(a);
            if (d.nodeType !== 1) {
                do {
                    d = d.previousSibling;
                } while (d.nodeType !== 1);
            }
            if (h.nodeType !== 1) {
                do {
                    h = h.nextSibling;
                } while (h.nodeType !== 1);
            }
            h = h.lastChild;
            if (h.nodeType !== 1) {
                do {
                    h = h.previousSibling;
                } while (h.nodeType !== 1);
            }
            d.style.opacity = ".5";
            i = a.clientHeight;
            h.style.top = (i / 20) + "0em";
            a.style.height = ".1em";
            e = e || window.event;
            a.mouseX = e.clientX;
            a.mouseY = e.clientY;
            document.onmousemove = boxmove;
            document.onmousedown = null;
            pd.options(a);
        },

        //shows and hides the additional options
        additional: function (x) {
            if (x === o.an) {
                o.ao.style.display = "none";
            } else if (x === o.ay) {
                o.ao.style.display = "block";
            }
            pd.options(x);
        },

        //toggle between tool modes and vertical/horizontal orientation of
        //textareas
        prettyvis: function (a) {
            var b = "",
                c = 0,
                d = [],
                optioncheck = function () {
                    var a = 0,
                        b = [];
                    b = o.la.getElementsByTagName("option");
                    for (a = b.length - 1; a > -1; a -= 1) {
                        if (b[a].value === "text") {
                            if (o.la.selectedIndex === a) {
                                o.la.selectedIndex = 0;
                            }
                            b[a].disabled = true;
                        }
                    }
                };
            b = o.la[o.la.selectedIndex].value;
            if (a === o.bb) {
                optioncheck();
                o.bx.setAttribute("name", "paste_code");
                o.mx.removeAttribute("name");
                if (o.bi.value === "" && o.mi.value !== "") {
                    o.bi.value = o.mi.value;
                } else if (o.bi.value === "" && o.bo.value !== "") {
                    o.bi.value = o.bo.value;
                }
                o.bd.style.display = "block";
                o.md.style.display = "none";
                if (o.bt) {
                    o.bt.style.display = "none";
                }
                if (o.nt) {
                    o.nt.style.display = "none";
                }
                if (o.dops) {
                    o.dops.style.display = "none";
                }
                o.mops.style.display = "none";
                if (b === "csv") {
                    o.bops.style.display = "none";
                } else {
                    o.bops.style.display = "block";
                }
            } else if (a === o.mm) {
                optioncheck();
                o.mx.setAttribute("name", "paste_code");
                o.bx.removeAttribute("name");
                if (o.mi.value === "" && o.bi.value !== "") {
                    o.mi.value = o.bi.value;
                } else if (o.mi.value === "" && o.bo.value !== "") {
                    o.mi.value = o.bo.value;
                }
                if (b === "text" || b === "csv") {
                    o.mops.style.display = "none";
                } else {
                    o.mops.style.display = "block";
                }
                o.md.style.display = "block";
                o.bd.style.display = "none";
                if (o.bt) {
                    o.bt.style.display = "none";
                }
                if (o.nt) {
                    o.nt.style.display = "none";
                }
                if (o.dops) {
                    o.dops.style.display = "none";
                }
                o.bops.style.display = "none";
            } else if (a === o.dd) {
                d = o.la.getElementsByTagName("option");
                for (c = d.length - 1; c > -1; c -= 1) {
                    d[c].disabled = false;
                }
                if (o.bo.value === "" && o.bi.value !== "") {
                    o.bo.value = o.bi.value;
                } else if (o.bo.value === "" && o.mi.value !== "") {
                    o.bo.value = o.mi.value;
                }
                o.bt.style.display = "block";
                o.nt.style.display = "block";
                o.bd.style.display = "none";
                o.md.style.display = "none";
                o.dops.style.display = "block";
                o.bops.style.display = "none";
                o.mops.style.display = "none";
                if (b === "csv" || b === "text") {
                    o.dqp.style.display = "none";
                    o.dqt.style.display = "none";
                    o.db.style.display = "none";
                } else {
                    o.dqp.style.display = "block";
                    o.dqt.style.display = "block";
                    o.db.style.display = "block";
                }
            } else if (a === o.dp) {
                o.mi.removeAttribute("style");
                o.mx.removeAttribute("style");
                o.bi.removeAttribute("style");
                o.bx.removeAttribute("style");
                o.bo.removeAttribute("style");
                o.nx.removeAttribute("style");
                o.bt.className = "wide";
                o.nt.className = "wide";
                o.bd.className = "wide";
                o.md.className = "wide";
            } else if (a === o.dt) {
                o.mi.removeAttribute("style");
                o.mx.removeAttribute("style");
                o.bi.removeAttribute("style");
                o.bx.removeAttribute("style");
                o.bo.removeAttribute("style");
                o.nx.removeAttribute("style");
                o.bt.className = "difftall";
                o.nt.className = "difftall";
                o.bd.className = "tall";
                o.md.className = "tall";
            }
            pd.options(a);
        },

        //alters available options depending upon language selection
        codeOps: function (x) {
            var a = "";
            o.bb = $$("modebeautify");
            o.dd = $$("modediff");
            o.mm = $$("modeminify");
            o.la = $$("language");
            o.ay = $$("additional_yes");
            if (o.ay.checked) {
                o.ao.style.display = "block";
            }
            a = o.la[o.la.selectedIndex].value;
            if (o.dd.checked) {
                o.mops.style.display = "none";
                o.bops.style.display = "none";
                if (a === "text" || a === "csv") {
                    o.dqp.style.display = "none";
                    o.dqt.style.display = "none";
                    o.db.style.display = "none";
                } else {
                    o.dqp.style.display = "block";
                    o.dqt.style.display = "block";
                    o.db.style.display = "block";
                }
            } else if (o.bb.checked) {
                o.mops.style.display = "none";
                o.dops.style.display = "none";
                if (a === "csv") {
                    o.bops.style.display = "none";
                } else {
                    o.bops.style.display = "block";
                }
            } else if (o.mm.checked) {
                o.bops.style.display = "none";
                o.dops.style.display = "none";
                if (a === "csv") {
                    o.mops.style.display = "none";
                    o.ao.style.display = "none";
                } else {
                    o.mops.style.display = "block";
                }
            }
            if (a === "csv") {
                o.csvp.style.display = "block";
            } else {
                o.csvp.style.display = "none";
            }
            if (a === "csv" || a === "text") {
                o.db.style.display = "none";
            } else {
                o.db.style.display = "block";
            }
            if (a === "html") {
                o.hd.checked = true;
                o.hm.checked = true;
                o.hy.checked = true;
            } else {
                o.he.checked = true;
                o.hn.checked = true;
                o.hz.checked = true;
            }
            pd.options(x);
        },

        //provides interaction to simulate a text input into a radio button
        //set with appropriate accessbility response
        indentchar: function (x) {
            o.bc = $$("beau-char");
            o.dc = $$("diff-char");
            if (o.bb.checked && x === o.bc) {
                o.bw.checked = true;
            } else if (o.dd.checked && x === o.dc) {
                o.dw.checked = true;
            }
            if (o.bb.checked && o.bw.checked) {
                o.bc.className = "checked";
                if (o.bc.value === "Click me for custom input") {
                    o.bc.value = "";
                }
            } else if (o.bb.checked) {
                if (o.bc.value === "") {
                    o.bc.value = "Click me for custom input";
                }
                o.bc.className = "unchecked";
            } else if (o.dd.checked && o.dw.checked) {
                o.dc.className = "checked";
                if (o.dc.value === "Click me for custom input") {
                    o.dc.value = "";
                }
            } else if (o.dd.checked) {
                if (o.dc.value === "") {
                    o.dc.value = "Click me for custom input";
                }
                o.dc.className = "unchecked";
            }
            if (o.bcv !== "") {
                o.bc.value = o.bcv;
            }
            if (o.dcv !== "") {
                o.dc.value = o.dcv;
            }
            if (x !== o.bc && x !== o.dc) {
                pd.options(x);
            }
        },

        //store tool changes into localStorage in effort to maintain state
        options: function (x) {
            var a = {},
                b = 0;
            if (!ls) {
                return;
            }
            if (localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
                pd.webtool = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");
            }
            if (localStorage.hasOwnProperty("optionString") && localStorage.getItem("optionString") !== null) {
                pd.optionString = localStorage.getItem("optionString").replace(/prettydiffper/g, "%").split("prettydiffcsep");
            }
            o.bb = $$("modebeautify");
            o.dd = $$("modediff");
            o.mm = $$("modeminify");
            o.dp = $$("diffwide");
            o.sh = $$("hideOptions");
            o.ps = $$("diff-save");
            if (x === o.la) {
                pd.optionString[0] = "api.lang: " + x.selectedIndex;
            } else if (x === o.bb) {
                pd.optionString[1] = "api.mode: beautify";
            } else if (x === o.mm) {
                pd.optionString[1] = "api.mode: minify";
            } else if (x === o.dd) {
                pd.optionString[1] = "api.mode: diff";
            } else if (x === o.ch) {
                pd.optionString[2] = "api.csvchar: \"" + o.ch.value + "\"";
            } else if (x === o.bq && o.bb.checked && o.bq.value !== "" && !isNaN(Number(o.bq.value))) {
                pd.optionString[3] = "api.insize: " + o.bq.value;
            } else if (x === o.dq && o.dd.checked && o.dq.value !== "" && !isNaN(Number(o.dq.value))) {
                pd.optionString[3] = "api.insize: " + o.dq.value;
            } else if (x === o.bc && o.bb.checked && o.bw.checked) {
                o.cz = o.bc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
                pd.optionString[4] = "api.inchar: \"" + o.cz + "\"";
                o.bcv = o.cz;
            } else if (x === o.bw && o.bb.checked) {
                o.cz = o.bc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
                pd.optionString[4] = "api.inchar: \"" + o.cz + "\"";
            } else if (x === o.bs && o.bb.checked) {
                pd.optionString[4] = "api.inchar: \" \"";
            } else if (x === o.ba && o.bb.checked) {
                pd.optionString[4] = "api.inchar: \"\\t\"";
            } else if (x === o.bn && o.bb.checked) {
                pd.optionString[4] = "api.inchar: \"\\n\"";
            } else if (x === o.dc && o.dd.checked && o.dw.checked) {
                o.cz = o.dc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
                pd.optionString[4] = "api.inchar: \"" + o.cz + "\"";
                o.dcv = o.cz;
            } else if (x === o.dw && o.dd.checked) {
                o.cz = o.dc.value;
                if ((/^&/).test(o.cz) && !(/;$/).test(o.cz)) {
                    o.cz = o.cz.replace("&", "&amp;");
                }
                pd.optionString[4] = "api.inchar: \"" + o.cz + "\"";
            } else if (x === o.ds && o.dd.checked) {
                pd.optionString[4] = "api.inchar: \" \"";
            } else if (x === o.da && o.dd.checked) {
                pd.optionString[4] = "api.inchar: \"\\t\"";
            } else if (x === o.dz && o.dd.checked) {
                pd.optionString[4] = "api.inchar: \"\\n\"";
            } else if (x === o.iy && o.bb.checked) {
                pd.optionString[5] = "api.comments: indent";
            } else if (x === o.iz && o.bb.checked) {
                pd.optionString[5] = "api.comments: noindent";
            } else if (x === o.js && o.bb.checked) {
                pd.optionString[6] = "api.indent: allman";
            } else if (x === o.jt && o.bb.checked) {
                pd.optionString[6] = "api.indent: knr";
            } else if (x === o.jd && o.dd.checked) {
                pd.optionString[6] = "api.indent: allman";
            } else if (x === o.je && o.dd.checked) {
                pd.optionString[6] = "api.indent: knr";
            } else if (x === o.is && o.bb.checked) {
                pd.optionString[7] = "api.style: indent";
            } else if (x === o.it && o.bb.checked) {
                pd.optionString[7] = "api.stylet: noindent";
            } else if (x === o.id && o.dd.checked) {
                pd.optionString[7] = "api.style: indent";
            } else if (x === o.ie && o.dd.checked) {
                pd.optionString[7] = "api.style: noindent";
            } else if (x === o.hy && o.bb.checked) {
                pd.optionString[8] = "api.html: html-yes";
            } else if (x === o.hz && o.bb.checked) {
                pd.optionString[8] = "api.html: html-no";
            } else if (x === o.hm && o.mm.checked) {
                pd.optionString[8] = "api.html: html-yes";
            } else if (x === o.hn && o.mm.checked) {
                pd.optionString[8] = "api.html: html-no";
            } else if (x === o.hd && o.dd.checked) {
                pd.optionString[8] = "api.html: html-yes";
            } else if (x === o.he && o.dd.checked) {
                pd.optionString[8] = "api.html: html-no";
            } else if (x === o.context) {
                if (o.context.value === "" || isNaN(o.context.value)) {
                    pd.optionString[9] = "api.context: \"\"";
                } else {
                    pd.optionString[9] = "api.context: " + o.context.value;
                }
            } else if (x === o.du) {
                pd.optionString[10] = "api.content: true";
            } else if (x === o.dx) {
                pd.optionString[10] = "api.content: false";
            } else if (x === o.dr) {
                pd.optionString[11] = "api.quote: false";
            } else if (x === o.dy) {
                pd.optionString[11] = "api.quote: true";
            } else if (x === o.dm) {
                pd.optionString[12] = "api.semicolon: false";
            } else if (x === o.dn) {
                pd.optionString[12] = "api.semicolon: true";
            } else if (x === o.inline) {
                pd.optionString[13] = "api.diffview: inline";
            } else if (x === o.sideby) {
                pd.optionString[13] = "api.diffview: sidebyside";
            } else if (x === o.mb) {
                pd.optionString[14] = "api.topcoms: false";
            } else if (x === o.mc) {
                pd.optionString[14] = "api.topcoms: true";
            } else if (x === o.bg) {
                pd.optionString[15] = "api.force_indent: true";
            } else if (x === o.dg) {
                pd.optionString[15] = "api.force_indent: true";
            } else if (x === o.bf) {
                pd.optionString[15] = "api.force_indent: false";
            } else if (x === o.df) {
                pd.optionString[15] = "api.force_indent: false";
            } else if (x === o.re) {
                o.re = $$("diffreport");
                o.rf = $$("diffreportbody");
                if (o.rf.style.display === "none") {
                    pd.webtool[4] = "diffreportmin: 1";
                } else {
                    pd.webtool[3] = "diffreportzindex: " + o.re.style.zIndex;
                    pd.webtool[4] = "diffreportmin: 0";
                    pd.webtool[5] = "diffreportleft: " + o.re.offsetLeft;
                    pd.webtool[6] = "diffreporttop: " + o.re.offsetTop;
                    pd.webtool[7] = "diffreportwidth: " + ((o.rf.clientWidth / 10) - 0.3);
                    pd.webtool[8] = "diffreportheight: " + ((o.rf.clientHeight / 10) - 3.6);
                }
            } else if (x === o.rg) {
                o.rg = $$("beaureport");
                o.rh = $$("beaureportbody");
                if (o.rh.style.display === "none") {
                    pd.webtool[10] = "beaureportmin: 1";
                } else {
                    pd.webtool[9] = "beaureportzindex: " + o.rg.style.zIndex;
                    pd.webtool[10] = "beaureportmin: 0";
                    pd.webtool[11] = "beaureportleft: " + o.rg.offsetLeft;
                    pd.webtool[12] = "beaureporttop: " + o.rg.offsetTop;
                    pd.webtool[13] = "beaureportwidth: " + ((o.rh.clientWidth / 10) - 0.3);
                    pd.webtool[14] = "beaureportheight: " + ((o.rh.clientHeight / 10) - 3.6);
                }
            } else if (x === o.ri) {
                o.ri = $$("minreport");
                o.rj = $$("minreportbody");
                if (o.rj.style.display === "none") {
                    pd.webtool[16] = "minnreportmin: 1";
                } else {
                    pd.webtool[15] = "minnreportzindex: " + o.ri.style.zIndex;
                    pd.webtool[16] = "minnreportmin: 0";
                    pd.webtool[17] = "minnreportleft: " + o.ri.offsetLeft;
                    pd.webtool[18] = "minnreporttop: " + o.ri.offsetTop;
                    pd.webtool[19] = "minnreportwidth: " + ((o.rj.clientWidth / 10) - 0.3);
                    pd.webtool[20] = "minnreportheight: " + ((o.rj.clientHeight / 10) - 3.6);
                }
            } else if (x === o.rk) {
                o.rk = $$("statreport");
                o.rl = $$("statreportbody");
                if (o.rl.style.display === "none") {
                    pd.webtool[22] = "statreportmin: 1";
                } else {
                    pd.webtool[21] = "statreportzindex: " + o.rk.style.zIndex;
                    pd.webtool[22] = "statreportmin: 0";
                    pd.webtool[23] = "statreportleft: " + o.rk.offsetLeft;
                    pd.webtool[24] = "statreporttop: " + o.rk.offsetTop;
                    pd.webtool[25] = "statreportwidth: " + ((o.rl.clientWidth / 10) - 0.3);
                    pd.webtool[26] = "statreportheight: " + ((o.rl.clientHeight / 10) - 3.6);
                }
            } else if (x === o.an) {
                pd.webtool[27] = "additional: no";
            } else if (x === o.ay) {
                pd.webtool[27] = "additional: yes";
            } else if (x === "colorScheme") {
                pd.webtool[28] = "colorScheme: " + o.color;
            }
            if (typeof pd.webtool[28] !== "string") {
                pd.webtool[28] = "colorScheme: shadow";
            } else if (typeof pd.webtool[4] !== "string") {
                o.re = $$("diffreport");
                o.rf = $$("diffreportbody");
                if (o.rf.style.display === "none") {
                    pd.webtool[4] = "diffreportmin: 1";
                } else {
                    pd.webtool[3] = "diffreportzindex: " + o.re.style.zIndex;
                    pd.webtool[4] = "diffreportmin: 0";
                    pd.webtool[5] = "diffreportleft: " + o.re.offsetLeft;
                    pd.webtool[6] = "diffreporttop: " + o.re.offsetTop;
                    pd.webtool[7] = "diffreportwidth: " + ((o.rf.clientWidth / 10) - 0.3);
                    pd.webtool[8] = "diffreportheight: " + ((o.rf.clientHeight / 10) - 3.6);
                }
            } else if (typeof pd.webtool[10] !== "string") {
                o.rg = $$("beaureport");
                o.rh = $$("beaureportbody");
                if (o.rh.style.display === "none") {
                    pd.webtool[10] = "beaureportmin: 1";
                } else {
                    pd.webtool[9] = "beaureportzindex: " + o.rg.style.zIndex;
                    pd.webtool[10] = "beaureportmin: 0";
                    pd.webtool[11] = "beaureportleft: " + o.rg.offsetLeft;
                    pd.webtool[12] = "beaureporttop: " + o.rg.offsetTop;
                    pd.webtool[13] = "beaureportwidth: " + ((o.rh.clientWidth / 10) - 0.3);
                    pd.webtool[14] = "beaureportheight: " + ((o.rh.clientHeight / 10) - 3.6);
                }
            } else if (typeof pd.webtool[16] !== "string") {
                o.ri = $$("minreport");
                o.rj = $$("minreportbody");
                if (o.rj.style.display === "none") {
                    pd.webtool[16] = "minnreportmin: 1";
                } else {
                    pd.webtool[15] = "minnreportzindex: " + o.ri.style.zIndex;
                    pd.webtool[16] = "minnreportmin: 0";
                    pd.webtool[17] = "minnreportleft: " + o.ri.offsetLeft;
                    pd.webtool[18] = "minnreporttop: " + o.ri.offsetTop;
                    pd.webtool[19] = "minnreportwidth: " + ((o.rj.clientWidth / 10) - 0.3);
                    pd.webtool[20] = "minnreportheight: " + ((o.rj.clientHeight / 10) - 3.6);
                }
            } else if (typeof pd.webtool[22] !== "string") {
                o.rk = $$("statreport");
                o.rl = $$("statreportbody");
                if (o.rl.style.display === "none") {
                    pd.webtool[22] = "statreportmin: 1";
                } else {
                    pd.webtool[21] = "statreportzindex: " + o.rk.style.zIndex;
                    pd.webtool[22] = "statreportmin: 0";
                    pd.webtool[23] = "statreportleft: " + o.rk.offsetLeft;
                    pd.webtool[24] = "statreporttop: " + o.rk.offsetTop;
                    pd.webtool[25] = "statreportwidth: " + ((o.rl.clientWidth / 10) - 0.3);
                    pd.webtool[26] = "statreportheight: " + ((o.rl.clientHeight / 10) - 3.6);
                }
            }
            if (o.sh) {
                if (o.sh.innerHTML === "Normal view") {
                    pd.webtool[0] = "showhide: hide";
                } else if (o.sh.innerHTML !== "Normal view") {
                    pd.webtool[0] = "showhide: show";
                }
            }
            if (x === o.dt || !o.dp || !o.dp.checked) {
                pd.webtool[1] = "display: vertical";
            } else if (x === o.dp || o.dp.checked) {
                pd.webtool[1] = "display: horizontal";
            }
            if (o.ps) {
                a = o.re.getElementsByTagName("button")[0];
                if ((x === o.ps && o.ps.checked) || o.ps.checked) {
                    pd.webtool[2] = "diffsave: true";
                    a.innerHTML = "H";
                    a.setAttribute("title", "Convert diff report to text that can be saved.");
                } else if (x === o.ps || !o.ps.checked) {
                    pd.webtool[2] = "diffsave: false";
                    a.innerHTML = "S";
                    a.setAttribute("title", "Convert diff report to an HTML table.");
                }
            }
            for (b = 0; b < 15; b += 1) {
                if (typeof pd.optionString[b] !== "string" || pd.optionString[b] === "") {
                    pd.optionString[b] = "pdempty";
                }
            }
            if (o.option !== null) {
                if (pd.optionString[4] === "api.inchar: \"&nbsp;\"") {
                    pd.optionString[4] = "api.inchar: \" \"";
                }
                if (typeof o.option.innerHTML === "string") {
                    o.option.innerHTML = ("/*prettydiff.com " + (pd.optionString.join(", ").replace(/pdempty(\, )?/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */")).replace(/^(\/\*prettydiff\.com (\, )+)/, "/*prettydiff.com ").replace(/(\,\s+\,\s+)+/g, ", ");
                }
                if (typeof o.option.value === "string") {
                    o.option.value = ("/*prettydiff.com " + (pd.optionString.join(", ").replace(/pdempty(\, )?/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */")).replace(/^(\/\*prettydiff\.com (\, )+)/, "/*prettydiff.com ").replace(/(\,\s+\,\s+)+/g, ", ");
                }
            }
            if (pd.optionString[0] === "" || pd.optionString[0] === undefined) {
                if (o.bb.checked) {
                    pd.optionString[0] = "api.mode: beautify";
                } else if (o.mm.checked) {
                    pd.optionString[0] = "api.mode: minify";
                } else {
                    pd.optionString[0] = "api.mode: diff";
                }
                localStorage.setItem("optionString", pd.optionString.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
                pd.optionString[0] = "";
            } else {
                localStorage.setItem("optionString", pd.optionString.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
            }

            //IMPORTANT the index for this loop must be one less than the
            //length on the parsed webtool storage. This limit prevents
            //excessive writing to the array which is corrupted each time
            //pd.options is executed
            for (b = 0; b < 28; b += 1) {
                if (pd.webtool[b] === "" || (typeof pd.webtool[b] === "string" && pd.webtool[b].indexOf("colorScheme") > -1)) {
                    pd.webtool[b] = "pdempty";
                }
            }
            localStorage.setItem("webtool", pd.webtool.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
        },

        fixminreport: function () {
            var a = {},
                b = {},
                c = {},
                d = {};
            o.re = $$("diffreport");
            o.rf = $$("diffreportbody");
            o.rg = $$("beaureport");
            o.rh = $$("beaureportbody");
            o.ri = $$("minreport");
            o.rj = $$("minreportbody");
            a = o.re.getElementsByTagName("h3")[0];
            b = o.rg.getElementsByTagName("h3")[0];
            c = o.ri.getElementsByTagName("h3")[0];
            if (ls) {
                o.rk = $$("statreport");
                o.rl = $$("statreportbody");
                d = o.rk.getElementsByTagName("h3")[0];
            }
            if (o.rf.style.display === "none" && (a.style.width === "17em" || a.style.width === "")) {
                o.re.style.right = "57.8em";
                o.re.style.top = "auto";
                o.re.style.left = "auto";
            }
            if (o.rh.style.display === "none" && (b.style.width === "17em" || b.style.width === "")) {
                o.rg.style.right = "38.8em";
                o.rg.style.top = "auto";
                o.rg.style.left = "auto";
            }
            if (o.rj.style.display === "none" && (c.style.width === "17em" || c.style.width === "")) {
                o.ri.style.right = "19.8em";
                o.ri.style.top = "auto";
                o.ri.style.left = "auto";
            }
            if (ls && o.rl.style.display === "none" && (d.style.width === "17em" || d.style.width === "")) {
                o.rk.style.right = ".8em";
                o.rk.style.top = "auto";
                o.rk.style.left = "auto";
            }
        },

        //maximize textareas and hide options
        hideOptions: function (x) {
            var a = "";
            if (!o.dt) {
                return;
            }
            o.bb = $$("modebeautify");
            o.dd = $$("modediff");
            o.mm = $$("modeminify");
            o.la = $$("language");
            o.dt = $$("difftall");
            o.ay = $$("additional_yes");
            a = o.la[o.la.selectedIndex].value;
            if (x.innerHTML === "Maximize Inputs") {
                o.op.style.display = "none";
                o.bops.style.display = "none";
                o.dops.style.display = "none";
                o.mops.style.display = "none";
                o.to.style.display = "none";
                o.bd.className = "tall";
                o.md.className = "tall";
                o.bt.className = "difftall";
                o.nt.className = "difftall";
                o.bi.style.marginBottom = "1em";
                o.mi.style.marginBottom = "1em";
                if (window.innerHeight) {
                    o.bi.style.height = ((Math.floor(window.innerHeight / 1.2) - 175) / 10) + "em";
                    o.mi.style.height = ((Math.floor(window.innerHeight / 1.2) - 175) / 10) + "em";
                    o.bx.style.height = ((Math.floor(window.innerHeight / 1.2) - 150) / 10) + "em";
                    o.mx.style.height = ((Math.floor(window.innerHeight / 1.2) - 150) / 10) + "em";
                    o.bo.style.height = ((Math.floor(window.innerHeight / 1.2) - 190) / 10) + "em";
                    o.nx.style.height = ((Math.floor(window.innerHeight / 1.2) - 190) / 10) + "em";
                } else {
                    o.bi.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                    o.mi.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                    o.bx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                    o.mx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                    o.bo.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 275) / 10) + "em";
                    o.nx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 275) / 10) + "em";
                }
                o.disp.className = "maximized";
                x.innerHTML = "Normal view";
                o.re.style.display = "none";
                o.rg.style.display = "none";
                o.ri.style.display = "none";
                o.rk.style.display = "none";
                o.ao.style.display = "none";
                o.ci.style.margin = "0px";
            } else if (x.innerHTML === "Normal view") {
                o.op.style.display = "block";
                if (o.bb.checked && a !== "csv" && a !== "text") {
                    o.bops.style.display = "block";
                } else if (o.dd.checked) {
                    o.dops.style.display = "block";
                } else if (o.mm.checked && a !== "csv" && a !== "text") {
                    o.mops.style.display = "block";
                }
                o.bi.style.height = "";
                o.mi.style.height = "";
                o.bx.style.height = "";
                o.mx.style.height = "";
                o.bo.style.height = "";
                o.nx.style.height = "";
                o.bi.style.margin = "0em";
                o.mi.style.margin = "0em";
                if (typeof pd.position.diffreport === "object" && typeof pd.position.diffreport.display === "string" && pd.position.diffreport.display !== "none") {
                    o.re.style.display = "block";
                } else {
                    o.re.style.display = "none";
                }
                if (typeof pd.position.beaureport === "object" && typeof pd.position.beaureport.display === "string" && pd.position.diffreport.display !== "none") {
                    o.rg.style.display = "block";
                } else {
                    o.rg.style.display = "none";
                }
                if (typeof pd.position.minreport === "object" && typeof pd.position.minreport.display === "string" && pd.position.minreport.display !== "none") {
                    o.ri.style.display = "block";
                } else {
                    o.ri.style.display = "none";
                }
                if (typeof pd.position.statreport === "object" && typeof pd.position.statreport.display === "string" && pd.position.statreport.display !== "none") {
                    o.rk.style.display = "block";
                } else {
                    o.rk.style.display = "none";
                }
                if (o.ay.checked) {
                    o.ao.style.display = "block";
                }console.log(o.ao);
                if (!o.dt.checked) {
                    o.bd.className = "wide";
                    o.md.className = "wide";
                    o.bt.className = "wide";
                    o.nt.className = "wide";
                }
                o.to.style.display = "block";
                o.disp.className = "default";
                x.innerHTML = "Maximize Inputs";
                o.re.style.display = "block";
                o.rg.style.display = "block";
                o.ri.style.display = "block";
                o.rk.style.display = "block";
                o.ci.style.margin = "0 0 0 22.5em";
                pd.fixminreport();
            }
            pd.options(x);
            return false;
        },

        //reset tool to default configuration
        reset: function () {
            var a = o.re.getElementsByTagName("button"),
                b = 0,
                c = [];
            c = o.la.getElementsByTagName("option");
            o.la.selectedIndex = 0;
            for (b = c.length - 1; b > -1; b -= 1) {
                if (c[b].value === "text") {
                    c[b].disabled = true;
                }
            }
            pd.optionString = [];
            pd.webtool = [];
            a[0].innerHTML = "S";
            a[1].innerHTML = "\u2191";
            o.rf.style.display = "none";
            o.re.style.display = "block";
            o.re.style.left = "auto";
            o.re.style.right = "59em";
            o.re.style.zIndex = "2";
            o.re.getElementsByTagName("p")[0].style.display = "none";
            o.re.getElementsByTagName("h3")[0].style.width = "17em";
            o.rh.style.display = "none";
            o.rg.style.display = "block";
            o.rg.style.left = "auto";
            o.rg.style.right = "40em";
            o.rg.style.zIndex = "2";
            o.rg.getElementsByTagName("p")[0].style.display = "none";
            o.rg.getElementsByTagName("h3")[0].style.width = "17em";
            o.rj.style.display = "none";
            o.ri.style.display = "block";
            o.ri.style.left = "auto";
            o.ri.style.right = "1";
            o.ri.style.zIndex = "2";
            o.ri.getElementsByTagName("p")[0].style.display = "none";
            o.ri.getElementsByTagName("h3")[0].style.width = "17em";
            o.rl.style.display = "none";
            o.cs.selectedIndex = 0;
            o.wb.className = "shadow";
            if (!ls) {
                o.rk.style.display = "none";
            } else {
                o.rk.style.display = "block";
                o.rk.style.left = "auto";
                o.rk.style.right = "2em";
                o.rk.style.zIndex = "2";
                o.rk.getElementsByTagName("p")[0].style.display = "none";
                o.rk.getElementsByTagName("h3")[0].style.width = "17em";
            }
            o.bi.style.height = "";
            o.mi.style.height = "";
            o.bx.style.height = "";
            o.mx.style.height = "";
            o.disp.className = "default";
            o.to.style.display = "block";
            o.op.style.display = "block";
            if (o.dops) {
                o.dops.style.display = "block";
                o.bops.style.display = "none";
            } else {
                o.bops.style.display = "block";
            }
            if (o.bt && o.nt) {
                o.bt.style.display = "block";
                o.nt.style.display = "block";
                o.bd.style.display = "none";
            } else {
                o.bd.style.display = "block";
            }
            o.mops.style.display = "none";
            o.csvp.style.display = "none";
            o.md.style.display = "none";
            if (o.bt) {
                o.bt.className = "difftall";
            }
            if (o.nt) {
                o.nt.className = "difftall";
            }
            o.bd.className = "tall";
            o.md.className = "tall";
            o.option.value = "/*prettydiff.com */";
            o.bq.value = "4";
            o.bc.value = "Click me for custom input";
            o.bc.style.color = "#888";
            o.bs.checked = true;
            o.is.checked = true;
            o.hz.checked = true;
            o.mb.checked = true;
            o.hn.checked = true;
            o.jt.checked = true;
            o.bf.checked = true;
            if (o.bo) {
                o.bo.style.height = "";
            }
            if (o.nx) {
                o.nx.style.height = "";
            }
            if (o.dd) {
                o.dd.checked = true;
            } else {
                o.bb.checked = true;
            }
            if (o.dt) {
                o.dt.checked = true;
            }
            if (o.sh) {
                o.sh.innerHTML = "Maximize Inputs";
            }
            if (o.ds) {
                o.ds.checked = true;
            }
            if (o.dc) {
                o.dc.value = "Click me for custom input";
                o.dc.style.color = "#888";
            }
            if (o.je) {
                o.je.checked = true;
            }
            if (o.ps) {
                o.ps.checked = false;
            }
            if (o.context) {
                o.context.value = "";
            }
            if (o.dq) {
                o.dq.value = "4";
            }
            if (o.dx) {
                o.dx.checked = true;
            }
            if (o.dr) {
                o.dr.checked = true;
            }
            if (o.dm) {
                o.dm.checked = true;
            }
            if (o.sideby) {
                o.sideby.checked = true;
            }
            if (o.he) {
                o.he.checked = true;
            }
            if (o.id) {
                o.id.checked = true;
            }
            if (o.df) {
                o.df.checked = true;
            }
            if (ls && localStorage.hasOwnProperty("webtool")) {
                delete localStorage.webtool;
            }
            if (ls && localStorage.hasOwnProperty("optionString")) {
                delete localStorage.optionString;
            }
            pd.fixminreport();
        },

        //alter tool on page load in reflection to saved state
        reload: function () {
            var a = [],
                b = 0,
                c = 0,
                d = [],
                f = "",
                g = 0,
                h = "",
                i = {},
                j = new Date(),
                k = "",
                l = 0,
                m = [],
                bm = false,
                dm = false,
                mm = false,
                sm = false,
                bma = true,
                dma = true,
                mma = true,
                sma = true,
                source = true,
                diff = true,
                html = false,
                mode = "",
                stat = [],
                lang = "";
            if (!fs) {
                document.getElementById("diffbasefile").disabled = true;
                document.getElementById("diffnewfile").disabled = true;
                document.getElementById("beautyfile").disabled = true;
                document.getElementById("minifyfile").disabled = true;
            }
            if (o.wb.getAttribute("id") === "webtool") {
                o.bc = $$("beau-char");
                o.dc = $$("diff-char");
                o.re.style.zIndex = "2";
                o.rg.style.zIndex = "2";
                o.ri.style.zIndex = "2";
                o.rk.style.zIndex = "2";
                if (ls && (localStorage.hasOwnProperty("optionString") || localStorage.hasOwnProperty("webtool") || localStorage.hasOwnProperty("statdata"))) {
                    if (localStorage.hasOwnProperty("optionString") && localStorage.getItem("optionString") !== null) {
                        o.option.innerHTML = "/*prettydiff.com " + (localStorage.getItem("optionString").replace(/prettydiffper/g, "%").replace(/(prettydiffcsep)+/g, ", ").replace(/\,\s+pdempty/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */");
                        a = localStorage.getItem("optionString").replace(/prettydiffper/g, "%").split("prettydiffcsep");
                        c = a.length;
                        for (b = 0; b < c; b += 1) {
                            d = a[b].split(": ");
                            if (typeof d[1] === "string") {
                                f = d[1].charAt(0);
                                g = d[1].length - 1;
                                h = d[1].charAt(d[1].length - 2);
                                if ((f === "\"" || f === "'") && f === d[1].charAt(g) && h !== "\\") {
                                    d[1] = d[1].substring(1, g);
                                }
                                if (d[0] === "api.mode") {
                                    if (mode === "minify" || d[1] === "minify") {
                                        m = o.la.getElementsByTagName("option");
                                        for (l = m.length - 1; l > -1; l -= 1) {
                                            if (m[l].value === "text") {
                                                m[l].disabled = true;
                                            }
                                        }
                                        o.mm.checked = true;
                                        o.mx.setAttribute("name", "paste_code");
                                        o.bx.removeAttribute("name");
                                        if (o.bt) {
                                            o.bt.style.display = "none";
                                        }
                                        if (o.nt) {
                                            o.nt.style.display = "none";
                                        }
                                        o.md.style.display = "block";
                                        o.bops.style.display = "none";
                                        if (o.dops) {
                                            o.dops.style.display = "none";
                                        }
                                        if (lang === "text") {
                                            lang = "auto";
                                            o.la.selectedIndex = 0;
                                        }
                                        if (lang === "text" || lang === "csv") {
                                            o.mops.style.display = "none";
                                        } else {
                                            o.mops.style.display = "block";
                                        }
                                    } else if (mode === "beautify" || d[1] === "beautify") {
                                        m = o.la.getElementsByTagName("option");
                                        for (l = m.length - 1; l > -1; l -= 1) {
                                            if (m[l].value === "text") {
                                                m[l].disabled = true;
                                            }
                                        }
                                        o.bb.checked = true;
                                        if (o.bt) {
                                            o.bt.style.display = "none";
                                        }
                                        if (o.nt) {
                                            o.nt.style.display = "none";
                                        }
                                        o.bd.style.display = "block";
                                        if (o.dops) {
                                            o.dops.style.display = "none";
                                        }
                                        o.mops.style.display = "none";
                                        if (lang === "text") {
                                            lang = "auto";
                                            o.la.selectedIndex = 0;
                                        }
                                        if (lang === "text" || lang === "csv") {
                                            o.bops.style.display = "none";
                                        } else {
                                            o.bops.style.display = "block";
                                        }
                                    } else if (o.dd && (mode === "diff" || mode === "" || !d[1] || d[1] === "diff" || d[1] === "")) {
                                        m = o.la.getElementsByTagName("option");
                                        for (l = m.length - 1; l > -1; l -= 1) {
                                            m[l].disabled = false;
                                        }
                                        o.dd.checked = true;
                                        o.bx.setAttribute("name", "paste_code");
                                        o.mx.removeAttribute("name");
                                        o.bd.style.display = "none";
                                        o.md.style.display = "none";
                                        o.bt.style.display = "block";
                                        o.nt.style.display = "block";
                                        o.dops.style.display = "block";
                                        o.bops.style.display = "none";
                                        o.mops.style.display = "none";
                                        if (lang === "text" || lang === "csv") {
                                            o.db.style.display = "none";
                                        } else {
                                            o.db.style.display = "block";
                                        }
                                    }
                                } else if (d[0] === "api.lang") {
                                    o.la.selectedIndex = d[1];
                                    lang = o.la[o.la.selectedIndex].value;
                                    if (lang === "csv" || (o.dd.checked && lang === "text")) {
                                        o.db.style.display = "none";
                                        o.bops.style.display = "none";
                                        o.mops.style.display = "none";
                                        if (o.dops && o.dd.checked) {
                                            o.dops.style.display = "block";
                                        }
                                    }
                                    if (lang === "html") {
                                        o.hd.checked = true;
                                        o.hm.checked = true;
                                        o.hy.checked = true;
                                    } else {
                                        o.he.checked = true;
                                        o.hn.checked = true;
                                        o.hz.checked = true;
                                    }
                                } else if (d[0] === "api.csvchar") {
                                    o.ch.value = d[1];
                                } else if (d[0] === "api.insize") {
                                    o.bq.value = d[1];
                                    if (o.dq) {
                                        o.dq.value = d[1];
                                    }
                                } else if (d[0] === "api.inchar") {
                                    if (d[1] === " ") {
                                        if (o.ds) {
                                            o.ds.checked = true;
                                        }
                                        if (o.dc) {
                                            o.dc.value = "Click me for custom input";
                                            o.dc.className = "unchecked";
                                        }
                                        o.bs.checked = true;
                                        o.bc.value = "Click me for custom input";
                                        o.bc.className = "unchecked";
                                    } else if (d[1] === "\\t") {
                                        if (o.da) {
                                            o.da.checked = true;
                                        }
                                        if (o.dc) {
                                            o.dc.value = "Click me for custom input";
                                            o.dc.className = "unchecked";
                                        }
                                        o.ba.checked = true;
                                        o.bc.value = "Click me for custom input";
                                        o.bc.className = "unchecked";
                                    } else if (d[1] === "\\n") {
                                        if (o.dz) {
                                            o.dz.checked = true;
                                        }
                                        if (o.dc) {
                                            o.dc.value = "Click me for custom input";
                                            o.dc.className = "unchecked";
                                        }
                                        o.bn.checked = true;
                                        o.bc.value = "Click me for custom input";
                                        o.bc.className = "unchecked";
                                    } else {
                                        if (o.dw) {
                                            o.dw.checked = true;
                                        }
                                        if (o.dc) {
                                            o.dc.value = d[1];
                                            o.dc.className = "checked";
                                        }
                                        o.bw.checked = true;
                                        o.bc.value = d[1];
                                        o.bc.className = "checked";
                                    }
                                } else if (d[0] === "api.comments" && d[1] === "noindent") {
                                    o.iz.checked = true;
                                } else if (d[0] === "api.indent" && d[1] === "allman") {
                                    o.jd.checked = true;
                                    o.js.checked = true;
                                } else if (d[0] === "api.style" && d[1] === "noindent") {
                                    o.ie.checked = true;
                                    o.it.checked = true;
                                } else if (d[0] === "api.html" && d[1] === "html-yes") {
                                    o.hd.checked = true;
                                    o.hm.checked = true;
                                    o.hy.checked = true;
                                } else if (d[0] === "api.context" && !isNaN(d[1])) {
                                    o.context.value = d[1];
                                } else if (d[0] === "api.content" && d[1] === "true") {
                                    o.du.checked = true;
                                } else if (d[0] === "api.quote" && d[1] === "true") {
                                    o.dy.checked = true;
                                } else if (d[0] === "api.semicolon" && d[1] === "true") {
                                    o.dn.checked = true;
                                } else if (d[0] === "api.diffview" && d[1] === "inline") {
                                    o.inline.checked = true;
                                } else if (d[0] === "api.topcoms" && d[1] === "true") {
                                    o.mc.checked = true;
                                }
                            }
                        }
                    }
                    if (localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
                        a = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");
                        c = a.length;
                        for (b = 0; b < c; b += 1) {
                            d = a[b].split(": ");
                            if (typeof d[1] === "string") {
                                if (d[0] === "colorScheme") {
                                    o.wb.className = d[1];
                                    o.color = d[1];
                                    m = o.cs.getElementsByTagName("option");
                                    g = m.length;
                                    for (l = 0; l < g; l += 1) {
                                        if (m[l].innerHTML.replace(/\s+/g, "").toLowerCase() === d[1]) {
                                            o.cs.selectedIndex = l;
                                            break;
                                        }
                                    }
                                    pd.colorScheme(o.cs);
                                } else if (d[0] === "showhide" && d[1] === "hide") {
                                    pd.hideOptions(o.sh);
                                } else if (d[0] === "additional" && d[1] === "yes" && lang !== "csv") {
                                    o.ao.style.display = "block";
                                    o.ay.checked = true;
                                } else if (o.dp && d[0] === "display" && d[1] === "horizontal") {
                                    o.dp.checked = true;
                                    o.bt.className = "wide";
                                    o.nt.className = "wide";
                                    o.bd.className = "wide";
                                    o.md.className = "wide";
                                } else if (d[0] === "diffsave" && d[1] === "true") {
                                    o.ps.checked = true;
                                    i = o.re.getElementsByTagName("button")[0];
                                    i.innerHTML = "H";
                                    i.setAttribute("title", "Convert diff report to text that can be saved.");
                                } else if (d[0] === "api.force_indent" && d[1] === "true") {
                                    o.bg.checked = true;
                                    o.dg.checked = true;
                                } else if (d[0].indexOf("report") === 4) {
                                    if (d[0].indexOf("diff") === 0) {
                                        dm = true;
                                        if (d[0] === "diffreportleft") {
                                            o.re.style.left = (d[1] / 10) + "em";
                                            pd.position.diffreport.left = (d[1] / 10);
                                        } else if (d[0] === "diffreporttop") {
                                            o.re.style.top = (d[1] / 10) + "em";
                                            pd.position.diffreport.top = (d[1] / 10);
                                        } else if (d[0] === "diffreportwidth") {
                                            o.rf.style.width = d[1] + "em";
                                            pd.position.diffreport.width = d[1];
                                            o.re.getElementsByTagName("h3")[0].style.width = (d[1] - 9.76) + "em";
                                        } else if (d[0] === "diffreportheight") {
                                            o.rf.style.height = d[1] + "em";
                                            pd.position.diffreport.height = d[1];
                                        } else if (d[0] === "diffreportmin" && d[1] === "1") {
                                            dma = false;
                                        } else if (d[0] === "diffreportzindex") {
                                            o.re.style.zIndex = d[1];
                                            pd.position.diffreport.zindex = d[1];
                                        }
                                    } else if (d[0].indexOf("beau") === 0) {
                                        bm = true;
                                        if (d[0] === "beaureportleft") {
                                            o.rg.style.left = (d[1] / 10) + "em";
                                            pd.position.beaureport.left = (d[1] / 10);
                                        } else if (d[0] === "beaureporttop") {
                                            o.rg.style.top = (d[1] / 10) + "em";
                                            pd.position.beaureport.top = (d[1] / 10);
                                        } else if (d[0] === "beaureportwidth") {
                                            o.rh.style.width = d[1] + "em";
                                            pd.position.beaureport.width = d[1];
                                            o.rg.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                        } else if (d[0] === "beaureportheight") {
                                            o.rh.style.height = d[1] + "em";
                                            pd.position.beaureport.height = d[1];
                                        } else if (d[0] === "beaureportmin" && d[1] === "1") {
                                            bma = false;
                                        } else if (d[0] === "beaureportzindex") {
                                            o.rg.style.zIndex = d[1];
                                            pd.position.beaureport.zindex = d[1];
                                        }
                                    } else if (d[0].indexOf("minn") === 0) {
                                        mm = true;
                                        if (d[0] === "minnreportleft") {
                                            o.ri.style.left = (d[1] / 10) + "em";
                                            pd.position.minreport.left = (d[1] / 10);
                                        } else if (d[0] === "minnreporttop") {
                                            o.ri.style.top = (d[1] / 10) + "em";
                                            pd.position.minreport.top = (d[1] / 10);
                                        } else if (d[0] === "minnreportwidth") {
                                            o.rj.style.width = d[1] + "em";
                                            pd.position.minreport.width = d[1];
                                            o.ri.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                        } else if (d[0] === "minnreportheight") {
                                            o.rj.style.height = d[1] + "em";
                                            pd.position.minreport.height = d[1];
                                        } else if (d[0] === "minnreportmin" && d[1] === "1") {
                                            mma = false;
                                        } else if (d[0] === "minnreportzindex") {
                                            o.ri.style.zIndex = d[1];
                                            pd.position.minreport.zindex = d[1];
                                        }
                                    } else if (d[0].indexOf("stat") === 0) {
                                        sm = true;
                                        if (d[0] === "statreportleft") {
                                            o.rk.style.left = (d[1] / 10) + "em";
                                            pd.position.statreport.left = (d[1] / 10);
                                        } else if (d[0] === "statreporttop") {
                                            o.rk.style.top = (d[1] / 10) + "em";
                                            pd.position.statreport.top = (d[1] / 10);
                                        } else if (d[0] === "statreportwidth") {
                                            o.rl.style.width = d[1] + "em";
                                            pd.position.statreport.width = d[1];
                                            o.rk.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                        } else if (d[0] === "statreportheight") {
                                            o.rl.style.height = d[1] + "em";
                                            pd.position.statreport.height = d[1];
                                        } else if (d[0] === "statreportmin" && d[1] === "1") {
                                            sma = false;
                                        } else if (d[0] === "statreportzindex") {
                                            o.rk.style.zIndex = d[1];
                                            pd.position.statreport.zindex = d[1];
                                        }
                                    }
                                }
                            }
                        }
                        if (dm && dma) {
                            o.re.style.right = "auto";
                            o.re.style.borderWidth = "0.1em";
                            o.re.getElementsByTagName("p")[0].style.display = "block";
                            o.re.getElementsByTagName("p")[0].getElementsByTagName("button")[1].innerHTML = "\u035f";
                            o.rf.style.display = "block";
                        } else if (dm) {
                            o.re.getElementsByTagName("p")[0].style.display = "none";
                            o.re.getElementsByTagName("h3")[0].style.width = "17em";
                            o.re.style.left = "auto";
                            o.re.style.top = "auto";
                            o.re.style.borderWidth = "0em";
                            o.rf.style.display = "none";
                        }
                        if (bm && bma) {
                            o.rg.style.right = "auto";
                            o.rg.style.borderWidth = "0.1em";
                            o.rg.getElementsByTagName("p")[0].style.display = "block";
                            o.rg.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                            o.rh.style.display = "block";
                        } else if (bm) {
                            o.rg.getElementsByTagName("p")[0].style.display = "none";
                            o.rg.getElementsByTagName("h3")[0].style.width = "17em";
                            o.rg.style.left = "auto";
                            o.rg.style.top = "auto";
                            o.rg.style.borderWidth = "0em";
                            o.rh.style.display = "none";
                        }
                        if (mm && mma) {
                            o.ri.style.right = "auto";
                            o.ri.style.borderWidth = "0.1em";
                            o.ri.getElementsByTagName("p")[0].style.display = "block";
                            o.ri.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                            o.rj.style.display = "block";
                        } else if (mm) {
                            o.ri.getElementsByTagName("p")[0].style.display = "none";
                            o.ri.getElementsByTagName("h3")[0].style.width = "17em";
                            o.ri.style.left = "auto";
                            o.ri.style.top = "auto";
                            o.ri.style.borderWidth = "0em";
                            o.rj.style.display = "none";
                        }
                        if (sm && sma) {
                            o.rk.style.right = "auto";
                            o.rk.style.borderWidth = "0.1em";
                            o.rk.getElementsByTagName("p")[0].style.display = "block";
                            o.rk.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                            o.rl.style.display = "block";
                        } else if (sm) {
                            o.rk.getElementsByTagName("p")[0].style.display = "none";
                            o.rk.getElementsByTagName("h3")[0].style.width = "17em";
                            o.rk.style.left = "auto";
                            o.rk.style.top = "auto";
                            o.rk.style.borderWidth = "0em";
                            o.rl.style.display = "none";
                        }
                    }
                    if (localStorage.hasOwnProperty("statdata") && localStorage.getItem("statdata") !== null) {
                        stat = localStorage.getItem("statdata").split("|");
                        o.stat.visit = Number(stat[0]) + 1;
                        stat[0] = o.stat.visit.toString();
                        o.stvisit.innerHTML = stat[0];
                        i = new Date();
                        if (stat[2] === "") {
                            stat[2] = i.toDateString();
                        }
                        k = (Date.parse(i) - Date.parse(stat[2]));
                        if (k < 86400000) {
                            k = 1;
                        } else {
                            k = Number((k / 86400000).toFixed(0));
                        }
                        stat[3] = (o.stat.visit / k).toFixed(2);
                        o.stat.avday = stat[3];
                        localStorage.setItem("statdata", stat.join("|"));
                        o.stat.usage = Number(stat[1]);
                        o.stat.fdate = stat[2];
                        o.stat.diff = Number(stat[4]);
                        o.stat.beau = Number(stat[5]);
                        o.stat.minn = Number(stat[6]);
                        o.stat.markup = Number(stat[7]);
                        o.stat.js = Number(stat[8]);
                        o.stat.css = Number(stat[9]);
                        o.stat.csv = Number(stat[10]);
                        o.stat.text = Number(stat[11]);
                        o.stat.pdate = k;
                        o.stat.large = Number(stat[13]);
                        o.stusage.innerHTML = stat[1];
                        o.stfdate.innerHTML = stat[2];
                        o.stavday.innerHTML = stat[3];
                        o.stdiff.innerHTML = stat[4];
                        o.stbeau.innerHTML = stat[5];
                        o.stminn.innerHTML = stat[6];
                        o.stmarkup.innerHTML = stat[7];
                        o.stjs.innerHTML = stat[8];
                        o.stcss.innerHTML = stat[9];
                        o.stcsv.innerHTML = stat[10];
                        o.sttext.innerHTML = stat[11];
                        o.stlarge.innerHTML = stat[12];
                    } else {
                        k = j.toLocaleDateString();
                        o.stfdate.innerHTML = k;
                        o.stat.fdate = k;
                        stat = [1, 0, k, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        if (localStorage.hasOwnProperty("pageCount") && localStorage.getItem("pageCount") !== null) {
                            l = Number(localStorage.getItem("pageCount")) + 1;
                            o.stvisit.innerHTML = l;
                            o.stat.visit = l;
                            stat[0] = l;
                        } else {
                            o.stat.visit = 1;
                        }
                        o.stat.usage = 0;
                        o.stat.avday = 1;
                        o.stat.diff = 0;
                        o.stat.beau = 0;
                        o.stat.minn = 0;
                        o.stat.markup = 0;
                        o.stat.js = 0;
                        o.stat.css = 0;
                        o.stat.csv = 0;
                        o.stat.text = 0;
                        o.stat.large = 0;
                        localStorage.setItem("statdata", stat.join("|"));
                    }
                    if (lang === "csv") {
                        o.csvp.style.display = "block";
                    }
                    if (lang === "text" || lang === "csv") {
                        o.db.style.display = "none";
                    }
                } else {
                    o.bb = $$("modebeautify");
                    o.dd = $$("modediff");
                    o.mm = $$("modeminify");
                    o.la = $$("language");
                    lang = o.la[o.la.selectedIndex].value;
                    if (!ls) {
                        o.rk.style.display = "none";
                    }
                    if (lang === "csv") {
                        o.csvp.style.display = "block";
                    }
                    if (o.mm.checked) {
                        o.mx.setAttribute("name", "paste_code");
                        o.bx.removeAttribute("name");
                        o.bd.style.display = "none";
                        o.md.style.display = "block";
                        if (o.bt) {
                            o.bt.style.display = "none";
                        }
                        if (o.nt) {
                            o.nt.style.display = "none";
                        }
                        if (o.dops) {
                            o.dops.style.display = "none";
                        }
                        o.bops.style.display = "none";
                        if (lang === "text" || lang === "csv") {
                            o.mops.style.display = "none";
                        } else {
                            o.mops.style.display = "block";
                        }
                    } else if (o.dd && o.dd.checked) {
                        m = o.la.getElementsByTagName("option");
                        for (l = m.length - 1; l > -1; l -= 1) {
                            m[l].disabled = false;
                        }
                        o.bd.style.display = "none";
                        o.md.style.display = "none";
                        o.bt.style.display = "block";
                        o.nt.style.display = "block";
                        o.dops.style.display = "block";
                        o.bops.style.display = "none";
                        o.mops.style.display = "none";
                        if (lang === "text" || lang === "csv") {
                            o.db.style.display = "none";
                        } else {
                            o.db.style.display = "block";
                        }
                    } else if (o.bb.checked) {
                        if (o.dops) {
                            o.dops.style.display = "none";
                        }
                        o.mops.style.display = "none";
                        o.bd.style.display = "block";
                        o.md.style.display = "none";
                        if (o.bt) {
                            o.bt.style.display = "none";
                        }
                        if (o.nt) {
                            o.nt.style.display = "none";
                        }
                        if (lang === "text" || lang === "csv") {
                            o.db.style.display = "none";
                        } else {
                            o.db.style.display = "block";
                        }
                    }
                    if (o.dt && o.dt.checked) {
                        o.bt.className = "difftall";
                        o.nt.className = "difftall";
                        o.bd.className = "tall";
                        o.md.className = "tall";
                    }
                    if (o.bw.checked) {
                        o.bc.style.background = "#eef8ff";
                        o.bc.style.color = "#000";
                    }
                    if (o.dw && o.dw.checked) {
                        o.dc.style.background = "#eef8ff";
                        o.dc.style.color = "#000";
                    }
                }
                if (location && location.href && location.href.indexOf("?") !== -1) {
                    d = location.href.split("?")[1].split("&");
                    c = d.length;
                    for (b = 0; b < c; b += 1) {
                        if (d[b].indexOf("m=") === 0) {
                            f = d[b].toLowerCase().substr(2);
                            if (f === "beautify") {
                                o.bb.click();
                            } else if (f === "minify") {
                                o.mm.click();
                            } else if (o.dd && f === "diff") {
                                o.dd.click();
                            }
                        } else if (d[b].indexOf("s=") === 0) {
                            source = d[b].substr(2);
                            o.bi.value = source;
                            o.mi.value = source;
                            if (o.bo) {
                                o.bo.value = source;
                            }
                        } else if (d[b].indexOf("d=") === 0) {
                            diff = d[b].substr(2);
                            o.nx.value = diff;
                        } else if (d[b].toLowerCase() === "html") {
                            html = true;
                        } else if (d[b].indexOf("l=") === 0) {
                            f = d[b].toLowerCase().substr(2);
                            if (f === "auto") {
                                pd.codeOps();
                                lang = "auto";
                            } else if (f === "javascript" || f === "js" || f === "json") {
                                pd.codeOps();
                                lang = "javascript";
                                f = lang;
                            } else if (f === "html") {
                                pd.codeOps();
                                o.hd.checked = true;
                                o.hm.checked = true;
                                o.hy.checked = true;
                                lang = "markup";
                                f = lang;
                            } else if (f === "markup" || f === "xml" || f === "sgml" || f === "jstl") {
                                pd.codeOps();
                                o.he.checked = true;
                                o.hn.checked = true;
                                o.hz.checked = true;
                                lang = "markup";
                            } else if (f === "css" || f === "scss") {
                                pd.codeOps();
                                lang = "css";
                            } else if (f === "csv") {
                                pd.codeOps();
                                lang = "csv";
                            } else if (f === "text") {
                                o.dd.click();
                                lang = "text";
                            } else {
                                lang = "javascript";
                            }
                            m = o.la.getElementsByTagName("option");
                            for (l = m.length - 1; m > -1; m -= 1) {
                                if (f === "text") {
                                    m[l].disabled = false;
                                }
                                if (m[l].value === f) {
                                    o.la.selectedIndex = l;
                                }
                            }
                        } else if (d[b].indexOf("c=") === 0) {
                            f = d[b].toLowerCase().substr(2);
                            a = o.cs.getElementsByTagName("option");
                            for (g = a.length - 1; g > -1; g -= 1) {
                                h = a[g].innerHTML.toLowerCase().replace(/\s+/g, "");
                                if (f === h) {
                                    o.cs.selectedIndex = g;
                                    o.wb.className = h;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (o.bc.value !== "" && o.bc.value !== "Click me for custom input") {
                    o.bcv = o.bc.value;
                }
                if (o.dc && o.dc.value !== "" && o.dc.value !== "Click me for custom input") {
                    o.dcv = o.dc.value;
                }
                if (html) {
                    o.hd.checked = true;
                    o.hm.checked = true;
                    o.hy.checked = true;
                }
                if (source !== true && (o.bb.checked || o.mm.checked || (o.dd.checked && diff !== true))) {
                    recycle();
                    return;
                }
                if (ls) {
                    if (localStorage.hasOwnProperty("bi") && localStorage.getItem("bi") !== null) {
                        o.bi.value = localStorage.getItem("bi");
                    }
                    if (localStorage.hasOwnProperty("mi") && localStorage.getItem("mi") !== null) {
                        o.mi.value = localStorage.getItem("mi");
                    }
                    if (o.bo && localStorage.hasOwnProperty("bo") && localStorage.getItem("bo") !== null) {
                        o.bo.value = localStorage.getItem("bo");
                    }
                    if (o.nx && localStorage.hasOwnProperty("nx") && localStorage.getItem("nx") !== null) {
                        o.nx.value = localStorage.getItem("nx");
                    }
                    if (o.bl && localStorage.hasOwnProperty("bl") && localStorage.getItem("bl") !== null) {
                        o.bl.value = localStorage.getItem("bl");
                    }
                    if (o.nl && localStorage.hasOwnProperty("nl") && localStorage.getItem("ni") !== null) {
                        o.nl.value = localStorage.getItem("nl");
                    }
                }
                pd.fixminreport();
                if (typeof window.onresize === "object" || typeof window.onresize === "function") {
                    window.onresize = pd.fixminreport;
                }
            } else if (ls && localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
                a = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");
                c = a.length;
                for (b = 0; b < c; b += 1) {
                    d = a[b].split(": ");
                    if (typeof d[1] === "string") {
                        if (d[0] === "colorScheme") {
                            o.wb.className = d[1];
                            o.color = d[1];
                            m = o.cs.getElementsByTagName("option");
                            g = m.length;
                            for (l = 0; l < g; l += 1) {
                                if (m[l].innerHTML.replace(/\s+/g, "").toLowerCase() === d[1]) {
                                    o.cs.selectedIndex = l;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}());
if (!(/^(file:\/\/)/).test(location.href)) {
    _gaq.push(["_setAccount", "UA-27834630-1"]);
    _gaq.push(["_trackPageview"]);
    if (bounce) {
        o.wb.onclick = function () {
            "use strict";
            _gaq.push(["_trackEvent", "Logging", "NoBounce", "NoBounce", null, false]);
        };
        bounce = false;
    }
    (function () {
        "use strict";
        var ga = document.createElement("script"),
            s = document.getElementsByTagName("script")[0];
        ga.setAttribute("type", s.getAttribute("type"));
        ga.setAttribute("async", true);
        ga.setAttribute("src", ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js");
        s.parentNode.insertBefore(ga, s);
        window.onerror = function (message, file, line) {
            var mode = (function () {
                    if ($$("modebeautify").checked) {
                        return "beautify";
                    }
                    if ($$("modeminify").checked) {
                        return "minify";
                    }
                    return "diff";
                }()),
                sFormattedMessage = "";
            if (message === "prettydiff is not defined" && ls) {
                if (mode === "minify") {
                    localStorage.setItem("mi", "");
                } else if (mode === "beautify") {
                    localStorage.setItem("bi", "");
                } else {
                    localStorage.setItem("bo", "");
                    localStorage.setItem("nx", "");
                }
            }
            if (line > 0) {
                sFormattedMessage = "[" + file + " (" + line + ")] " + message + " " + mode + " " + o.la[o.la.selectedIndex].value;
                _gaq.push(["_trackEvent", "Exceptions", "Application", sFormattedMessage, null, true]);
            }
        };
    }());
}