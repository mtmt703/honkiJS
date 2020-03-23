// var listNum;

$(function(){
    
    // .plus_iconを押したら、<li>を出す
    $('.plus_icon').on('click',function(){
        
        // var liTag = '<li contentEditable="true">'+''+'</li>';
        var liTag = '<li>'+'<span class="btn"></span>'+
        '<span class="title" contentEditable="true"></span>'+
    '</li>';
        // console.log('liTagを取得：'+liTag);
        
        // .task-listに追加
        $('.task-list').append(liTag);
    });

    // ラジオボタンが押されたら円の背景をグレーにし、テキストに打ち消し線をつける
    $('.task-list').on('click','li .btn',function(){
        $(this).toggleClass('checked');
        $(this).parent().find('.title').toggleClass('checked');
    });

    // ゴミ箱アイコンが押されたらtask-li li　を消す
    // ここができない！！！！！！　(´；ω；`)
    $('.trash_icon').on('click',function(){

        // 押されたリストの番号を変数に保存する　ローカル変数
        // 番号を調べる　index
        // .task-list li から順番を取得
        var listNum = $('.task-list li').index();
        
        // $('.task-list li').eq(listNum).remove();
        
        $('.task-list li').find('.btn').eq(listNum).remove();     

    });

    // .dateにメモ帳を開いた日付を表示させる
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    // now.getDay 曜日を0から6の整数で取得する
    var w = now.getDay();
    var wd = ['日', '月', '火', '水', '木', '金', '土'];
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();

    $('.date').text(y + '/' + m + '/' + d + '(' + wd[w] + ')');  

});