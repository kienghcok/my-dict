/**
 * 學生字典音韻推導引擎 (config.js)
 */

const INITIALS_RULES = {
    "幫": "ㄅ", "滂": "ㄆ", "明": "ㄇ", "非": "ㄈ", "敷": "ㄈ", "奉": "ㄈ", "微": "ㄪ",
    "端": "ㄉ", "透": "ㄊ", "泥": "ㄋ", "來": "ㄌ", "日": "ㄖ", "知": "ㄓ", "徹": "ㄔ", "孃": "ㄋ",
    "精": "ㄗ", "清": "ㄘ", "心": "ㄙ", "邪": "ㄙ", "照": "ㄓ", "穿": "ㄔ", "審": "ㄕ", "禪": "ㄕ",
    "見": "ㄍ", "谿": "ㄎ", "疑": "ㄫ", "曉": "ㄏ", "匣": "ㄏ", "影": "", "喩": "",
    "並": (t) => t === "平" ? "ㄆ" : "ㄅ", 
    "定": (t) => t === "平" ? "ㄊ" : "ㄉ",
    "澄": (t) => t === "平" ? "ㄔ" : "ㄓ", 
    "從": (t) => t === "平" ? "ㄘ" : "ㄗ",
    "羣": (t) => t === "平" ? "ㄎ" : "ㄍ",
    "牀": (t, mouth) => (mouth === "齊" || mouth === "撮") ? "ㄕ" : "ㄔ"
};

const FINALS_BASE = {
    "東董送屋": { "合": "ㄨㆲ", "撮": "ㄩㆲ" },
    "冬腫宋沃": { "合": "ㄨㆲ", "撮": "ㄩㆲ" },
    "江講絳覺": { "齊": "ㄧㄤ" }, 
    "支紙寘": { "開": (i) => ("精清從心邪照穿牀審禪".includes(i) ? "ㄭ" : "ㄧ"), "齊": "ㄧ", "合": "ㄨㄟ" },
    "微尾未": { "齊": "ㄧ", "合": "ㄨㄟ" },
    "魚語御": { "合": "ㄨ", "撮": "ㄩ" },
    "虞麌遇": { "合": "ㄨ", "撮": "ㄩ" },
    "齊薺霽": { "開": "ㄭ", "齊": "ㄧㄟ", "合": "ㄨㄟ" },
    "泰": { "開": "ㄞ", "合": "ㄨㄟ" },
    "佳蟹卦": { "開": "ㄞ", "合": "ㄨㄞ", "齊": "ㄧㄞ" },
    "灰賄隊": { "開": "ㄞ", "合": "ㄨㄟ" },
    "真軫震質": { "開": "ㄣ", "齊": "ㄧㄣ", "撮": "ㄩㄣ" },
    "文吻問物": { "開": "ㄣ", "齊": "ㄧㄣ", "撮": "ㄩㄣ", "合": "ㄨㄣ" },
    "元阮願月": { "開": "ㄣ", "齊": "ㄧㄢ", "撮": "ㄩㄢ", "合": (i) => ("非敷奉微".includes(i) ? "ㄨㄢ" : "ㄨㄣ") },
    "寒旱翰曷": { "開": "ㄢ", "合": "ㄨ干" },
    "刪潸諫黠": { "開": "ㄢ", "齊": "ㄧㄢ", "合": "ㄨㄢ" },
    "先銑霰屑": { "齊": "ㄧ干", "撮": "ㄩ干" },
    "蕭筱嘯": { "齊": "ㄧㄠ" },
    "肴巧效": { "齊": "ㄧㄠ" },
    "豪皓號": { "開": "ㄠ", "齊": "ㄧㄠ" },
    "歌哿箇": { "開": "ㄛ", "齊": "ㄧㄝ", "合": "ㄨㄛ", "撮": "ㄩㄝ" },
    "麻馬禡": { "開": "ㄚ", "合": "ㄨㄚ", "齊": (i, tone, mouth, grade) => { return (grade === "二") ? "ㄧㄚ" : "ㄧㄝ";}},
    "陽養漾藥": { "開": "ㄤ", "齊": "ㄧㄤ", "合": "ㄨㄤ", "撮": "ㄩㄤ" },
    "庚梗敬陌": { "開": "ㄥ", "齊": "ㄧㄥ", "合": "ㄨㄥ", "撮": "ㄩㄥ" },
    "青迥徑錫": { "齊": "ㄧㄥ", "撮": "ㄩㄥ" },
    "蒸職": { "開": "ㄥ", "齊": "ㄧㄥ", "合": "ㄨㄥ" },
    "尤有宥": { "開": "ㄡ", "齊": "ㄧㄡ", "合": (i) => ("非敷奉微".includes(i) ? "ㄨㄡ" : "ㄡ") },
    "侵沁緝": { "開": "ㆬ", "齊": "ㄧㆬ" },
    "覃感勘合": { "開": "ㆰ" },
    "鹽琰豔葉": { "齊": "ㄧㆰ" },
    "咸豏陷洽": { "開": "ㆰ", "齊": "ㄧㆰ", "合": "ㄨㆰ" }
};

