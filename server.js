const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; 
const DATA_FILE = path.join(__dirname, 'shop_data.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify({ devices: [], technician_withdrawn: 0 }));
            return { devices: [], technician_withdrawn: 0 };
        }
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent || '{"devices":[],"technician_withdrawn":0}');
        if (Array.isArray(parsed)) {
            return { devices: parsed, technician_withdrawn: 0 };
        }
        return parsed;
    } catch (e) {
        return { devices: [], technician_withdrawn: 0 };
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// جلب البيانات والحسابات الأسبوعية المتقدمة
app.get('/api/devices', (req, res) => {
    try {
        const data = readData();
        const devices = data.devices || [];
        const withdrawn = data.technician_withdrawn || 0;

        let totalSoftwareIncome = 0;
        let totalHardwareIncome = 0;
        let pendingNextWeek = 0; 

        // تواريخ حساب الأسبوع (الـ 7 أيام الأخيرة)
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

        devices.forEach(dev => {
            const price = parseFloat(dev.cost) || 0;
            const costOut = parseFloat(dev.extra_cost) || 0;
            const netProfit = price - costOut;
            const devDate = dev.id; // نعتمد الـ ID كتاريخ استلام بالملي ثانية

            if (dev.status !== 'طلب معلق' && dev.status !== 'مرفوض') {
                if (dev.is_paid) {
                    // جرد أسبوعي للسوفتوير المقبوض خلال آخر 7 أيام
                    if (dev.issue_type === 'سوفتوير' && devDate >= oneWeekAgo) {
                        totalSoftwareIncome += netProfit;
                    } else if (dev.issue_type !== 'سوفتوير') {
                        totalHardwareIncome += netProfit;
                    }
                } else {
                    // أرباح غير مقبوضة (معلقة للأسبوع القادم)
                    if (dev.issue_type === 'سوفتوير') {
                        pendingNextWeek += (netProfit * 0.5); // حصتك المعلقة
                    }
                }
            }
        });

        const myShareTotal = totalSoftwareIncome * 0.5;
        const myRemaining = myShareTotal - withdrawn;

        res.json({
            devices: [...devices].reverse(), 
            stats: {
                totalSoftwareWeek: totalSoftwareIncome,
                myShareWeek: myShareTotal,
                shopShareWeek: totalSoftwareIncome * 0.5,
                technicianWithdrawn: withdrawn,
                myRemaining: myRemaining,
                pendingNextWeek: pendingNextWeek,
                totalHardware: totalHardwareIncome
            }
        });
    } catch (err) {
        res.status(500).json({ error: "خطأ في قراءة البيانات" });
    }
});

// سحب مبالغ من الحصة
app.post('/api/withdraw', (req, res) => {
    try {
        const { amount } = req.body;
        const data = readData();
        data.technician_withdrawn = (data.technician_withdrawn || 0) + (parseFloat(amount) || 0);
        writeData(data);
        res.json({ message: "تم تسجيل استلام المبلغ بنجاح", technician_withdrawn: data.technician_withdrawn });
    } catch (err) {
        res.status(500).json({ error: "خطأ في تحديث المسحوبات" });
    }
});

// تسجيل جهاز جديد مع تاريخ تلقائي
app.post('/api/devices', (req, res) => {
    try {
        const { customer_name, phone_model, issue_type, notes, cost, extra_cost, is_client_order } = req.body;
        const data = readData();
        
        const newDevice = {
            id: Date.now(), // يمثل الـ ID وتاريخ الاستلام بدقة
            date_string: new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            customer_name,
            phone_model,
            issue_type: issue_type || 'سوفتوير',
            notes,
            cost: parseFloat(cost) || 0,
            extra_cost: parseFloat(extra_cost) || 0,
            status: is_client_order ? 'طلب معلق' : 'قيد الانتظار', 
            is_paid: false,
            reply_message: ''
        };
        
        data.devices.push(newDevice);
        writeData(data);
        res.json({ message: "تم التسجيل بنجاح", id: newDevice.id });
    } catch (err) {
        res.status(500).json({ error: "خطأ في حفظ البيانات" });
    }
});

// تحديث وتعديل بيانات أي جهاز في أي وقت (شامل التعديل المفتوح لجميع الحقول)
app.put('/api/devices/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { status, is_paid, cost, extra_cost, customer_name, phone_model, notes, reply_message, issue_type } = req.body;
        const data = readData();
        
        let found = false;
        data.devices = data.devices.map(dev => {
            if (dev.id == id) {
                if (status !== undefined) dev.status = status;
                if (is_paid !== undefined) dev.is_paid = is_paid;
                if (cost !== undefined) dev.cost = parseFloat(cost);
                if (extra_cost !== undefined) dev.extra_cost = parseFloat(extra_cost);
                if (customer_name !== undefined) dev.customer_name = customer_name;
                if (phone_model !== undefined) dev.phone_model = phone_model;
                if (notes !== undefined) dev.notes = notes;
                if (issue_type !== undefined) dev.issue_type = issue_type;
                if (reply_message !== undefined) dev.reply_message = reply_message;
                found = true;
            }
            return dev;
        });
        
        if (!found) return res.status(404).json({ error: "الجهاز غير موجود" });
        
        writeData(data);
        res.json({ message: "تم التحديث بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "خطأ في تحديث البيانات" });
    }
});

app.delete('/api/devices/:id', (req, res) => {
    try {
        const { id } = req.params;
        const data = readData();
        data.devices = data.devices.filter(dev => dev.id != id);
        writeData(data);
        res.json({ message: "تم حذف الجهاز بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "خطأ في الحذف" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 سيرفر طه فون يعمل على المنفذ ${PORT}`);
});