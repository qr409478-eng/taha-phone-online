const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// إعدادات قاعدة البيانات الخاصة بك
const SUPABASE_URL = "https://buxnqmmbecgtnckygudx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eG5xbW1iZWNndG5ja3lndWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTA3MjUsImV4cCI6MjA5NjA2NjcyNX0.jqlt5oguM2O9Bh-6rdb61XrqkoOKss8qxUGu-ZixcL0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PORT = process.env.PORT || 5000;

// ==========================================
// 🌐 توجيه روابط الصفحات لتفتح مباشرة من السيرفر
// ==========================================

// 1. الصفحة الرئيسية (تسجيل الدخول) تفتح بمجرد فتح رابط السيرفر
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TAHA PHONE - CYBERPUNK GATE</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Tajawal:wght@500;700&display=swap');
            :root { --bg-color: #0a0a0f; --card-bg: #12121a; --neon-cyan: #00f0ff; --neon-green: #39ff14; --neon-pink: #ff007f; --text-color: #e0e0e6; }
            body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Tajawal', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden; position: relative; }
            body::before { content: ''; position: absolute; width: 200%; height: 200%; background-image: linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px); background-size: 30px 30px; z-index: 1; animation: grid-move 20s linear infinite; }
            @keyframes grid-move { 0% { transform: translateY(0); } 100% { transform: translateY(-30px); } }
            .login-container { background: var(--card-bg); border: 2px solid var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.1); padding: 40px; border-radius: 4px; width: 100%; max-width: 400px; z-index: 2; position: relative; backdrop-filter: blur(5px); }
            .login-container::after { content: 'SECURE ACCESS'; position: absolute; top: -12px; left: 20px; background: var(--bg-color); padding: 0 10px; font-family: 'Fira Code', monospace; font-size: 12px; color: var(--neon-pink); letter-spacing: 2px; text-shadow: 0 0 5px var(--neon-pink); }
            h2 { text-align: center; margin-bottom: 30px; color: #fff; font-size: 28px; text-shadow: 0 0 10px var(--neon-cyan); }
            h2 span { color: var(--neon-green); text-shadow: 0 0 10px var(--neon-green); }
            .input-group { position: relative; margin-bottom: 25px; }
            .input-group label { display: block; margin-bottom: 8px; font-size: 14px; color: #aaa; }
            .input-group input { width: 100%; padding: 12px 15px; background: #050508; border: 1px solid #333; border-radius: 4px; color: #fff; font-family: 'Fira Code', monospace; font-size: 16px; box-sizing: border-box; transition: all 0.3s ease; }
            .input-group input:focus { outline: none; border-color: var(--neon-cyan); box-shadow: 0 0 10px rgba(0, 240, 255, 0.5); }
            .btn-submit { width: 100%; padding: 14px; background: transparent; border: 2px solid var(--neon-green); color: var(--neon-green); font-size: 18px; font-weight: bold; cursor: pointer; border-radius: 4px; text-shadow: 0 0 5px var(--neon-green); transition: all 0.3s ease; }
            .btn-submit:hover { background: var(--neon-green); color: var(--bg-color); box-shadow: 0 0 20px var(--neon-green); text-shadow: none; }
            .message-box { margin-top: 15px; padding: 10px; border-radius: 4px; font-size: 14px; text-align: center; display: none; }
            .error { background: rgba(255, 0, 127, 0.1); border: 1px solid var(--neon-pink); color: var(--neon-pink); display: block; }
            .success { background: rgba(57, 255, 20, 0.1); border: 1px solid var(--neon-green); color: var(--neon-green); display: block; }
            .nav-link { display: block; text-align: center; margin-top: 15px; color: var(--neon-pink); text-decoration: none; font-size: 13px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h2>TAHA<span>PHONE</span></h2>
            <form id="loginForm">
                <div class="input-group">
                    <label>البريد الإلكتروني للبرمجيات</label>
                    <input type="email" id="email" required placeholder="admin@tahaphone.com" dir="ltr">
                </div>
                <div class="input-group">
                    <label>شفرة العبور (Password)</label>
                    <input type="password" id="password" required placeholder="••••••••" dir="ltr">
                </div>
                <button type="submit" class="btn-submit">تفعيل الاتصال النظامي // ENTER</button>
            </form>
            <a href="/signup" class="nav-link">ليس لديك حساب؟ إنشاء مفتاح جديد</a>
            <div id="messageBox" class="message-box"></div>
        </div>
        <script>
            const loginForm = document.getElementById('loginForm');
            const messageBox = document.getElementById('messageBox');

            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                messageBox.style.display = 'none';

                try {
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });
                    const result = await response.json();

                    if (!response.ok) {
                        messageBox.textContent = '❌ فشل الاتصال: ' + result.error;
                        messageBox.className = 'message-box error';
                    } else {
                        messageBox.textContent = "🔓 تم تأكيد الهوية.. جاري الدخول لوحدة الحسابات!";
                        messageBox.className = 'message-box success';
                        localStorage.setItem('taha_session', JSON.stringify(result.session));
                        setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
                    }
                } catch (error) {
                    messageBox.textContent = "⚠️ فشل الاستجابة التامة من السيرفر.";
                    messageBox.className = 'message-box error';
                }
            });
        </script>
    </body>
    </html>
    `);
});

// 2. صفحة إنشاء الحساب تفتح عند طلب /signup مباشرة من السيرفر
app.get('/signup', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TAHA PHONE - SIGNUP GATE</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght=400;600&family=Tajawal:wght=500;700&display=swap');
            :root { --bg-color: #0a0a0f; --card-bg: #12121a; --neon-cyan: #00f0ff; --neon-green: #39ff14; --neon-pink: #ff007f; --text-color: #e0e0e6; }
            body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Tajawal', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden; position: relative; }
            body::before { content: ''; position: absolute; width: 200%; height: 200%; background-image: linear-gradient(rgba(255, 0, 127, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 127, 0.02) 1px, transparent 1px); background-size: 30px 30px; z-index: 1; animation: grid-move 20s linear infinite; }
            @keyframes grid-move { 0% { transform: translateY(0); } 100% { transform: translateY(-30px); } }
            .login-container { background: var(--card-bg); border: 2px solid var(--neon-pink); box-shadow: 0 0 15px rgba(255, 0, 127, 0.2); padding: 40px; border-radius: 4px; width: 100%; max-width: 400px; z-index: 2; position: relative; }
            .login-container::after { content: 'INITIALIZE SYSTEM'; position: absolute; top: -12px; left: 20px; background: var(--bg-color); padding: 0 10px; font-family: 'Fira Code', monospace; font-size: 12px; color: var(--neon-cyan); text-shadow: 0 0 5px var(--neon-cyan); }
            h2 { text-align: center; margin-bottom: 30px; color: #fff; font-size: 24px; text-shadow: 0 0 10px var(--neon-pink); }
            h2 span { color: var(--neon-cyan); }
            .input-group { position: relative; margin-bottom: 20px; }
            .input-group label { display: block; margin-bottom: 8px; font-size: 14px; color: #aaa; }
            .input-group input { width: 100%; padding: 12px 15px; background: #050508; border: 1px solid #333; border-radius: 4px; color: #fff; font-size: 16px; box-sizing: border-box; }
            .input-group input:focus { outline: none; border-color: var(--neon-pink); box-shadow: 0 0 10px rgba(255, 0, 127, 0.5); }
            .btn-submit { width: 100%; padding: 14px; background: transparent; border: 2px solid var(--neon-cyan); color: var(--neon-cyan); font-size: 18px; font-weight: bold; cursor: pointer; border-radius: 4px; text-shadow: 0 0 5px var(--neon-cyan); }
            .btn-submit:hover { background: var(--neon-cyan); color: #000; box-shadow: 0 0 20px var(--neon-cyan); }
            .message-box { margin-top: 15px; padding: 10px; border-radius: 4px; font-size: 14px; text-align: center; display: none; }
            .error { background: rgba(255, 0, 127, 0.1); border: 1px solid var(--neon-pink); color: var(--neon-pink); display: block; }
            .success { background: rgba(57, 255, 20, 0.1); border: 1px solid var(--neon-green); color: var(--neon-green); display: block; }
            .nav-link { display: block; text-align: center; margin-top: 15px; color: var(--neon-cyan); text-decoration: none; font-size: 13px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h2>إنشاء حساب <span>طه فون</span></h2>
            <form id="signupForm">
                <div class="input-group">
                    <label>الاسم الكامل</label>
                    <input type="text" id="fullName" required placeholder="محمد أيمن أبو سعيد">
                </div>
                <div class="input-group">
                    <label>البريد الإلكتروني للبرمجيات</label>
                    <input type="email" id="email" required placeholder="admin@tahaphone.com" dir="ltr">
                </div>
                <div class="input-group">
                    <label>شفرة العبور (Password)</label>
                    <input type="password" id="password" required placeholder="••••••••" dir="ltr">
                </div>
                <button type="submit" class="btn-submit">توليد مفاتيح النظام // SIGNUP</button>
            </form>
            <a href="/" class="nav-link">لديك حساب بالفعل؟ تسجيل الدخول</a>
            <div id="messageBox" class="message-box"></div>
        </div>
        <script>
            const signupForm = document.getElementById('signupForm');
            const messageBox = document.getElementById('messageBox');

            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const full_name = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                messageBox.style.display = 'none';

                try {
                    const response = await fetch('/api/auth/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password, full_name })
                    });
                    const result = await response.json();

                    if (!response.ok) {
                        messageBox.textContent = '❌ فشل التوليد: ' + result.error;
                        messageBox.className = 'message-box error';
                    } else {
                        messageBox.textContent = "✅ تم إنشاء وتشفير حسابك بنجاح! جاري التوجيه للدخول...";
                        messageBox.className = 'message-box success';
                        setTimeout(() => { window.location.href = '/'; }, 2000);
                    }
                } catch (error) {
                    messageBox.textContent = "⚠️ خطأ في الاتصال بالسيرفر.";
                    messageBox.className = 'message-box error';
                }
            });
        </script>
    </body>
    </html>
    `);
});