const FINALS_RULES = {};
for (const [chars, rules] of Object.entries(FINALS_BASE)) {
    for (const char of chars) FINALS_RULES[char] = rules;
}

const MAP = {
    i: {
        "ㄅ":["b","b"], "ㄆ":["p","p"], "ㄇ":["m","m"], "ㄈ":["f","f"], "ㄪ":["v","v"],
        "ㄉ":["d","d"], "ㄊ":["t","t"], "ㄋ":["n","n"], "ㄌ":["l","l"],
        "ㄍ":["g","g"], "ㄎ":["k","k"], "ㄫ":["ng","ŋ"], "ㄏ":["h","x"],
        "ㄐ":["j","dʑ"], "ㄑ":["q","tɕ"], "ㄬ":["nj","ȵ"], "ㄒ":["x","ɕ"],
        "ㄓ":["zh","dʒ"], "ㄔ":["ch","tʃ"], "ㄕ":["sh","ʃ"], "ㄖ":["r","r"],
        "ㄗ":["z","dz"], "ㄘ":["c","ts"], "ㄙ":["s","s"], "":["",""]
    },
    f: {
        "ㄧ":["i","i"], "ㄨ":["u","u"], "ㄩ":["ü","ü"], "ㄚ":["a","a"], "ㄧㄚ":["ia","ia"], 
        "ㄨㄚ":["ua","ua"], "ㄛ":["o","ɔ"], "ㄧㄛ":["io","iɔ"], "ㄨㄛ":["uo","uɔ"], 
        "ㄩㄛ":["üo","yɔ"], "ㄜ":["e","ə"], "ㄨㄜ":["ue","uə"], "ㄝ":["eh","ɛ"], 
        "ㄧㄝ":["ie","iɛ"], "ㄩㄝ":["üe","yɛ"], "ㄧㆤ":["ie","iɛ"], // 補上ㄧㆤ
        "ㄞ":["ai","ai"], "ㄧㄞ":["iai","iai"], "ㄨㄞ":["uai","uai"], "ㄟ":["ei","əi"], 
        "ㄨㄟ":["uei","uəi"], "ㄧㄟ":["iei","iəi"], "ㄠ":["ao","ɑu"], "ㄧㄠ":["iao","iɑu"], "ㄡ":["ou","əu"], 
        "ㄧㄡ":["iu","iu"], "ㄨㄡ":["uou","uəu"], "ㆰ":["am","am"], "ㄧㆰ":["iam","iam"], 
        "ㄨㆰ":["uam","uam"], "ㆬ":["em","əm"], "ㄧㆬ":["im","im"], "ㄢ":["an","an"], 
        "ㄧㄢ":["ian","ian"], "ㄨㄢ":["uan","uan"], "ㄩㄢ":["üan","yan"], "干":["on","ɔn"], "ㄧ干":["ien","iɛn"], 
        "ㄨ干":["uon","uɔn"], "ㄩ干":["üen","yɛn"], "ㄣ":["en","ən"], "ㄧㄣ":["in","in"], 
        "ㄨㄣ":["un","un"], "ㄩㄣ":["ün","yn"], "ㄤ":["ang","ɑŋ"], "ㄧㄤ":["iang","iɑŋ"], 
        "ㄨㄤ":["uang","uɑŋ"], "ㄥ":["eng","əŋ"], "ㄧㄥ":["ing","iŋ"], "ㄨㄥ":["ueng","uəŋ"], 
        "ㄩㄥ":["üeng","yəŋ"], "ㆲ":["eng","əŋ"], "ㄨㆲ":["ong","uŋ"], "ㄩㆲ":["iong","yŋ"], "ㄦ":["er","ər"], "ㄭ":["i","ɿ"]
    }
};

