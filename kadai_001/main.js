// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTMLの要素を取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const scoreCount = document.getElementById('score_count');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {

    typed = '';
    typedfield.textContent = typed;

    let random = Math.floor(Math.random() * textLists.length);

    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// createText();

// キー入力の判定
const keyPress = e => {

    // 誤りタイプの場合
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100)
        return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    scoreCount.textContent = score;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    if(untyped === ''){
        createText();
    }
};

// typingスキルのランクを判定
const rankCheck = score => {

    // スコアの値を返す
    // return `${score}文字打てました!`;
    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}です。`;
    } else if(socre < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}です。`;
    } else if(socre < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}です。`;
    } else if(300 <= score){
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n[OK] リトライ / [キャンセル] 終了`;
};

// ゲームを終了
// const gameOver = id => {};
const gameOver = id => {
    clearInterval(id);

    // console.log('ゲーム終了!');
    const result = confirm(rankCheck(score));

    // OKボタンがクリックされたらリロードする
    if(result == true){
        window.location.reload();
    }
}

// カウントタイマー
// const timer = () => {};
const timer = () => {

    // タイマー部分のHTML要素(p要素)を取得する
    let time = count.textContent;

    const id = setInterval(() => {

        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if(time <= 0){
            // clearInterval(id);
            gameOver(id);
        }
    },1000);
};

// キーボードのイベント処理
document.addEventListener('keypress', keyPress);

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();

    // 「スタートボタンを非表示にする」
    start.style.display = 'none';

});

untypedfield.textContent = 'スタートボタンで開始';

