/* =========================
   ورود مدیریت
========================= */

const ADMIN_PASSWORD = "Taha92mm";


function loginAdmin(){

  const password =
    document.getElementById("adminPassword").value;

  if(password === ADMIN_PASSWORD){

    document.getElementById("loginBox")
      .style.display="none";

    document.getElementById("adminPanel")
      .style.display="block";

    document.getElementById("loginError")
      .innerText="";

    renderAll();

  }else{

    document.getElementById("loginError")
      .innerText="❌ رمز مدیریت اشتباه است.";

  }
}


function logoutAdmin(){

  document.getElementById("loginBox")
    .style.display="block";

  document.getElementById("adminPanel")
    .style.display="none";

  document.getElementById("adminPassword")
    .value="";
}


/* =========================
   مدیریت جدول
========================= */

function addLeaguePlayer(){

  const name =
    document.getElementById("leagueName")
      .value.trim();

  if(!name){

    alert("نام مربی / تیم را وارد کنید.");
    return;
  }

  league.push({

    name:name,

    games:Number(
      document.getElementById("leagueGames").value
    ) || 0,

    wins:Number(
      document.getElementById("leagueWins").value
    ) || 0,

    draws:Number(
      document.getElementById("leagueDraws").value
    ) || 0,

    losses:Number(
      document.getElementById("leagueLosses").value
    ) || 0,

    points:Number(
      document.getElementById("leaguePoints").value
    ) || 0

  });

  saveData();
  renderAll();

  [
    "leagueName",
    "leagueGames",
    "leagueWins",
    "leagueDraws",
    "leagueLosses",
    "leaguePoints"
  ].forEach(id=>{
    document.getElementById(id).value="";
  });

  alert("✅ بازیکن به جدول اضافه شد.");
}


function renderAdminLeague(){

  const box =
    document.getElementById("adminLeague");

  if(league.length===0){

    box.innerHTML =
      `<div class="empty">جدول خالی است.</div>`;

    return;
  }

  box.innerHTML =
    league.map((p,i)=>`

      <div class="admin-row">

        <div>

          <b>${safe(p.name)}</b>

          <br>

          بازی: ${p.games}
          | برد: ${p.wins}
          | مساوی: ${p.draws}
          | باخت: ${p.losses}

          <br>

          امتیاز:
          <b>${p.points}</b>

        </div>

        <div class="actions">

          <button
            class="btn small"
            onclick="editLeague(${i})"
          >
            ✏️ ویرایش
          </button>

          <button
            class="btn red small"
            onclick="deleteLeague(${i})"
          >
            🗑️ حذف
          </button>

        </div>

      </div>

    `).join("");
}


function editLeague(i){

  const p=league[i];

  const name=prompt("نام مربی / تیم:",p.name);
  if(name===null)return;

  const games=prompt("تعداد بازی:",p.games);
  if(games===null)return;

  const wins=prompt("برد:",p.wins);
  if(wins===null)return;

  const draws=prompt("مساوی:",p.draws);
  if(draws===null)return;

  const losses=prompt("باخت:",p.losses);
  if(losses===null)return;

  const points=prompt("امتیاز:",p.points);
  if(points===null)return;

  openConfirm(
    "✏️ تأیید ویرایش",
    "آیا از ویرایش اطلاعات این تیم مطمئن هستید؟",
    ()=>{

      league[i]={
        name:name,
        games:Number(games)||0,
        wins:Number(wins)||0,
        draws:Number(draws)||0,
        losses:Number(losses)||0,
        points:Number(points)||0
      };

      saveData();
      renderAll();
    }
  );
}


function deleteLeague(i){

  openConfirm(
    "🗑️ تأیید حذف",
    "آیا مطمئن هستید که این تیم از جدول حذف شود؟",
    ()=>{

      league.splice(i,1);

      saveData();
      renderAll();

    }
  );
}


/* =========================
   مدیریت بازی
========================= */

function addGame(){

  const team1 =
    document.getElementById("gameTeam1")
      .value.trim();

  const team2 =
    document.getElementById("gameTeam2")
      .value.trim();

  if(!team1 || !team2){

    alert("نام هر دو تیم را وارد کنید.");
    return;
  }

  games.push({

    team1:team1,
    team2:team2,

    score1:Number(
      document.getElementById("gameScore1").value
    ) || 0,

    score2:Number(
      document.getElementById("gameScore2").value
    ) || 0

  });

  saveData();
  renderAll();

  [
    "gameTeam1",
    "gameTeam2",
    "gameScore1",
    "gameScore2"
  ].forEach(id=>{
    document.getElementById(id).value="";
  });

  alert("✅ بازی اضافه شد.");
}


function renderAdminGames(){

  const box =
    document.getElementById("adminGames");

  if(games.length===0){

    box.innerHTML =
      `<div class="empty">بازی‌ای ثبت نشده است.</div>`;

    return;
  }

  box.innerHTML =
    games.map((g,i)=>`

      <div class="admin-row">

        <div>
          <b>${safe(g.team1)}</b>
          <strong>
            ${g.score1} - ${g.score2}
          </strong>
          <b>${safe(g.team2)}</b>
        </div>

        <div class="actions">

          <button
            class="btn small"
            onclick="editGame(${i})"
          >
            ✏️ ویرایش
          </button>

          <button
            class="btn red small"
            onclick="deleteGame(${i})"
          >
            🗑️ حذف
          </button>

        </div>

      </div>

    `).join("");
}


