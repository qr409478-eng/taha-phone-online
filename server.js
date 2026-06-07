const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// مصفوفات وهمية تحاكي قاعدة البيانات (استبدلها بروابط قاعدة بياناتك إن وجدت)
let devices = [
    { id: "1", customer_name: "عبود", phone_model: "سامسونج", issue_type: "صيانة شريك", cost: 200, extra_cost: 120, notes: "شاشة أصلي", status: "مكتمل", is_paid: true },
    { id: "2", customer_name: "فهد", phone_model: "شاومي", issue_type: "سوفتوير", cost: 100, extra_cost: 40, notes: "فك حساب", status: "مكتمل", is_paid: true },
    { id: "3", customer_name: "حمودة أبو طه", phone_model: "Poco C55", issue_type: "سوفتوير", cost: 20, extra_cost: 20, notes: "تخطي ريجين", status: "مكتمل", is_paid: true }
];
let debts = [];
let supplierDebts = [];
let icloudServices = [
    { id: "1", service_name: "iCloud Clean Bypass", cost_ils: 150, expected_time: "1-3 أيام", status: "شغالة" },
    { id: "2", service_name: "Lost Mode Premium", cost_ils: 350, expected_time: "5-7 أيام", status: "متوقفة" }
];

// تقديم ملفات الواجهة الأمامية
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === [API الأجهزة والصيانة] ===
app.get('/api/devices', (req, res) => {
    // السيرفر يرسل الأجهزة بالإضافة إلى الحسبة الإجمالية كـ Fallback للسيرفر
    res.json({ devices: devices });
});

app.post('/api/devices', (req, res) => {
    const { customer_name, phone_model, issue_type, cost, extra_cost, notes, is_client_order } = req.body;
    const newDevice = {
        id: Date.now().toString(),
        customer_name,
        phone_model,
        issue_type: issue_type || 'سوفتوير',
        cost: parseFloat(cost) || 0,
        extra_cost: parseFloat(extra_cost) || 0,
        notes: notes || '',
        status: is_client_order ? 'طلب معلق' : 'مكتمل',
        is_paid: false
    };
    devices.push(newDevice);
    res.status(201).json(newDevice);
});

app.put('/api/devices/:id', (req, res) => {
    const { id } = req.params;
    const index = devices.findIndex(d => d.id === id);
    if (index !== -1) {
        // تحديث الحقول المستقبلة من الواجهة بما فيها التكلفة الخارجية والرد
        devices[index] = { ...devices[index], ...req.body };
        // تأكيد تحويل الأرقام لضمان عدم حدوث دمج نصوص خاطئ
        if(req.body.cost !== undefined) devices[index].cost = parseFloat(req.body.cost) || 0;
        if(req.body.extra_cost !== undefined) devices[index].extra_cost = parseFloat(req.body.extra_cost) || 0;
        
        res.json(devices[index]);
    } else {
        res.status(404).json({ message: "الجهاز غير موجود" });
    }
});

app.delete('/api/devices/:id', (req, res) => {
    devices = devices.filter(d => d.id !== req.params.id);
    res.json({ success: true });
});

// === [API دفتر الديون العامة] ===
app.get('/api/debts', (req, res) => res.json(debts));
app.post('/api/debts', (req, res) => {
    const debt = { id: Date.now().toString(), ...req.body, is_settled: false };
    debts.push(debt);
    res.json(debt);
});
app.put('/api/debts/:id', (req, res) => {
    const index = debts.findIndex(d => d.id === req.params.id);
    if(index !== -1) { debts[index] = { ...debts[index], ...req.body }; res.json(debts[index]); }
    else res.status(404).json({ message: "الدين غير موجود" });
});
app.delete('/api/debts/:id', (req, res) => {
    debts = debts.filter(d => d.id !== req.params.id);
    res.json({ success: true });
});

// === [API ديون الموردين والشركات] ===
app.get('/api/supplier-debts', (req, res) => res.json(supplierDebts));
app.post('/api/supplier-debts', (req, res) => {
    const sDebt = { id: Date.now().toString(), ...req.body, is_paid: false, taken_date: new Date().toLocaleDateString('ar-EG') };
    supplierDebts.push(sDebt);
    res.json(sDebt);
});
app.put('/api/supplier-debts/:id', (req, res) => {
    const index = supplierDebts.findIndex(sd => sd.id === req.params.id);
    if(index !== -1) { supplierDebts[index] = { ...supplierDebts[index], ...req.body }; res.json(supplierDebts[index]); }
    else res.status(404).json({ message: "السجل غير موجود" });
});
app.delete('/api/supplier-debts/:id', (req, res) => {
    supplierDebts = supplierDebts.filter(sd => sd.id !== req.params.id);
    res.json({ success: true });
});

// === [API سيرفر iCloud] ===
app.get('/api/icloud-services', (req, res) => res.json(icloudServices));
app.put('/api/icloud-services/:id', (req, res) => {
    const index = icloudServices.findIndex(s => s.id === req.params.id);
    if(index !== -1) { icloudServices[index] = { ...icloudServices[index], ...req.body }; res.json(icloudServices[index]); }
    else res.status(404).json({ message: "الخدمة غير موجودة" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر الموحد يعمل بنجاح على المنفذ ${PORT}`));
