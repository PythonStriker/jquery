function publishload(userName,imgSrc,contenttext,date,json) {
        $("#main_body").append('<div class="forum" data-file=' + json + '>\n' +
                '        <div class="author">\n' +
                '            <img src=' + imgSrc + '>\n' +
                '            <p class="name">' + userName + '</p>\n' +
                '        </div>\n' +
                '        <div class="content" >\n' +
                '            <div class="contenttext"><p>' + contenttext + '</p></div>\n' +
                '            <div class="function">' +
                '                <button type="button" class="del btn-link" onclick="deleteAll(this)"><span class="glyphicon glyphicon-trash" style="color: rgb(218, 221, 221); font-size: 13px;"></span></button>\n' +
                '                <span class="date">' + date + '</span>\n' +
                '                <button type="button" class="reinside btn-link re"  onclick="addBeforReply(this)" style="display: none">收起回复</button>\n' +
                '                <button type="button" class="reout btn-link re" onclick="addAfterReply(this)" >回复</button>\n' +
                '\n' +
                '            </div>\n' +
                '            <div class="reply" style="display: none">\n' +
                '                <ul class="contentUl">\n' +
                '\n' +
                '                </ul>\n' +
                '                <ul>\n' +
                '                    <li><span class="nametxt">姓名:</span><input type="text" class="replyName form-control" name="replyName" /></li>\n' +
                '                    <li><span class="contenttxt">内容:</span><input type="text" class="replyContent form-control" name="replyContent"/><button type="button" class="replyButton btn-primary btn-xs" onclick="addReply(this)">回复</button></li>\n' +
                '                </ul>\n' +
                '            </div>\n' +
                '        </div>');

}