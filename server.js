const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = "https://buxnqmmbecgtnckygudx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eG5xbW1iZWNndG5ja3lndWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTA3MjUsImV4cCI6MjA5NjA2NjcyNX0.jqlt5oguM2O9Bh-6rdb61XrqkoOKss8qxUGu-ZixcL0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const PORT = process.env.PORT || 5000;

// 1. واجهة تسجيل الدخول الرئيسية (تفتح تلقائياً عند فتح الرابط)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>TAHA PHONE - LOGIN</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Tajawal:wght@500;700&display=swap');
            body { background:#0a0a0f; color:#e0e0e6; font-family:'Tajawal',sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
            .box { background:#12121a; border:2px solid #00f0ff; box-shadow:0 0 15px rgba(0,240,255,0.2); padding:35px; border-radius:4px; width:90%; max-width:360px; text-align:center; }
            h2 { color:#fff; text-shadow:0 0 10px #00f0ff; margin-bottom:25px; }
            h2 span { color:#39ff14; }
            input { width:100%; padding:12px; background:#050508; border:1px solid #333; border-radius:4px; color:#fff; font-family:'Fira Code',monospace; margin-bottom:20px; box-sizing:border-box; }
            input:focus { outline:none; border-color:#00f0ff; box-shadow:0 0 10px rgba(0,240,255,0.4); }
            button { width:100%; padding:12px; background:transparent; border:2px solid #39ff14; color:#39ff14; font-size:16px; font-weight:bold; cursor:pointer; border-radius:4px; text-shadow:0 0 5px #39ff14; }
            button:hover { background:#39ff14; color:#0a0a0f; box-shadow:0 0 15px #39ff14; }
            .link { display:block; margin-top:15px; color:#ff007f; text-decoration:none; font-size:13px; }
            .msg { margin-top:15px; padding:10px; border-radius:4px; font-size:13px; display:none; background:rgba(255,0,127,0.1); border:1px solid #ff007f; color:#ff007f; }
        </style>
    </head>
    <body>
        <div class="box">
            <h2>TAHA<span>PHONE</span></h2>
            <form id="lForm">
                <input type="email" id="email" required placeholder="البريد الإلكتروني" dir="ltr">
                <input type="password" id="pass" required placeholder="شفرة العبور" dir="ltr">
                <button type="submit">تفعيل الاتصال والنظام // ENTER</button>
            </form>
            <a href="/signup" class="link">ليس لديك حساب؟ إنشاء مفتاح جديد</a>
            <div id="msg" class="msg"></div>
        </div>
        <script>
            document.getElementById('lForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const msg = document.getElementById('msg'); msg.style.display = 'none';
                try {
                    const r = await fetch('/api/auth/login', {
                        method:'POST', headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({email:document.getElementById('email').value, password:document.getElementById('pass').value})
                    });
                    const res = await r.json();
                    if(!r.ok) { msg.textContent = '❌ ' + res.error; msg.style.display = 'block'; }
                    else { localStorage.setItem('taha_session', JSON.stringify(res.session)); window.location.href = '/dashboard'; }
                } catch(e) { msg.textContent = '⚠️ فشل الاتصال بالسيرفر'; msg.style.display = 'block'; }
            });
        </script>
    </body>
    </html>
    `);
});

// 2. واجهة إنشاء الحساب
app.get('/signup', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>TAHA PHONE - SIGNUP</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Tajawal:wght@500;700&display=swap');
            body { background:#0a0a0f; color:#e0e0e6; font-family:'Tajawal',sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
            .box { background:#12121a; border:2px solid #ff007f; box-shadow:0 0 15px rgba(255,0,127,0.2); padding:35px; border-radius:4px; width:90%; max-width:360px; text-align:center; }
            h2 { color:#fff; text-shadow:0 0 10px #ff007f; margin-bottom:25px; }
            input { width:100%; padding:12px; background:#050508; border:1px solid #333; border-radius:4px; color:#fff; margin-bottom:15px; box-sizing:border-box; }
            button { width:100%; padding:12px; background:transparent; border:2px solid #00f0ff; color:#00f0ff; font-size:16px; font-weight:bold; cursor:pointer; border-radius:4px; text-shadow:0 0 5px #00f0ff; }
            button:hover { background:#00f0ff; color:#0a0a0f; box-shadow:0 0 15px #00f0ff; }
            .link { display:block; margin-top:15px; color:#00f0ff; text-decoration:none; font-size:13px; }
            .msg { margin-top:15px; padding:10px; border-radius:4px; font-size:13px; display:none; background:rgba(57,255,20,0.1); border:1px solid #39ff14; color:#39ff14; }
        </style>
    </head>
    <body>
        <div class="box">
            <h2>إنشاء حساب جديد</h2>
            <form id="sForm">
                <input type="text" id="name" required placeholder="الاسم الكامل">
                <input type="email" id="email" required placeholder="البريد الإلكتروني" dir="ltr">
                <input type="password" id="pass" required placeholder="كلمة السر" dir="ltr">
                <button type="submit">توليد الحساب // SIGNUP</button>
            </form>
            <a href="/" class="link">لديك حساب؟ تسجيل الدخول</a>
            <div id="msg" class="msg"></div>
        </div>
        <script>
            document.getElementById('sForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const msg = document.getElementById('msg'); msg.style.display = 'none';
                try {
                    const r = await fetch('/api/auth/signup', {
                        method:'POST', headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({full_name:document.getElementById('name').value, email:document.getElementById('email').value, password:document.getElementById('pass').value})
                    });
                    const res = await r.json();
                    if(!r.ok) { msg.textContent = '❌ ' + res.error; msg.style.style.borderColor = '#ff007f'; msg.style.color = '#ff007f'; msg.style.display = 'block'; }
                    else { msg.textContent = '✅ تم إنشاء حسابك بنجاح!'; msg.style.display = 'block'; setTimeout(() => window.location.href='/', 2000); }
                } catch(e) { msg.textContent = '⚠️ خطأ في الاتصال'; msg.style.display = 'block'; }
            });
        </script>
    </body>
    </html>
    `);
});

// 3. واجهة لوحة التحكم (Dashboard) تفتح من السيرفر مباشرة
app.get('/dashboard', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>TAHA PHONE - DASHBOARD</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Tajawal:wght@500;700&display=swap');
            body { background:#060609; color:#e0e0e6; font-family:'Tajawal',sans-serif; margin:0; padding:20px; }
            header { display:flex; justify-content:between; align-items:center; border-bottom:2px solid #00f0ff; padding-bottom:15px; margin-bottom:30px; justify-content: space-between; }
            h1 { margin:0; font-size:22px; text-shadow:0 0 8px #00f0ff; }
            h1 span { color:#ff007f; }
            .logout { padding:8px 16px; background:transparent; border:1px solid #ff007f; color:#ff007f; cursor:pointer; border-radius:4px; font-weight:bold; }
            .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px; margin-bottom:30px; }
            .card { background:#0d0d14; border:1px solid #1a1a26; border-left:4px solid #00f0ff; padding:20px; border-radius:4px; }
            .card.p { border-left-color:#39ff14; }
            .card.c { border-left-color:#ffdf00; }
            .val { font-size:24px; font-weight:bold; font-family:'Fira Code',monospace; margin-top:10px; }
            .table-box { background:#0d0d14; border:1px solid #1a1a26; border-radius:4px; overflow-x:auto; }
            table { width:100%; border-collapse:collapse; text-align:right; font-size:14px; }
            th, td { padding:15px; border-bottom:1px solid #1a1a26; }
            th { background:#12121f; color:#00f0ff; }
            tr:hover { background:#161622; }
        </style>
    </head>
    <body>
        <header>
            <h1>طه فون // <span>DASHBOARD</span></h1>
            <button class="logout" onclick="localStorage.removeItem('taha_session'); window.location.href='/';">خروج آمن</button>
        </header>
        <div class="grid">
            <div class="card p"><div style="color:#888;font-size:13px;">صافي أرباح البرمجة (50%)</div><div class="val" id="pInc">0.00 $</div></div>
            <div class="card c"><div style="color:#888;font-size:13px;">تكاليف اليوم الخارجية</div><div class="val" id="dCost">0.00 $</div></div>
            <div class="card c"><div style="color:#888;font-size:13px;">تكاليف الأسبوع الخارجية</div><div class="val" id="wCost">0.00 $</div></div>
        </div>
        <div class="table-box">
            <table>
                <thead>
                    <tr><th>الزبون / الهاتف</th><th>الجهاز</th><th>الحالة</th><th>التكلفة</th><th>المورد</th><th>صافي ربحك</th><th>المتبقي في الذمة</th></tr>
                </thead>
                <tbody id="tBody"><tr><td colspan="7" style="text-align:center;color:#888;">جاري جلب السجلات الحية...</td></tr></tbody>
            </table>
        </div>
        <script>
            if(!localStorage.getItem('taha_session')) { window.location.href = '/'; }
            async function loadData() {
                try {
                    const r = await fetch('/api/financials/analytics'); const data = await r.json();
                    document.getElementById('pInc').textContent = data.summary.gross_programmer_income.toFixed(2) + ' $';
                    document.getElementById('dCost').textContent = data.summary.total_daily_external_cost.toFixed(2) + ' $';
                    document.getElementById('wCost').textContent = data.summary.total_weekly_external_cost.toFixed(2) + ' $';
                    const tbody = document.getElementById('tBody'); tbody.innerHTML = '';
                    if(data.records.length === 0) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">لا يوجد أجهزة مسجلة بعد.</td></tr>'; return; }
                    data.records.forEach(rec => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = \`<td><strong>\${rec.customer_name}</strong><br><span style="color:#888;font-size:12px;">\${rec.customer_phone || '-'}</span></td>
                        <td>\ Nazar \${rec.device_model}</td><td>\${rec.is_paid_in_shop ? '🟢 تم الدفع':'🔴 متبقي'}</td>
                        <td style="color:#ffdf00">\${rec.external_cost_usd} $</td><td>\${rec.external_cost_provider || 'داخلي'}</td>
                        <td style="color:#39ff14">\${rec.programmer_share} $</td><td style="color:#00f0ff;font-weight:bold;">\${rec.remaining_programmer_balance} $</td>\`;
                        tbody.appendChild(tr);
                    });
                } catch(e) { document.getElementById('tBody').innerHTML = '<tr><td colspan="7" style="text-align:center;color:#ff007f;">❌ فشل تحديث البيانات</td></tr>'; }
            }
            window.onload = loadData;
        </script>
    </body>
    </html>
    `);
});

// ==========================================
// ⚙️ معالجة البيانات والاتصال بسوبابيس (API)
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, full_name } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } });
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ data });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    res.json({ session: data.session });
});

app.get('/api/financials/analytics', async (req, res) => {
    const { data, error } = await supabase.from('view_financial_analytics').select('*').order('record_date', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    let dCost = 0, wCost = 0, pInc = 0;
    const today = new Date().toISOString().split('T')[0];
    data.forEach(rec => {
        pInc += parseFloat(rec.programmer_share || 0);
        const rDate = new Date(rec.record_date).toISOString().split('T')[0];
        if (rDate === today) dCost += parseFloat(rec.external_cost_usd || 0);
        const diff = Math.ceil(Math.abs(new Date() - new Date(rec.record_date)) / (1000 * 60 * 60 * 24));
        if (diff <= 7) wCost += parseFloat(rec.external_cost_usd || 0);
    });
    res.json({ records: data, summary: { total_daily_external_cost: dCost, total_weekly_external_cost: wCost, gross_programmer_income: pInc } });
});
app.listen(PORT, () => console.log("Server running on port " + PORT));

