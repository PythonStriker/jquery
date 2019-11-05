function filter(str) {
    str = str.replace(/[<>"'& ]/g,(str)=>{
        switch (str) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '\"':
                return '&quot;';
            case '\'':
                return '&#39;';
            case '\&':
                return '&amp;';
            case ' ':
                return '&nbsp;';
        }
    });
    return str;
}



function addBeforReply(current){
    let forum = $(current).parents()[2];
    let dataFile = JSON.parse($(current).parents().eq(2).attr('data-file'));
    let count = dataFile['author']['userid'];
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8888/pageload',
        type: 'get',
        dataType: "json",
        success:(rs) => {
            for(let index in rs){
                if (rs[index]['author']['userid'] === count){
                    rs[index] = JSON.stringify(rs[index]);
                    forum.setAttribute('data-file',rs[index]);
                }
            }
        }
    });
    $(current).toggle();
    $(current).parent('div').next().slideToggle();
    $(current).next('button').toggle();
}
function addAfterReply(current) {
    let forum = $(current).parents()[2];
    let dataFile = JSON.parse($(current).parents().eq(2).attr('data-file'));
    let count = dataFile['author']['userid'];
    let replyLength = dataFile['reply'].length;
    let reply = dataFile['reply'];
    let ul = $(current).parent().next().children().eq(0);
    let ulLength = ul.children().length/2;
    if (ulLength < replyLength){
        for(let index in reply){
            ul.append('<li>'+reply[index]['username']+':'+reply[index]['usercontent']+'</li>');
            ul.append('<li class="data">'+reply[index]['date']+'<button type="button" class="btn-link" onclick="deletedate(this)">删除</button></li>');
        }
    }
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8888/pageload',
        type: 'get',
        dataType: "json",
        success:(rs) => {
            for(let index in rs){
                if (rs[index]['author']['userid'] === count){
                    rs[index] = JSON.stringify(rs[index]);
                    forum.setAttribute('data-file',rs[index]);
                }
            }
        }
    });
    $(current).toggle();
    $(current).parent('div').next().slideToggle();
    $(current).prev('button').toggle();
}

function deleteAll(current) {
    let userid = JSON.parse($(current).parents().eq(2).attr('data-file'))['author']['userid'];
    $.ajax({
        url: 'http://127.0.0.1:8888/delete',
        type: 'get',
        data:{
            "userid":userid},
        success:()=>{
            $(current).parents()[2].remove();
        },
    });
}

function deletedate(current){
    let time = $(current).parents('li').eq(0).text().slice(0,19);
    let content = $(current).parent().prev().text().split(':');
    let username = filter(content[0]);
    let usercontent = filter(content[1]);
    let userid = JSON.parse($(current).parents().eq(4).attr('data-file'))['author']['userid'];
    $.ajax({
        url: 'http://127.0.0.1:8888/deletedate',
        type: 'get',
        data:{
            "userid":userid,
            "username": username,
            "usercontent": usercontent,
            "date": time},
        success:()=>{
            $(current).parent().prev().remove();
            $(current).parent().remove();
        },
    });
}

function addReply(current) {
    let reply =JSON.parse($(current).parents().eq(4).attr('data-file'));
    let content = filter($(current).prev().val());
    let rename = filter($(current).parent('li').prev('li').children('input').val());
    let time = getDate().slice(0,19);
    let userid = reply['author']['userid'];
    if (content ==='' || rename ===''){
        alert('用户名或回复内容不能为空！')
    }
    else{
    $.ajax({
        url: 'http://127.0.0.1:8888/addreply',
        type: 'get',
        data:{
            "userid":userid,
            "username": rename,
            "usercontent": content,
            "date": time},
        success:()=>{
            $(current).parent('li').parent('ul').prev('ul').append('<li>'+rename+':'+content+'</li>');
            $(current).parent('li').parent('ul').prev('ul').append('<li class="data">'+time+'<button type="button" class="btn-link" onclick="deletedate(this)">删除</button></li>');
        },
    });
    }
}

function publish(current) {
    let time = getDate().slice(0,19);
    let userid = (Number(JSON.parse($(current).parent().prev().children().last().attr('data-file'))['author']['userid'])+1).toString();
    let publishName = filter($(current).prev('div').children('input').val());
    let content = filter($(current).prev('div').children().next().val());
    console.log(publishName);
    console.log(content);
    if (content ==='' || publishName ===''){
        alert('用户名或回复内容不能为空！');
    }
    else{
        $.ajax({
            url: 'http://127.0.0.1:8888/publish',
            type: 'get',
            data:{
                "userid":userid,
                "userName": publishName,
                "contenttext": content,
                "date": time},
            success:(text)=>{
                text = JSON.stringify(text);
                console.log(text);
                publishload(publishName,"image/head.jpeg",content,time,text);
            },
        });
    }
}

function getDate(){
    var mouthNU = { 'Jan': '01', 'Feb': '02 ', 'Mar': '03', ' Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
    date = new Date();
    time =date.toString().slice(11, 15) + '-' + mouthNU[date.toString().slice(4, 7)] + '-' + date.toString().slice(8, 10) + '-' + date.toString().slice(16, 25);
    return time;
}

// $(function () {
//     $('.btn-link').on('click',function () {
//         $(this).fadeToggle();
//         $(this).parent().next().fadeToggle();
//         $(this).next().fadeToggle();
//     })
// });