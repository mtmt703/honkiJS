// グローバル変数を定義　箱だけ作る
var listNum;

// ready();
$(document).ready(function(){
    // inputボタンが押されたら
    $('.input-btn').on('click',function(){
        console.log('.input-btnがおされたよ');

        // input-titleの内容をconsole.logに表示
        var title = $('.input-title').val();
        console.log(title);
        
        // 表示するHTMLタグの作成
        // var tag = '<li><a href="#">メモ１</a></li>';
        var tag = '<li><a href="#">' + title + '</a></li>';
        // タグをメモリストに追加
        $('.memo-list').append(tag);
        
    });

    // memo-listのliのaがクリックされたら　★これは現在存在していないからconsoleに存在しない
    // $('.memo-list li a').on('click',function(){
    //     console.log('aがクリックされました。');
        
    // });
    // memo-listがクリックされたら、li　aに伝えて、functionを実行してね、という意味
    $('.memo-list').on('click','li a',function(){
        // console.log('aがクリックされました。');

        // console.log(this);
        // おされたタグ（this）から中身のタイトルを取り出す
        var title = $(this).text();
        console.log(title);

        // memo-detailに表示 textareaの値を取りたいときはvalを使う
        $('.memo-detail').val(title);

        // 押されたリストの番号を変数に保存する　ローカル変数
        listNum = $('.memo-list li').index($(this).parent());
        console.log(listNum +'が押されました');
        
    });

    // 編集ボタンがクリックされたら
    $('.edit-btn').on('click',function(){
        console.log('現在選択されているリストの番号は'+listNum);

        if(listNum != -1){
            // .memo-detailのテキストを取得する
        var newTitle = $('.memo-detail').val();
        console.log(newTitle);
        
        // .memo-listに反映する
        // $('.memo-list li a').text(newTitle);
        // $('.memo-list li').eq(0).find('a').text(newTitle);
        $('.memo-list li').eq(listNum).find('a').text(newTitle);

        }

        
        // .memo-detailのテキストを取得する
        // var newTitle = $('.memo-detail').val();
        // console.log(newTitle);
        
        // .memo-listに反映する
        // $('.memo-list li a').text(newTitle);
        // $('.memo-list li').eq(0).find('a').text(newTitle);
        // $('.memo-list li').eq(listNum).find('a').text(newTitle);

    });

    // 削除ボタンがクリックされたら
    $('.delete-btn').on('click',function(){
        // 何番目のリストが押されているか取得する（グローバル変数）
        console.log('現在選択されている削除リストの番号は'+listNum);
        
        // listNumが-1（すでに削除されている状態）でないときのみ実行
        if(listNum != -1){
             // .memo-listから指定した番号のリストを削除する　.remove（);
        $('.memo-list li').eq(listNum).remove();

        // .memo-detailの内容を空白にする
        $('.memo-detail').val('');

        // listNumをリセットする
        listNum = -1;

        }

    });


});

// 省略形↓
// $(function(){

// });

