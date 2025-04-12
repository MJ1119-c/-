let button1, button2;
let sprite1Img, sprite2Img;
let frame1 = 0, frame2 = 0;
let sprite1Frames = [];
let sprite2Frames = [];
let iframe;
let stars = []; // 儲存星形的陣列
let dropdown; // 儲存下拉式選單的變數
let textBox; // 儲存文字框的變數

function preload() {
  sprite1Img = loadImage('00.png', () => console.log('00.png loaded'), () => console.error('Failed to load 00.png'));
  sprite2Img = loadImage('01.png', () => console.log('01.png loaded'), () => console.error('Failed to load 01.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗的寬度和高度

  // 新增「首頁」按鈕
  let button1 = createButton('首頁');
  button1.position(50, 50);
  button1.size(120, 60); // 設置為橢圓形
  button1.style('font-size', '20px');
  button1.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button1.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button1.style('background-color', '#ff6f61'); // 背景顏色
  button1.style('color', '#fff'); // 字體顏色
  button1.mousePressed(() => {
    if (iframe) {
      iframe.remove(); // 移除 iframe
      iframe = null;
    }
    if (dropdown) {
      dropdown.hide(); // 隱藏下拉式選單
    }
    console.log('回到首頁，畫面已清空');
  });

  // 新增「自我介紹」按鈕
  let button2 = createButton('自我介紹');
  button2.position(200, 50);
  button2.size(120, 60); // 設置為橢圓形
  button2.style('font-size', '20px');
  button2.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button2.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button2.style('background-color', '#6a5acd'); // 背景顏色
  button2.style('color', '#fff'); // 字體顏色
  button2.mousePressed(() => {
    // 移除 iframe（如果存在）
    if (iframe) {
      iframe.remove();
      iframe = null;
    }

    // 移除其他文字框（如果存在）
    if (textBox) {
      textBox.remove();
    }

    // 新增文字框
    textBox = createDiv(
      '哈囉～我是許孟婕！<br>' +
      '目前在淡江大學讀教科系一年級，畢業於新莊高中。<br>' +
      '平時的興趣愛好就是追劇、看動漫、跑咖啡廳、購物等等，生活日常基本上圍繞著「療癒」和「放鬆」展開<br>' +
      '題外話我超喜歡日本，不管是文化、美食還是風景都超吸引我，希望未來每年都可以安排去玩好幾次👍👍👍<br>' +
      '這次的作品對我來說是一次全新的挑戰，雖然過程中也遇到一些卡關的時候，但能做出畫面上自己喜歡的樣子真的很開心！<br>' +
      '希望透過這次的創作，我可以學到更多實用的技能，也慢慢找到自己在設計或科技應用上的興趣方向～<br>' +
      '謝謝大家！<br>' +
      '────────────────୨ৎ────────────────'
    );
    textBox.position(windowWidth / 2 - 250, windowHeight / 2 - 200); // 設置文字框的位置（居中）
    textBox.size(500, 400); // 設置文字框大小（放大）
    textBox.style('font-size', '20px'); // 字體大小
    textBox.style('font-family', '"Comic Sans MS", "Comic Sans", cursive'); // 設置可愛字體
    textBox.style('color', '#333'); // 設置文字顏色
    textBox.style('background-color', '#f9f9f9'); // 設置背景顏色
    textBox.style('padding', '20px'); // 設置內邊距
    textBox.style('border-radius', '15px'); // 設置圓角
    textBox.style('box-shadow', '0 0 20px rgba(0, 0, 0, 0.3)'); // 添加陰影
    textBox.style('text-align', 'center'); // 文字置中

    // 添加彈跳動畫
    textBox.style('animation', 'bounceIn 0.5s ease');

    // 定義動畫樣式
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounceIn {
        0% {
          transform: scale(0.5);
          opacity: 0;
        }
        50% {
          transform: scale(1.1);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  });

  // 新增「作品集」按鈕
  let button3 = createButton('作品集');
  button3.position(350, 50); // 調整按鈕位置
  button3.size(120, 60); // 設置為橢圓形（寬度大於高度）
  button3.style('font-size', '20px');
  button3.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button3.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button3.style('background-color', '#ffa500'); // 背景顏色
  button3.style('color', '#fff'); // 字體顏色
  button3.mousePressed(() => {
    if (!dropdown) {
      // 如果下拉式選單尚未建立，則建立
      dropdown = createSelect();
      dropdown.position(350, 130); // 下拉式選單的位置，避免與按鈕重疊
      dropdown.size(120, 30);
      dropdown.style('font-size', '16px');
      dropdown.style('z-index', '1000'); // 設置 z-index，確保在上層
      dropdown.style('position', 'absolute'); // 確保 z-index 生效
      dropdown.option('請選擇');
      dropdown.option('作品 1');
      dropdown.option('作品 2');
      dropdown.option('作品 3');
      dropdown.option('期中HACKMD');
      dropdown.changed(() => {
        const selected = dropdown.value();
        console.log(`���擇了: ${selected}`);
        // 根據選擇的項目執行對應的操作
        if (selected === '作品 1') {
          showIframe('https://mj1119-c.github.io/week1/');
        } else if (selected === '作品 2') {
          showIframe('https://mj1119-c.github.io/seaweed/');
        } else if (selected === '作品 3') {
          showIframe('https://mj1119-c.github.io/20250324/');
        } else if (selected === '期中HACKMD') {
          showIframe('https://hackmd.io/@HSGKLoDOSMSkfc8lYd7CKw/BJmLPwZQ1g');
        }
      });
    } else {
      // 如果下拉式選單已存在，則切換顯示/隱藏
      if (dropdown.elt.style.display === 'none') {
        dropdown.show();
      } else {
        dropdown.hide();
      }
    }
  });

  // 新增「測驗券」按鈕
  let button4 = createButton('測驗券');
  button4.position(500, 50);
  button4.size(120, 60); // 設置為橢圓形
  button4.style('font-size', '20px');
  button4.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button4.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button4.style('background-color', '#32cd32'); // 背景顏色
  button4.style('color', '#fff'); // 字體顏色
  button4.mousePressed(() => {
    showIframe('https://mj1119-c.github.io/20250310/');
    if (dropdown) {
      dropdown.hide(); // 隱藏下拉式選單
    }
  });

  // 新增「教學影片」按鈕
  let button5 = createButton('教學影片');
  button5.position(650, 50);
  button5.size(120, 60); // 設置為橢圓形
  button5.style('font-size', '20px');
  button5.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button5.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button5.style('background-color', '#ff4500'); // 背景顏色
  button5.style('color', '#fff'); // 字體顏色
  button5.mousePressed(() => showIframe('https://cfchen58.synology.me/程式設計2024/B2/week3/20250303_104548.mp4'));

  // 將精靈圖分割成小圖
  for (let i = 0; i < 6; i++) {
    sprite1Frames.push(sprite1Img.get(i * 38, 0, 38, 34));
    sprite2Frames.push(sprite2Img.get(i * 36, 0, 36, 36));
  }

  for (let i = 0; i < 50; i++) {
    // 初始化 50 顆星形
    stars.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speedX: random(-2, 2),
      speedY: random(-2, 2),
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(0); // 黑色背景

  // 計算星形顏色，根據滑鼠位置動態改變
  let dynamicColor = color(
    map(mouseX, 0, width, 0, 255), // 根據 mouseX 設定紅色分量
    map(mouseY, 0, height, 0, 255), // 根據 mouseY 設定綠色分量
    200 // 固定藍色分量
  );

  // 繪製並更新每顆星形
  for (let star of stars) {
    drawStar(star.x, star.y, star.size, dynamicColor); // 使用動態顏色
    star.x += star.speedX;
    star.y += star.speedY;

    // 如果星形超出畫布，將其重置到另一側
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;
  }

  // 繪製圖片精靈
  if (mouseX > 50 && mouseX < 150 && mouseY > 50 && mouseY < 100) {
    image(sprite1Frames[frame1], 50, height - 80);
    if (frameCount % 5 === 0) {
      frame1 = (frame1 + 1) % sprite1Frames.length;
    }
  } else if (mouseX > 180 && mouseX < 280 && mouseY > 50 && mouseY < 100) {
    image(sprite2Frames[frame2], 180, height - 80);
    if (frameCount % 5 === 0) {
      frame2 = (frame2 + 1) % sprite2Frames.length;
    }
  }
}

function showIframe(url) {
  if (iframe) {
    iframe.remove(); // 移除舊的 iframe
  }
  iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.position(windowWidth * 0.1, windowHeight * 0.2);
  iframe.size(windowWidth * 0.8, windowHeight * 0.6);
}

// 繪製星形的函數
function drawStar(x, y, size, starColor) {
  push();
  translate(x, y);
  fill(starColor);
  noStroke();
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angle = TWO_PI / 10 * i;
    let r = i % 2 === 0 ? size : size / 2;
    let sx = cos(angle) * r;
    let sy = sin(angle) * r;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
}