// 3. لوحة التحكم الشاملة تفتح عند طلب /dashboard مباشرة من السيرفر
app.get('/dashboard', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TAHA PHONE - CYBERPUNK DASHBOARD</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Tajawal:wght@500;700&display=swap');
            :root { --bg-color: #060609; --card-bg: #0d0d14; --neon-cyan: #00f0ff; --neon-green: #39ff14; --neon-pink: #ff007f; --neon-yellow: #ffdf00; --border-color: #1a1a26; --text-color: #e0e0e6; }
            body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Tajawal', sans-serif; margin: 0; padding: 20px; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--neon-cyan); padding-bottom: 15px; margin-bottom: 30px; }
            h1 { margin: 0; font-size: 24px; text-shadow: 0 0 8px var(--neon-cyan); }
            h1 span { color: var(--neon-pink); text-shadow: 0 0 8px var(--neon-pink); }
            .btn-logout { padding: 8px 16px; background: transparent; border: 1px solid var(--neon-pink); color: var(--neon-pink); cursor: pointer; border-radius: 4px; font-weight: bold; }
            .btn-logout:hover { background: var(--neon-pink); color: #000; box-shadow: 0 0 10px var(--neon-pink); }
            .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .card { background: var(--card-bg); border: 1px solid var(--border-color); border-left: 4px solid var(--neon-cyan); padding: 20px; border-radius: 4px; }
            .card.programmer { border-left-color: var(--neon-green); }
            .card.cost { border-left-color: var(--neon-yellow); }
            .card-title { font-size: 13px; color: #888; margin-bottom: 10px; }
            .card-value { font-size: 24px; font-weight: bold; font-family: 'Fira Code', monospace; color: #fff; }
            .card-value span { font-size: 14px; margin-right: 5px; color: var(--neon-cyan); }
            .table-container { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 4px; overflow-x: auto; }
            table { width: 100%; border-collapse: collapse; text-align: right; font-size: 14px; }
            th, td { padding: 15px; border-bottom: 1px solid var(--border-color); }
            th { background-color: #12121f; color: var(--neon-cyan); font-weight: 600; }
            tr:hover { background: #161622; }
            .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .badge.success { background: rgba(57, 255, 20, 0.1); color: var(--neon-green); border: 1px solid var(--neon-green); }
            .badge.danger { background: rgba(255, 0, 127, 0.1); color: var(--neon-pink); border: 1px solid var(--neon-pink); }
            .time-text { font-family: 'Fira Code', monospace; color: #00f0ff; font-size: 12px; }
            .provider-text { color: var(--neon-yellow); font-weight: bold; }
            .btn-edit { background: transparent; border: 1px solid var(--neon-cyan); color: var(--neon-cyan); padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; }
            .btn-edit:hover { background: var(--neon-cyan); color: #000; box-shadow: 0 0 8px var(--neon-cyan); }
        </style>
    </head>
    <body>
        <header>
            <h1>لوحة تحكم برمجيات <span>طه فون // TAHA PHONE</span></h1>
            <button class="btn-logout" onclick="logout()">خروج آمن [ESC]</button>
        </header>

        <div class="analytics-grid">
            <div class="card programmer">
                <div class="card-title">مجمل دخل البرمجة (الدخل الكلي)</div>
                <div class="card-value" id="grossProgrammerIncome">0.00 <span>$</span></div>
            </div>
            <div class="card cost">
                <div class="card-title">إجمالي التكلفة الخارجية اليوم</div>
                <div class="card-value" id="dailyCost">0.00 <span>$</span></div>
            </div>
            <div class="card cost">
                <div class="card-title">إجمالي التكلفة الخارجية أسبوعياً</div>
                <div class="card-value" id="weeklyCost">0.00 <span>$</span></div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>الزبون / الهاتف</th>
                        <th>الجهاز</th>
                        <th>وقت الاستلام</th>
                        <th>حالة المحل</th>
                        <th>التكلفة الخارجية</th>
                        <th>المورد</th>
                        <th>صافي ربحي (50%)</th>
                        <th>المتبقي لي</th>
                        <th>التحكم</th>
                    </tr>
                </thead>
                <tbody id="devicesTableBody">
                    <tr><td colspan="9" style="text-align: center; color: #888;">جاري جلب البيانات السحابية...</td></tr>
                </tbody>
            </table>
        </div>

        <script>
            if (!localStorage.getItem('taha_session')) { window.location.href = '/'; }

            async function fetchDashboardData() {
                try {
                    const response = await fetch('/api/financials/analytics');
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    document.getElementById('grossProgrammerIncome').textContent = data.summary.gross_programmer_income.toFixed(2) + ' $';
                    document.getElementById('dailyCost').textContent = data.summary.total_daily_external_cost.toFixed(2) + ' $';
                    document.getElementById('weeklyCost').textContent = data.summary.total_weekly_external_cost.toFixed(2) + ' $';

                    const tbody = document.getElementById('devicesTableBody');
                    tbody.innerHTML = '';

                    if (data.records.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">لا يوجد أجهزة حالياً.</td></tr>';
                        return;
                    }

                    data.records.forEach(record => {
                        const dateObj = new Date(record.record_date);
                        const formattedTime = dateObj.toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'}) + ' | ' + dateObj.toLocaleDateString('ar-EG');

                        const tr = document.createElement('tr');
                        tr.innerHTML = \`
