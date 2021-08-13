define(function () { 'use strict';

    const gcd = (a, b) => {
        a = Math.round(a);
        b = Math.round(b);
        return (b == 0) ? a : gcd(b, a % b);
    };
     const getScreenWidth = () => {
        return screen.width;
    };
    const getScreenHeight = () => {
        return screen.height;
    };
    const getOrientation = () => {
        return getScreenWidth() >= getScreenHeight() ? 'Landscape' : 'Portrait';
    };
    const getAspectRatio = () => {
        const aspectRatio = gcd(getScreenWidth(), getScreenHeight());
        return `${getScreenWidth() / aspectRatio}:${getScreenHeight() / aspectRatio}`;
    };
    var screen$1 = {
        getScreenWidth,
        getScreenHeight,
        getOrientation,
        getAspectRatio
    };

    const getSetup = () => {
        document.querySelector('.test-runner-scope');
        const release = (() => {
            return document.querySelector('.tao-version').textContent;
        })();
        const testRunner = (() => {
            const itemElem = document.querySelector('.qti-item');
            if(!itemElem){
                return 'Non-TAO'
            }
            const classes = Array.from(itemElem.classList);
            if(classes.some(entry => entry.startsWith('svelte'))) {
                return 'Solar';
            }
            if(classes.some(entry => entry.startsWith('tao-scope'))) {
                return 'Terre';
            }
            return 'Non-TAO'
        })();
        return {
            release,
            testRunner
        }
    };
    var tao = {
        getSetup
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var uaParser$1 = {exports: {}};

    /*!@license
     * UAParser.js v0.7.28
     * Lightweight JavaScript-based User-Agent string parser
     * https://github.com/faisalman/ua-parser-js
     *
     * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
     * Licensed under MIT License
     */
    (function (module, exports) {
    (function (window, undefined$1) {
        var LIBVERSION  = '0.7.28',
            EMPTY       = '',
            UNKNOWN     = '?',
            FUNC_TYPE   = 'function',
            UNDEF_TYPE  = 'undefined',
            OBJ_TYPE    = 'object',
            STR_TYPE    = 'string',
            MAJOR       = 'major',
            MODEL       = 'model',
            NAME        = 'name',
            TYPE        = 'type',
            VENDOR      = 'vendor',
            VERSION     = 'version',
            ARCHITECTURE= 'architecture',
            CONSOLE     = 'console',
            MOBILE      = 'mobile',
            TABLET      = 'tablet',
            SMARTTV     = 'smarttv',
            WEARABLE    = 'wearable',
            EMBEDDED    = 'embedded',
            UA_MAX_LENGTH = 255;
        var util = {
            extend : function (regexes, extensions) {
                var mergedRegexes = {};
                for (var i in regexes) {
                    if (extensions[i] && extensions[i].length % 2 === 0) {
                        mergedRegexes[i] = extensions[i].concat(regexes[i]);
                    } else {
                        mergedRegexes[i] = regexes[i];
                    }
                }
                return mergedRegexes;
            },
            has : function (str1, str2) {
                return typeof str1 === STR_TYPE ? str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1 : false;
            },
            lowerize : function (str) {
                return str.toLowerCase();
            },
            major : function (version) {
                return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined$1;
            },
            trim : function (str, len) {
                str = str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
        };
        var mapper = {
            rgx : function (ua, arrays) {
                var i = 0, j, k, p, q, matches, match;
                while (i < arrays.length && !matches) {
                    var regex = arrays[i],
                        props = arrays[i + 1];
                    j = k = 0;
                    while (j < regex.length && !matches) {
                        matches = regex[j++].exec(ua);
                        if (!!matches) {
                            for (p = 0; p < props.length; p++) {
                                match = matches[++k];
                                q = props[p];
                                if (typeof q === OBJ_TYPE && q.length > 0) {
                                    if (q.length == 2) {
                                        if (typeof q[1] == FUNC_TYPE) {
                                            this[q[0]] = q[1].call(this, match);
                                        } else {
                                            this[q[0]] = q[1];
                                        }
                                    } else if (q.length == 3) {
                                        if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                            this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                                        } else {
                                            this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                                        }
                                    } else if (q.length == 4) {
                                            this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                                    }
                                } else {
                                    this[q] = match ? match : undefined$1;
                                }
                            }
                        }
                    }
                    i += 2;
                }
            },
            str : function (str, map) {
                for (var i in map) {
                    if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                        for (var j = 0; j < map[i].length; j++) {
                            if (util.has(map[i][j], str)) {
                                return (i === UNKNOWN) ? undefined$1 : i;
                            }
                        }
                    } else if (util.has(map[i], str)) {
                        return (i === UNKNOWN) ? undefined$1 : i;
                    }
                }
                return str;
            }
        };
        var maps = {
            browser : {
                oldSafari : {
                    version : {
                        '1.0'   : '/8',
                        '1.2'   : '/1',
                        '1.3'   : '/3',
                        '2.0'   : '/412',
                        '2.0.2' : '/416',
                        '2.0.3' : '/417',
                        '2.0.4' : '/419',
                        '?'     : '/'
                    }
                },
                oldEdge : {
                    version : {
                        '0.1'   : '12.',
                        '21'    : '13.',
                        '31'    : '14.',
                        '39'    : '15.',
                        '41'    : '16.',
                        '42'    : '17.',
                        '44'    : '18.'
                    }
                }
            },
            os : {
                windows : {
                    version : {
                        'ME'        : '4.90',
                        'NT 3.11'   : 'NT3.51',
                        'NT 4.0'    : 'NT4.0',
                        '2000'      : 'NT 5.0',
                        'XP'        : ['NT 5.1', 'NT 5.2'],
                        'Vista'     : 'NT 6.0',
                        '7'         : 'NT 6.1',
                        '8'         : 'NT 6.2',
                        '8.1'       : 'NT 6.3',
                        '10'        : ['NT 6.4', 'NT 10.0'],
                        'RT'        : 'ARM'
                    }
                }
            }
        };
        var regexes = {
            browser : [[
                /\b(?:crmo|crios)\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Chrome']], [
                /edg(?:e|ios|a)?\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Edge']], [
                /(opera\smini)\/([\w\.-]+)/i,
                /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,
                /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i,
                ], [NAME, VERSION], [
                /opios[\/\s]+([\w\.]+)/i
                ], [VERSION, [NAME, 'Opera Mini']], [
                /\sopr\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Opera']], [
                /(kindle)\/([\w\.]+)/i,
                /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                /(ba?idubrowser)[\/\s]?([\w\.]+)/i,
                /(?:ms|\()(ie)\s([\w\.]+)/i,
                /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,
                /(weibo)__([\d\.]+)/i
                ], [NAME, VERSION], [
                /(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                ], [VERSION, [NAME, 'UCBrowser']], [
                /(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i
                ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
                /micromessenger\/([\w\.]+)/i
                ], [VERSION, [NAME, 'WeChat']], [
                /konqueror\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Konqueror']], [
                /trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i
                ], [VERSION, [NAME, 'IE']], [
                /yabrowser\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Yandex']], [
                /(avast|avg)\/([\w\.]+)/i
                ], [[NAME, /(.+)/, '$1 Secure Browser'], VERSION], [
                /focus\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Firefox Focus']], [
                /opt\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Opera Touch']], [
                /coc_coc_browser\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Coc Coc']], [
                /dolfin\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Dolphin']], [
                /coast\/([\w\.]+)/i
                ], [VERSION, [NAME, 'Opera Coast']],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i
                ], [VERSION, [NAME, 'MIUI Browser']], [
                /fxios\/([\w\.-]+)/i
                ], [VERSION, [NAME, 'Firefox']], [
                /(qihu|qhbrowser|qihoobrowser|360browser)/i
                ], [[NAME, '360 Browser']], [
                /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
                ], [[NAME, /(.+)/, '$1 Browser'], VERSION], [
                /(comodo_dragon)\/([\w\.]+)/i
                ], [[NAME, /_/g, ' '], VERSION], [
                /\s(electron)\/([\w\.]+)\ssafari/i,
                /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,
                /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i
                ], [NAME, VERSION], [
                /(MetaSr)[\/\s]?([\w\.]+)/i,
                /(LBBROWSER)/i
                ], [NAME], [
                /;fbav\/([\w\.]+);/i
                ], [VERSION, [NAME, 'Facebook']], [
                /FBAN\/FBIOS|FB_IAB\/FB4A/i
                ], [[NAME, 'Facebook']], [
                /safari\s(line)\/([\w\.]+)/i,
                /\b(line)\/([\w\.]+)\/iab/i,
                /(chromium|instagram)[\/\s]([\w\.-]+)/i
                ], [NAME, VERSION], [
                /\bgsa\/([\w\.]+)\s.*safari\//i
                ], [VERSION, [NAME, 'GSA']], [
                /headlesschrome(?:\/([\w\.]+)|\s)/i
                ], [VERSION, [NAME, 'Chrome Headless']], [
                /\swv\).+(chrome)\/([\w\.]+)/i
                ], [[NAME, 'Chrome WebView'], VERSION], [
                /droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i
                ], [VERSION, [NAME, 'Android Browser']], [
                /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                ], [NAME, VERSION], [
                /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i
                ], [VERSION, [NAME, 'Mobile Safari']], [
                /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i
                ], [VERSION, NAME], [
                /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i
                ], [NAME, [VERSION, mapper.str, maps.browser.oldSafari.version]], [
                /(webkit|khtml)\/([\w\.]+)/i
                ], [NAME, VERSION], [
                /(navigator|netscape)\/([\w\.-]+)/i
                ], [[NAME, 'Netscape'], VERSION], [
                /ile\svr;\srv:([\w\.]+)\).+firefox/i
                ], [VERSION, [NAME, 'Firefox Reality']], [
                /ekiohf.+(flow)\/([\w\.]+)/i,
                /(swiftfox)/i,
                /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,
                /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,
                /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                /(links)\s\(([\w\.]+)/i,
                /(gobrowser)\/?([\w\.]*)/i,
                /(ice\s?browser)\/v?([\w\._]+)/i,
                /(mosaic)[\/\s]([\w\.]+)/i
                ], [NAME, VERSION]
            ],
            cpu : [[
                /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i
                ], [[ARCHITECTURE, 'amd64']], [
                /(ia32(?=;))/i
                ], [[ARCHITECTURE, util.lowerize]], [
                /((?:i[346]|x)86)[;\)]/i
                ], [[ARCHITECTURE, 'ia32']], [
                /\b(aarch64|armv?8e?l?)\b/i
                ], [[ARCHITECTURE, 'arm64']], [
                /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                ], [[ARCHITECTURE, 'armhf']], [
                /windows\s(ce|mobile);\sppc;/i
                ], [[ARCHITECTURE, 'arm']], [
                /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i
                ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [
                /(sun4\w)[;\)]/i
                ], [[ARCHITECTURE, 'sparc']], [
                /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                ], [[ARCHITECTURE, util.lowerize]]
            ],
            device : [[
                /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i
                ], [MODEL, [VENDOR, 'Samsung'], [TYPE, TABLET]], [
                /\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,
                /\ssamsung[\s-]([\w-]+)/i,
                /sec-(sgh\w+)/i
                ], [MODEL, [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                /\((ip(?:hone|od)[\s\w]*);/i
                ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [
                /\((ipad);[\w\s\),;-]+apple/i,
                /applecoremedia\/[\w\.]+\s\((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [
                /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i,
                ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [
                /d\/huawei([\w\s-]+)[;\)]/i,
                /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
                /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
                ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [
                /\b(poco[\s\w]+)(?:\sbuild|\))/i,
                /\b;\s(\w+)\sbuild\/hm\1/i,
                /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,
                /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,
                /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i
                ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
                /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i
                ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
                /;\s(\w+)\sbuild.+\soppo/i,
                /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
                ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
                /\svivo\s(\w+)(?:\sbuild|\))/i,
                /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i
                ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [
                /\s(rmx[12]\d{3})(?:\sbuild|;)/i
                ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [
                /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,
                /\smot(?:orola)?[\s-](\w*)/i,
                /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i
                ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
                /\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
                ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [
                /((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
                ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
                /(lm-?f100[nv]?|nexus\s[45])/i,
                /lg[e;\s\/-]+((?!browser|netcast)\w+)/i,
                /\blg(\-?[\d\w]+)\sbuild/i
                ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [
                /(ideatab[\w\-\s]+)/i,
                /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i
                ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
                /(?:maemo|nokia).*(n900|lumia\s\d+)/i,
                /nokia[\s_-]?([\w\.-]*)/i
                ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [
                /droid.+;\s(pixel\sc)[\s)]/i
                ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [
                /droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i
                ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [
                /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [
                /sony\stablet\s[ps]\sbuild\//i,
                /(?:sony)?sgp\w+(?:\sbuild\/|\))/i
                ], [[MODEL, 'Xperia Tablet'], [VENDOR, 'Sony'], [TYPE, TABLET]], [
                /\s(kb2005|in20[12]5|be20[12][59])\b/i,
                /\ba000(1)\sbuild/i,
                /\boneplus\s(a\d{4})[\s)]/i
                ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [
                /(alexa)webm/i,
                /(kf[a-z]{2}wi)(\sbuild\/|\))/i,
                /(kf[a-z]+)(\sbuild\/|\)).+silk\//i
                ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
                /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i
                ], [[MODEL, 'Fire Phone'], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
                /\((playbook);[\w\s\),;-]+(rim)/i
                ], [MODEL, VENDOR, [TYPE, TABLET]], [
                /((?:bb[a-f]|st[hv])100-\d)/i,
                /\(bb10;\s(\w+)/i
                ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i
                ], [MODEL, [VENDOR, 'ASUS'], [TYPE, TABLET]], [
                /\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i
                ], [MODEL, [VENDOR, 'ASUS'], [TYPE, MOBILE]], [
                /(nexus\s9)/i
                ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
                /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,
                /(zte)-(\w*)/i,
                /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [
                /droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
                ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [
                /droid.+;\s(m[1-5]\snote)\sbuild/i,
                /\bmz-([\w-]{2,})/i
                ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                /(hp)\s([\w\s]+\w)/i,
                /(asus)-?(\w+)/i,
                /(microsoft);\s(lumia[\s\w]+)/i,
                /(lenovo)[_\s-]?([\w-]+)/i,
                /linux;.+(jolla);/i,
                /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i
                ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                /(archos)\s(gamepad2?)/i,
                /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                /(kindle)\/([\w\.]+)/i,
                /\s(nook)[\w\s]+build\/(\w+)/i,
                /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,
                /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,
                /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,
                /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i
                ], [VENDOR, MODEL, [TYPE, TABLET]], [
                /\s(surface\sduo)\s/i
                ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, TABLET]], [
                /droid\s[\d\.]+;\s(fp\du?)\sbuild/i
                ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
                /\s(u304aa)\sbuild/i
                ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
                /sie-(\w*)/i
                ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
                /[;\/]\s?(rct\w+)\sbuild/i
                ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
                /[;\/\s](venue[\d\s]{2,7})\sbuild/i
                ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
                /[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i
                ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
                /[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i
                ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
                /[;\/]\s(tm\d{3}\w+)\sbuild/i
                ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
                /;\s(k88)\sbuild/i
                ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
                /;\s(nx\d{3}j)\sbuild/i
                ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
                /[;\/]\s?(gen\d{3})\sbuild.*49h/i
                ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
                /[;\/]\s?(zur\d{3})\sbuild/i
                ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
                /[;\/]\s?((zeki)?tb.*\b)\sbuild/i
                ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
                /[;\/]\s([yr]\d{2})\sbuild/i,
                /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i
                ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
                /[;\/]\s?(ns-?\w{0,9})\sbuild/i
                ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
                /[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i
                ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
                /[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i
                ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
                /[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i
                ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
                /;\s(ph-1)\s/i
                ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
                /[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i
                ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
                /[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i
                ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
                /[;\/]\s?tu_(1491)\sbuild/i
                ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
                /(shield[\w\s]+)\sbuild/i
                ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
                /(sprint)\s(\w+)/i
                ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                /(kin\.[onetw]{3})/i
                ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [
                /droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, TABLET]], [
                /droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, MOBILE]], [
                /\s(ouya)\s/i,
                /(nintendo)\s([wids3utch]+)/i
                ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
                /droid.+;\s(shield)\sbuild/i
                ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
                /(playstation\s[345portablevi]+)/i
                ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [
                /[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i
                ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
                /smart-tv.+(samsung)/i
                ], [VENDOR, [TYPE, SMARTTV]], [
                /hbbtv.+maple;(\d+)/i
                ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [
                /(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i,
                ], [[VENDOR, 'LG'], [TYPE, SMARTTV]], [
                /(apple)\s?tv/i
                ], [VENDOR, [MODEL, 'Apple TV'], [TYPE, SMARTTV]], [
                /crkey/i
                ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [
                /droid.+aft([\w])(\sbuild\/|\))/i
                ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [
                /\(dtv[\);].+(aquos)/i
                ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
                /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i
                ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [
                /[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i
                ], [[TYPE, SMARTTV]], [
                /((pebble))app\/[\d\.]+\s/i
                ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
                /droid.+;\s(glass)\s\d/i
                ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [
                /droid\s[\d\.]+;\s(wt63?0{2,3})\)/i
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, WEARABLE]], [
                /(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i
                ], [VENDOR, [TYPE, EMBEDDED]], [
                /droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i
                ], [MODEL, [TYPE, MOBILE]], [
                /droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i
                ], [MODEL, [TYPE, TABLET]], [
                /\s(tablet|tab)[;\/]/i,
                /\s(mobile)(?:[;\/]|\ssafari)/i
                ], [[TYPE, util.lowerize]], [
                /(android[\w\.\s\-]{0,9});.+build/i
                ], [MODEL, [VENDOR, 'Generic']], [
                /(phone)/i
                ], [[TYPE, MOBILE]]
            ],
            engine : [[
                /windows.+\sedge\/([\w\.]+)/i
                ], [VERSION, [NAME, 'EdgeHTML']], [
                /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                ], [VERSION, [NAME, 'Blink']], [
                /(presto)\/([\w\.]+)/i,
                /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                /ekioh(flow)\/([\w\.]+)/i,
                /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                /(icab)[\/\s]([23]\.[\d\.]+)/i
                ], [NAME, VERSION], [
                /rv\:([\w\.]{1,9})\b.+(gecko)/i
                ], [VERSION, NAME]
            ],
            os : [[
                /microsoft\s(windows)\s(vista|xp)/i
                ], [NAME, VERSION], [
                /(windows)\snt\s6\.2;\s(arm)/i,
                /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
                /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i
                ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
                /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [
                /ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
                /cfnetwork\/.+darwin/i
                ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
                /(mac\sos\sx)\s?([\w\s\.]*)/i,
                /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i
                ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [
                /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
                /(blackberry)\w*\/([\w\.]*)/i,
                /(tizen|kaios)[\/\s]([\w\.]+)/i,
                /\((series40);/i
                ], [NAME, VERSION], [
                /\(bb(10);/i
                ], [VERSION, [NAME, 'BlackBerry']], [
                /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i
                ], [VERSION, [NAME, 'Symbian']], [
                /mozilla.+\(mobile;.+gecko.+firefox/i
                ], [[NAME, 'Firefox OS']], [
                /web0s;.+rt(tv)/i,
                /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                ], [VERSION, [NAME, 'webOS']], [
                /crkey\/([\d\.]+)/i
                ], [VERSION, [NAME, 'Chromecast']], [
                /(cros)\s[\w]+\s([\w\.]+\w)/i
                ], [[NAME, 'Chromium OS'], VERSION],[
                /(nintendo|playstation)\s([wids345portablevuch]+)/i,
                /(xbox);\s+xbox\s([^\);]+)/i,
                /(mint)[\/\s\(\)]?(\w*)/i,
                /(mageia|vectorlinux)[;\s]/i,
                /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
                /(hurd|linux)\s?([\w\.]*)/i,
                /(gnu)\s?([\w\.]*)/i,
                /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                /(haiku)\s(\w+)/i
                ], [NAME, VERSION], [
                /(sunos)\s?([\w\.\d]*)/i
                ], [[NAME, 'Solaris'], VERSION], [
                /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
                /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
                /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                /(unix)\s?([\w\.]*)/i
                ], [NAME, VERSION]
            ]
        };
        var UAParser = function (ua, extensions) {
            if (typeof ua === 'object') {
                extensions = ua;
                ua = undefined$1;
            }
            if (!(this instanceof UAParser)) {
                return new UAParser(ua, extensions).getResult();
            }
            var _ua = ua || ((typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
            var _rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
            this.getBrowser = function () {
                var _browser = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_browser, _ua, _rgxmap.browser);
                _browser.major = util.major(_browser.version);
                return _browser;
            };
            this.getCPU = function () {
                var _cpu = { architecture: undefined$1 };
                mapper.rgx.call(_cpu, _ua, _rgxmap.cpu);
                return _cpu;
            };
            this.getDevice = function () {
                var _device = { vendor: undefined$1, model: undefined$1, type: undefined$1 };
                mapper.rgx.call(_device, _ua, _rgxmap.device);
                return _device;
            };
            this.getEngine = function () {
                var _engine = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_engine, _ua, _rgxmap.engine);
                return _engine;
            };
            this.getOS = function () {
                var _os = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_os, _ua, _rgxmap.os);
                return _os;
            };
            this.getResult = function () {
                return {
                    ua      : this.getUA(),
                    browser : this.getBrowser(),
                    engine  : this.getEngine(),
                    os      : this.getOS(),
                    device  : this.getDevice(),
                    cpu     : this.getCPU()
                };
            };
            this.getUA = function () {
                return _ua;
            };
            this.setUA = function (ua) {
                _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? util.trim(ua, UA_MAX_LENGTH) : ua;
                return this;
            };
            this.setUA(_ua);
            return this;
        };
        UAParser.VERSION = LIBVERSION;
        UAParser.BROWSER = {
            NAME    : NAME,
            MAJOR   : MAJOR,
            VERSION : VERSION
        };
        UAParser.CPU = {
            ARCHITECTURE : ARCHITECTURE
        };
        UAParser.DEVICE = {
            MODEL   : MODEL,
            VENDOR  : VENDOR,
            TYPE    : TYPE,
            CONSOLE : CONSOLE,
            MOBILE  : MOBILE,
            SMARTTV : SMARTTV,
            TABLET  : TABLET,
            WEARABLE: WEARABLE,
            EMBEDDED: EMBEDDED
        };
        UAParser.ENGINE = {
            NAME    : NAME,
            VERSION : VERSION
        };
        UAParser.OS = {
            NAME    : NAME,
            VERSION : VERSION
        };
        {
            if (module.exports) {
                exports = module.exports = UAParser;
            }
            exports.UAParser = UAParser;
        }
        var $ = typeof window !== 'undefined' && (window.jQuery || window.Zepto);
        if ($ && !$.ua) {
            var parser = new UAParser();
            $.ua = parser.getResult();
            $.ua.get = function () {
                return parser.getUA();
            };
            $.ua.set = function (uastring) {
                parser.setUA(uastring);
                var result = parser.getResult();
                for (var prop in result) {
                    $.ua[prop] = result[prop];
                }
            };
        }
    })(typeof window === 'object' ? window : commonjsGlobal);
    }(uaParser$1, uaParser$1.exports));
    var uaParser = uaParser$1.exports;

    const getEnv = () => {
        const uaData = uaParser(navigator.userAgent);
        Object.keys(uaData.device).map(key => {
            uaData.device[key] = uaData.device[key] || '';
        });
        return {
            ...{
                screen: {
                    width: screen$1.getScreenWidth(),
                    height: screen$1.getScreenHeight(),
                    aspectRatio: screen$1.getAspectRatio(),
                    orientation: screen$1.getOrientation()
                }
            },
            ...{
                tao: tao.getSetup(),
            },
            ...{
                browser: {
                    name: uaData.browser.name,
                    version: uaData.browser.major
                },
                device: uaData.device,
                os: uaData.os
            },
            ...{
                date: new Date()
            }
        }
    };
    var env = {
        getEnv
    };

    return env;

});
