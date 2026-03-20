// ===== MiniFund App =====
const app = document.getElementById('app');

// ===== UTILITY =====
function renderSlider(value, onChange, large = false) {
  const pct = value;
  let zone, color, bg, msg, label;
  if (pct <= 3) { zone='basic'; color='#E8564A'; bg='#FDEDED'; msg=t('msg23'); label=t('basic'); }
  else if (pct <= 7) { zone='intermediate'; color='#F5A623'; bg='#FFF8E1'; msg=t('msg47'); label=t('intermediate'); }
  else { zone='advanced'; color='#6DC93A'; bg='#E8F5E9'; msg=t('msg810'); label=t('advanced'); }
  return `
    <div class="slider-container">
      <div class="slider-value" style="color:${color}">${pct}%</div>
      <div class="slider-zone-label" style="background:${bg};color:${color}">${label}</div>
      <input type="range" min="2" max="10" value="${pct}" class="savings-slider"
        style="background:linear-gradient(90deg,#E8564A 0%,#E8564A 12%,#F5A623 12%,#F5A623 62%,#6DC93A 62%,#6DC93A 100%)"
        oninput="${onChange}(this.value)">
      <div class="slider-labels"><span>2%</span><span>10%</span></div>
      <div class="slider-message">${msg}</div>
    </div>`;
}

function renderProgressBar(current, total, colorClass = 'progress-green') {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return `<div class="progress-bar-wrap"><div class="progress-bar ${colorClass}" style="width:${pct}%"></div></div>`;
}

function showConfetti() {
  const c = document.createElement('div');
  c.className = 'confetti-container';
  const colors = ['#6DC93A','#F4A7B9','#F5A623','#E8564A','#9C27B0','#2196F3'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100+'%';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay = Math.random()*2+'s';
    p.style.borderRadius = Math.random()>0.5?'50%':'2px';
    p.style.width = (6+Math.random()*8)+'px';
    p.style.height = (6+Math.random()*8)+'px';
    c.appendChild(p);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 4000);
}

// ===== NAVIGATION =====
function navigateTo(screen) {
  appState.currentScreen = screen;
  render();
}

function setTab(tab) {
  appState.currentTab = tab;
  const map = { home:'dashboard', alcancia:'alcancia-detail', friends:'friends', goals:'goals', profile:'profile' };
  appState.currentScreen = map[tab];
  render();
}

// ===== SPLASH =====
function renderSplash() {
  return `<div class="splash-screen" id="splash">
    <img src="assets/logo.png" class="splash-logo" alt="MiniFund">
    <div class="splash-title">MiniFund</div>
    <div class="splash-tagline">${t('tagline')}</div>
  </div>`;
}

// ===== ONBOARDING =====
let obStep = 0;
let obLang = 'es';
let obName = '';
let obPercent = 5;
let obGoalName = '';
let obGoalAmount = '';

function renderOnboarding() {
  if (obStep === 0) return renderLangSelect();
  if (obStep === 1) return renderNameInput();
  if (obStep === 2) return renderSlide1();
  if (obStep === 3) return renderSlide2();
  if (obStep === 4) return renderSlide3();
  if (obStep === 5) return renderSlide4();
  if (obStep === 6) return renderWelcome();
  return '';
}

function renderLangSelect() {
  return `<div class="onboarding-screen onboarding-green">
    <img src="assets/logo.png" class="ob-logo" alt="MiniFund">
    <div class="ob-title">${t('chooseLang')}</div>
    <div class="lang-grid">
      ${langMeta.map(l => `
        <div class="lang-option ${obLang===l.code?'selected':''}" onclick="selectLang('${l.code}')">
          <span class="lang-flag">${l.flag}</span> ${l.name}
        </div>`).join('')}
    </div>
    <button class="btn-white" onclick="obStep=1;render()">${t('continue')}</button>
  </div>`;
}

function selectLang(code) {
  obLang = code;
  appState.language = code;
  render();
}