function editGame(i){

  const g=games[i];

  const team1=prompt("تیم اول:",g.team1);
  if(team1===null)return;

  const team2=prompt("تیم دوم:",g.team2);
  if(team2===null)return;

  const score1=prompt("گل تیم اول:",g.score1);
  if(score1===null)return;

  const score2=prompt("گل تیم دوم:",g.score2);
  if(score2===null)return;

  openConfirm(
    "✏️ تأیید ویرایش بازی",
    "آیا از تغییر نتیجه این بازی مطمئن هستید؟",
    ()=>{

      games[i]={
        team1:team1,
        team2:team2,
        score1:Number(score1)||0,
        score2:Number(score2)||0
      };

      saveData();
      renderAll();

    }
  );
}


function deleteGame(i){

  openConfirm(
    "🗑️ تأیید حذف بازی",
    "آیا مطمئن هستید این بازی حذف شود؟",
    ()=>{

      games.splice(i,1);

      saveData();
      renderAll();

    }
  );
}


/* =========================
   مدیریت اخبار
========================= */

function addNews(){

  const title =
    document.getElementById("newsTitle")
      .value.trim();

  const text =
    document.getElementById("newsText")
      .value.trim();

  if(!title || !text){

    alert("عنوان و متن خبر را وارد کنید.");
    return;
  }

  news.unshift({

    title:title,
    text:text,

    date:new Date()
      .toLocaleDateString("fa-IR")

  });

  saveData();
  renderAll();

  document.getElementById("newsTitle").value="";
  document.getElementById("newsText").value="";

  alert("✅ خبر منتشر شد.");
}


function renderAdminNews(){

  const box =
    document.getElementById("adminNews");

  if(news.length===0){

    box.innerHTML =
      `<div class="empty">خبری وجود ندارد.</div>`;

    return;
  }

  box.innerHTML =
    news.map((n,i)=>`

      <div class="admin-row">

        <div>
          <b>${safe(n.title)}</b>
          <br>
          <small>${safe(n.date)}</small>
        </div>

        <div class="actions">

          <button
            class="btn small"
            onclick="editNews(${i})"
          >
            ✏️ ویرایش
          </button>

          <button
            class="btn red small"
            onclick="deleteNews(${i})"
          >
            🗑️ حذف
          </button>

        </div>

      </div>

    `).join("");
}


function editNews(i){

  const n=news[i];

  const title=prompt("عنوان خبر:",n.title);
  if(title===null)return;

  const text=prompt("متن خبر:",n.text);
  if(text===null)return;

  openConfirm(
    "✏️ تأیید ویرایش خبر",
    "آیا از ویرایش این خبر مطمئن هستید؟",
    ()=>{

      news[i].title=title;
      news[i].text=text;

      saveData();
      renderAll();

    }
  );
}


function deleteNews(i){

  openConfirm(
    "🗑️ تأیید حذف خبر",
    "آیا مطمئن هستید این خبر حذف شود؟",
    ()=>{

      news.splice(i,1);

      saveData();
      renderAll();

    }
  );
}


/* =========================
   مدیریت افتخارات
========================= */

function addHonor(){

  const name =
    document.getElementById("honorName")
      .value.trim();

  const score =
    Number(
      document.getElementById("honorScore").value
    );

  if(!name || Number.isNaN(score)){

    alert("نام و امتیاز را وارد کنید.");
    return;
  }

  const index =
    honors.findIndex(p=>p[0]===name);

  if(index>=0){

    openConfirm(
      "✏️ تغییر امتیاز",
      "این مربی وجود دارد. آیا امتیازش تغییر کند؟",
      ()=>{

        honors[index][1]=score;

        saveData();
        renderAll();

      }
    );

  }else{

    honors.push([name,score]);

    saveData();
    renderAll();

  }

  document.getElementById("honorName").value="";
  document.getElementById("honorScore").value="";
}


function renderAdminHonors(){

  const box =
    document.getElementById("adminHonors");

  if(honors.length===0){

    box.innerHTML =
      `<div class="empty">افتخاری وجود ندارد.</div>`;

    return;
  }

  box.innerHTML =
    honors.map((p,i)=>`

      <div class="admin-row">

        <div>
          <b>${safe(p[0])}</b>
          <br>
          ${p[1]} ★
        </div>

        <div class="actions">

          <button
            class="btn small"
            onclick="editHonor(${i})"
          >
            ✏️ ویرایش
          </button>

          <button
            class="btn red small"
            onclick="deleteHonor(${i})"
          >
            🗑️ حذف
          </button>

        </div>

      </div>

    `).join("");
}


function editHonor(i){

  const name =
    prompt("نام مربی:",honors[i][0]);

  if(name===null)return;

  const score =
    prompt("امتیاز:",honors[i][1]);

  if(score===null)return;

  openConfirm(
    "✏️ تأیید ویرایش افتخار",
    "آیا از ویرایش این افتخار مطمئن هستید؟",
    ()=>{

      honors[i]=[
        name,
        Number(score)||0
      ];

      saveData();
      renderAll();

    }
  );
}


function deleteHonor(i){

  openConfirm(
    "🗑️ تأیید حذف افتخار",
    "آیا مطمئن هستید این مورد حذف شود؟",
    ()=>{

      honors.splice(i,1);

      saveData();
      renderAll();

    }
  );
                    }
