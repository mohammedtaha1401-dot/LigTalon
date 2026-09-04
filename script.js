/* =========================
   اطلاعات افتخارات 53-SeAsOn
========================= */

const defaultHonors = [
  ["رویس وفادار",106],
  ["مارال",75],
  ["ماتیاس",55],
  ["رافی",54],
  ["لوک",45],
  ["تئو",38],
  ["زلاتان",33],
  ["امین اودین",30],
  ["دارک کینگ",27],
  ["دنی والورده",24],
  ["مهدی تئو",22],
  ["مجی",20],
  ["لوکاس",20],
  ["مارکوس",20],
  ["محسن",18],
  ["اسلیوکا",17],
  ["امیر دیبروین",16],
  ["سام فودن",16],
  ["امیر بلینگهام",13],
  ["کینگ مستر",12],
  ["طاها تالون",11],
  ["تریکانو",11],
  ["طاها",10],
  ["طاها اس ای اس",10],
  ["امیر اگوئرو(خولیان)",9],
  ["ساواک",8],
  ["یونس",8],
  ["گاردین",8],
  ["امیر ولیکس",8],
  ["فرساد",7],
  ["جیمی",7],
  ["مجنون",6],
  ["ایلیا",6],
  ["تیلمانس",6],
  ["شیخ",5],
  ["فینیکس",5],
  ["مودریک",5],
  ["بنی",5],
  ["ریرسون",5],
  ["تورک(تاکاز)",5],
  ["عرفان فلادیوس",5],
  ["مهدی زد ایکس",4],
  ["ژنرال",4],
  ["فرهان",3],
  ["مانی",3],
  ["طاها بیگ",3],
  ["کارلتو پرز",3],
  ["ژاکروک",3],
  ["سیانور",3],
  ["هاورتز",3],
  ["ممد رضا",3],
  ["ممفیس",2],
  ["لوکاس",2],
  ["ممد جونیور",1],
  ["امیر دیبالا",1],
  ["فانتوم",1],
  ["ییلدیز",1],
  ["ماهان گواردیولا",1],
  ["تایان(بائنا)",1]
];


/* =========================
   اطلاعات سایت
========================= */

let honors =
  JSON.parse(localStorage.getItem("talon_honors")) ||
  defaultHonors;

let league =
  JSON.parse(localStorage.getItem("talon_league")) ||
  [];

let games =
  JSON.parse(localStorage.getItem("talon_games")) ||
  [];

let news =
  JSON.parse(localStorage.getItem("talon_news")) ||
  [];

let pendingAction = null;


/* =========================
   ابزارها
========================= */

function saveData(){

  localStorage.setItem(
    "talon_honors",
    JSON.stringify(honors)
  );

  localStorage.setItem(
    "talon_league",
    JSON.stringify(league)
  );

  localStorage.setItem(
    "talon_games",
    JSON.stringify(games)
  );

  localStorage.setItem(
    "talon_news",
    JSON.stringify(news)
  );
}


