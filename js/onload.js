$(function () {
    let fourm = $(".forum");
      $.ajax({
        async: true,
        url: 'http://127.0.0.1:8888/pageload',
        type: 'get',
        dataType: "json",
        success:(rs) => {
            let count =0;
            let userName;
            let imgSrc;
            let contenttext;
            let date;
            if (rs.length === fourm.length){
                fourm.each((index,domEle)=>{
                domEle.setAttribute('data-file',JSON.stringify(rs[index]));
            });}
            else if( rs.length < fourm.length){
                fourm.each((index,domEle)=>{
                    if (index < rs.length){
                    domEle.setAttribute('data-file',JSON.stringify(rs[index]));}
                    else{
                        domEle.remove();
                    }
                });
            }
            else{
                fourm.each((index,domEle)=>{
                    domEle.setAttribute('data-file',JSON.stringify(rs[index]));
                    count = index+1;
                });
                for (;count<rs.length;count++){
                    userName = rs[count]['author']['userName'];
                    imgSrc = rs[count]['author']['imgSrc'];
                    contenttext = rs[count]['context']['contenttext'];
                    date = rs[count]['context']['date'];
                    let json = JSON.stringify(rs[count]);
                    publishload(userName,imgSrc,contenttext,date,json);
                }
            }
        }
    });
});