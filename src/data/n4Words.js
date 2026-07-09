// N4 vocabulary — 150 entries
// Primary source: elzup/jlpt-word-list/src/n4.csv
// Cleaned and adapted for this learning game.
// Note: JLPT does not publish an official complete vocabulary list.

const n4Vocab = [
  {
    "id": 1,
    "kana": "ふむ",
    "kanji": "踏む",
    "meaning": "踩、踏",
    "meaningEn": "to step on, to tread on",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 2,
    "kana": "～く",
    "kanji": "～区",
    "meaning": "～區、～行政區",
    "meaningEn": "district, ward, borough",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 3,
    "kana": "すっと",
    "kanji": "",
    "meaning": "迅速地；筆直地",
    "meaningEn": "straight, quickly",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 4,
    "kana": "ぬすむ",
    "kanji": "盗む",
    "meaning": "偷、盜取",
    "meaningEn": "to steal, to rob",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 5,
    "kana": "たいてい",
    "kanji": "大抵",
    "meaning": "大多、通常",
    "meaningEn": "generally, usually",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 6,
    "kana": "とうとう",
    "kanji": "",
    "meaning": "終於、最終",
    "meaningEn": "finally, at last",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 7,
    "kana": "ガソリン",
    "kanji": "",
    "meaning": "汽油",
    "meaningEn": "gasoline, petrol",
    "level": "N4",
    "category": "交通"
  },
  {
    "id": 8,
    "kana": "なる",
    "kanji": "鳴る",
    "meaning": "響、鳴",
    "meaningEn": "to sound, to ring",
    "level": "N4",
    "category": "聲音"
  },
  {
    "id": 9,
    "kana": "しっかり",
    "kanji": "",
    "meaning": "牢固地；好好地",
    "meaningEn": "firmly, steadily",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 10,
    "kana": "いきる",
    "kanji": "生きる",
    "meaning": "活著、生存",
    "meaningEn": "to live",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 11,
    "kana": "にがい",
    "kanji": "苦い",
    "meaning": "苦的",
    "meaningEn": "bitter",
    "level": "N4",
    "category": "感覺"
  },
  {
    "id": 12,
    "kana": "わく",
    "kanji": "沸く",
    "meaning": "沸騰；變熱",
    "meaningEn": "to boil, to grow hot",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 13,
    "kana": "いけん",
    "kanji": "意見",
    "meaning": "意見、看法",
    "meaningEn": "opinion, view, idea",
    "level": "N4",
    "category": "溝通"
  },
  {
    "id": 14,
    "kana": "やはり",
    "kanji": "",
    "meaning": "果然、仍然",
    "meaningEn": "as expected, after all",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 15,
    "kana": "まんが",
    "kanji": "漫画",
    "meaning": "漫畫",
    "meaningEn": "comic book, cartoon",
    "level": "N4",
    "category": "娛樂"
  },
  {
    "id": 16,
    "kana": "ステレオ",
    "kanji": "",
    "meaning": "立體音響",
    "meaningEn": "stereo",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 17,
    "kana": "いがく",
    "kanji": "医学",
    "meaning": "醫學",
    "meaningEn": "medical science",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 18,
    "kana": "テキスト",
    "kanji": "",
    "meaning": "課本、文本",
    "meaningEn": "text, textbook",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 19,
    "kana": "～つき",
    "kanji": "～月",
    "meaning": "～個月",
    "meaningEn": "month",
    "level": "N4",
    "category": "時間"
  },
  {
    "id": 20,
    "kana": "おる",
    "kanji": "折る",
    "meaning": "折斷、折彎",
    "meaningEn": "to break, to fold, to bend",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 21,
    "kana": "～かい",
    "kanji": "～会",
    "meaning": "～會、～聚會",
    "meaningEn": "meeting, gathering",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 22,
    "kana": "うかがう",
    "kanji": "伺う",
    "meaning": "請問；拜訪",
    "meaningEn": "to ask, to visit humbly",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 23,
    "kana": "きこえる",
    "kanji": "聞こえる",
    "meaning": "聽得見",
    "meaningEn": "to be heard, to be audible",
    "level": "N4",
    "category": "感覺"
  },
  {
    "id": 24,
    "kana": "ぼく",
    "kanji": "僕",
    "meaning": "我（男性自稱）",
    "meaningEn": "I, me, used mainly by males",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 25,
    "kana": "かならず",
    "kanji": "必ず",
    "meaning": "一定、必定",
    "meaningEn": "surely, certainly",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 26,
    "kana": "こわす",
    "kanji": "壊す",
    "meaning": "弄壞、破壞",
    "meaningEn": "to break, to destroy",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 27,
    "kana": "おこる",
    "kanji": "怒る",
    "meaning": "生氣；斥責",
    "meaningEn": "to get angry, to scold",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 28,
    "kana": "とこや",
    "kanji": "床屋",
    "meaning": "理髮店、理髮師",
    "meaningEn": "barber, barber shop",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 29,
    "kana": "オートバイ",
    "kanji": "",
    "meaning": "摩托車",
    "meaningEn": "motorcycle",
    "level": "N4",
    "category": "交通"
  },
  {
    "id": 30,
    "kana": "うんどう",
    "kanji": "運動",
    "meaning": "運動",
    "meaningEn": "exercise",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 31,
    "kana": "やむ",
    "kanji": "止む",
    "meaning": "停止（雨、風等）",
    "meaningEn": "to cease, to stop",
    "level": "N4",
    "category": "天氣"
  },
  {
    "id": 32,
    "kana": "もし",
    "kanji": "",
    "meaning": "如果、假如",
    "meaningEn": "if",
    "level": "N4",
    "category": "連接詞"
  },
  {
    "id": 33,
    "kana": "おもて",
    "kanji": "表",
    "meaning": "表面；正面；外面",
    "meaningEn": "surface, front, outside",
    "level": "N4",
    "category": "位置"
  },
  {
    "id": 34,
    "kana": "だいがくせい",
    "kanji": "大学生",
    "meaning": "大學生",
    "meaningEn": "university student",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 35,
    "kana": "うんてんしゅ",
    "kanji": "運転手",
    "meaning": "司機",
    "meaningEn": "driver",
    "level": "N4",
    "category": "職業"
  },
  {
    "id": 36,
    "kana": "よしゅう",
    "kanji": "予習",
    "meaning": "預習",
    "meaningEn": "lesson preparation",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 37,
    "kana": "しんぱい",
    "kanji": "心配",
    "meaning": "擔心、掛念",
    "meaningEn": "worry, concern",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 38,
    "kana": "べつ",
    "kanji": "別",
    "meaning": "不同；另外",
    "meaningEn": "different, separate",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 39,
    "kana": "ひじょうに",
    "kanji": "非常に",
    "meaning": "非常、極其",
    "meaningEn": "extremely, very",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 40,
    "kana": "おたく",
    "kanji": "お宅",
    "meaning": "府上、您家",
    "meaningEn": "someone else's home, polite",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 41,
    "kana": "やわらかい",
    "kanji": "柔らかい",
    "meaning": "柔軟的、柔和的",
    "meaningEn": "soft, tender",
    "level": "N4",
    "category": "感覺"
  },
  {
    "id": 42,
    "kana": "ひろう",
    "kanji": "拾う",
    "meaning": "撿、拾起",
    "meaningEn": "to pick up, to find",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 43,
    "kana": "ございます",
    "kanji": "",
    "meaning": "有、是（禮貌說法）",
    "meaningEn": "to be, to exist politely",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 44,
    "kana": "き",
    "kanji": "気",
    "meaning": "心情；精神；心意",
    "meaningEn": "spirit, mood, feeling",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 45,
    "kana": "くらべる",
    "kanji": "比べる",
    "meaning": "比較",
    "meaningEn": "to compare",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 46,
    "kana": "ほとんど",
    "kanji": "",
    "meaning": "幾乎；大部分",
    "meaningEn": "mostly, almost",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 47,
    "kana": "つもり",
    "kanji": "",
    "meaning": "打算、意圖",
    "meaningEn": "intention, plan",
    "level": "N4",
    "category": "想法"
  },
  {
    "id": 48,
    "kana": "こうがい",
    "kanji": "郊外",
    "meaning": "郊外、市郊",
    "meaningEn": "suburb, outskirts",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 49,
    "kana": "だめ",
    "kanji": "",
    "meaning": "不行；沒用",
    "meaningEn": "no good, useless",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 50,
    "kana": "うりば",
    "kanji": "売り場",
    "meaning": "賣場、銷售區",
    "meaningEn": "sales floor, place of sale",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 51,
    "kana": "しょうがつ",
    "kanji": "正月",
    "meaning": "新年、正月",
    "meaningEn": "New Year",
    "level": "N4",
    "category": "節日"
  },
  {
    "id": 52,
    "kana": "きそく",
    "kanji": "規則",
    "meaning": "規則、規定",
    "meaningEn": "rule, regulation",
    "level": "N4",
    "category": "社會"
  },
  {
    "id": 53,
    "kana": "うん",
    "kanji": "",
    "meaning": "嗯、是（口語）",
    "meaningEn": "yes, okay, informal",
    "level": "N4",
    "category": "溝通"
  },
  {
    "id": 54,
    "kana": "はつおん",
    "kanji": "発音",
    "meaning": "發音",
    "meaningEn": "pronunciation",
    "level": "N4",
    "category": "語言"
  },
  {
    "id": 55,
    "kana": "やく",
    "kanji": "焼く",
    "meaning": "烤、燒",
    "meaningEn": "to bake, to grill",
    "level": "N4",
    "category": "飲食"
  },
  {
    "id": 56,
    "kana": "おくじょう",
    "kanji": "屋上",
    "meaning": "屋頂、頂樓",
    "meaningEn": "rooftop",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 57,
    "kana": "しつれい",
    "kanji": "失礼",
    "meaning": "失禮；不好意思",
    "meaningEn": "impoliteness, excuse me",
    "level": "N4",
    "category": "溝通"
  },
  {
    "id": 58,
    "kana": "ごみ",
    "kanji": "",
    "meaning": "垃圾",
    "meaningEn": "trash, garbage",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 59,
    "kana": "アフリカ",
    "kanji": "",
    "meaning": "非洲",
    "meaningEn": "Africa",
    "level": "N4",
    "category": "地理"
  },
  {
    "id": 60,
    "kana": "てん",
    "kanji": "点",
    "meaning": "分數；點",
    "meaningEn": "point, score, mark",
    "level": "N4",
    "category": "數量"
  },
  {
    "id": 61,
    "kana": "いっしょうけんめい",
    "kanji": "一生懸命",
    "meaning": "拼命地、努力地",
    "meaningEn": "with utmost effort",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 62,
    "kana": "こんど",
    "kanji": "今度",
    "meaning": "這次；下次；近期",
    "meaningEn": "this time, next time",
    "level": "N4",
    "category": "時間"
  },
  {
    "id": 63,
    "kana": "きかい",
    "kanji": "機会",
    "meaning": "機會",
    "meaningEn": "chance, opportunity",
    "level": "N4",
    "category": "抽象"
  },
  {
    "id": 64,
    "kana": "たてる",
    "kanji": "建てる",
    "meaning": "建造、蓋",
    "meaningEn": "to build",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 65,
    "kana": "ふくざつ",
    "kanji": "複雑",
    "meaning": "複雜的",
    "meaningEn": "complex, complicated",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 66,
    "kana": "かれ",
    "kanji": "彼",
    "meaning": "他；男朋友",
    "meaningEn": "he, boyfriend",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 67,
    "kana": "いらっしゃる",
    "kanji": "",
    "meaning": "在；去；來（尊敬語）",
    "meaningEn": "honorific for go, come, be",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 68,
    "kana": "ふとん",
    "kanji": "布団",
    "meaning": "日式棉被、床鋪",
    "meaningEn": "futon, bedding",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 69,
    "kana": "だいじ",
    "kanji": "大事",
    "meaning": "重要；珍貴",
    "meaningEn": "important, valuable",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 70,
    "kana": "おくりもの",
    "kanji": "贈り物",
    "meaning": "禮物、贈品",
    "meaningEn": "gift, present",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 71,
    "kana": "どろぼう",
    "kanji": "泥棒",
    "meaning": "小偷、竊賊",
    "meaningEn": "thief, burglar",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 72,
    "kana": "～せい",
    "kanji": "～製",
    "meaning": "～製造、～製的",
    "meaningEn": "made in, made of",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 73,
    "kana": "ちゅうい",
    "kanji": "注意",
    "meaning": "注意、小心",
    "meaningEn": "caution, attention",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 74,
    "kana": "たいふう",
    "kanji": "台風",
    "meaning": "颱風",
    "meaningEn": "typhoon",
    "level": "N4",
    "category": "天氣"
  },
  {
    "id": 75,
    "kana": "ひ",
    "kanji": "日",
    "meaning": "太陽；陽光；日子",
    "meaningEn": "sun, sunshine, day",
    "level": "N4",
    "category": "自然"
  },
  {
    "id": 76,
    "kana": "～けん",
    "kanji": "～軒",
    "meaning": "～棟、～間（房屋量詞）",
    "meaningEn": "counter for houses",
    "level": "N4",
    "category": "量詞"
  },
  {
    "id": 77,
    "kana": "そう",
    "kanji": "",
    "meaning": "是嗎；對、沒錯",
    "meaningEn": "really, is that so, yes",
    "level": "N4",
    "category": "溝通"
  },
  {
    "id": 78,
    "kana": "とおる",
    "kanji": "通る",
    "meaning": "通過、經過",
    "meaningEn": "to pass, to go through",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 79,
    "kana": "すぎる",
    "kanji": "過ぎる",
    "meaning": "超過；經過",
    "meaningEn": "to exceed, to pass",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 80,
    "kana": "レポート",
    "kanji": "",
    "meaning": "報告",
    "meaningEn": "report",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 81,
    "kana": "は",
    "kanji": "葉",
    "meaning": "葉子",
    "meaningEn": "leaf",
    "level": "N4",
    "category": "自然"
  },
  {
    "id": 82,
    "kana": "ひつよう",
    "kanji": "必要",
    "meaning": "必要、需要",
    "meaningEn": "necessary, needed",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 83,
    "kana": "かちょう",
    "kanji": "課長",
    "meaning": "課長",
    "meaningEn": "section manager",
    "level": "N4",
    "category": "職業"
  },
  {
    "id": 84,
    "kana": "じしん",
    "kanji": "地震",
    "meaning": "地震",
    "meaningEn": "earthquake",
    "level": "N4",
    "category": "自然"
  },
  {
    "id": 85,
    "kana": "すると",
    "kanji": "",
    "meaning": "於是、然後",
    "meaningEn": "then, and then",
    "level": "N4",
    "category": "連接詞"
  },
  {
    "id": 86,
    "kana": "やめる",
    "kanji": "止める",
    "meaning": "停止、放棄",
    "meaningEn": "to stop, to quit",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 87,
    "kana": "ガラス",
    "kanji": "",
    "meaning": "玻璃",
    "meaningEn": "glass, pane",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 88,
    "kana": "～がくぶ",
    "kanji": "～学部",
    "meaning": "～學系、～學院",
    "meaningEn": "university department",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 89,
    "kana": "きびしい",
    "kanji": "厳しい",
    "meaning": "嚴格的；嚴峻的",
    "meaningEn": "strict, severe",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 90,
    "kana": "エスカレーター",
    "kanji": "",
    "meaning": "手扶梯",
    "meaningEn": "escalator",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 91,
    "kana": "じんこう",
    "kanji": "人口",
    "meaning": "人口",
    "meaningEn": "population",
    "level": "N4",
    "category": "社會"
  },
  {
    "id": 92,
    "kana": "つき",
    "kanji": "月",
    "meaning": "月亮",
    "meaningEn": "moon",
    "level": "N4",
    "category": "自然"
  },
  {
    "id": 93,
    "kana": "きぬ",
    "kanji": "絹",
    "meaning": "絲綢",
    "meaningEn": "silk",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 94,
    "kana": "ちっとも",
    "kanji": "",
    "meaning": "一點也不（搭配否定）",
    "meaningEn": "not at all",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 95,
    "kana": "ふかい",
    "kanji": "深い",
    "meaning": "深的；深刻的",
    "meaningEn": "deep, profound",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 96,
    "kana": "こわれる",
    "kanji": "壊れる",
    "meaning": "壞掉、損壞",
    "meaningEn": "to be broken",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 97,
    "kana": "ゆれる",
    "kanji": "揺れる",
    "meaning": "搖晃、搖動",
    "meaningEn": "to shake, to sway",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 98,
    "kana": "おちる",
    "kanji": "落ちる",
    "meaning": "掉落、落下",
    "meaningEn": "to fall, to drop",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 99,
    "kana": "できるだけ",
    "kanji": "",
    "meaning": "盡可能",
    "meaningEn": "as much as possible",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 100,
    "kana": "かなしい",
    "kanji": "悲しい",
    "meaning": "悲傷的、難過的",
    "meaningEn": "sad, sorrowful",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 101,
    "kana": "ちゅうがっこう",
    "kanji": "中学校",
    "meaning": "國中、初級中學",
    "meaningEn": "junior high school",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 102,
    "kana": "ガス",
    "kanji": "",
    "meaning": "瓦斯、氣體",
    "meaningEn": "gas",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 103,
    "kana": "いのる",
    "kanji": "祈る",
    "meaning": "祈禱、祝願",
    "meaningEn": "to pray, to wish",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 104,
    "kana": "さかん",
    "kanji": "盛ん",
    "meaning": "興盛的；活躍的",
    "meaningEn": "prosperous, active",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 105,
    "kana": "アルバイト",
    "kanji": "",
    "meaning": "打工、兼職",
    "meaningEn": "part-time job",
    "level": "N4",
    "category": "工作"
  },
  {
    "id": 106,
    "kana": "おこす",
    "kanji": "起こす",
    "meaning": "叫醒；引起",
    "meaningEn": "to wake someone, to cause",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 107,
    "kana": "いたす",
    "kanji": "致す",
    "meaning": "做（する的謙讓語）",
    "meaningEn": "humble form of to do",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 108,
    "kana": "かむ",
    "kanji": "噛む",
    "meaning": "咬、咀嚼",
    "meaningEn": "to bite, to chew",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 109,
    "kana": "あかちゃん",
    "kanji": "赤ちゃん",
    "meaning": "嬰兒、寶寶",
    "meaningEn": "baby, infant",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 110,
    "kana": "あさい",
    "kanji": "浅い",
    "meaning": "淺的；膚淺的",
    "meaningEn": "shallow, superficial",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 111,
    "kana": "うそ",
    "kanji": "嘘",
    "meaning": "謊言、說謊",
    "meaningEn": "lie",
    "level": "N4",
    "category": "溝通"
  },
  {
    "id": 112,
    "kana": "しょうせつ",
    "kanji": "小説",
    "meaning": "小說",
    "meaningEn": "novel",
    "level": "N4",
    "category": "娛樂"
  },
  {
    "id": 113,
    "kana": "おや",
    "kanji": "親",
    "meaning": "父母；家長",
    "meaningEn": "parent",
    "level": "N4",
    "category": "人物"
  },
  {
    "id": 114,
    "kana": "それに",
    "kanji": "",
    "meaning": "而且、再加上",
    "meaningEn": "moreover, besides",
    "level": "N4",
    "category": "連接詞"
  },
  {
    "id": 115,
    "kana": "せいよう",
    "kanji": "西洋",
    "meaning": "西方、西洋",
    "meaningEn": "the West, Western countries",
    "level": "N4",
    "category": "地理"
  },
  {
    "id": 116,
    "kana": "おもう",
    "kanji": "思う",
    "meaning": "想、認為、感覺",
    "meaningEn": "to think, to feel",
    "level": "N4",
    "category": "想法"
  },
  {
    "id": 117,
    "kana": "パートタイム",
    "kanji": "",
    "meaning": "兼職、部分工時",
    "meaningEn": "part-time work",
    "level": "N4",
    "category": "工作"
  },
  {
    "id": 118,
    "kana": "じだい",
    "kanji": "時代",
    "meaning": "時代、年代",
    "meaningEn": "age, era, period",
    "level": "N4",
    "category": "時間"
  },
  {
    "id": 119,
    "kana": "もうしあげる",
    "kanji": "申し上げる",
    "meaning": "說、告知（謙讓語）",
    "meaningEn": "to say, to tell humbly",
    "level": "N4",
    "category": "敬語"
  },
  {
    "id": 120,
    "kana": "～しき",
    "kanji": "～式",
    "meaning": "～儀式；～方式",
    "meaningEn": "ceremony, style, method",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 121,
    "kana": "しゅっせき",
    "kanji": "出席",
    "meaning": "出席",
    "meaningEn": "attendance",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 122,
    "kana": "～か",
    "kanji": "～家",
    "meaning": "～家、～專家",
    "meaningEn": "specialist, professional",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 123,
    "kana": "むかえる",
    "kanji": "迎える",
    "meaning": "迎接、迎來",
    "meaningEn": "to welcome, to greet",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 124,
    "kana": "さわる",
    "kanji": "触る",
    "meaning": "觸摸、碰",
    "meaningEn": "to touch",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 125,
    "kana": "～だて",
    "kanji": "～建て",
    "meaning": "～層樓；獨棟建築",
    "meaningEn": "storied building, built",
    "level": "N4",
    "category": "接尾詞"
  },
  {
    "id": 126,
    "kana": "しゃちょう",
    "kanji": "社長",
    "meaning": "公司社長、總經理",
    "meaningEn": "company president",
    "level": "N4",
    "category": "職業"
  },
  {
    "id": 127,
    "kana": "どうぶつえん",
    "kanji": "動物園",
    "meaning": "動物園",
    "meaningEn": "zoo",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 128,
    "kana": "つかまえる",
    "kanji": "捕まえる",
    "meaning": "抓住；逮捕",
    "meaningEn": "to catch, to arrest",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 129,
    "kana": "きせつ",
    "kanji": "季節",
    "meaning": "季節",
    "meaningEn": "season",
    "level": "N4",
    "category": "時間"
  },
  {
    "id": 130,
    "kana": "よる",
    "kanji": "寄る",
    "meaning": "順道去、靠近",
    "meaningEn": "to stop by, to approach",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 131,
    "kana": "きまる",
    "kanji": "決まる",
    "meaning": "決定、確定",
    "meaningEn": "to be decided, to be fixed",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 132,
    "kana": "ひらく",
    "kanji": "開く",
    "meaning": "打開；舉辦",
    "meaningEn": "to open, to hold an event",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 133,
    "kana": "にげる",
    "kanji": "逃げる",
    "meaning": "逃跑、逃走",
    "meaningEn": "to escape, to run away",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 134,
    "kana": "だから",
    "kanji": "",
    "meaning": "所以、因此",
    "meaningEn": "so, therefore",
    "level": "N4",
    "category": "連接詞"
  },
  {
    "id": 135,
    "kana": "ざんねん",
    "kanji": "残念",
    "meaning": "遺憾、可惜",
    "meaningEn": "regrettable, a pity",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 136,
    "kana": "たたみ",
    "kanji": "畳",
    "meaning": "榻榻米",
    "meaningEn": "tatami mat",
    "level": "N4",
    "category": "生活"
  },
  {
    "id": 137,
    "kana": "ていねい",
    "kanji": "丁寧",
    "meaning": "有禮貌的；仔細的",
    "meaningEn": "polite, careful",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 138,
    "kana": "ちり",
    "kanji": "地理",
    "meaning": "地理",
    "meaningEn": "geography",
    "level": "N4",
    "category": "學習"
  },
  {
    "id": 139,
    "kana": "さっき",
    "kanji": "",
    "meaning": "剛才、不久前",
    "meaningEn": "a little while ago",
    "level": "N4",
    "category": "時間"
  },
  {
    "id": 140,
    "kana": "こわい",
    "kanji": "怖い",
    "meaning": "可怕的、害怕的",
    "meaningEn": "scary, frightening",
    "level": "N4",
    "category": "情緒"
  },
  {
    "id": 141,
    "kana": "つつむ",
    "kanji": "包む",
    "meaning": "包、包裹",
    "meaningEn": "to wrap, to cover",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 142,
    "kana": "なるべく",
    "kanji": "",
    "meaning": "盡量、儘可能",
    "meaningEn": "as much as possible",
    "level": "N4",
    "category": "副詞"
  },
  {
    "id": 143,
    "kana": "むり",
    "kanji": "無理",
    "meaning": "勉強；不可能",
    "meaningEn": "unreasonable, impossible",
    "level": "N4",
    "category": "狀態"
  },
  {
    "id": 144,
    "kana": "サンドイッチ",
    "kanji": "",
    "meaning": "三明治",
    "meaningEn": "sandwich",
    "level": "N4",
    "category": "飲食"
  },
  {
    "id": 145,
    "kana": "かいぎしつ",
    "kanji": "会議室",
    "meaning": "會議室",
    "meaningEn": "conference room",
    "level": "N4",
    "category": "場所"
  },
  {
    "id": 146,
    "kana": "しなもの",
    "kanji": "品物",
    "meaning": "物品、商品",
    "meaningEn": "goods, article",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 147,
    "kana": "にんぎょう",
    "kanji": "人形",
    "meaning": "人偶、娃娃",
    "meaningEn": "doll, figure",
    "level": "N4",
    "category": "物品"
  },
  {
    "id": 148,
    "kana": "りよう",
    "kanji": "利用",
    "meaning": "利用、使用",
    "meaningEn": "use, utilization",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 149,
    "kana": "かざる",
    "kanji": "飾る",
    "meaning": "裝飾、陳列",
    "meaningEn": "to decorate, to adorn",
    "level": "N4",
    "category": "動作"
  },
  {
    "id": 150,
    "kana": "とめる",
    "kanji": "止める",
    "meaning": "使停止；停放",
    "meaningEn": "to stop something",
    "level": "N4",
    "category": "動作"
  }
];

export default n4Vocab;
