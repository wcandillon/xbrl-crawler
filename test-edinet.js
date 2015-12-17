'use strict';

var Nightmare = require('nightmare');
require("nightmare-xpath"); // xpath function will be added to prototype.
var co = require('co');


var nightmare = Nightmare({show: true});
nightmare.on('download', (e, item) => {
    if (e === "started") {
        console.log(item.url);
        nightmare.emit('download', 'cancel');
    }
});

co(function*() {
    let links = yield nightmare
        .goto('https://disclosure.edinet-fsa.go.jp/E01EW/BLMainController.jsp?uji.verb=W1E63023CXP002005BLogicE&uji.bean=ee.bean.parent.EECommonSearchBean&PID=W1E63023&TID=W1E63023&SESSIONKEY=1450190128514&lgKbn=1&pkbn=0&skbn=0&dskb=&askb=&dflg=0&iflg=0&cal=2&cal2=2&xbr=on&sec=&scc=&snm=&spf1=1&iec=&icc=&inm=&spf3=1&fdc=&fnm=&spf5=1&mon=&yer=&psr=1&pfs=5&row=100&idx=')
        .evaluate(function () {
            var ids = [];
            var links = document.querySelectorAll('.table_border_1.table_cellpadding_1 a');
            for(let i=0; i<links.length; i++) {
                let link = links[i];
                console.log(link);
            }
            return ids;
        });
    console.log(links.length);
    return nightmare.wait('downloads-complete').end();
}).catch(function (err) {
    console.error(err);
});