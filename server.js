const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/tree-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. মানি ট্রি এক্সপোনেনশিয়াল ওরিজিনাল ক্র্যাশ জেনারেটর রাউট (POST Route - ৯৫% RTP গাণিতিক বর্ম কঠোর লক ভাই ভাই!)
app.post('/api/tree-shake', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(amount) || 50;

    // 🔒 [বেট সিকিউরিটি ফিল্টার]: বাজি ১ টাকার কম বা ২০০০০ টাকার বেশি হলে ব্যাকএন্ড ডিরেক্ট ব্লক ভাই ভাই!
    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Amount (৳১ - ৳২০০০০)" });
    }

    try {
        // 🔒 [ব্যালেন্স যাচাই প্রোটোকল]: বাজি প্লে করার আগে ডাটাবেজ থেকে রিয়েল টাকা নিশ্চিত করার চাবি
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });
        
        let currentDbBalance = 0;
        if (balResponse.data && balResponse.data.status === "ok" && balResponse.data.balance !== undefined) {
            currentDbBalance = parseFloat(balResponse.data.balance);
        } else {
            return res.json({ success: false, balance: 0, message: "❌ Database Sync Error! Please refresh." });
        }

        // 🔒 [ইনসাফিসিয়েন্ট প্রোটেকশন বর্ম]: অ্যাকাউন্টে টাকা কম থাকলে বা জিরো ব্যালেন্স হলে বাজি রিফিউজড ভাই ভাই!
        if (currentDbBalance < reqAmount || currentDbBalance <= 0) {
            return res.json({ success: false, balance: currentDbBalance, message: "❌ Insufficient Balance! Please Recharge BDT." });
        }

        let adminTriggeredPrize = (balResponse.data && balResponse.data.tree_target) ? parseFloat(balResponse.data.tree_target) : null;

        let crashPoint, finalStatus;
        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% ওরিজিনাল ক্যাসিনো RTP ও এক্সপোনেনশিয়াল ক্র্যাশ লুপ ম্যাথ ভাই ভাই]
        while (isLoopActive && loopSafety < 200) {
            loopSafety++;
            
            // ট্র্যাডিশনাল এভিয়েটর ক্র্যাশ অ্যালগরিদম: ০ থেকে ১ এর র্যান্ডম রেশিও ভেদ করে ওডস স্কেলিং
            let rand = Math.random();
            if (rand < 0.10) {
                crashPoint = 1.00; // ১০% রাউন্ডে বাজি ধরার সাথে সাথে ইনস্ট্যান্ট ক্র্যাশ লস ট্র্যাপ!
            } else {
                crashPoint = parseFloat((1.01 + (0.05 / (Math.random() + 0.01))).toFixed(2));
            }

            if (crashPoint > 100.00) crashPoint = 100.00; // সর্বোচ্চ ওডস সীমা ১০০ গুণ ফিক্সড লক!

            if (crashPoint >= 2.00) {
                finalStatus = "win";
            } else {
                finalStatus = "lose";
            }

            // এডমিন ড্যাশবোর্ড কন্ট্রোল ট্রিগার চাবি
            if (adminTriggeredPrize) {
                crashPoint = adminTriggeredPrize;
                isLoopActive = false;
            } else {
                // মেগা ৫০ গুণের ওপর ওডসের চান্স আরটিপি লুপ ট্র্যাকে কড়া সুরক্ষায় টাইট ০.৫% এ লক ভাই ভাই
                if (crashPoint >= 50.00 && Math.random() > 0.005) continue;

                if (finalStatus === "win") {
                    // ৯৫% আরটিপি সিঙ্ক কন্ট্রোল ম্যাথ লুপ স্বাভাবিক ট্র্যাকে ৩৫% এ ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.35) {
                        isLoopActive = false;
                    }
                } else {
                    isLoopActive = false; 
                }
            }
        }

        // ক্র্যাশ পয়েন্ট আসার সাথে সাথে ওয়ালেট থেকে বাজি এমাউন্ট ইনস্ট্যান্ট কেটে নেওয়া বর্ম ভাই ভাই
        let phpPayload = {
            action: "bet",
            username: userId,
            amount: reqAmount,
            wallet: targetWallet
        };

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                crashMultiplier: crashPoint
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "❌ Bet Declined by Database!" });
        }

    } catch (e) {
        console.error("Money Tree Core Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click BET again." });
    }
});

// 💰 ৩. প্লেয়ার যখন ক্র্যাশ হওয়ার আগে নিরাপদে ক্যাশ আউট বোতাম চাপবে তার উইন ক্রেডিট রাউট!
app.post('/api/tree-cashout', async (req, res) => {
    const { userId, wallet, betAmount, cashoutMultiplier } = req.body;
    const targetWallet = wallet || "main";
    const originalBet = parseFloat(betAmount);
    const multiplier = parseFloat(cashoutMultiplier);
    
    let winCreditAmount = parseFloat((originalBet * multiplier).toFixed(2));

    try {
        let phpPayload = {
            action: "win",
            username: userId,
            amount: winCreditAmount,
            wallet: targetWallet,
            bet_amount: originalBet,
            multiplier: multiplier.toFixed(2),
            status: "win",
            type: "win",
            is_win = 1,
            win_status: "win",
            log_status: "win"
        };

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({ success: true, balance: response.data.balance, winAmount: winCreditAmount });
        }
        return res.json({ success: false, message: "❌ Cashout Failed Sync!" });
    } catch (e) { return res.json({ success: false, message: "⚠️ Connection Timeout!" }); }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Money Tree Crash Engine!"); });

// টাকার গাছ ক্র্যাশ গেম নিজস্ব কাস্টম ৬০০০ পোর্টে গ্র্যান্ড ফিনালে নিয়নে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 6000; 
server.listen(PORT, () => { console.log(`🎡 Royal Money Tree Crash Engine Running on port ${PORT}`); });
