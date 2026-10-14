document.addEventListener('DOMContentLoaded', () => {
    
    // 1. メインビジュアル（ヘッダーエリア）をふわっと浮き上がらせる動き
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }

    // 2. LINE登録ボタンを4秒ごとに「ピクッ」と動かして目立たせる動き
    const lineBtn = document.querySelector('.btn-line');
    if (lineBtn) {
        lineBtn.style.transition = 'transform 0.3s ease';
        
        setInterval(() => {
            lineBtn.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                lineBtn.style.transform = 'scale(1)';
            }, 150);
        }, 4000);
    }
});
// --- ガチャガチャの処理コード ---
document.addEventListener('DOMContentLoaded', () => {
    let currentCost = "2000"; // 初期選択は2000円
    const modeButtons = document.querySelectorAll('.mode-btn');
    const handle = document.getElementById('gacha-handle');
    const dome = document.querySelector('.gacha-dome');
    const resultArea = document.getElementById('gacha-result-area');

    // 宝石のデータ（絵文字と名前）
    const stones = {
        normal: [
            { emj: '🔮', name: 'アメジスト' }, { emj: '🐱', name: 'キャッツアイ' },
            { emj: '📿', name: 'ガーネット' }, { emj: '🟢', name: 'ペリドット' }
        ],
        rare: [
            { emj: '💙', name: 'サファイア' }, { emj: '💚', name: 'エメラルド' },
            { emj: '🍎', name: 'ルビー' }, { emj: '水', name: 'アクアマリン' }
        ],
        superRare: [
            { emj: '💎', name: 'ダイヤ' }, { emj: '🌟', name: '幻の宝石' }
        ]
    };

    // コース切り替えの動き
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCost = btn.getAttribute('data-cost');
        });
    });

    // レバーを回した時の動き
    handle.addEventListener('click', () => {
        // 連打防止
        if (handle.classList.contains('spinning')) return;

        // 演出開始
        handle.classList.add('spinning');
        dome.classList.add('shake');
        resultArea.innerHTML = "<p style='color:#a0aec0;'>カプセルを準備中...</p>";

        // 0.5秒後に演出を止めて、結果を表示する
        setTimeout(() => {
            handle.classList.remove('spinning');
            dome.classList.remove('shake');
            resultArea.innerHTML = ""; // 文字をクリア

            // 金額に応じた確率で宝石を2つ抽選
            const item1 = drawGem(currentCost);
            const item2 = drawGem(currentCost);

            // カプセルとして画面に出現させる
            createCapsule(item1, '#ed64a6'); // 1個目（ピンクカプセル）
            createCapsule(item2, '#4299e1'); // 2個目（ブルーカプセル）

        }, 500);
    });

    // 確率で宝石を選ぶ関数
    function drawGem(cost) {
        let pool = [...stones.normal];
        
        // 金額が上がるほどレアな宝石がプールに追加される
        if (cost === "3000") {
            pool = pool.concat(stones.rare);
        } else if (cost === "5000") {
            pool = pool.concat(stones.rare).concat(stones.superRare);
        }

        // ランダムに1つ選ぶ
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // カプセルのグラフィックを画面に作る関数
    function createCapsule(gem, color) {
        const cap = document.createElement('div');
        cap.className = 'result-capsule';
        cap.style.background = `linear-gradient(to bottom, ${color} 50%, #fff 50%)`;
        cap.style.border = `3px solid ${color}`;
        
        // 宝石の見た目と名前をセット
        cap.innerHTML = `
            <span style="margin-top:-5px;">${gem.emj}</span>
            <span class="result-label" style="color:${color};">${gem.name}</span>
        `;
        resultArea.appendChild(cap);
    }
});
