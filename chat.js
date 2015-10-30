var socket = io('http://localhost:3000');
var a = ["User", "Test User", "Admin"];
var b = ["3", "2", "1"];
var rA = Math.floor(Math.random()*a.length);
var rB = Math.floor(Math.random()*b.length);
var from = a[rA] + b[rB];
var mt = 0
var lh = 0
var pubnub = PUBNUB({
        subscribe_key: 'sub-c-39b40aba-7c99-11e5-a4dc-0619f8945a4f'
});
function submitfunction() {
    var message = {"UUID":from,"time":new Date().getTime(),"img":'images/userim.png',"msg":$('#m').val()};
    var chroom = $('#chroom').val();
    socket.emit('chatMessage', chroom, from, message);
    $('#m').val('');
}

function relative_time(date_str) {
    if (!date_str) {return;}
    var parsed_date = date_str;
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + ' seconds ago';
    } else if(delta < 120) {
    r = 'a minute ago';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
    r = 'an hour ago';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
    r = 'a day ago';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return 'about ' + r;
};

// socket.on('chatMessage', function(from, msg) {
//     //last_msg_funtion(mt, 0);
// });

function shownew(){
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}
function history_receive(text, lh) {
    bh = bh + '<div class="eachmsg"><div class="imgt"><img src="'+text["img"]+'" /></div><div class="name">'+text["UUID"]+' <span class=" chattinggreendot"></span> <span class="chatingboxdateny"><i>'+relative_time(text["time"])+'</i></span></div><div class="msgtext">' + text["msg"] + '</div></div>';
    shownew();
}
function history_write(text, lh) {
    $('#box').append(text);
    bh='';
}
function chat_receive(text, lh) {
    $('#box').append('<div class="eachmsg"><div class="imgt"><img src="'+text["img"]+'" /></div><div class="name">'+text["UUID"]+' <span class=" chattinggreendot"></span> <span class="chatingboxdateny"><i>'+relative_time(text["time"])+'</i></span></div><div class="msgtext">' +  ('' + text["msg"]).replace(/[<>]/g, '') + '</div></div>');
}
$(document).ready(function() {
    var chroom = $('#chroom').val();
    last_msg_funtion = function (mt, lh) {
        pubnub.history({
            channel: chroom,
            limit: 10,
            start: mt,
            callback: function (hmsg) {
                var msgs = hmsg[0];
                var start = hmsg[1];
                if (msgs != undefined && msgs.length > 0) {
                    if (lh) {
                        pubnub.each(msgs, history_receive);
                    } else {
                        pubnub.each(msgs, chat_receive);
                    }
                    if (lh) {
                        history_write(bh, lh);
                    }
                }
                mt = start;
                if (msgs.length == 100)
                    last_msg_funtion(mt, 1);
            },
        });
    };
    pubnub.subscribe({
        channel: chroom,
        connect: last_msg_funtion(mt, 0),
        message: chat_receive,
    });
});