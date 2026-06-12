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

// 1. واجهة تسجيل الدخول
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
                    if(!r.ok) { msg.textContent = '❌ ' + res.error; msg.style.display = 'block'; }
                    else { msg.textContent = '✅ تم إنشاء حسابك بنجاح!'; msg.style.display = 'block'; setTimeout(() => window.location.href='/', 2000); }
                } catch(e) { msg.textContent = '⚠️ خطأ في الاتصال'; msg.style.display = 'block'; }
            });
        </script>
    </body>
    </html>
    `);
});

// 3. لوحة التحكم مع واجهة الإدخال والجدول
app.get('/dashboard', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>TAHA PHONE - DASHBOARD</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Tajawal:wght@500;700&display=swap');
            body { background:#060609; color:#e0e0e6; font-family:'Tajawal',sans-serif; margin:0; padding:15px; }
            header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #00f0ff; padding-bottom:10px; margin-bottom:20px; }
            h1 { margin:0; font-size:20px; text-shadow:0 0 8px #00f0ff; }
            h1 span { color:#ff007f; }
            .logout { padding:6px 12px; background:transparent; border:1px solid #ff007f; color:#ff007f; cursor:pointer; border-radius:4px; font-weight:bold; font-size:12px; }
            .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; margin-bottom:20px; }
            .card { background:#0d0d14; border:1px solid #1a1a26; border-left:4px solid #00f0ff; padding:15px; border-radius:4px; }
            .card.p { border-left-color:#39ff14; }
            .card.c { border-left-color:#ffdf00; }
            .val { font-size:18px; font-weight:bold; font-family:'Fira Code',monospace; margin-top:5px; }
            
            .form-box { background:#0d0d14; border:1px solid #00f0ff; padding:20px; border-radius:4px; margin-bottom:25px; box-shadow:0 0 10px rgba(0,240,255,0.1); }
            .form-box h3 { margin-top:0; color:#00f0ff; font-size:16px; border-bottom:1px solid #1a1a26; padding-bottom:8px; }
            .form-group { display:flex; flex-direction:column; }
            .form-group label { font-size:12px; color:#888; margin-bottom:4px; }
            .form-group input, .form-group select { padding:8px; background:#050508; border:1px solid #333; border-radius:4px; color:#fff; font-size:13px; }
            .form-group input:focus, .form-group select:focus { outline:none; border-color:#00f0ff; }
            .btn-add { grid-column: 1 / -1; padding:10px; background:transparent; border:2px solid #39ff14; color:#39ff14; font-weight:bold; cursor:pointer; border-radius:4px; margin-top:10px; text-shadow:0 0 5px #39ff14; width:100%; }
            .btn-add:hover { background:#39ff14; color:#000; }

            .table-box { background:#0d0d14; border:1px solid #1a1a26; border-radius:4px; overflow-x:auto; }
            table { width:100%; border-collapse:collapse; text-align:right; font-size:13px; }
            th, td { padding:12px; border-bottom:1px solid #1a1a26; white-space:nowrap; }
            th { background:#12121f; color:#00f0ff; }
            tr:hover { background:#161622; }
        </style>
    </head>
    <body>
        <header>
            <h1>طه فون // <span>DASHBOARD</span></h1>
            <button class="logout" onclick="localStorage.removeItem('taha_session'); window.location.href='/';">خروج</button>
        </header>

        <div class="grid">
            <div class="card p"><div style="color:#888;font-size:11px;">صافي أرباحك (50%)</div><div class="val" id="pInc">0.00 $</div></div>
            <div class="card c"><div style="color:#888;font-size:11px;">تكاليف اليوم</div><div class="val" id="dCost">0.00 $</div></div>
            <div class="card c"><div style="color:#888;font-size:11px;">تكاليف الأسبوع</div><div class="val" id="wCost">0.00 $</div></div>
        </div>

        <div class="form-box">
            <h3>➕ تسجيل عملية / جهاز جديد بالقاعدة</h3>
            <form id="deviceForm">
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom:0;">
                    <div class="form-group"><label>اسم الزبون</label><input type="text" id="custName" required placeholder="محمد أحمد"></div>
                    <div class="form-group"><label>رقم الجوال</label><input type="text" id="custPhone" placeholder="059xxxxxxx"></div>
                    <div class="form-group"><label>موديل الجهاز</label><input type="text" id="devModel" required placeholder="Poco X3 NFC"></div>
                    <div class="form-group"><label>العملية (FRP / إصلاح)</label><input type="text" id="opDetails" required placeholder="فك حساب جوجل"></div>
                    <div class="form-group"><label>الحساب من الزبون ($)</label><input type="number" step="0.01" id="totPrice" required placeholder="20"></div>
                    <div class="form-group"><label>تكلفة سيرفر خارجية ($)</label><input type="number" step="0.01" id="extCost" value="0" placeholder="5"></div>
                    <div class="form-group"><label>المورد / السيرفر</label><input type="text" id="provider" placeholder="UnlockTool"></div>
                    <div class="form-group"><label>حالة الدفع بالمحل</label>
                        <select id="isPaid"><option value="true">تم الدفع كاملاً</option><option value="false">متبقي / دين</option></select>
                    </div>
                </div>
                <button type="submit" class="btn-add">إرسال البيانات وتشفير الحسبة في قاعدة البيانات 🚀</button>
            </form>
        </div>

        <div class="table-box">
            <table>
                <thead>
                    <tr><th>الزبون / الهاتف</th><th>الجهاز / العملية</th><th>الحالة</th><th>التكلفة</th><th>المورد</th><th>صافي ربحك</th><th>المتبقي في الذمة</th></tr>
                </thead>
                <tbody id="tBody"><tr><td colspan="7" style="text-align:center;color:#888;">جاري جلب السجلات الحية...</td></tr></tbody>
            </table>
        </div>

        <script>
            const sessionData = localStorage.getItem('taha_session');
            let userId = null;
            if(sessionData) {
                try { userId = JSON.parse(sessionData).user.id; } catch(e){}
            }

            async function loadData() {
                try {
                    const r = await fetch('/api/financials/analytics'); const data = await r.json();
                    document.getElementById('pInc').textContent = (data.summary.gross_programmer_income || 0).toFixed(2) + ' $';
                    document.getElementById('dCost').textContent = (data.summary.total_daily_external_cost || 0).toFixed(2) + ' $';
                    document.getElementById('wCost').textContent = (data.summary.total_weekly_external_cost || 0).toFixed(2) + ' $';
                    const tbody = document.getElementById('tBody'); tbody.innerHTML = '';
                    if(!data.records || data.records.length === 0) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">لا يوجد أجهزة مسجلة بعد.</td></tr>'; return; }
                    data.records.forEach(rec => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = \`<td><strong>\· \${rec.customer_name || '-'}</strong><br><span style="color:#888;font-size:11px;">\${rec.customer_phone || '-'}</span></td>
                        <td><strong>\${rec.device_model || '-'}</strong><br><span style="color:#00f0ff;font-size:11px;">\${rec.operation_details || '-'}</span></td>
                        <td>\${rec.is_paid_in_shop ? '🟢 تم الدفع':'🔴 متبقي'}</td>
                        <td style="color:#ffdf00">\${rec.external_cost_usd || 0} $</td><td>\${rec.external_cost_provider || 'داخلي'}</td>
                        <td style="color:#39ff14">\${rec.programmer_share || 0} $</td><td style="color:#00f0ff;font-weight:bold;">\${rec.remaining_programmer_balance || 0} $</td>\`;
                        tbody.appendChild(tr);
                    });
                } catch(e) { document.getElementById('tBody').innerHTML = '<tr><td colspan="7" style="text-align:center;color:#ff007f;">❌ فشل تحديث البيانات</td></tr>'; }
            }

            document.getElementById('deviceForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const bodyData = {
                    user_id: userId,
                    customer_name: document.getElementById('custName').value,
                    customer_phone: document.getElementById('custPhone').value || null,
                    device_model: document.getElementById('devModel').value,
                    operation_details: document.getElementById('opDetails').value,
                    total_price: parseFloat(document.getElementById('totPrice').value) || 0,
                    external_cost_usd: parseFloat(document.getElementById('extCost').value) || 0,
                    external_cost_provider: document.getElementById('provider').value || null,
                    is_paid_in_shop: document.getElementById('isPaid').value === "true"
                };

                try {
                    const response = await fetch('/api/devices', {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyData)
                    });
                    const resJson = await response.json();
                    if(response.ok) {
                        alert("🎯 تم قفل الحسبة وحفظ الجهاز بنجاح!");
                        document.getElementById('deviceForm').reset();
                        loadData();
                    } else { alert("❌ خطأ من السيرفر: " + (resJson.error || 'غير معروف')); }
                } catch(err) { alert("⚠️ خطأ في الاتصال بالسيرفر"); }
            });

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

// 📌 راوت إدخال الأجهزة الذكي والمقاوم للنقص والـ user_id الفارغ
app.post('/api/devices', async (req, res) => {
    let { user_id, customer_name, customer_phone, device_model, operation_details, total_price, is_paid_in_shop, external_cost_usd, external_cost_provider } = req.body;
    
    // إذا لم يجد السيرفر معرف مستخدم بسبب انتهاء الجلسة، يجلب أول مستخدم مسجل تلقائياً لئلا تفشل العملية
    if (!user_id) {
        const { data: uList } = await supabase.from('profiles').select('id').limit(1);
        if (uList && uList.length > 0) user_id = uList[0].id;
    }

    const { data: dev, error: devErr } = await supabase.from('devices').insert([{ 
        user_id, 
        customer_name, 
        customer_phone, 
        device_model, 
        operation_details, 
        status: 'completed' 
    }]).select().single();
    
    if (devErr) return res.status(400).json({ error: "DevicesTable: " + devErr.message });
    
    const { error: finErr } = await supabase.from('financial_records').insert([{ 
        device_id: dev.id, 
        total_price: total_price || 0, 
        is_paid_in_shop: is_paid_in_shop === true, 
        external_cost_usd: external_cost_usd || 0, 
        external_cost_provider: external_cost_provider || null 
    }]);
    
    if (finErr) return res.status(400).json({ error: "FinancialsTable: " + finErr.message });
    
    res.status(201).json({ message: "Success" });
});

app.get('/api/financials/analytics', async (req, res) => {
    const { data, error } = await supabase.from('view_financial_analytics').select('*').order('record_date', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    let dCost = 0, wCost = 0, pInc = 0;
    const today = new Date().toISOString().split('T')[0];
    
    if(data) {
        data.forEach(rec => {
            pInc += parseFloat(rec.programmer_share || 0);
            if (rec.record_date) {
                const rDate = new Date(rec.record_date).toISOString().split('T')[0];
                if (rDate === today) dCost += parseFloat(rec.external_cost_usd || 0);
                const diff = Math.ceil(Math.abs(new Date() - new Date(rec.record_date)) / (1000 * 60 * 60 * 24));
                if (diff <= 7) wCost += parseFloat(rec.external_cost_usd || 0);
            }
        });
    }
    res.json({ 