function applyTone(str, toneIdx) {
    if (toneIdx === undefined || toneIdx === null) return str;
    // 映射表：0-陰平, 1-去聲, 2-陽平/濁平, 3-上聲, 4-入聲(不帶號)
    const tones = {
        "a": ["ā", "á", "ǎ", "à", "a"], "e": ["ē", "é", "ě", "è", "e"],
        "o": ["ō", "ó", "ǒ", "ò", "o"], "i": ["ī", "í", "ǐ", "ì", "i"],
        "u": ["ū", "ú", "ǔ", "ù", "u"], "y": ["ǖ", "ǘ", "ǚ", "ǜ", "ü"]
    };
    const target = str.match(/[aeo]/) || str.match(/[iuy]/);
    if (!target) return str;
    const char = target[0];
    return str.replace(char, tones[char][toneIdx] || char);
}

function derivePhonology(status, opts) {
    const m = status.match(/^([一-龥])(開|合|齊|撮)?([一二三四])?([一-龥])([平上去入])$/);
    if (!m) return status;

    let [_, init, mouth="開", grade, rime, tone] = m;
    
    let resI = (typeof INITIALS_RULES[init] === "function") 
        ? INITIALS_RULES[init](tone, mouth) 
        : INITIALS_RULES[init];
    
    let resF = "";
    const rules = FINALS_RULES[rime];
    if (rules) {
        const key = mouth + (grade || "");
        resF = rules[key] || rules[mouth] || "";
        if (typeof resF === "function") resF = resF(init, tone, mouth, grade);
    }

    // --- 演變邏輯 ---

    // 1. 東庚合併功能
    if (opts.mergeDongGeng) {
        const voiceless = "幫滂端透精清心照穿審見谿曉影";
        if ("庚梗敬陌".includes(rime)) {
            if (mouth === "合") resF = "ㄨㆲ";
            else if (mouth === "撮") resF = voiceless.includes(init) ? "ㄧㄥ" : "ㄩㆲ";
        } else if (rime === "蒸" && mouth === "合") {
            resF = "ㄨㆲ";
        } else if (rime === "職") {
            if (mouth === "合") resF = "ㄨㄤ";
            else if (mouth === "撮") resF = "ㄩㆲ";
        }
    }

    // 2. 齊韻歸一
    if (opts.qiToI && resF === "ㄧㄟ") resF = "ㄧ";

// 3. 莊三化二 (修正版)
    if (opts.zhuangSan && ["ㄓ", "ㄔ", "ㄕ", "ㄖ"].includes(resI)) {
        if (resF.startsWith("ㄧ")) {
            resF = resF.replace(/^ㄧ/, ""); 
            if (resF === "") resF = "ㄭ"; // 脫落後補空韻
        } else if (resF.startsWith("ㄩ")) {
            resF = resF.replace(/^ㄩ/, "ㄨ"); // ㄩ 變 ㄨ
        }
    }

    // 4. 入聲韻合併功能
    if (opts.mergeRuRime && tone === "入") {
        const ruMap = {
            "ㆰ":"ㄚ", "ㄢ":"ㄚ", "干":"ㄚ", "ㄨㆰ":"ㄚ", "ㄨㄢ":"ㄚ",
            "ㆬ":"ㄜ", "ㄣ":"ㄜ", "ㄥ":"ㄜ",
            "ㄧㆬ":"ㄧ", "ㄧㄣ":"ㄧ", "ㄧㄥ":"ㄧ",
            "ㄨㄣ":"ㄨ", "ㄨㆲ":"ㄨ",
            "ㄩㄣ":"ㄩ", "ㄩㆲ":"ㄩ",
            "ㄨㄥ":"ㄨㄜ", "ㄤ":"ㄛ", "ㄧㄤ":"ㄧㄛ", "ㄩㄤ":"ㄩㄛ","ㄨㄤ":"ㄨㄛ",
            "ㄧㆰ":"ㄧㆤ", "ㄧㄢ":"ㄧㆤ", "ㄧ干":"ㄧㆤ"
        };
                const oldRuF = resF;
        if (ruMap[resF]) resF = ruMap[resF];
        if (["ㄓ", "ㄔ", "ㄕ", "ㄖ"].includes(resI) && ["ㄣ", "ㆬ", "ㄥ"].includes(oldRuF)) {
            resF = "ㄭ";
        }
    }

    // 基礎演變 (其餘選項)
    if (opts.dropVng && (resI === "ㄪ" || resI === "ㄫ")) resI = "";
    if (opts.palatalization && (mouth === "齊" || mouth === "撮")) {
        const pMap = { "ㄍ": "ㄐ", "ㄎ": "ㄑ", "ㄫ": "ㄬ", "ㄏ": "ㄒ" };
        if (pMap[resI]) resI = pMap[resI];
    }
    if (opts.dropFw) { const labials = ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄪ"]; 
        if (labials.includes(resI)) {
            if (resF.length > 1 && resF.startsWith("ㄨ")) {
            resF = resF.substring(1);
            }
        }
    }
    if (opts.riToEr && resI === "ㄖ" && resF === "ㄧ") { resI = ""; resF = "ㄦ"; }
if (opts.simplifyAn) {
            // 當介音是 i (ㄧ) 或 y (ㄩ) 且韻母是 an (ㄢ) 時，將 a 變為 ɛ
            if (fStr === "ian") fStr = "iɛn";
            if (fStr === "üan" || fStr === "yan") fStr = "yɛn";
        }    if (opts.simplifyAm) { resF = resF.replace("ㆬ", "ㄣ").replace("ㆰ", "ㄢ"); }

    // 聲調計算
    const fullV = ["並","奉","定","澄","從","牀","羣","邪","禪","匣"];
    const sonorant = ["明","微","泥","來","日","孃","疑","喩"];
    let toneKey = tone;
    if (tone === "上" && fullV.includes(init)) toneKey = "去";
    else if (tone === "平") toneKey = (fullV.includes(init) || sonorant.includes(init)) ? "濁平" : "清平";

    // 輸出處理 - 注音
    if (opts.phoneticScheme === "zhuyin") {
        const marks = opts.beijingTone 
            ? { "清平":"", "濁平":"ˊ", "上":"ˇ", "去":"ˋ", "入":"˙" }
            : { "清平":"", "濁平":"ˇ", "上":"ˋ", "去":"ˊ", "入":"˙" };
        const displayF = (resF === "ㄭ") ? "" : resF;
        return `${resI}${displayF}${marks[toneKey] || ""}`;
    }

    // 2. 獲取羅馬/IPA 基礎字符串
    const idx = opts.phoneticScheme === "roma" ? 0 : 1;
    let fStr = (MAP.f[resF] ? MAP.f[resF][idx] : resF) || "";
    let iStr = (MAP.i[resI] ? MAP.i[resI][idx] : resI) || "";

    // 強制轉換入聲韻尾 (-p, -t, -k)
    if (tone === "入") {
        fStr = fStr.replace(/m$/, "p").replace(/n$/, "t").replace(/ng$/, "k").replace(/ŋ$/, "k");
    }

    // 3. 輸出處理 - 羅馬拼音
    if (opts.phoneticScheme === "roma") {
        if (["z","c","s","zh","ch","sh","r"].includes(iStr)) {
            if (resF === "ㄭ") fStr = "i";
            else if (resF === "ㄧ") fStr = "ii";
        }
        
        let tIdx;
        if (opts.beijingTone) {
            const bjMap = { "清平":0, "濁平":1, "上":2, "去":3, "入":4 };
            tIdx = bjMap[toneKey];
        } else {
            const zzMap = { "清平":0, "濁平":2, "上":3, "去":1, "入":4 };
            tIdx = zzMap[toneKey];
        }
        return `${iStr}${applyTone(fStr, tIdx)}`;
    }

    // 4. 輸出處理 - IPA (新增 ㄓㄔㄕㄖ+ㄭ 的特殊處理)
    if (opts.phoneticScheme === "ipa") {
        if (resF === "ㄭ") {
            if (resI === "ㄖ") {
                // ㄖ + ㄭ -> r
                iStr = "r";
                fStr = "";
            } else if (["ㄓ", "ㄔ", "ㄕ"].includes(resI)) {
                // ㄓㄔㄕ 保持聲母 + ʅ
                fStr = "ʅ";
            } else if (["ㄗ", "ㄘ", "ㄙ"].includes(resI)) {
                // ㄗㄘㄙ 轉回 ɿ (如果需要區分舌尖前後)
                fStr = "ɿ";
            }
        }

        const ipaT = opts.beijingTone
            ? { "清平":"˥˥", "濁平":"˧˥", "上":"˨˩˦", "去":"˥˩", "入":"˥" }
            : { "清平":"˦˦", "濁平":"˨˩", "上":"˦˨", "去":"˨˦", "入":"˩˧" };
        return `${iStr}${fStr}${ipaT[toneKey] || ""}`;
    }
}
