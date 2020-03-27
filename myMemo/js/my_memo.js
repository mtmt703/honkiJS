// グローバル変数はここに書くほうが◎ $(function()の中じゃなくてOK
var listNum = -1;
var arr =[];

$(function(){
    loadList();

    // .titleにフォーカスがあたったら　イベントを書く
        // フォーカスがあたっている.titleが空白であれば新規
        // listNum = -1;

        // それ以外は編集
        // listNum = フォーカスがあたっているリストの番号
    
        // 「documentの中の'.task-list li .title'にfocusされたら」という意味
        $(document).on('focus', '.task-list li .title', function () {
            // テキスト取得
            var value = $(this).text();
    
            if(value){
                console.log(value);
            } else {
                console.log('から');
            }
    
        });  
        


    // エンターキーが押されたらテキストを保存する
    $('.task-list').keypress('.title',function(key){
        // console.log('keypress');
        // console.log(key.which);

        if(key.which === 13){
            // console.log('エンター');
            console.log($(':focus'));

            // ★listNumを取得★
            

            // 配列にタイトルを入れる
            // var titleStr = $(this).text();
            var titleStr = $(':focus').text();

            // もしlistNumが−1だったら新規用のコードを書く
            // それ以外は編集用にコードを書く
            

            // 新規用のコード 
            // false=「データがない」という意味
            var checkStr = false;
            var memoObj = {
                title:titleStr,
                check:checkStr     
            }

            arr.push(memoObj);
            
            // localStorageに保存
            var arrStr =JSON.stringify(arr);

            // localStrageのsetItemで保存する
            localStorage.setItem('memoApp', arrStr);
        }     
        
    });
    
    // .plus_iconを押したら、<li>を出す
    $('.plus_icon').on('click',function(){
        // 新規
        listNum = -1;
     
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
    $('.trash_icon').on('click',function(){

        // 全部のラジオボタンをチェックする each(繰り返し処理)
        $('.task-list li').each(function(){
            var btnTag = $(this).find('.btn');
            console.log(btnTag);

            if(btnTag.hasClass('checked')){
                // checkedというクラスを持っていたらli（this）を消す。
                $(this).remove();
            }   
        });
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


    // APIを読み込んで背景のグラデーションを天気ごとに変える
        $.ajax(
            {
                url:'https://api.openweathermap.org/data/2.5/weather?id=1850147&APPID=f95f45f631c940ee86ef81e2e1608a8b&units=metric'
                ,type:'GET'
                ,dataType:'JSON'
            }
            ).then(showData, showError);
});


// 関数の呼び出し　ajax通信が成功した場合
// 引数のdataは、data.weather[0].main;のdata
function showData(data){
    // 天気アイコンを連続表示させないための処理empty
    $('.weather_icon').empty();

    var main = data.weather[0].main;

    if(main == 'Clear'){
        // 晴れだったら
        $('.bg').addClass('bg_gra_clear');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_sunny.svg">';
        $('.weather_icon').append(imgTag);

    } else if(main == 'Clouds') {
        // 曇り
        $('.bg').addClass('bg_gra_cloud');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_cloud.svg">';
        $('.weather_icon').append(imgTag);

    } else if(main == 'Rain') {
        // 雨
        $('.bg').addClass('bg_gra_rain');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_rain.svg">';
        $('.weather_icon').append(imgTag);

    } else {
        // 雪
        $('.bg').addClass('bg_gra_snow');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_snow.svg">';
        $('.weather_icon').append(imgTag);
    }

    console.log(data);
    
    // APIから取得した気温を表示させる
    // $('.temp').append(data.main.temp+'℃');

    // 気温を四捨五入させたい
    var tempData = data.main.temp;

    // 四捨五入した気温
    // var finalTempData = Math.round(tempData);
    tempData = Math.round(tempData);

    // HTMLに表示
    $('.temp').append(tempData+'℃');
}



// 関数の呼び出し　ajax通信が失敗した場合
function showError(){
    console.log('失敗しました');
}

// リストを表示する
function loadList(){
      // ロードされた時にリストを再現する
    // 1. localStrageから値をロードする
    var arrStr = localStorage.getItem('memoApp');

    // 2.もし値が何もなければ処理を終える
    if(arrStr === null){
        return;
    }

    // 3. localStrageの値をarrに保存する
    arr = JSON.parse(arrStr);

    // 4. arrの値をliに表示する
    for(var i=0; i<arr.length; i++){
        var titleStr = arr[i].title; 
        var liTag = '<li>'+'<span class="btn"></span>'+
        '<span class="title" contentEditable="true">'+titleStr+'</span>'+
    '</li>';
        
        // .task-listに追加
        $('.task-list').append(liTag);
    }
}