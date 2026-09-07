<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#071f1a">
<title>ملك | تواصل بلا حدود</title>
<style>
:root{--bg:#071b18;--panel:#0b2622;--panel2:#10322d;--line:#173d37;--green:#16d47b;--text:#f4faf7;--muted:#91aaa3;--bubble:#17332f;--mine:#0b6f4c}
[data-theme=light]{--bg:#f5f8f7;--panel:#fff;--panel2:#edf5f2;--line:#dce9e5;--text:#10221e;--muted:#657872;--bubble:#e9f1ef;--mine:#c8f5df}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:100%;height:100%;font-family:system-ui,-apple-system,"Segoe UI",Tahoma,Arial,sans-serif;background:#041310;color:var(--text)}
button,input{font:inherit}button{cursor:pointer;border:0}body{display:flex;align-items:center;justify-content:center}
.app{width:min(1180px,100%);height:min(900px,100%);background:var(--bg);display:grid;grid-template-columns:360px 1fr;overflow:hidden}
.sidebar{background:var(--panel);border-left:1px solid var(--line);display:flex;flex-direction:column}.brand{padding:18px;display:flex;align-items:center;justify-content:space-between}.logo{display:flex;align-items:center;gap:9px;font-weight:900;font-size:25px}.crown{color:var(--green);font-size:29px}
.iconbtn{width:42px;height:42px;border-radius:50%;background:transparent;color:var(--text);font-size:21px}.iconbtn:hover{background:#ffffff12}
.search{margin:0 14px 12px;background:var(--panel2);border:1px solid var(--line);border-radius:14px;padding:0 12px}.search input{width:100%;height:44px;background:none;border:0;outline:0;color:var(--text)}
.tabs{display:flex;gap:7px;padding:0 14px 12px;overflow:auto}.tab{white-space:nowrap;background:var(--panel2);color:var(--muted);border-radius:20px;padding:8px 13px}.tab.active{background:var(--green);color:#032116;font-weight:800}
.chats{overflow:auto;flex:1}.chat{display:flex;gap:12px;align-items:center;padding:13px 16px;border-bottom:1px solid var(--line)}.chat:hover,.chat.active{background:var(--panel2)}
.avatar{width:51px;height:51px;min-width:51px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#294c45,#122f2a);color:#fff;font-weight:800;overflow:hidden}.chatmain{min-width:0;flex:1}.row{display:flex;justify-content:space-between;gap:8px}.name{font-weight:800}.time{font-size:11px;color:var(--muted)}.preview{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:4px}.badge{background:var(--green);color:#032116;border-radius:20px;min-width:21px;height:21px;padding:0 6px;display:grid;place-items:center;font-size:11px;font-weight:900}
.main{min-width:0;display:flex;flex-direction:column;background:var(--bg);position:relative}.empty{flex:1;display:grid;place-items:center;text-align:center;background:radial-gradient(circle at center,#10332d,#061714 55%)}.empty h1{font-size:38px;margin:8px}.empty p{color:#91aaa3}
.chathead{height:76px;background:var(--panel);border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 16px;gap:12px}.back{display:none}.headinfo{flex:1}.status{font-size:12px;color:var(--green)}.messages{flex:1;overflow:auto;padding:22px 6%;background-color:var(--bg);background-image:radial-gradient(#16433b 1px,transparent 1px);background-size:18px 18px}.day{text-align:center;margin:8px auto 18px;background:var(--panel2);color:var(--muted);border-radius:14px;padding:6px 12px;width:max-content;font-size:12px}.msg{display:flex;margin:6px 0}.msg.mine{justify-content:flex-start}.msg.theirs{justify-content:flex-end}.bubble{max-width:min(72%,520px);padding:9px 12px;border-radius:14px;box-shadow:0 2px 5px #0003}.mine .bubble{background:var(--mine);border-top-right-radius:4px}.theirs .bubble{background:var(--bubble);border-top-left-radius:4px}.meta{font-size:10px;color:var(--muted);display:inline-flex;gap:5px;margin-right:9px;float:left}.checks{color:#2bbd91}
.composer{padding:10px 12px;background:var(--panel);border-top:1px solid var(--line);display:flex;gap:8px;align-items:center}.compose{flex:1;background:var(--panel2);border:1px solid var(--line);border-radius:22px}.compose input{width:100%;height:44px;border:0;background:none;color:var(--text);outline:0;padding:0 14px}.send{width:44px;height:44px;border-radius:50%;background:var(--green);color:#032116;font-weight:900}
.profile{position:absolute;inset:0;background:var(--bg);z-index:10;display:none;flex-direction:column}.profile.show{display:flex}.profiletop{padding:16px;display:flex;gap:10px;align-items:center;background:var(--panel)}.profilebody{padding:25px}.bigavatar{width:110px;height:110px;border-radius:50%;margin:10px auto 20px;display:grid;place-items:center;background:#123d35;color:#fff;font-size:40px}.card{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:16px;margin:12px 0}.card label{display:block;color:var(--muted);font-size:12px;margin-bottom:5px}
.login{position:fixed;inset:0;background:linear-gradient(145deg,#031510,#0b3028);z-index:50;display:flex;align-items:center;justify-content:center;padding:20px}.loginbox{width:min(430px,100%);background:#09231f;border:1px solid #1a4b41;border-radius:28px;padding:30px;box-shadow:0 18px 50px #0007;text-align:center;color:#fff}.loginlogo{font-size:55px;color:var(--green)}.login h1{font-size:35px}.login p{color:#91aaa3;margin:4px 0 15px}.field{margin:10px 0;background:#0d302b;border:1px solid #1a4a41;border-radius:14px;padding:0 13px}.field input{width:100%;height:50px;border:0;outline:0;background:none;color:#fff}.primary,.google{width:100%;height:50px;border-radius:14px;font-weight:900;margin-top:8px}.primary{background:var(--green);color:#032116}.google{background:#fff;color:#15231f}.switch{margin-top:14px;color:#b7cbc5;font-size:13px}.switch button{background:none;color:var(--green);font-weight:800}.hint{font-size:11px;color:#718b84;margin-top:14px;line-height:1.7}.toast{position:fixed;bottom:24px;right:24px;background:#102f2a;border:1px solid #236056;color:#fff;padding:12px 16px;border-radius:14px;opacity:0;transform:translateY(15px);pointer-events:none;transition:.25s;z-index:100}.toast.show{opacity:1;transform:none}
@media(max-width:760px){body{align-items:stretch}.app{height:100%;grid-template-columns:1fr}.main{display:none}.app.openchat .sidebar{display:none}.app.openchat .main{display:flex}.back{display:block}.messages{padding:18px 4%}.bubble{max-width:82%}}
</style>
</head>
<body data-theme="dark">

<div class="app" id="app">
<aside class="sidebar">
<div class="brand"><div class="logo"><span class="crown">♛</span> ملك</div><div><button class="iconbtn" onclick="newChat()">＋</button><button class="iconbtn" onclick="showProfile()">⋮</button></div></div>
<div class="search"><input id="search" placeholder="ابحث عن محادثة أو شخص..." oninput="renderChats()"></div>
<div class="tabs"><button class="tab active" onclick="filterChats('all',this)">الكل</button><button class="tab" onclick="filterChats('unread',this)">غير مقروءة</button><button class="tab" onclick="filterChats('groups',this)">المجموعات</button></div>
<div class="chats" id="chats"></div>
</aside>

<main class="main">
<section class="empty" id="empty"><div><div class="logo" style="justify-content:center;font-size:46px"><span class="crown">♛</span> ملك</div><h1>تواصل بلا حدود</h1><p>اختار محادثة وابدأ الكلام.</p></div></section>

<section id="conversation" style="display:none;flex:1;min-height:0;flex-direction:column">
<header class="chathead"><button class="iconbtn back" onclick="closeChat()">‹</button><div class="avatar" id="headAvatar">م</div><div class="headinfo"><b id="headName">---</b><div class="status" id="headStatus">متصل الآن</div></div><button class="iconbtn" onclick="fakeCall('صوتية')">☎</button><button class="iconbtn" onclick="fakeCall('مرئية')">▣</button></header>
<div class="messages" id="messages"></div>
<div class="composer"><button class="iconbtn" onclick="showToast('رفع الصور والملفات سيتم ربطه بالتخزين لاحقاً')">📎</button><div class="compose"><input id="messageInput" placeholder="اكتب رسالة..." onkeydown="if(event.key==='Enter')sendMessage()"></div><button class="send" onclick="sendMessage()">➤</button></div>
</section>

<section class="profile" id="profile"><div class="profiletop"><button class="iconbtn" onclick="hideProfile()">‹</button><b>حسابي</b></div><div class="profilebody"><div class="bigavatar" id="profileAvatar">م</div><div class="card"><label>الاسم</label><b id="profileName">---</b></div><div class="card"><label>البريد الإلكتروني</label><b id="profileEmail">---</b></div><div class="card"><label>رقم الهاتف</label><b id="profilePhone">---</b></div><button class="primary" onclick="logout()">تسجيل الخروج</button></div></section>
</main>
</div>

<div class="login" id="login">
<div class="loginbox"><div class="loginlogo">♛</div><h1>ملك</h1><p id="authTitle">إنشاء حساب جديد</p>
<div class="field" id="nameField"><input id="authName" placeholder="اسمك"></div>
<div class="field"><input id="authEmail" type="email" placeholder="البريد الإلكتروني"></div>
<div class="field"><input id="authPassword" type="password" placeholder="كلمة السر (6 أحرف أو أكثر)"></div>
<button class="primary" id="authBtn" onclick="submitAuth()">إنشاء الحساب</button>
<button class="google" onclick="loginGoogle()">الدخول بواسطة Google</button>
<div class="switch"><span id="switchText">لديك حساب بالفعل؟</span> <button onclick="toggleAuthMode()" id="switchBtn">تسجيل الدخول</button></div>
<div class="hint">تسجيل الحساب وGoogle مربوطان بـ Firebase Authentication باستخدام مشروع Firebase الموجود في الكود الذي أرسلته.</div>
</div></div>
<div class="toast" id="toast"></div>

<script type="module">
import{initializeApp}from"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import{getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,updateProfile as updateFirebaseProfile,signOut}from"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig={
apiKey:"AIzaSyBqCxGshGhKzSCoueSV8bVFcKxQWsZiu6M",
authDomain:"mo-salah-physics.firebaseapp.com",
projectId:"mo-salah-physics",
storageBucket:"mo-salah-physics.firebasestorage.app",
messagingSenderId:"475289360145",
appId:"1:475289360145:web:94b4ec58765a230f09deb0"
};

const app=initializeApp(firebaseConfig),auth=getAuth(app),googleProvider=new GoogleAuthProvider();
let signupMode=true;

window.submitAuth=async()=>{
const name=authName.value.trim(),email=authEmail.value.trim(),password=authPassword.value;
try{
if(!email||!password)throw new Error("اكتب البريد الإلكتروني وكلمة السر");
if(signupMode){
if(!name)throw new Error("اكتب اسمك");
const c=await createUserWithEmailAndPassword(auth,email,password);
await updateFirebaseProfile(c.user,{displayName:name});
showToast("تم إنشاء الحساب بنجاح");
}else{await signInWithEmailAndPassword(auth,email,password);showToast("تم تسجيل الدخول")}
}catch(e){showToast(authError(e))}
};

window.loginGoogle=async()=>{
try{await signInWithPopup(auth,googleProvider);showToast("تم تسجيل الدخول بواسطة Google")}
catch(e){showToast(authError(e))}
};

window.logout=async()=>{
try{await signOut(auth);closeChat();hideProfile();showToast("تم تسجيل الخروج")}catch(e){showToast(authError(e))}
};

onAuthStateChanged(auth,user=>{
if(user){
login.style.display="none";
profileName.textContent=user.displayName||"طالب ملك";
profileEmail.textContent=user.email||"حساب Google";
profilePhone.textContent=user.phoneNumber||"غير مرتبط";
profileAvatar.textContent=(user.displayName||user.email||"م").charAt(0).toUpperCase();
}else login.style.display="flex";
});

function authError(e){
const m=e?.code;
const map={
"auth/email-already-in-use":"البريد الإلكتروني مستخدم بالفعل",
"auth/invalid-email":"البريد الإلكتروني غير صحيح",
"auth/weak-password":"كلمة السر ضعيفة، استخدم 6 أحرف على الأقل",
"auth/invalid-credential":"البريد الإلكتروني أو كلمة السر غير صحيحة",
"auth/popup-closed-by-user":"تم إغلاق نافذة Google",
"auth/popup-blocked":"المتصفح منع نافذة Google",
"auth/operation-not-allowed":"فعّل طريقة تسجيل الدخول من Firebase Console"
};
return map[m]||e?.message||"حدث خطأ غير متوقع";
}
</script>

<script>
let state=JSON.parse(localStorage.getItem("malak_chats")||"null")||{chats:[
{id:1,name:"أحمد محمد",avatar:"أ",status:"متصل الآن",unread:2,group:false,messages:[{from:"them",text:"السلام عليكم",time:"9:36"},{from:"me",text:"وعليكم السلام",time:"9:37"},{from:"them",text:"عامل إيه؟",time:"9:37"}]},
{id:2,name:"مجموعة الأصدقاء",avatar:"👥",status:"5 أعضاء",unread:5,group:true,messages:[{from:"them",text:"هنخرج إمتى؟",time:"9:25"}]},
{id:3,name:"سارة",avatar:"س",status:"آخر ظهور اليوم",unread:1,group:false,messages:[{from:"them",text:"بكرة؟",time:"8:12"}]}
]},current=null,currentFilter="all";

function save(){localStorage.setItem("malak_chats",JSON.stringify(state))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function renderChats(){
const q=search.value.trim().toLowerCase();
const list=state.chats.filter(c=>c.name.toLowerCase().includes(q)&&(currentFilter==="all"||(currentFilter==="groups"&&c.group)||(currentFilter==="unread"&&c.unread>0)));
chats.innerHTML=list.map(c=>{const l=c.messages[c.messages.length-1];return `<div class="chat ${current===c.id?"active":""}" onclick="openChat(${c.id})"><div class="avatar">${esc(c.avatar)}</div><div class="chatmain"><div class="row"><span class="name">${esc(c.name)}</span><span class="time">${esc(l?.time||"")}</span></div><div class="row"><span class="preview">${l?(l.from==="me"?"أنت: ":"")+esc(l.text):"لا توجد رسائل"}</span>${c.unread?`<span class="badge">${c.unread}</span>`:""}</div></div></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--muted)">لا توجد محادثات</div>';
}
function openChat(id){current=id;const c=state.chats.find(x=>x.id===id);c.unread=0;save();renderChats();empty.style.display="none";conversation.style.display="flex";headName.textContent=c.name;headStatus.textContent=c.status;headAvatar.textContent=c.avatar;app.classList.add("openchat");renderMessages()}
function closeChat(){current=null;app.classList.remove("openchat");conversation.style.display="none";empty.style.display="grid"}
function renderMessages(){const c=state.chats.find(x=>x.id===current);messages.innerHTML='<div class="day">اليوم</div>'+c.messages.map(m=>`<div class="msg ${m.from==="me"?"mine":"theirs"}"><div class="bubble">${esc(m.text)} <span class="meta">${esc(m.time)}${m.from==="me"?'<span class="checks">✓✓</span>':""}</span></div></div>`).join("");messages.scrollTop=messages.scrollHeight}
function sendMessage(){const t=messageInput.value.trim();if(!t||current==null)return;const d=new Date(),time=d.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"});state.chats.find(x=>x.id===current).messages.push({from:"me",text:t,time});messageInput.value="";save();renderMessages();renderChats()}
function filterChats(f,el){currentFilter=f;document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));el.classList.add("active");renderChats()}
function showProfile(){profile.classList.add("show")}function hideProfile(){profile.classList.remove("show")}
function newChat(){showToast("البحث عن مستخدمين سيتم ربطه بقاعدة البيانات")}
function fakeCall(t){showToast("واجهة مكالمة "+t+" جاهزة للربط لاحقاً")}
function showToast(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function toggleAuthMode(){signupMode=!signupMode;authTitle.textContent=signupMode?"إنشاء حساب جديد":"تسجيل الدخول";authBtn.textContent=signupMode?"إنشاء الحساب":"تسجيل الدخول";switchText.textContent=signupMode?"لديك حساب بالفعل؟":"ليس لديك حساب؟";switchBtn.textContent=signupMode?"تسجيل الدخول":"إنشاء حساب";nameField.style.display=signupMode?"block":"none"}
renderChats();
</script>
</body>
</html>