function renderNameInput() {
  return `<div class="onboarding-screen onboarding-green">
    <img src="assets/logo.png" class="ob-logo" alt="MiniFund">
    <div class="ob-title">${t('whatName')}</div>
    <input type="text" class="ob-input" placeholder="${t('namePlaceholder')}" value="${obName}" oninput="obName=this.value" id="nameInput">
    <button class="btn-white" onclick="if(obName.trim()){appState.userName=obName.trim();obStep=2;render()}">${t('continue')}</button>
  </div>`;
}

function renderDots(active, total) {
  return `<div class="slide-dots">${Array.from({length:total},(_,i)=>`<div class="dot ${i===active?'active':''}"></div>`).join('')}</div>`;
}

function renderSlide1() {
  return `<div class="onboarding-screen onboarding-white">
    <div class="slide-container">
      <div class="slide-illustration">🐷💰</div>
      <div class="slide-title">${t('slide1Title')}</div>
      <div class="slide-text">${t('slide1Text')}</div>
      ${renderDots(0,4)}
    </div>
    <button class="btn-green" onclick="obStep=3;render()" style="margin-bottom:40px">${t('continue')}</button>
  </div>`;
}

function renderSlide2() {
  return `<div class="onboarding-screen onboarding-white">
    <div class="slide-container">
      <div class="slide-illustration">🐷🔒📅</div>
      <div class="slide-title">${t('slide2Title')}</div>
      <div class="slide-text">${t('slide2Text')}</div>
      <div class="slide-example">🛒 ${t('slide2Example')}</div>
      ${renderDots(1,4)}
    </div>
    <button class="btn-green" onclick="obStep=4;render()" style="margin-bottom:40px">${t('continue')}</button>
  </div>`;
}

function updateObPercent(val) { obPercent = parseInt(val); render(); }
function renderSlide3() {
  return `<div class="onboarding-screen onboarding-white">
    <div class="slide-container">
      <div class="slide-title">${t('slide3Title')}</div>
      ${renderSlider(obPercent, 'updateObPercent')}
      ${renderDots(2,4)}
    </div>
    <button class="btn-green" onclick="appState.savingsPercent=obPercent;obStep=5;render()" style="margin-bottom:40px">${t('continue')}</button>
  </div>`;
}

function renderSlide4() {
  return `<div class="onboarding-screen onboarding-white">
    <div class="slide-container">
      <div class="slide-title">${t('slide4Title')}</div>
      <div style="width:100%">
        <div class="form-group">
          <input class="form-input" placeholder="${t('goalNamePh')}" value="${obGoalName}" oninput="obGoalName=this.value">
        </div>
        <div class="form-group">
          <input class="form-input" type="number" placeholder="${t('goalAmountPh')}" value="${obGoalAmount}" oninput="obGoalAmount=this.value">
        </div>
        <div class="slide-text" style="font-size:12px;margin-top:8px">${t('addMoreGoals')}</div>
      </div>
      ${renderDots(3,4)}
    </div>
    <button class="btn-green" onclick="createObGoal()" style="margin-bottom:8px">${t('createGoal')}</button>
    <button class="btn-outline" onclick="obStep=6;render()" style="margin-bottom:40px">${t('skipForNow')}</button>
  </div>`;
}

function createObGoal() {
  if (obGoalName.trim() && obGoalAmount) {
    appState.goals.unshift({ name:obGoalName.trim(), emoji:'🎯', goal:parseInt(obGoalAmount), accumulated:0, shared:false });
  }
  obStep = 6; render();
}

function renderWelcome() {
  setTimeout(showConfetti, 500);
  return `<div class="onboarding-screen onboarding-green">
    <img src="assets/logo.png" class="ob-logo" style="width:120px;height:120px;border-radius:24px" alt="MiniFund">
    <div class="ob-title" style="font-size:28px;margin-top:20px">${t('allSet', {name: appState.userName})}</div>
    <div class="ob-title" style="font-size:14px;font-weight:400;opacity:0.9">${t('welcomeSub')}</div>
    <div style="font-size:80px;margin:20px 0;animation:piggyWiggle 1s ease infinite">🐷✨</div>
    <button class="btn-white" onclick="appState.onboardingDone=true;navigateTo('dashboard')">${t('goToDashboard')}</button>
  </div>`;
}

