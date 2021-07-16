// グローバル変数はここに書くほうが◎ $(function()の中じゃなくてOK
// 新規用　整数だと編集されてしまうから　1を入れたらそこの場所が編集されたい何もされない判断として−1を自分で定義した
var listNum = -1;

var arr =[];

$(function(){
    loadList();

        // 「documentの中の'.task-list li .title'にfocusされたら」という意味
        $(document).on('focus', '.task-list li .title', function () {
            
            // タップされたリストの番号を取得
            // クリックしている<li>が何番目か取得して、listNumに入れたい
            var liTag =$(this).parent();

            // listNumに現在のリスト番号を保存
            listNum = $('.task-list li').index(liTag);
            console.log(listNum);
        });  
        

    // エンターキーが押されたらテキストを保存する
    $('.task-list').keypress('.title',function(key){
        // console.log('keypress');
        // console.log(key.which);

        if(key.which === 13){
            // console.log('エンター');
            console.log($(':focus'));

            $(window).scrollTop($(window).scrollTop());

            // 配列にタイトルを入れる
            // var titleStr = $(this).text();
            var titleStr = $(':focus').text();

            // 配列にタイトルを入れる
            // ラジオボタンがチェックされているかどうか
            var checkStr = $(':focus').hasClass('checked');
            console.log(checkStr);
            
            // 新規＆編集用のコード (新規という概念をなくす)
            // false=「チェックされていないのがfalse」というルールをこちらで決めている
            // var checkStr = false;
            // var memoObj = {
            //     title:titleStr,
            //     check:checkStr     
            // }
            // var checkStr = false;

            var memoObj = {
                title:titleStr,
                check:checkStr     
            }
            // listNumの番号の配列に保存
            arr[listNum] = memoObj;
            
            // localStorageに保存
            var arrStr =JSON.stringify(arr);

            // localStrageのsetItemで保存する
            localStorage.setItem('memoApp', arrStr);

            // htmlの機能をなくす命令
            return false;
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
               
        // ラジオボタンが押されたliの番号を取得する
        // 番号を取得したいときはその親liにする checkedのときはthis
        var num = $(this).parent().index();
        console.log(num);
        
        // ラジオボタンのクラスにcheckedがあるかどうか取得する(あるかどうかはis〜)
        var isChecked= $(this).hasClass('checked');
        console.log(isChecked);
        
        // numの番号の配列に保存
        // arr　→　ローカルストレージに保存（ボタンが押された時にもうLSに保存）
        arr[num].check = isChecked;
        
        // localStorageに保存
        var arrStr =JSON.stringify(arr);

        // localStrageのsetItemで保存する
        localStorage.setItem('memoApp', arrStr);

    });

    // ゴミ箱アイコンが押されたらtask-li li　を消す
    $('.trash_icon').on('click',function(){

        // 全部のラジオボタンをチェックする each(繰り返し処理)
        $('.task-list li').each(function(){
            var btnTag = $(this).find('.btn');
            console.log(btnTag);

            // リストの番号を取得
            var num = $(this).index();
            console.log(num);
            

            if(btnTag.hasClass('checked')){
                // checkedというクラスを持っていたらli（this）を消す。
                $(this).remove();

                // 配列から要素を削除　numから1つ消す
                arr.splice(num,1);
            }   
        });

            // localStrageに保存
            var arrStr =JSON.stringify(arr);

            // localStrageのsetItemで保存する
            localStorage.setItem('memoApp', arrStr);
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

    } else if(main == 'Snow') {
        // 雪
        $('.bg').addClass('bg_gra_snow');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_snow.svg">';
        $('.weather_icon').append(imgTag);
    } else {
        $('.bg').addClass('bg_gra_ghost');
        // オリジナルアイコンを表示
        var imgTag = '<img src="images/icon_ghost.svg">';
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
// LSから配列に持ってくる
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

    // 4. arrの値をliに表示する（見た目）
    for(var i=0; i<arr.length; i++){
        var titleStr = arr[i].title; 

        // trueだったらcheckedを入れる
        // flseだったらcheckedを入れない　のif文

        // trueかfalseどちらかが入る場合はis〜を使う
        var isChecked = 　arr[i].check;
        console.log(isChecked);

        if(isChecked ===true){
            // チェックを入れる
            var liTag = '<li>'+'<span class="btn checked"></span>'+
            '<span class="title checked" contentEditable="true">'+titleStr+'</span>'+
        '</li>';
        }else{
            // チェック入れない
            var liTag = '<li>'+'<span class="btn"></span>'+
            '<span class="title" contentEditable="true">'+titleStr+'</span>'+
        '</li>';
        }
  
        // .task-listに追加
        $('.task-list').append(liTag);
    }
}

// タブの切り替え
$(function(){

    $('.tab li').on('click',function(){
        let index = $('.tab li').index(this);
        console.log(index);

        $('.tab li').removeClass('active');
        $(this).addClass('active');

        $('.task_area ul').removeClass('show');
        $('.task_area ul').eq(index).addClass('show');



    });


});