function safe(text){

  return String(text)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


/* =========================
   منو
========================= */

function showSection(id,button){

  document.querySelectorAll(".section")
    .forEach(section =>
      section.classList.remove("active")
    );

  document.getElementById(id)
    .classList.add("active");

  document.querySelectorAll("nav button")
    .forEach(btn =>
      btn.classList.remove("active")
    );

  if(button){
    button.classList.add("active");
  }

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}


/* =========================
   جدول لیگ
========================= */

function renderLeague(){

  const tbody =
    document.getElementById("leagueTable");

  if(league.length === 0){

    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty">
          هنوز جدولی توسط مدیریت ثبت نشده است.
        </td>
      </tr>
    `;

    return;
  }

  const sorted = [...league]
    .sort((a,b) => b.points - a.points);

  tbody.innerHTML = sorted.map((p,i)=>{

    const medal =
      i===0 ? "🥇" :
      i===1 ? "🥈" :
      i===2 ? "🥉" : "";

    return `
      <tr>
        <td class="rank">${medal} ${i+1}</td>
        <td>${safe(p.name)}</td>
        <td>${p.games}</td>
        <td>${p.wins}</td>
        <td>${p.draws}</td>
        <td>${p.losses}</td>
        <td><b>${p.points}</b></td>
      </tr>
    `;

  }).join("");
}


/* =========================
   افتخارات
========================= */

function renderHonors(search=""){

  const tbody =
    document.getElementById("honorsTable");

  const sorted =
    [...honors].sort((a,b)=>b[1]-a[1]);

  const filtered =
    sorted.filter(p =>
      p[0].toLowerCase()
        .includes(search.toLowerCase())
    );

  if(filtered.length===0){

    tbody.innerHTML=`
      <tr>
        <td colspan="3" class="empty">
          موردی پیدا نشد.
        </td>
      </tr>
    `;

    return;
  }

  tbody.innerHTML =
    filtered.map((p)=>{

      const rank =
        sorted.findIndex(
          item =>
            item[0]===p[0] &&
            item[1]===p[1]
        ) + 1;

      const medal =
        rank===1 ? "🥇" :
        rank===2 ? "🥈" :
        rank===3 ? "🥉" : "";

      return `
        <tr>
          <td class="rank">${medal} ${rank}</td>
          <td>${safe(p[0])}</td>
          <td><b>${p[1]}</b> ★</td>
        </tr>
      `;

    }).join("");
}


/* =========================
   بازی‌ها
========================= */

function renderGames(){

  const box =
    document.getElementById("gamesList");

  if(games.length===0){

    box.innerHTML =
      `<div class="card empty">
        هنوز بازی‌ای ثبت نشده است.
      </div>`;

    return;
  }

  box.innerHTML =
    games.map(g=>`

      <div class="game">

        <div class="team">
          ${safe(g.team1)}
        </div>

        <div class="score">
          ${g.score1} - ${g.score2}
        </div>

        <div class="team">
          ${safe(g.team2)}
        </div>

      </div>

    `).join("");
}


/* =========================
   اخبار
========================= */

function renderNews(){

  const box =
    document.getElementById("newsList");

  if(news.length===0){

    box.innerHTML =
      `<div class="card empty">
        هنوز خبری منتشر نشده است.
      </div>`;

    return;
  }

  box.innerHTML =
    news.map(n=>`

      <div class="news">

        <h3>${safe(n.title)}</h3>

        <div class="news-date">
          ${safe(n.date)}
        </div>

        <p>
          ${safe(n.text)}
        </p>

      </div>

    `).join("");
}


/* =========================
   چت
========================= */

function sendChat(){

  const name =
    document.getElementById("chatName")
      .value.trim();

  const text =
    document.getElementById("chatText")
      .value.trim();

  if(!name || !text){

    alert("نام و پیام را وارد کنید.");
    return;
  }

  const list =
    document.getElementById("chatList");

  list.innerHTML += `
    <div class="chat-message">
      <b>${safe(name)}</b>
      <p>${safe(text)}</p>
    </div>
  `;

  document.getElementById("chatText").value="";
}


/* =========================
   نظرسنجی
========================= */

function vote(name){

  document.getElementById("voteResult")
    .innerHTML =
      `✅ رأی شما به <b>${safe(name)}</b> ثبت شد.`;
}


/* =========================
   تأیید بله / خیر
========================= */

function openConfirm(title,text,action){

  document.getElementById("confirmTitle")
    .innerText = title;

  document.getElementById("confirmText")
    .innerText = text;

  pendingAction = action;

  document.getElementById("confirmModal")
    .classList.add("show");
}


function confirmYes(){

  if(pendingAction){
    pendingAction();
  }

  pendingAction=null;

  document.getElementById("confirmModal")
    .classList.remove("show");
}


function confirmNo(){

  pendingAction=null;

  document.getElementById("confirmModal")
    .classList.remove("show");
}


/* =========================
   رندر همه
========================= */

function renderAll(){

  renderLeague();
  renderHonors(
    document.getElementById("honorSearch")?.value || ""
  );
  renderGames();
  renderNews();

  if(typeof renderAdminLeague === "function")
    renderAdminLeague();

  if(typeof renderAdminGames === "function")
    renderAdminGames();

  if(typeof renderAdminNews === "function")
    renderAdminNews();

  if(typeof renderAdminHonors === "function")
    renderAdminHonors();
}


renderAll();