// ===== DASHBOARD =====
function renderDashboard() {
  const nextMonth = getNextMonth();
  const daysLeft = getDaysLeft();
  return `<div class="screen active" id="dashboard">
    <div class="dash-header">
      <div class="dash-header-left">
        <img src="assets/logo.png" class="dash-logo" alt="MF">
        <div class="dash-greeting">${t('hello', {name: appState.userName})}</div>
      </div>
      <div class="dash-notif">🔔<div class="notif-badge"></div></div>
    </div>
    <div class="card card-green">
      <div class="card-label">${t('availableBalance')}</div>
      <div class="card-amount">${formatCLP(appState.balance)}</div>
      <div class="card-sublabel">CLP</div>
    </div>
    <div class="card alcancia-card">
      <div class="alcancia-pig">🐷</div>
      <div style="font-size:13px;font-weight:600;color:var(--text-light)">${t('retainedThisMonth')}</div>
      <div class="alcancia-amount">${formatCLP(appState.alcanciaMonth)}</div>
      ${renderProgressBar(new Date().getDate(), new Date(2026,2,0).getDate(), 'progress-pink')}
      <div class="alcancia-lock">🔒 ${t('releasesOn', {month: nextMonth})}</div>
      <div class="countdown">${t('daysLeft', {days: daysLeft})}</div>
    </div>
    <div class="section-header">${t('sharedAlcancias')} <span class="section-link" onclick="setTab('friends');navigateTo('shared-alcancias')">${t('viewAll')}</span></div>
    ${appState.sharedAlcancias.slice(0,2).map(sa => renderSharedCardSmall(sa)).join('')}
    <div class="section-header">${t('myGoals')} <span class="section-link" onclick="setTab('goals')">${t('viewAllGoals')}</span></div>
    ${appState.goals.slice(0,2).map(g => renderGoalCard(g)).join('')}
    <div class="section-header">${t('lastTransactions')} <span class="section-link" onclick="navigateTo('transactions')">${t('viewAllTx')}</span></div>
    ${appState.transactions.slice(0,4).map(tx => renderTxItem(tx)).join('')}
  </div>`;
}

function renderSharedCardSmall(sa) {
  const pct = Math.round((sa.accumulated/sa.goal)*100);
  return `<div class="shared-card" onclick="showSharedDetail(${appState.sharedAlcancias.indexOf(sa)})">
    <div class="shared-top">
      <span class="shared-emoji">${sa.emoji}</span>
      <span class="shared-name">${sa.name}</span>
      <div class="avatars">
        ${sa.participants.map(p => `<div class="avatar" style="background:${p.color}">${p.initials}</div>`).join('')}
      </div>
    </div>
    <div class="goal-amounts">${formatCLP(sa.accumulated)} / <span>${formatCLP(sa.goal)}</span></div>
    ${renderProgressBar(sa.accumulated, sa.goal)}
    <div style="font-size:11px;color:var(--text-light);margin-top:4px">${pct}%</div>
  </div>`;
}

function renderGoalCard(g) {
  const pct = Math.round((g.accumulated/g.goal)*100);
  const done = g.accumulated >= g.goal;
  return `<div class="goal-card" onclick="showGoalDetail(${appState.goals.indexOf(g)})">
    <div class="goal-top">
      <span class="goal-emoji">${g.emoji}</span>
      <span class="goal-name">${g.name}</span>
      <span class="goal-badge ${done?'badge-achieved':'badge-progress'}">${done?'✅ '+t('achieved'):'🟡 '+t('inProgress')}</span>
      ${g.shared?`<span class="goal-badge badge-shared">🤝</span>`:''}
    </div>
    <div class="goal-amounts">${formatCLP(g.accumulated)} / <span>${formatCLP(g.goal)}</span></div>
    ${renderProgressBar(g.accumulated, g.goal)}
    <div style="font-size:11px;color:var(--text-light);margin-top:4px">${pct}%</div>
  </div>`;
}

function renderTxItem(tx) {
  return `<div class="tx-item">
    <div class="tx-icon">${tx.icon}</div>
    <div class="tx-info">
      <div class="tx-name">${tx.commerce}</div>
      <div class="tx-date">${tx.date}</div>
    </div>
    <div class="tx-right">
      <div class="tx-amount">-${formatCLP(tx.amount)}</div>
      ${tx.micro ? `<div class="tx-micro">✅ ${t('microExpense')}</div><div class="tx-alcancia">+${formatCLP(tx.alcancia)} ${t('toAlcancia')}</div>` : ''}
    </div>
  </div>`;
}

// ===== ALCANCIA DETAIL =====
function renderAlcanciaDetail() {
  const nextMonth = getNextMonth();
  const daysLeft = getDaysLeft();
  return `<div class="screen active">
    <div class="detail-header">
      <div class="detail-title">${t('alcanciaTitle')}</div>
    </div>
    <div class="alcancia-detail-hero">
      <div class="alcancia-big-pig">🐷</div>
      <div style="font-size:13px;color:var(--text-light)">${t('totalThisMonth')}</div>
      <div class="alcancia-detail-amount">${formatCLP(appState.alcanciaMonth)}</div>
      <div style="margin:16px 20px">
        ${renderProgressBar(new Date().getDate(), 31, 'progress-pink')}
        <div class="countdown" style="justify-content:center">🔒 ${t('releasesOn', {month: nextMonth})} · ${t('daysLeft', {days: daysLeft})}</div>
      </div>
    </div>
    <div class="section-header">${t('breakdown')}</div>
    ${appState.microBreakdown.map(m => `
      <div class="tx-item">
        <div class="tx-icon">🐷</div>
        <div class="tx-info"><div class="tx-name">${m.commerce}</div><div class="tx-date">${m.date}</div></div>
        <div class="tx-right"><div class="tx-amount" style="color:var(--green)">+${formatCLP(m.amount)}</div></div>
      </div>`).join('')}
    <div class="section-header">${t('previousMonths')}</div>
    ${appState.previousAlcancias.map(p => `
      <div class="history-item">
        <span class="history-month">${p.month}</span>
        <span class="history-amount">${formatCLP(p.amount)}</span>
      </div>`).join('')}
  </div>`;
}

// ===== FRIENDS =====
let showAddFriendModal = false;
function renderFriends() {
  return `<div class="screen active">
    <div class="detail-header">
      <div class="detail-title">${t('myFriends')}</div>
      <button class="add-btn" onclick="showAddFriendModal=true;render()">+</button>
    </div>
    ${appState.friends.map(f => `
      <div class="friend-item">
        <div class="friend-avatar" style="background:${f.color}">${f.initials}</div>
        <div class="friend-info">
          <div class="friend-name">${f.name}</div>
          <div class="friend-status ${f.status==='active'?'friend-active':'friend-pending'}">
            ${f.status==='active'?'✅ '+t('activeInMiniFund'):'⏳ '+t('pendingRequest')}
          </div>
        </div>
      </div>`).join('')}
    ${appState.friendRequests.length ? `
      <div class="section-header">${t('receivedRequests')}</div>
      ${appState.friendRequests.map(f => `
        <div class="friend-item">
          <div class="friend-avatar" style="background:${f.color}">${f.initials}</div>
          <div class="friend-info"><div class="friend-name">${f.name}</div></div>
          <div style="display:flex;gap:8px">
            <button class="btn-green" style="padding:8px 16px;font-size:12px" onclick="acceptFriend('${f.name}')">${t('accept')}</button>
            <button class="btn-outline" style="padding:8px 12px;font-size:12px" onclick="rejectFriend('${f.name}')">${t('reject')}</button>
          </div>
        </div>`).join('')}
    ` : ''}
    ${showAddFriendModal ? renderAddFriendModal() : ''}
  </div>`;
}

function acceptFriend(name) {
  const idx = appState.friendRequests.findIndex(f => f.name === name);
  if (idx >= 0) {
    const f = appState.friendRequests.splice(idx, 1)[0];
    appState.friends.push({ ...f, status: 'active' });
    render();
  }
}
function rejectFriend(name) {
  appState.friendRequests = appState.friendRequests.filter(f => f.name !== name);
  render();
}

function renderAddFriendModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this){showAddFriendModal=false;render()}">
    <div class="modal-content">
      <div class="modal-handle"></div>
      <div class="modal-title">${t('addFriend')}</div>
      <div class="modal-option"><span class="modal-option-icon">🔵</span> Google</div>
      <div class="modal-option"><span class="modal-option-icon">🍎</span> Apple</div>
      <div class="modal-option"><span class="modal-option-icon">📱</span> ${t('phoneNumber')}</div>
      <div class="modal-option"><span class="modal-option-icon">📧</span> ${t('email')}</div>
      <div class="modal-option"><span class="modal-option-icon">🔗</span> ${t('inviteLink')}</div>
      <div class="modal-option"><span class="modal-option-icon">👥</span> ${t('phoneContacts')}</div>
    </div>
  </div>`;
}

// ===== SHARED ALCANCIAS =====
let showCreateShared = false;
let sharedDetailIdx = -1;
function renderSharedAlcancias() {
  if (sharedDetailIdx >= 0) return renderSharedDetailView();
  return `<div class="screen active">
    <div class="detail-header">
      <div class="detail-title">${t('sharedAlcanciasTitle')}</div>
      <button class="add-btn" onclick="showCreateShared=true;render()">+</button>
    </div>
    ${appState.sharedAlcancias.map((sa,i) => `
      <div class="shared-card" onclick="showSharedDetail(${i})">
        <div class="shared-top">
          <span class="shared-emoji">${sa.emoji}</span>
          <span class="shared-name">${sa.name}</span>
        </div>
        <div class="avatars" style="margin-bottom:8px">
          ${sa.participants.map(p => `<div class="avatar" style="background:${p.color}">${p.initials}</div>`).join('')}
          <span style="font-size:11px;color:var(--text-light);margin-left:8px">${sa.participants.length} ${t('participants')}</span>
        </div>
        <div class="goal-amounts">${t('groupGoal')}: <span>${formatCLP(sa.goal)}</span></div>
        <div class="goal-amounts">${t('accumulated')}: <span>${formatCLP(sa.accumulated)}</span></div>
        ${renderProgressBar(sa.accumulated, sa.goal)}
        <div style="font-size:11px;color:var(--text-light);margin-top:4px">🔒 ${t('releasesOn', {month: getNextMonth()})}</div>
      </div>`).join('')}
    ${showCreateShared ? renderCreateSharedModal() : ''}
  </div>`;
}

function showSharedDetail(i) { sharedDetailIdx = i; appState.currentScreen = 'shared-alcancias'; render(); }

function renderSharedDetailView() {
  const sa = appState.sharedAlcancias[sharedDetailIdx];
  if (!sa) { sharedDetailIdx = -1; return renderSharedAlcancias(); }
  return `<div class="screen active">
    <div class="detail-header">
      <button class="back-btn" onclick="sharedDetailIdx=-1;render()">←</button>
      <div class="detail-title">${sa.emoji} ${sa.name}</div>
    </div>
    <div class="card" style="text-align:center">
      <div style="font-size:48px;margin-bottom:8px">${sa.emoji}</div>
      <div class="goal-amounts">${formatCLP(sa.accumulated)} / <span>${formatCLP(sa.goal)}</span></div>
      ${renderProgressBar(sa.accumulated, sa.goal)}
      <div style="font-size:12px;color:var(--text-light);margin-top:8px">🔒 ${t('releasesOn', {month: getNextMonth()})}</div>
    </div>
    <div class="section-header">${t('individualContributions')}</div>
    ${sa.participants.map(p => `
      <div class="friend-item">
        <div class="friend-avatar" style="background:${p.color}">${p.initials}</div>
        <div class="friend-info"><div class="friend-name">${p.name}</div></div>
        <div style="font-weight:800;color:var(--green)">${formatCLP(p.contribution)}</div>
      </div>`).join('')}
  </div>`;
}

function renderCreateSharedModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this){showCreateShared=false;render()}">
    <div class="modal-content">
      <div class="modal-handle"></div>
      <div class="modal-title">${t('createShared')}</div>
      <div class="form-group"><div class="form-label">${t('sharedName')}</div><input class="form-input" placeholder=""></div>
      <div class="form-group">
        <div class="form-label">Emoji</div>
        <div class="emoji-grid">
          ${[['✈️',t('trip')],['🎂',t('birthday')],['🏠',t('home')],['🎉',t('celebration')],['🎁',t('other')]].map(([e,l])=>`
            <div class="emoji-option" onclick="this.parentNode.querySelectorAll('.emoji-option').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')">
              <span>${e}</span><span>${l}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="form-group"><div class="form-label">${t('sharedGoalAmount')}</div><input class="form-input" type="number" placeholder="$"></div>
      <div class="form-group"><div class="form-label">${t('inviteParticipants')}</div>
        ${appState.friends.filter(f=>f.status==='active').map(f=>`
          <div class="modal-option"><span style="font-size:18px">${f.initials}</span> ${f.name}</div>`).join('')}
      </div>
      <button class="btn-green w-full" onclick="showCreateShared=false;render()" style="margin-top:12px">${t('createShared')}</button>
    </div>
  </div>`;
}

// ===== GOALS =====
let showCreateGoal = false;
let goalDetailIdx = -1;
function renderGoals() {
  if (goalDetailIdx >= 0) return renderGoalDetailView();
  return `<div class="screen active">
    <div class="detail-header">
      <div class="detail-title">${t('myGoalsTitle')}</div>
      <button class="add-btn" onclick="showCreateGoal=true;render()">+</button>
    </div>
    ${appState.goals.map((g,i) => {
      const pct = Math.round((g.accumulated/g.goal)*100);
      const done = g.accumulated >= g.goal;
      return `<div class="goal-card" onclick="goalDetailIdx=${i};render()">
        <div class="goal-top">
          <span class="goal-emoji">${g.emoji}</span>
          <span class="goal-name">${g.name}</span>
          <span class="goal-badge ${done?'badge-achieved':'badge-progress'}">${done?'✅ '+t('achieved'):'🟡 '+t('inProgress')}</span>
          ${g.shared?`<span class="goal-badge badge-shared">🤝 ${t('shared')}</span>`:`<span class="goal-badge" style="background:#f0f0f0;color:#666">${t('personal')}</span>`}
        </div>
        <div class="goal-amounts">${formatCLP(g.accumulated)} / <span>${formatCLP(g.goal)}</span></div>
        ${renderProgressBar(g.accumulated, g.goal)}
        <div style="font-size:11px;color:var(--text-light);margin-top:4px">${pct}%</div>
      </div>`;
    }).join('')}
    ${showCreateGoal ? renderCreateGoalModal() : ''}
  </div>`;
}

function showGoalDetail(i) { goalDetailIdx = i; appState.currentScreen = 'goals'; appState.currentTab = 'goals'; render(); }

function renderGoalDetailView() {
  const g = appState.goals[goalDetailIdx];
  if (!g) { goalDetailIdx = -1; return renderGoals(); }
  const pct = Math.round((g.accumulated/g.goal)*100);
  return `<div class="screen active">
    <div class="detail-header">
      <button class="back-btn" onclick="goalDetailIdx=-1;render()">←</button>
      <div class="detail-title">${g.emoji} ${g.name}</div>
    </div>
    <div class="card" style="text-align:center">
      <div style="font-size:48px;margin-bottom:8px">${g.emoji}</div>
      <div class="goal-amounts" style="font-size:16px">${formatCLP(g.accumulated)} / <span>${formatCLP(g.goal)}</span></div>
      ${renderProgressBar(g.accumulated, g.goal)}
      <div style="font-size:14px;font-weight:800;color:var(--green);margin-top:8px">${pct}%</div>
    </div>
    <div class="section-header">${t('contributionHistory')}</div>
    ${[{m:'Mar 2026',a:12400},{m:'Feb 2026',a:45000},{m:'Ene 2026',a:38000}].map(h=>`
      <div class="history-item"><span class="history-month">${h.m}</span><span class="history-amount">+${formatCLP(h.a)}</span></div>`).join('')}
  </div>`;
}

function renderCreateGoalModal() {
  return `<div class="modal-overlay" onclick="if(event.target===this){showCreateGoal=false;render()}">
    <div class="modal-content">
      <div class="modal-handle"></div>
      <div class="modal-title">${t('createGoalBtn')}</div>
      <div class="form-group"><div class="form-label">${t('goalName')}</div><input class="form-input" placeholder="" id="newGoalName"></div>
      <div class="form-group">
        <div class="form-label">Emoji</div>
        <div class="emoji-grid">
          ${[['✈️',t('trip')],['📱',t('tech')],['🛡️',t('emergency')],['🏠',t('home')],['🎁',t('other')]].map(([e,l])=>`
            <div class="emoji-option" onclick="this.parentNode.querySelectorAll('.emoji-option').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')">
              <span>${e}</span><span>${l}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="form-group"><div class="form-label">${t('howMuchNeeded')}</div><input class="form-input" type="number" placeholder="$" id="newGoalAmt"></div>
      <button class="btn-green w-full" onclick="showCreateGoal=false;render()" style="margin-top:12px">${t('createGoalBtn')}</button>
    </div>
  </div>`;
}

// ===== TRANSACTIONS =====
let txFilter = 'all';
let txSearch = '';
function renderTransactions() {
  let filtered = [...appState.transactions];
  if (txFilter === 'micro') filtered = filtered.filter(t => t.micro);
  if (txSearch) filtered = filtered.filter(t => t.commerce.toLowerCase().includes(txSearch.toLowerCase()));
  return `<div class="screen active">
    <div class="detail-header">
      <button class="back-btn" onclick="navigateTo('dashboard');appState.currentTab='home'">←</button>
      <div class="detail-title">${t('transactionsTitle')}</div>
    </div>
    <div class="filter-tabs">
      <button class="filter-tab ${txFilter==='all'?'active':''}" onclick="txFilter='all';render()">${t('all')}</button>
      <button class="filter-tab ${txFilter==='micro'?'active':''}" onclick="txFilter='micro';render()">${t('onlyMicro')}</button>
      <button class="filter-tab ${txFilter==='month'?'active':''}" onclick="txFilter='month';render()">${t('byMonth')}</button>
    </div>
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input class="search-input" placeholder="${t('searchCommerce')}" value="${txSearch}" oninput="txSearch=this.value;render()">
    </div>
    ${filtered.map(tx => renderTxItem(tx)).join('')}
  </div>`;
}

// ===== PROFILE =====
let showLangModal = false;
function updateProfilePercent(val) { appState.savingsPercent = parseInt(val); render(); }
function renderProfile() {
  const initial = appState.userName ? appState.userName[0].toUpperCase() : 'U';
  return `<div class="screen active">
    <div class="profile-header">
      <div class="profile-pic">${initial}</div>
      <div class="profile-name">${appState.userName} <span class="profile-edit" onclick="editName()">✏️</span></div>
      <div class="profile-email">${t('linkedEmail')}: valentina@email.com</div>
    </div>
    <div class="profile-section-title">${t('mySavings')}</div>
    <div style="padding:0 20px">
      ${renderSlider(appState.savingsPercent, 'updateProfilePercent')}
    </div>
    <div class="profile-section-title">${t('microExpenseSection')}</div>
    <div style="padding:0 20px">
      <div class="form-input form-readonly" style="margin-bottom:8px">${t('microThreshold')}</div>
      <div style="font-size:11px;color:var(--text-light)">${t('thresholdFixed')}</div>
    </div>
    <div class="profile-section-title">${t('language')}</div>
    <div class="toggle-row" onclick="showLangModal=true;render()">
      <div class="toggle-label">${langMeta.find(l=>l.code===appState.language)?.flag} ${langMeta.find(l=>l.code===appState.language)?.name}</div>
      <span style="color:var(--green);font-weight:700;cursor:pointer">${t('changeLang')} →</span>
    </div>
    <div class="profile-section-title">${t('general')}</div>
    <div class="toggle-row">
      <div class="toggle-label">${t('pushNotifications')}</div>
      <div class="toggle ${appState.pushNotifications?'on':''}" onclick="appState.pushNotifications=!appState.pushNotifications;render()">
        <div class="toggle-knob"></div>
      </div>
    </div>
    <div class="toggle-row">
      <div class="toggle-label">${t('darkMode')}</div>
      <div class="toggle ${appState.darkMode?'on':''}" onclick="toggleDarkMode()">
        <div class="toggle-knob"></div>
      </div>
    </div>
    <div style="padding:20px">
      <button class="btn-green w-full" style="background:var(--red)" onclick="navigateTo('splash');obStep=0;appState.onboardingDone=false">${t('logout')}</button>
    </div>
    ${showLangModal ? renderLangModalProfile() : ''}
  </div>`;
}

function editName() {
  const newName = prompt('', appState.userName);
  if (newName && newName.trim()) { appState.userName = newName.trim(); render(); }
}

function toggleDarkMode() {
  appState.darkMode = !appState.darkMode;
  document.body.classList.toggle('dark-mode', appState.darkMode);
  render();
}

function renderLangModalProfile() {
  return `<div class="modal-overlay" onclick="if(event.target===this){showLangModal=false;render()}">
    <div class="modal-content">
      <div class="modal-handle"></div>
      <div class="modal-title">${t('changeLang')}</div>
      <div class="lang-grid" style="padding:0">
        ${langMeta.map(l => `
          <div class="lang-option ${appState.language===l.code?'selected':''}" style="color:var(--text-main);background:var(--bg-card)" onclick="appState.language='${l.code}';showLangModal=false;render()">
            <span class="lang-flag">${l.flag}</span> ${l.name}
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ===== TAB BAR =====
function renderTabBar() {
  const tabs = [
    { id:'home', icon:'🏠', label:t('tabHome') },
    { id:'alcancia', icon:'🐷', label:t('tabAlcancia') },
    { id:'friends', icon:'🤝', label:t('tabFriends') },
    { id:'goals', icon:'🎯', label:t('tabGoals') },
    { id:'profile', icon:'⚙️', label:t('tabProfile') },
  ];
  return `<div class="tab-bar">
    ${tabs.map(tab => `
      <div class="tab-item ${appState.currentTab===tab.id?'active':''}" onclick="setTab('${tab.id}')">
        <span class="tab-icon">${tab.icon}</span>${tab.label}
      </div>`).join('')}
  </div>`;
}

// ===== MAIN RENDER =====
function render() {
  const s = appState.currentScreen;
  let html = '';
  if (s === 'splash') {
    html = renderSplash();
    setTimeout(() => { if (appState.currentScreen === 'splash') { navigateTo('onboarding'); } }, 2500);
  } else if (s === 'onboarding') {
    html = renderOnboarding();
  } else if (s === 'dashboard') {
    html = renderDashboard() + renderTabBar();
  } else if (s === 'alcancia-detail') {
    html = renderAlcanciaDetail() + renderTabBar();
  } else if (s === 'friends') {
    html = renderFriends() + renderTabBar();
  } else if (s === 'shared-alcancias') {
    html = renderSharedAlcancias() + renderTabBar();
  } else if (s === 'goals') {
    html = renderGoals() + renderTabBar();
  } else if (s === 'transactions') {
    html = renderTransactions() + renderTabBar();
  } else if (s === 'profile') {
    html = renderProfile() + renderTabBar();
  }
  app.innerHTML = html;

  // Style sliders
  document.querySelectorAll('.savings-slider').forEach(sl => {
    const val = parseInt(sl.value);
    let thumbColor;
    if (val <= 3) thumbColor = '#E8564A';
    else if (val <= 7) thumbColor = '#F5A623';
    else thumbColor = '#6DC93A';
    sl.style.setProperty('--thumb-color', thumbColor);
    const style = document.createElement('style');
    style.textContent = `input[type=range]::-webkit-slider-thumb{background:${thumbColor}}`;
    sl.parentNode.appendChild(style);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => { render(); });
