
import { useEffect, useState } from "react";

// v6 — galaxy recolor (Nov 11, 2026): deep purple + neon pink/cyan to match the banner art. Colors only; no data or buy links changed.

const mods = import.meta.glob("/public/images/*.{png,jpg,jpeg,webp,PNG,JPG,WEBP}", { eager: true, as: "url" }) as Record<string, string>;
type Design = { title: string; image: string; brand: "budget" | "daily" | "creative" | "atlas" | "other" };
type Prod = { name: string; bp: number; pp: number; vars: number[]; price: string; emoji: string };

const PRODS: Prod[] = [
  { name: "Unisex T-Shirt", bp: 6, pp: 99, vars: [40142,40143,40144,40145], price: "$24.99", emoji: "👕" },
  { name: "Hoodie", bp: 5, pp: 99, vars: [40049,40050,40051], price: "$44.99", emoji: "🧥" },
  { name: "Mug 11oz", bp: 86, pp: 99, vars: [47745], price: "$14.99", emoji: "☕" },
  { name: "Tote Bag", bp: 12, pp: 99, vars: [41021], price: "$19.99", emoji: "👜" },
];

// Buy links: normalized gallery design title -> Printify Pop-Up Store product URL.
// Keys must match normalizeTitle() applied to the design title shown in the modal.
// v3 covers the FULL gallery (325 unique designs x 4 product types = 1,304 products).
// T-shirt links below are live (the 42 published T-shirts). Hoodie / mug / tote
// products and the remaining T-shirts exist as drafts; their tables below are
// filled in by fill_store_urls.py after they are published in Printify, because
// a draft has no store URL until it is published.
// Designs without an entry fall back to the store homepage (STORE_HOME).
// "Believe in Yourself" links the (BRIGHT) site variant to the published product;
// the (DREAMY)/(NIGHT) variants get links once their drafts are published.
// "Cozy Reader Club" links BOTH site variants (cozy/plain) to the published
// Canva-export T-shirt (4500x5400), which is the primary (full-size) version.
// "Angels Andoutlaws" is spelled that way on purpose: the source file is
// "ANGELS andOUTLAWS.webp" (missing space), so the site title is "Angels Andoutlaws".
// Nov 8, 2026 (v4): +39 designs from the sassy, Pinterest and funny batches (13 each)
// x 4 product types = 156 products; shop total 1,460. New keys are the filename-derived
// Nov 9, 2026 (v5): +12 Pinterest batch 2 designs x 4 types = 48 products;
// 51 new designs total, 204 products, shop total 1,508.
// gallery titles (number prefixes stripped from the uploaded PNGs).
const STORE_HOME = "https://mimiscozycorner.printify.me/";
const STORE_LINKS: Record<string, string> = {
  "0 days since my last": "https://mimiscozycorner.printify.me/product/34031445",
  "ancient flame": "https://mimiscozycorner.printify.me/product/34031094",
  "angels andoutlaws": "https://mimiscozycorner.printify.me/product/34031468",
  "baby huey": "https://mimiscozycorner.printify.me/product/34048454",
  "bear of backyard avoidance": "https://mimiscozycorner.printify.me/product/34031081",
  "beetlejuice its showtime green": "https://mimiscozycorner.printify.me/product/34043970",
  "beetljuice its showtime green orange": "https://mimiscozycorner.printify.me/product/34043968",
  "behind every great kid": "https://mimiscozycorner.printify.me/product/34043973",
  "believe in yourself bright": "https://mimiscozycorner.printify.me/product/34031059",
  "believe in yourself dreamy": "https://mimiscozycorner.printify.me/product/34048493",
  "believe in yourself night": "https://mimiscozycorner.printify.me/product/34048458",
  "best dad by par": "https://mimiscozycorner.printify.me/product/34031394",
  "blade bloom": "https://mimiscozycorner.printify.me/product/34031248",
  "blessed stressed 1": "https://mimiscozycorner.printify.me/product/34031187",
  "blessed stressed caffeinated chaos": "https://mimiscozycorner.printify.me/product/34031392",
  "bloom beast": "https://mimiscozycorner.printify.me/product/34048450",
  "bookish": "https://mimiscozycorner.printify.me/product/34031089",
  "bright motion": "https://mimiscozycorner.printify.me/product/34048415",
  "bright star": "https://mimiscozycorner.printify.me/product/34048412",
  "brightscale gecko": "https://mimiscozycorner.printify.me/product/34048407",
  "buffalo of budgeting breakdown": "https://mimiscozycorner.printify.me/product/34031051",
  "burnt out crispy unicorn": "https://mimiscozycorner.printify.me/product/34031041",
  "burst of color": "https://mimiscozycorner.printify.me/product/34048372",
  "butterflies": "https://mimiscozycorner.printify.me/product/34048366",
  "calm mind club": "https://mimiscozycorner.printify.me/product/34031447",
  "calm mind club dreamy": "https://mimiscozycorner.printify.me/product/34048290",
  "calm mind club zen": "https://mimiscozycorner.printify.me/product/34048286",
  "casting spells not opinions": "https://mimiscozycorner.printify.me/product/34031358",
  "castle": "https://mimiscozycorner.printify.me/product/34048246",
  "castle of the day": "https://mimiscozycorner.printify.me/product/34048280",
  "castle of the night": "https://mimiscozycorner.printify.me/product/34031173",
  "cat in chaos overload": "https://mimiscozycorner.printify.me/product/34031163",
  "celestial gaze": "https://mimiscozycorner.printify.me/product/34031076",
  "chaos crown": "https://mimiscozycorner.printify.me/product/34031201",
  "chill out colorful": "https://mimiscozycorner.printify.me/product/34031240",
  "chines lunar girl": "https://mimiscozycorner.printify.me/product/34043945",
  "chinese cherry blossom tiger": "https://mimiscozycorner.printify.me/product/34043845",
  "chinese girl print": "https://mimiscozycorner.printify.me/product/34043839",
  "chinese goldfish flowers": "https://mimiscozycorner.printify.me/product/34043836",
  "chinese lunar day": "https://mimiscozycorner.printify.me/product/34043874",
  "chinese tiger": "https://mimiscozycorner.printify.me/product/34043822",
  "chinese tiger master": "https://mimiscozycorner.printify.me/product/34043808",
  "chiseling his way": "https://mimiscozycorner.printify.me/product/34048497",
  "choose calm blue": "https://mimiscozycorner.printify.me/product/34031369",
  "choose calm cozy": "https://mimiscozycorner.printify.me/product/34039712",
  "choose calm green": "https://mimiscozycorner.printify.me/product/34039709",
  "choose calm plain": "https://mimiscozycorner.printify.me/product/34048364",
  "choose calm zen": "https://mimiscozycorner.printify.me/product/34031157",
  "chris 2024": "https://mimiscozycorner.printify.me/product/34048243",
  "cloudy train": "https://mimiscozycorner.printify.me/product/34048238",
  "colorful energy": "https://mimiscozycorner.printify.me/product/34048219",
  "coyote of carride commentary": "https://mimiscozycorner.printify.me/product/34048216",
  "cozy homebody coffee": "https://mimiscozycorner.printify.me/product/34031140",
  "cozy reader club cozy": "https://mimiscozycorner.printify.me/product/34031207",
  "cozy reader club plain": "https://mimiscozycorner.printify.me/product/34031207",
  "cozy vibes": "https://mimiscozycorner.printify.me/product/34031112",
  "cpromoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048321",
  "crimson spiral": "https://mimiscozycorner.printify.me/product/34048212",
  "crying a river": "https://mimiscozycorner.printify.me/product/34048177",
  "cultivating self compassion": "https://mimiscozycorner.printify.me/product/34048172",
  "dad because grandpa wasnt cool": "https://mimiscozycorner.printify.me/product/34048134",
  "dad bod built by bbq": "https://mimiscozycorner.printify.me/product/34031448",
  "dad eats my fries": "https://mimiscozycorner.printify.me/product/34031103",
  "dad fueling the family with": "https://mimiscozycorner.printify.me/product/34048130",
  "dad jokes are how eye": "https://mimiscozycorner.printify.me/product/34031228",
  "dad life powered by coffee": "https://mimiscozycorner.printify.me/product/34031143",
  "dad master of the remote": "https://mimiscozycorner.printify.me/product/34031381",
  "dad professional thermostat protector": "https://mimiscozycorner.printify.me/product/34031213",
  "dad sacrificing sleep since forever": "https://mimiscozycorner.printify.me/product/34048127",
  "dad tax taking a piece": "https://mimiscozycorner.printify.me/product/34031037",
  "dad the human instructions nobody": "https://mimiscozycorner.printify.me/product/34048106",
  "dads bbq rule 1 if": "https://mimiscozycorner.printify.me/product/34048102",
  "dads chair touch it": "https://mimiscozycorner.printify.me/product/34031258",
  "dads cooking timer ill know": "https://mimiscozycorner.printify.me/product/34048098",
  "dads dance moves": "https://mimiscozycorner.printify.me/product/34048170",
  "dads driving rules silence means": "https://mimiscozycorner.printify.me/product/34048079",
  "dads favorite child depends on": "https://mimiscozycorner.printify.me/product/34048076",
  "dads favorite exercise walking to": "https://mimiscozycorner.printify.me/product/34031152",
  "dads garage my tools my": "https://mimiscozycorner.printify.me/product/34048070",
  "dads garage where projects go": "https://mimiscozycorner.printify.me/product/34048051",
  "dads gas station stop somehow": "https://mimiscozycorner.printify.me/product/34048046",
  "dads grill schedule burnt outside": "https://mimiscozycorner.printify.me/product/34048043",
  "dads grocery store mission go": "https://mimiscozycorner.printify.me/product/34047924",
  "dads hearing works selectively": "https://mimiscozycorner.printify.me/product/34047911",
  "dads lawn rules stripes matter": "https://mimiscozycorner.printify.me/product/34047906",
  "dads nap the most protected": "https://mimiscozycorner.printify.me/product/34031444",
  "dads official language grunts sighs": "https://mimiscozycorner.printify.me/product/34047858",
  "dads remote control rights nobody": "https://mimiscozycorner.printify.me/product/34047844",
  "dads snack stash hidden better": "https://mimiscozycorner.printify.me/product/34031181",
  "dads texting style one word": "https://mimiscozycorner.printify.me/product/34047837",
  "dads toolbox full of tools": "https://mimiscozycorner.printify.me/product/34047769",
  "dads universal fix put some": "https://mimiscozycorner.printify.me/product/34031196",
  "dads vacation packing list 14": "https://mimiscozycorner.printify.me/product/34047747",
  "dads wallet opens faster at": "https://mimiscozycorner.printify.me/product/34047743",
  "dads weather forecast yep its": "https://mimiscozycorner.printify.me/product/34047693",
  "divine damned": "https://mimiscozycorner.printify.me/product/34031428",
  "divine light within": "https://mimiscozycorner.printify.me/product/34031046",
  "dog of dad jokes": "https://mimiscozycorner.printify.me/product/34031269",
  "done dragon": "https://mimiscozycorner.printify.me/product/34039702",
  "dragon": "https://mimiscozycorner.printify.me/product/34047685",
  "dragon of domestic doom": "https://mimiscozycorner.printify.me/product/34047690",
  "dream beyond the clouds": "https://mimiscozycorner.printify.me/product/34047652",
  "drowning in thought": "https://mimiscozycorner.printify.me/product/34047648",
  "earth fire wind water": "https://mimiscozycorner.printify.me/product/34047612",
  "echo of color": "https://mimiscozycorner.printify.me/product/34047608",
  "echoes of the ascendant stone": "https://mimiscozycorner.printify.me/product/34047609",
  "el general": "https://mimiscozycorner.printify.me/product/34047645",
  "embrace the unexpected": "https://mimiscozycorner.printify.me/product/34047581",
  "explorer fox adventure awaits": "https://mimiscozycorner.printify.me/product/34047575",
  "eye of the spirits": "https://mimiscozycorner.printify.me/product/34047570",
  "faith hope cure print": "https://mimiscozycorner.printify.me/product/34043804",
  "fire of myth 1": "https://mimiscozycorner.printify.me/product/34047548",
  "first my mother forever my": "https://mimiscozycorner.printify.me/product/34047546",
  "flamingo flock you cancer print": "https://mimiscozycorner.printify.me/product/34043781",
  "forces of energy": "https://mimiscozycorner.printify.me/product/34047509",
  "forge truth": "https://mimiscozycorner.printify.me/product/34047503",
  "fuck off": "https://mimiscozycorner.printify.me/product/34047501",
  "funny mom humor moth": "https://mimiscozycorner.printify.me/product/34047463",
  "funny parent": "https://mimiscozycorner.printify.me/product/34047460",
  "garden of love 1": "https://mimiscozycorner.printify.me/product/34047437",
  "genie of gendered expectations": "https://mimiscozycorner.printify.me/product/34047434",
  "ghost heart print": "https://mimiscozycorner.printify.me/product/34043773",
  "give cance the boot print": "https://mimiscozycorner.printify.me/product/34043768",
  "glowing butterflies": "https://mimiscozycorner.printify.me/product/34039523",
  "goat of grocery rage 1": "https://mimiscozycorner.printify.me/product/34047395",
  "goat of gruntbased communication 1": "https://mimiscozycorner.printify.me/product/34047393",
  "god sent kids blessings": "https://mimiscozycorner.printify.me/product/34047390",
  "grim": "https://mimiscozycorner.printify.me/product/34047441",
  "happy dino trio": "https://mimiscozycorner.printify.me/product/34047307",
  "happy fathers day to the": "https://mimiscozycorner.printify.me/product/34047302",
  "harry potter": "https://mimiscozycorner.printify.me/product/34047218",
  "healing in progress bright": "https://mimiscozycorner.printify.me/product/34047352",
  "healing in progress calm": "https://mimiscozycorner.printify.me/product/34047346",
  "healing in progress glow": "https://mimiscozycorner.printify.me/product/34047341",
  "healing in progress plain": "https://mimiscozycorner.printify.me/product/34047310",
  "heaven havoc": "https://mimiscozycorner.printify.me/product/34047214",
  "hedgehogs guide to social anxiety": "https://mimiscozycorner.printify.me/product/34047210",
  "her fight is my fight": "https://mimiscozycorner.printify.me/product/34043724",
  "high hound": "https://mimiscozycorner.printify.me/product/34047174",
  "hippo of halffinished projects": "https://mimiscozycorner.printify.me/product/34047167",
  "home is where mom is": "https://mimiscozycorner.printify.me/product/34047164",
  "home is wherever mom is": "https://mimiscozycorner.printify.me/product/34047126",
  "hypno fusion petal": "https://mimiscozycorner.printify.me/product/34047116",
  "i am confident": "https://mimiscozycorner.printify.me/product/34047111",
  "i am connected to the": "https://mimiscozycorner.printify.me/product/34046986",
  "i am strong": "https://mimiscozycorner.printify.me/product/34047061",
  "i am the storm": "https://mimiscozycorner.printify.me/product/34046994",
  "i cant fix stupid but": "https://mimiscozycorner.printify.me/product/34047051",
  "i dont snore i dream": "https://mimiscozycorner.printify.me/product/34047048",
  "i embody the power of": "https://mimiscozycorner.printify.me/product/34046871",
  "i make awesome kids youre": "https://mimiscozycorner.printify.me/product/34047008",
  "i run on coffee": "https://mimiscozycorner.printify.me/product/34046866",
  "i survied to many storms": "https://mimiscozycorner.printify.me/product/34046863",
  "i will not give up": "https://mimiscozycorner.printify.me/product/34046817",
  "im not arguing im just": "https://mimiscozycorner.printify.me/product/34046814",
  "inner self pic": "https://mimiscozycorner.printify.me/product/34046810",
  "insane rat": "https://mimiscozycorner.printify.me/product/34046657",
  "kindness bear be kind be": "https://mimiscozycorner.printify.me/product/34046652",
  "leaving in 5 minutes not": "https://mimiscozycorner.printify.me/product/34046647",
  "light in the sky": "https://mimiscozycorner.printify.me/product/34046611",
  "lightening fights": "https://mimiscozycorner.printify.me/product/34046604",
  "lion of lost tools": "https://mimiscozycorner.printify.me/product/34046601",
  "live free image": "https://mimiscozycorner.printify.me/product/34046431",
  "lizard of lawn obsession": "https://mimiscozycorner.printify.me/product/34046426",
  "locked dove": "https://mimiscozycorner.printify.me/product/34046423",
  "lunar dragon": "https://mimiscozycorner.printify.me/product/34043720",
  "lunar gold fish": "https://mimiscozycorner.printify.me/product/34043715",
  "lunar hats": "https://mimiscozycorner.printify.me/product/34043692",
  "lust loyalty": "https://mimiscozycorner.printify.me/product/34046377",
  "make something new": "https://mimiscozycorner.printify.me/product/34046366",
  "mama bear her cubs": "https://mimiscozycorner.printify.me/product/34046323",
  "mama needs wine lucid yellow": "https://mimiscozycorner.printify.me/product/34046326",
  "mama needs wine survival": "https://mimiscozycorner.printify.me/product/34046318",
  "manifesting": "https://mimiscozycorner.printify.me/product/34043688",
  "mentally at home": "https://mimiscozycorner.printify.me/product/34046297",
  "messy mom life fueled by": "https://mimiscozycorner.printify.me/product/34046293",
  "mideviel image": "https://mimiscozycorner.printify.me/product/34046257",
  "mindful zen bath": "https://mimiscozycorner.printify.me/product/34046252",
  "mom at 2 percent": "https://mimiscozycorner.printify.me/product/34046207",
  "mom boss vibes in full": "https://mimiscozycorner.printify.me/product/34046202",
  "mom fuel toddler chaos": "https://mimiscozycorner.printify.me/product/34046200",
  "mom life fueled by love": "https://mimiscozycorner.printify.me/product/34046144",
  "mom life in full swing": "https://mimiscozycorner.printify.me/product/34046150",
  "mom the original sea": "https://mimiscozycorner.printify.me/product/34046247",
  "mom the ultimate search engine": "https://mimiscozycorner.printify.me/product/34046140",
  "monkey of mental load mayhem": "https://mimiscozycorner.printify.me/product/34039514",
  "moose of miscommunication": "https://mimiscozycorner.printify.me/product/34046079",
  "motherhood chaos fueled by love": "https://mimiscozycorner.printify.me/product/34046077",
  "motherhoodthe toughest job powered by": "https://mimiscozycorner.printify.me/product/34046030",
  "mowing grass icon": "https://mimiscozycorner.printify.me/product/34046024",
  "my dad eats my fries": "https://mimiscozycorner.printify.me/product/34039518",
  "my dads super power": "https://mimiscozycorner.printify.me/product/34046369",
  "my dads superpower is losing": "https://mimiscozycorner.printify.me/product/34046021",
  "my give a damns busted": "https://mimiscozycorner.printify.me/product/34039480",
  "mystical": "https://mimiscozycorner.printify.me/product/34045969",
  "mythical moon castle": "https://mimiscozycorner.printify.me/product/34045966",
  "octopus of overcommitment": "https://mimiscozycorner.printify.me/product/34039468",
  "octopus of overcommitment 1": "https://mimiscozycorner.printify.me/product/34045920",
  "octopus of overcommitment 2": "https://mimiscozycorner.printify.me/product/34045913",
  "octopus of overcommitment 2 1": "https://mimiscozycorner.printify.me/product/34039472",
  "octopus overwhelmed with responsibilities": "https://mimiscozycorner.printify.me/product/34045911",
  "one more store": "https://mimiscozycorner.printify.me/product/34039292",
  "open minded": "https://mimiscozycorner.printify.me/product/34043685",
  "otter of overexplaining": "https://mimiscozycorner.printify.me/product/34045863",
  "over it owl 1": "https://mimiscozycorner.printify.me/product/34045857",
  "owl of overthinking": "https://mimiscozycorner.printify.me/product/34039288",
  "parenting demon mode": "https://mimiscozycorner.printify.me/product/34045725",
  "peace over everything hippie": "https://mimiscozycorner.printify.me/product/34045804",
  "peace over everything plain": "https://mimiscozycorner.printify.me/product/34045800",
  "peace over everything wave": "https://mimiscozycorner.printify.me/product/34045797",
  "pelican of over passive parenting 1": "https://mimiscozycorner.printify.me/product/34045722",
  "petals of power blades of": "https://mimiscozycorner.printify.me/product/34045719",
  "pink fight": "https://mimiscozycorner.printify.me/product/34043660",
  "power of legends": "https://mimiscozycorner.printify.me/product/34045697",
  "professional snack provider boo": "https://mimiscozycorner.printify.me/product/34045694",
  "professional snack provider boo boo": "https://mimiscozycorner.printify.me/product/34045689",
  "promoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34031441",
  "protect your energy": "https://mimiscozycorner.printify.me/product/34045668",
  "protect your peace plain": "https://mimiscozycorner.printify.me/product/34045766",
  "protect your peace wave": "https://mimiscozycorner.printify.me/product/34045763",
  "protect your peace zen": "https://mimiscozycorner.printify.me/product/34045756",
  "queen mom vibes royal": "https://mimiscozycorner.printify.me/product/34045665",
  "raccoon in perpetual chaos": "https://mimiscozycorner.printify.me/product/34045625",
  "raccoon of remote control rage": "https://mimiscozycorner.printify.me/product/34045621",
  "rainbow unicorn shine bright": "https://mimiscozycorner.printify.me/product/34045378",
  "read more books colorful": "https://mimiscozycorner.printify.me/product/34045661",
  "read more books purple": "https://mimiscozycorner.printify.me/product/34045634",
  "reading bunny": "https://mimiscozycorner.printify.me/product/34045374",
  "realms of wonder": "https://mimiscozycorner.printify.me/product/34045371",
  "reclaiming your emotional intuition": "https://mimiscozycorner.printify.me/product/34045338",
  "running on chaos moonlight": "https://mimiscozycorner.printify.me/product/34043656",
  "sarcasm level expert": "https://mimiscozycorner.printify.me/product/34045028",
  "savage lion": "https://mimiscozycorner.printify.me/product/34044979",
  "scare away breast cancer": "https://mimiscozycorner.printify.me/product/34043652",
  "sentimental mothers": "https://mimiscozycorner.printify.me/product/34044975",
  "serpent of silent screaming": "https://mimiscozycorner.printify.me/product/34039286",
  "she believed she did it": "https://mimiscozycorner.printify.me/product/34044925",
  "she is strength grace": "https://mimiscozycorner.printify.me/product/34044921",
  "shooting stars": "https://mimiscozycorner.printify.me/product/34044919",
  "silly dolphins splash into fun": "https://mimiscozycorner.printify.me/product/34044872",
  "sinners saints": "https://mimiscozycorner.printify.me/product/34045332",
  "sinners saints 1": "https://mimiscozycorner.printify.me/product/34045326",
  "skull head": "https://mimiscozycorner.printify.me/product/34044867",
  "skunk of social overstimulation": "https://mimiscozycorner.printify.me/product/34039219",
  "sloth in procrastination mode": "https://mimiscozycorner.printify.me/product/34044813",
  "snail of slowburn resentment": "https://mimiscozycorner.printify.me/product/34039179",
  "soft life": "https://mimiscozycorner.printify.me/product/34043642",
  "space octopus reach for the": "https://mimiscozycorner.printify.me/product/34044807",
  "spectrum cry": "https://mimiscozycorner.printify.me/product/34044764",
  "spiral dreamscape": "https://mimiscozycorner.printify.me/product/34044757",
  "spirit of the forest": "https://mimiscozycorner.printify.me/product/34044755",
  "squirrel of chaotic energy": "https://mimiscozycorner.printify.me/product/34044702",
  "squirrel of scattered sanity": "https://mimiscozycorner.printify.me/product/34044710",
  "squirrel of scattered sanity1": "https://mimiscozycorner.printify.me/product/34044704",
  "stardust dreams": "https://mimiscozycorner.printify.me/product/34044655",
  "starlight shadow": "https://mimiscozycorner.printify.me/product/34044649",
  "stay calm bluegreen": "https://mimiscozycorner.printify.me/product/34045096",
  "stay calm colorful": "https://mimiscozycorner.printify.me/product/34045086",
  "stay calm plain": "https://mimiscozycorner.printify.me/product/34045083",
  "stay cool orange": "https://mimiscozycorner.printify.me/product/34044646",
  "stay cool purple": "https://mimiscozycorner.printify.me/product/34044601",
  "stfu i got kids": "https://mimiscozycorner.printify.me/product/34045036",
  "stfu i got kids 1": "https://mimiscozycorner.printify.me/product/34045030",
  "strong kind fierce mom power": "https://mimiscozycorner.printify.me/product/34044596",
  "sunami house": "https://mimiscozycorner.printify.me/product/34044594",
  "superhero mom in crayon": "https://mimiscozycorner.printify.me/product/34044548",
  "superheroes wear aprons too": "https://mimiscozycorner.printify.me/product/34044544",
  "supermom love chaos cozy": "https://mimiscozycorner.printify.me/product/34044542",
  "support admire honor": "https://mimiscozycorner.printify.me/product/34043635",
  "tackle cancer football": "https://mimiscozycorner.printify.me/product/34039758",
  "take the leap": "https://mimiscozycorner.printify.me/product/34044480",
  "temptation betrayal": "https://mimiscozycorner.printify.me/product/34044484",
  "thanks for teaching me everything": "https://mimiscozycorner.printify.me/product/34044478",
  "they see me mowin": "https://mimiscozycorner.printify.me/product/34044429",
  "think rich": "https://mimiscozycorner.printify.me/product/34044425",
  "tiger of time blindness": "https://mimiscozycorner.printify.me/product/34044422",
  "tiger of timeblindness": "https://mimiscozycorner.printify.me/product/34039111",
  "timeless treasures": "https://mimiscozycorner.printify.me/product/34044376",
  "toddler tornado": "https://mimiscozycorner.printify.me/product/34044372",
  "tower of light": "https://mimiscozycorner.printify.me/product/34044369",
  "triangle burst": "https://mimiscozycorner.printify.me/product/34044315",
  "true power": "https://mimiscozycorner.printify.me/product/34044311",
  "trust the process": "https://mimiscozycorner.printify.me/product/34044308",
  "unfiltered mama": "https://mimiscozycorner.printify.me/product/34044305",
  "unicorn of unpaid emotional labor": "https://mimiscozycorner.printify.me/product/34044256",
  "unicorn queen": "https://mimiscozycorner.printify.me/product/34044263",
  "unshaken by shadows": "https://mimiscozycorner.printify.me/product/34044254",
  "valentine ghost be my boo": "https://mimiscozycorner.printify.me/product/34039754",
  "virtue vice": "https://mimiscozycorner.printify.me/product/34044210",
  "vivid eye": "https://mimiscozycorner.printify.me/product/34044206",
  "warrior": "https://mimiscozycorner.printify.me/product/34039749",
  "well shit": "https://mimiscozycorner.printify.me/product/34039003",
  "when life gets ruff just": "https://mimiscozycorner.printify.me/product/34044102",
  "who did this": "https://mimiscozycorner.printify.me/product/34039093",
  "wild ember flower": "https://mimiscozycorner.printify.me/product/34044099",
  "woman in rain": "https://mimiscozycorner.printify.me/product/34044096",
  "wonder flows without end": "https://mimiscozycorner.printify.me/product/34044053",
  "wonder will": "https://mimiscozycorner.printify.me/product/34044057",
  "worlds okayest dad but still": "https://mimiscozycorner.printify.me/product/34044051",
  "you never left i just": "https://mimiscozycorner.printify.me/product/34044046",
  "youre allowed to be here im": "https://mimiscozycorner.printify.me/product/34044010",
  "youre grill ious dad": "https://mimiscozycorner.printify.me/product/34044012",
  "youre the coolest dad this": "https://mimiscozycorner.printify.me/product/34044007",
  "zero fucks given": "https://mimiscozycorner.printify.me/product/34038959",
  "zodiac women": "https://mimiscozycorner.printify.me/product/34043976",
  // Nov 8, 2026 (v4): sassy + Pinterest + funny batches, 13 designs each.
  "boo bitch": "https://mimiscozycorner.printify.me/product/34083763",
  "burp rainbows": "https://mimiscozycorner.printify.me/product/34124697",
  "came saw farted": "https://mimiscozycorner.printify.me/product/34124787",
  "cluck in charge": "https://mimiscozycorner.printify.me/product/34083713",
  "coffee sarcasm decisions": "https://mimiscozycorner.printify.me/product/34124757",
  "delicate flower": "https://mimiscozycorner.printify.me/product/34099323",
  "dont sweat sparkle": "https://mimiscozycorner.printify.me/product/34124812",
  "dont test me": "https://mimiscozycorner.printify.me/product/34083754",
  "eye roll level expert": "https://mimiscozycorner.printify.me/product/34083739",
  "fabulous sneeze money": "https://mimiscozycorner.printify.me/product/34124665",
  "farts smell cupcakes": "https://mimiscozycorner.printify.me/product/34124686",
  "fluent in sarcasm": "https://mimiscozycorner.printify.me/product/34084779",
  "i said what i said": "https://mimiscozycorner.printify.me/product/34083735",
  "if looks could kill": "https://mimiscozycorner.printify.me/product/34099316",
  "karma fix it": "https://mimiscozycorner.printify.me/product/34099600",
  "keep receipts": "https://mimiscozycorner.printify.me/product/34099518",
  "kindly fuck off": "https://mimiscozycorner.printify.me/product/34083771",
  "limited edition": "https://mimiscozycorner.printify.me/product/34124733",
  "missing screw toolbox": "https://mimiscozycorner.printify.me/product/34124644",
  "my vibe is": "https://mimiscozycorner.printify.me/product/34083775",
  "no filter": "https://mimiscozycorner.printify.me/product/34099499",
  "no therapy coffee": "https://mimiscozycorner.printify.me/product/34124594",
  "not bossy direction": "https://mimiscozycorner.printify.me/product/34124618",
  "not mean honest": "https://mimiscozycorner.printify.me/product/34099541",
  "petty since birth": "https://mimiscozycorner.printify.me/product/34083747",
  "plot twist": "https://mimiscozycorner.printify.me/product/34083759",
  "proud woman phoenix": "https://mimiscozycorner.printify.me/product/34099701",
  "queen gangster psycho": "https://mimiscozycorner.printify.me/product/34099669",
  "queen of farts": "https://mimiscozycorner.printify.me/product/34124778",
  "sarcasm sprinkles": "https://mimiscozycorner.printify.me/product/34124828",
  "sarchotic": "https://mimiscozycorner.printify.me/product/34099715",
  "sparkle bad decisions": "https://mimiscozycorner.printify.me/product/34124766",
  "strong women built": "https://mimiscozycorner.printify.me/product/34099683",
  "talk behind my back": "https://mimiscozycorner.printify.me/product/34099642",
  "too cute to be rude": "https://mimiscozycorner.printify.me/product/34083726",
  "too glam fart": "https://mimiscozycorner.printify.me/product/34124744",
  "unstoppable unstable": "https://mimiscozycorner.printify.me/product/34099576",
  "warning fart glitter": "https://mimiscozycorner.printify.me/product/34124711",
  "woke up fabulous": "https://mimiscozycorner.printify.me/product/34124677",
  // Nov 9, 2026 (v5): Pinterest batch 2, 12 designs.
  "already disturbed": "https://mimiscozycorner.printify.me/product/34213841",
  "bat shit crazy": "https://mimiscozycorner.printify.me/product/34214038",
  "flip out bat crap crazy": "https://mimiscozycorner.printify.me/product/34213819",
  "highland cow boss": "https://mimiscozycorner.printify.me/product/34213995",
  "hippie friendship": "https://mimiscozycorner.printify.me/product/34213900",
  "honk if sexy": "https://mimiscozycorner.printify.me/product/34214061",
  "its fine chicken": "https://mimiscozycorner.printify.me/product/34214009",
  "not getting old": "https://mimiscozycorner.printify.me/product/34213955",
  "prayed for patience": "https://mimiscozycorner.printify.me/product/34213863",
  "queen to gangsta": "https://mimiscozycorner.printify.me/product/34213931",
  "todays plan": "https://mimiscozycorner.printify.me/product/34213975",
  "why drama": "https://mimiscozycorner.printify.me/product/34213884",

};

// Hoodie / mug / tote links: same key format as STORE_LINKS. Filled in by
// fill_store_urls.py (from printify-product-map-full.json) after the drafts are
// published in Printify (a draft has no store URL until it is published).
// Until then the buy button for these types falls back to STORE_HOME
// ("SEE ALL PRODUCTS").
const HOODIE_LINKS: Record<string, string> = {
  "0 days since my last": "https://mimiscozycorner.printify.me/product/34048523",
  "ancient flame": "https://mimiscozycorner.printify.me/product/34048956",
  "angels andoutlaws": "https://mimiscozycorner.printify.me/product/34048503",
  "baby huey": "https://mimiscozycorner.printify.me/product/34048453",
  "bear of backyard avoidance": "https://mimiscozycorner.printify.me/product/34048962",
  "beetlejuice its showtime green": "https://mimiscozycorner.printify.me/product/34043877",
  "beetljuice its showtime green orange": "https://mimiscozycorner.printify.me/product/34043876",
  "behind every great kid": "https://mimiscozycorner.printify.me/product/34043878",
  "believe in yourself bright": "https://mimiscozycorner.printify.me/product/34048995",
  "believe in yourself dreamy": "https://mimiscozycorner.printify.me/product/34048491",
  "believe in yourself night": "https://mimiscozycorner.printify.me/product/34048456",
  "best dad by par": "https://mimiscozycorner.printify.me/product/34048560",
  "blade bloom": "https://mimiscozycorner.printify.me/product/34048620",
  "blessed stressed 1": "https://mimiscozycorner.printify.me/product/34048780",
  "blessed stressed caffeinated chaos": "https://mimiscozycorner.printify.me/product/34048563",
  "bloom beast": "https://mimiscozycorner.printify.me/product/34048449",
  "bookish": "https://mimiscozycorner.printify.me/product/34048959",
  "bright motion": "https://mimiscozycorner.printify.me/product/34048413",
  "bright star": "https://mimiscozycorner.printify.me/product/34048409",
  "brightscale gecko": "https://mimiscozycorner.printify.me/product/34048405",
  "buffalo of budgeting breakdown": "https://mimiscozycorner.printify.me/product/34048998",
  "burnt out crispy unicorn": "https://mimiscozycorner.printify.me/product/34049009",
  "burst of color": "https://mimiscozycorner.printify.me/product/34048370",
  "butterflies": "https://mimiscozycorner.printify.me/product/34048365",
  "calm mind club": "https://mimiscozycorner.printify.me/product/34048534",
  "calm mind club dreamy": "https://mimiscozycorner.printify.me/product/34048289",
  "calm mind club zen": "https://mimiscozycorner.printify.me/product/34048284",
  "casting spells not opinions": "https://mimiscozycorner.printify.me/product/34048587",
  "castle": "https://mimiscozycorner.printify.me/product/34048245",
  "castle of the day": "https://mimiscozycorner.printify.me/product/34048279",
  "castle of the night": "https://mimiscozycorner.printify.me/product/34048835",
  "cat in chaos overload": "https://mimiscozycorner.printify.me/product/34048786",
  "celestial gaze": "https://mimiscozycorner.printify.me/product/34048965",
  "chaos crown": "https://mimiscozycorner.printify.me/product/34048652",
  "chill out colorful": "https://mimiscozycorner.printify.me/product/34048623",
  "chines lunar girl": "https://mimiscozycorner.printify.me/product/34043875",
  "chinese cherry blossom tiger": "https://mimiscozycorner.printify.me/product/34043843",
  "chinese girl print": "https://mimiscozycorner.printify.me/product/34043837",
  "chinese goldfish flowers": "https://mimiscozycorner.printify.me/product/34043832",
  "chinese lunar day": "https://mimiscozycorner.printify.me/product/34043871",
  "chinese tiger": "https://mimiscozycorner.printify.me/product/34043821",
  "chinese tiger master": "https://mimiscozycorner.printify.me/product/34043806",
  "chiseling his way": "https://mimiscozycorner.printify.me/product/34048495",
  "choose calm blue": "https://mimiscozycorner.printify.me/product/34048584",
  "choose calm cozy": "https://mimiscozycorner.printify.me/product/34039711",
  "choose calm green": "https://mimiscozycorner.printify.me/product/34039708",
  "choose calm plain": "https://mimiscozycorner.printify.me/product/34048361",
  "choose calm zen": "https://mimiscozycorner.printify.me/product/34048839",
  "chris 2024": "https://mimiscozycorner.printify.me/product/34048240",
  "cloudy train": "https://mimiscozycorner.printify.me/product/34048236",
  "colorful energy": "https://mimiscozycorner.printify.me/product/34048218",
  "coyote of carride commentary": "https://mimiscozycorner.printify.me/product/34048214",
  "cozy homebody coffee": "https://mimiscozycorner.printify.me/product/34048903",
  "cozy reader club": "https://mimiscozycorner.printify.me/product/34048646",
  "cozy reader club cozy": "https://mimiscozycorner.printify.me/product/34048327",
  "cozy reader club plain": "https://mimiscozycorner.printify.me/product/34048323",
  "cozy vibes": "https://mimiscozycorner.printify.me/product/34048910",
  "cpromoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048319",
  "crimson spiral": "https://mimiscozycorner.printify.me/product/34048209",
  "crying a river": "https://mimiscozycorner.printify.me/product/34048176",
  "cultivating self compassion": "https://mimiscozycorner.printify.me/product/34048171",
  "dad because grandpa wasnt cool": "https://mimiscozycorner.printify.me/product/34048133",
  "dad bod built by bbq": "https://mimiscozycorner.printify.me/product/34048526",
  "dad eats my fries": "https://mimiscozycorner.printify.me/product/34048915",
  "dad fueling the family with": "https://mimiscozycorner.printify.me/product/34048129",
  "dad jokes are how eye": "https://mimiscozycorner.printify.me/product/34048640",
  "dad life powered by coffee": "https://mimiscozycorner.printify.me/product/34048847",
  "dad master of the remote": "https://mimiscozycorner.printify.me/product/34048581",
  "dad professional thermostat protector": "https://mimiscozycorner.printify.me/product/34048643",
  "dad sacrificing sleep since forever": "https://mimiscozycorner.printify.me/product/34048123",
  "dad tax taking a piece": "https://mimiscozycorner.printify.me/product/34049043",
  "dad the human instructions nobody": "https://mimiscozycorner.printify.me/product/34048104",
  "dads bbq rule 1 if": "https://mimiscozycorner.printify.me/product/34048099",
  "dads chair touch it": "https://mimiscozycorner.printify.me/product/34048617",
  "dads cooking timer ill know": "https://mimiscozycorner.printify.me/product/34048095",
  "dads dance moves": "https://mimiscozycorner.printify.me/product/34048167",
  "dads driving rules silence means": "https://mimiscozycorner.printify.me/product/34048078",
  "dads favorite child depends on": "https://mimiscozycorner.printify.me/product/34048073",
  "dads favorite exercise walking to": "https://mimiscozycorner.printify.me/product/34048842",
  "dads garage my tools my": "https://mimiscozycorner.printify.me/product/34048068",
  "dads garage where projects go": "https://mimiscozycorner.printify.me/product/34048050",
  "dads gas station stop somehow": "https://mimiscozycorner.printify.me/product/34048045",
  "dads grill schedule burnt outside": "https://mimiscozycorner.printify.me/product/34048041",
  "dads grocery store mission go": "https://mimiscozycorner.printify.me/product/34047922",
  "dads hearing works selectively": "https://mimiscozycorner.printify.me/product/34047909",
  "dads lawn rules stripes matter": "https://mimiscozycorner.printify.me/product/34047904",
  "dads nap the most protected": "https://mimiscozycorner.printify.me/product/34048554",
  "dads official language grunts sighs": "https://mimiscozycorner.printify.me/product/34047856",
  "dads remote control rights nobody": "https://mimiscozycorner.printify.me/product/34047841",
  "dads snack stash hidden better": "https://mimiscozycorner.printify.me/product/34048783",
  "dads texting style one word": "https://mimiscozycorner.printify.me/product/34047835",
  "dads toolbox full of tools": "https://mimiscozycorner.printify.me/product/34047768",
  "dads universal fix put some": "https://mimiscozycorner.printify.me/product/34048777",
  "dads vacation packing list 14": "https://mimiscozycorner.printify.me/product/34047745",
  "dads wallet opens faster at": "https://mimiscozycorner.printify.me/product/34047741",
  "dads weather forecast yep its": "https://mimiscozycorner.printify.me/product/34047692",
  "divine damned": "https://mimiscozycorner.printify.me/product/34048557",
  "divine light within": "https://mimiscozycorner.printify.me/product/34049001",
  "dog of dad jokes": "https://mimiscozycorner.printify.me/product/34048590",
  "done dragon": "https://mimiscozycorner.printify.me/product/34039701",
  "dragon": "https://mimiscozycorner.printify.me/product/34047682",
  "dragon of domestic doom": "https://mimiscozycorner.printify.me/product/34047687",
  "dream beyond the clouds": "https://mimiscozycorner.printify.me/product/34047651",
  "drowning in thought": "https://mimiscozycorner.printify.me/product/34047647",
  "earth fire wind water": "https://mimiscozycorner.printify.me/product/34047611",
  "echo of color": "https://mimiscozycorner.printify.me/product/34047607",
  "echoes of the ascendant stone": "https://mimiscozycorner.printify.me/product/34047603",
  "el general": "https://mimiscozycorner.printify.me/product/34047643",
  "embrace the unexpected": "https://mimiscozycorner.printify.me/product/34047580",
  "explorer fox adventure awaits": "https://mimiscozycorner.printify.me/product/34047572",
  "eye of the spirits": "https://mimiscozycorner.printify.me/product/34047568",
  "faith hope cure print": "https://mimiscozycorner.printify.me/product/34043802",
  "fire of myth 1": "https://mimiscozycorner.printify.me/product/34047547",
  "first my mother forever my": "https://mimiscozycorner.printify.me/product/34047543",
  "flamingo flock you cancer print": "https://mimiscozycorner.printify.me/product/34043779",
  "forces of energy": "https://mimiscozycorner.printify.me/product/34047507",
  "forge truth": "https://mimiscozycorner.printify.me/product/34047502",
  "fuck off": "https://mimiscozycorner.printify.me/product/34047498",
  "funny mom humor moth": "https://mimiscozycorner.printify.me/product/34047459",
  "funny parent": "https://mimiscozycorner.printify.me/product/34047454",
  "garden of love 1": "https://mimiscozycorner.printify.me/product/34047435",
  "genie of gendered expectations": "https://mimiscozycorner.printify.me/product/34047431",
  "ghost heart print": "https://mimiscozycorner.printify.me/product/34043772",
  "give cance the boot print": "https://mimiscozycorner.printify.me/product/34043767",
  "glowing butterflies": "https://mimiscozycorner.printify.me/product/34039521",
  "goat of grocery rage 1": "https://mimiscozycorner.printify.me/product/34047394",
  "goat of gruntbased communication 1": "https://mimiscozycorner.printify.me/product/34047389",
  "god sent kids blessings": "https://mimiscozycorner.printify.me/product/34047386",
  "grim": "https://mimiscozycorner.printify.me/product/34047440",
  "happy dino trio": "https://mimiscozycorner.printify.me/product/34047304",
  "happy fathers day to the": "https://mimiscozycorner.printify.me/product/34047300",
  "harry potter": "https://mimiscozycorner.printify.me/product/34047217",
  "healing in progress bright": "https://mimiscozycorner.printify.me/product/34047351",
  "healing in progress calm": "https://mimiscozycorner.printify.me/product/34047344",
  "healing in progress glow": "https://mimiscozycorner.printify.me/product/34047340",
  "healing in progress plain": "https://mimiscozycorner.printify.me/product/34047308",
  "heaven havoc": "https://mimiscozycorner.printify.me/product/34047211",
  "hedgehogs guide to social anxiety": "https://mimiscozycorner.printify.me/product/34047207",
  "her fight is my fight": "https://mimiscozycorner.printify.me/product/34043723",
  "high hound": "https://mimiscozycorner.printify.me/product/34047173",
  "hippo of halffinished projects": "https://mimiscozycorner.printify.me/product/34047166",
  "home is where mom is": "https://mimiscozycorner.printify.me/product/34047162",
  "home is wherever mom is": "https://mimiscozycorner.printify.me/product/34047124",
  "hypno fusion petal": "https://mimiscozycorner.printify.me/product/34047113",
  "i am confident": "https://mimiscozycorner.printify.me/product/34047109",
  "i am connected to the": "https://mimiscozycorner.printify.me/product/34046985",
  "i am strong": "https://mimiscozycorner.printify.me/product/34047060",
  "i am the storm": "https://mimiscozycorner.printify.me/product/34046992",
  "i cant fix stupid but": "https://mimiscozycorner.printify.me/product/34047050",
  "i dont snore i dream": "https://mimiscozycorner.printify.me/product/34047044",
  "i embody the power of": "https://mimiscozycorner.printify.me/product/34046870",
  "i make awesome kids youre": "https://mimiscozycorner.printify.me/product/34047006",
  "i run on coffee": "https://mimiscozycorner.printify.me/product/34046865",
  "i survied to many storms": "https://mimiscozycorner.printify.me/product/34046861",
  "i will not give up": "https://mimiscozycorner.printify.me/product/34046816",
  "im not arguing im just": "https://mimiscozycorner.printify.me/product/34046811",
  "inner self pic": "https://mimiscozycorner.printify.me/product/34046807",
  "insane rat": "https://mimiscozycorner.printify.me/product/34046655",
  "kindness bear be kind be": "https://mimiscozycorner.printify.me/product/34046651",
  "leaving in 5 minutes not": "https://mimiscozycorner.printify.me/product/34046646",
  "light in the sky": "https://mimiscozycorner.printify.me/product/34046610",
  "lightening fights": "https://mimiscozycorner.printify.me/product/34046603",
  "lion of lost tools": "https://mimiscozycorner.printify.me/product/34046598",
  "live free image": "https://mimiscozycorner.printify.me/product/34046430",
  "lizard of lawn obsession": "https://mimiscozycorner.printify.me/product/34046425",
  "locked dove": "https://mimiscozycorner.printify.me/product/34046421",
  "lunar dragon": "https://mimiscozycorner.printify.me/product/34043717",
  "lunar gold fish": "https://mimiscozycorner.printify.me/product/34043713",
  "lunar hats": "https://mimiscozycorner.printify.me/product/34043691",
  "lust loyalty": "https://mimiscozycorner.printify.me/product/34046376",
  "make something new": "https://mimiscozycorner.printify.me/product/34046364",
  "mama bear her cubs": "https://mimiscozycorner.printify.me/product/34046320",
  "mama needs wine lucid yellow": "https://mimiscozycorner.printify.me/product/34046325",
  "mama needs wine survival": "https://mimiscozycorner.printify.me/product/34046315",
  "manifesting": "https://mimiscozycorner.printify.me/product/34043686",
  "mentally at home": "https://mimiscozycorner.printify.me/product/34046296",
  "messy mom life fueled by": "https://mimiscozycorner.printify.me/product/34046289",
  "mideviel image": "https://mimiscozycorner.printify.me/product/34046256",
  "mindful zen bath": "https://mimiscozycorner.printify.me/product/34046249",
  "mom at 2 percent": "https://mimiscozycorner.printify.me/product/34046205",
  "mom boss vibes in full": "https://mimiscozycorner.printify.me/product/34046199",
  "mom fuel toddler chaos": "https://mimiscozycorner.printify.me/product/34046196",
  "mom life fueled by love": "https://mimiscozycorner.printify.me/product/34046143",
  "mom life in full swing": "https://mimiscozycorner.printify.me/product/34046149",
  "mom the original sea": "https://mimiscozycorner.printify.me/product/34046245",
  "mom the ultimate search engine": "https://mimiscozycorner.printify.me/product/34046138",
  "monkey of mental load mayhem": "https://mimiscozycorner.printify.me/product/34039512",
  "moose of miscommunication": "https://mimiscozycorner.printify.me/product/34046078",
  "motherhood chaos fueled by love": "https://mimiscozycorner.printify.me/product/34046074",
  "motherhoodthe toughest job powered by": "https://mimiscozycorner.printify.me/product/34046029",
  "mowing grass icon": "https://mimiscozycorner.printify.me/product/34046023",
  "my dad eats my fries": "https://mimiscozycorner.printify.me/product/34039517",
  "my dads super power": "https://mimiscozycorner.printify.me/product/34046368",
  "my dads superpower is losing": "https://mimiscozycorner.printify.me/product/34046019",
  "my give a damns busted": "https://mimiscozycorner.printify.me/product/34039477",
  "mystical": "https://mimiscozycorner.printify.me/product/34045968",
  "mythical moon castle": "https://mimiscozycorner.printify.me/product/34045964",
  "octopus of overcommitment": "https://mimiscozycorner.printify.me/product/34039466",
  "octopus of overcommitment 1": "https://mimiscozycorner.printify.me/product/34045919",
  "octopus of overcommitment 2": "https://mimiscozycorner.printify.me/product/34045912",
  "octopus of overcommitment 2 1": "https://mimiscozycorner.printify.me/product/34039471",
  "octopus overwhelmed with responsibilities": "https://mimiscozycorner.printify.me/product/34045907",
  "one more store": "https://mimiscozycorner.printify.me/product/34039291",
  "open minded": "https://mimiscozycorner.printify.me/product/34043682",
  "otter of overexplaining": "https://mimiscozycorner.printify.me/product/34045862",
  "over it owl 1": "https://mimiscozycorner.printify.me/product/34045854",
  "owl of overthinking": "https://mimiscozycorner.printify.me/product/34039287",
  "parenting demon mode": "https://mimiscozycorner.printify.me/product/34045724",
  "peace over everything hippie": "https://mimiscozycorner.printify.me/product/34045803",
  "peace over everything plain": "https://mimiscozycorner.printify.me/product/34045799",
  "peace over everything wave": "https://mimiscozycorner.printify.me/product/34045795",
  "pelican of over passive parenting 1": "https://mimiscozycorner.printify.me/product/34045720",
  "petals of power blades of": "https://mimiscozycorner.printify.me/product/34045716",
  "pink fight": "https://mimiscozycorner.printify.me/product/34043659",
  "power of legends": "https://mimiscozycorner.printify.me/product/34045696",
  "professional snack provider boo": "https://mimiscozycorner.printify.me/product/34045691",
  "professional snack provider boo boo": "https://mimiscozycorner.printify.me/product/34045687",
  "promoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048531",
  "protect your energy": "https://mimiscozycorner.printify.me/product/34045667",
  "protect your peace plain": "https://mimiscozycorner.printify.me/product/34045765",
  "protect your peace wave": "https://mimiscozycorner.printify.me/product/34045759",
  "protect your peace zen": "https://mimiscozycorner.printify.me/product/34045752",
  "queen mom vibes royal": "https://mimiscozycorner.printify.me/product/34045663",
  "raccoon in perpetual chaos": "https://mimiscozycorner.printify.me/product/34045623",
  "raccoon of remote control rage": "https://mimiscozycorner.printify.me/product/34045618",
  "rainbow unicorn shine bright": "https://mimiscozycorner.printify.me/product/34045377",
  "read more books colorful": "https://mimiscozycorner.printify.me/product/34045658",
  "read more books purple": "https://mimiscozycorner.printify.me/product/34045633",
  "reading bunny": "https://mimiscozycorner.printify.me/product/34045373",
  "realms of wonder": "https://mimiscozycorner.printify.me/product/34045369",
  "reclaiming your emotional intuition": "https://mimiscozycorner.printify.me/product/34045337",
  "running on chaos moonlight": "https://mimiscozycorner.printify.me/product/34043654",
  "sarcasm level expert": "https://mimiscozycorner.printify.me/product/34045024",
  "savage lion": "https://mimiscozycorner.printify.me/product/34044978",
  "scare away breast cancer": "https://mimiscozycorner.printify.me/product/34043650",
  "sentimental mothers": "https://mimiscozycorner.printify.me/product/34044974",
  "serpent of silent screaming": "https://mimiscozycorner.printify.me/product/34039283",
  "she believed she did it": "https://mimiscozycorner.printify.me/product/34044924",
  "she is strength grace": "https://mimiscozycorner.printify.me/product/34044920",
  "shooting stars": "https://mimiscozycorner.printify.me/product/34044915",
  "silly dolphins splash into fun": "https://mimiscozycorner.printify.me/product/34044870",
  "sinners saints": "https://mimiscozycorner.printify.me/product/34045328",
  "sinners saints 1": "https://mimiscozycorner.printify.me/product/34045323",
  "skull head": "https://mimiscozycorner.printify.me/product/34044866",
  "skunk of social overstimulation": "https://mimiscozycorner.printify.me/product/34039201",
  "sloth in procrastination mode": "https://mimiscozycorner.printify.me/product/34044812",
  "snail of slowburn resentment": "https://mimiscozycorner.printify.me/product/34039152",
  "soft life": "https://mimiscozycorner.printify.me/product/34043641",
  "space octopus reach for the": "https://mimiscozycorner.printify.me/product/34044804",
  "spectrum cry": "https://mimiscozycorner.printify.me/product/34044763",
  "spiral dreamscape": "https://mimiscozycorner.printify.me/product/34044756",
  "spirit of the forest": "https://mimiscozycorner.printify.me/product/34044752",
  "squirrel of chaotic energy": "https://mimiscozycorner.printify.me/product/34044699",
  "squirrel of scattered sanity": "https://mimiscozycorner.printify.me/product/34044708",
  "squirrel of scattered sanity1": "https://mimiscozycorner.printify.me/product/34044703",
  "stardust dreams": "https://mimiscozycorner.printify.me/product/34044653",
  "starlight shadow": "https://mimiscozycorner.printify.me/product/34044648",
  "stay calm bluegreen": "https://mimiscozycorner.printify.me/product/34045094",
  "stay calm colorful": "https://mimiscozycorner.printify.me/product/34045085",
  "stay calm plain": "https://mimiscozycorner.printify.me/product/34045081",
  "stay cool orange": "https://mimiscozycorner.printify.me/product/34044644",
  "stay cool purple": "https://mimiscozycorner.printify.me/product/34044600",
  "stfu i got kids": "https://mimiscozycorner.printify.me/product/34045035",
  "stfu i got kids 1": "https://mimiscozycorner.printify.me/product/34045029",
  "strong kind fierce mom power": "https://mimiscozycorner.printify.me/product/34044595",
  "sunami house": "https://mimiscozycorner.printify.me/product/34044591",
  "superhero mom in crayon": "https://mimiscozycorner.printify.me/product/34044547",
  "superheroes wear aprons too": "https://mimiscozycorner.printify.me/product/34044543",
  "supermom love chaos cozy": "https://mimiscozycorner.printify.me/product/34044538",
  "support admire honor": "https://mimiscozycorner.printify.me/product/34043632",
  "tackle cancer football": "https://mimiscozycorner.printify.me/product/34039757",
  "take the leap": "https://mimiscozycorner.printify.me/product/34044479",
  "temptation betrayal": "https://mimiscozycorner.printify.me/product/34044483",
  "thanks for teaching me everything": "https://mimiscozycorner.printify.me/product/34044474",
  "they see me mowin": "https://mimiscozycorner.printify.me/product/34044428",
  "think rich": "https://mimiscozycorner.printify.me/product/34044423",
  "tiger of time blindness": "https://mimiscozycorner.printify.me/product/34044419",
  "tiger of timeblindness": "https://mimiscozycorner.printify.me/product/34039107",
  "timeless treasures": "https://mimiscozycorner.printify.me/product/34044375",
  "toddler tornado": "https://mimiscozycorner.printify.me/product/34044371",
  "tower of light": "https://mimiscozycorner.printify.me/product/34044367",
  "triangle burst": "https://mimiscozycorner.printify.me/product/34044314",
  "true power": "https://mimiscozycorner.printify.me/product/34044310",
  "trust the process": "https://mimiscozycorner.printify.me/product/34043943",
  "unfiltered mama": "https://mimiscozycorner.printify.me/product/34043941",
  "unicorn of unpaid emotional labor": "https://mimiscozycorner.printify.me/product/34043938",
  "unicorn queen": "https://mimiscozycorner.printify.me/product/34043940",
  "unshaken by shadows": "https://mimiscozycorner.printify.me/product/34043937",
  "valentine ghost be my boo": "https://mimiscozycorner.printify.me/product/34039752",
  "virtue vice": "https://mimiscozycorner.printify.me/product/34043936",
  "vivid eye": "https://mimiscozycorner.printify.me/product/34043935",
  "warrior": "https://mimiscozycorner.printify.me/product/34039748",
  "well shit": "https://mimiscozycorner.printify.me/product/34038985",
  "when life gets ruff just": "https://mimiscozycorner.printify.me/product/34043910",
  "who did this": "https://mimiscozycorner.printify.me/product/34039071",
  "wild ember flower": "https://mimiscozycorner.printify.me/product/34043909",
  "woman in rain": "https://mimiscozycorner.printify.me/product/34043908",
  "wonder flows without end": "https://mimiscozycorner.printify.me/product/34043906",
  "wonder will": "https://mimiscozycorner.printify.me/product/34043907",
  "worlds okayest dad but still": "https://mimiscozycorner.printify.me/product/34043905",
  "you never left i just": "https://mimiscozycorner.printify.me/product/34043904",
  "youre allowed to be here im": "https://mimiscozycorner.printify.me/product/34043902",
  "youre grill ious dad": "https://mimiscozycorner.printify.me/product/34043903",
  "youre the coolest dad this": "https://mimiscozycorner.printify.me/product/34043901",
  "zero fucks given": "https://mimiscozycorner.printify.me/product/34038940",
  "zodiac women": "https://mimiscozycorner.printify.me/product/34043880",
  // Nov 8, 2026 (v4): sassy + Pinterest + funny batches, 13 designs each.
  "boo bitch": "https://mimiscozycorner.printify.me/product/34083765",
  "burp rainbows": "https://mimiscozycorner.printify.me/product/34124700",
  "came saw farted": "https://mimiscozycorner.printify.me/product/34124792",
  "cluck in charge": "https://mimiscozycorner.printify.me/product/34083721",
  "coffee sarcasm decisions": "https://mimiscozycorner.printify.me/product/34124758",
  "delicate flower": "https://mimiscozycorner.printify.me/product/34099324",
  "dont sweat sparkle": "https://mimiscozycorner.printify.me/product/34124815",
  "dont test me": "https://mimiscozycorner.printify.me/product/34083755",
  "eye roll level expert": "https://mimiscozycorner.printify.me/product/34083741",
  "fabulous sneeze money": "https://mimiscozycorner.printify.me/product/34124667",
  "farts smell cupcakes": "https://mimiscozycorner.printify.me/product/34124690",
  "fluent in sarcasm": "https://mimiscozycorner.printify.me/product/34084780",
  "i said what i said": "https://mimiscozycorner.printify.me/product/34083736",
  "if looks could kill": "https://mimiscozycorner.printify.me/product/34099317",
  "karma fix it": "https://mimiscozycorner.printify.me/product/34099608",
  "keep receipts": "https://mimiscozycorner.printify.me/product/34099521",
  "kindly fuck off": "https://mimiscozycorner.printify.me/product/34083772",
  "limited edition": "https://mimiscozycorner.printify.me/product/34124735",
  "missing screw toolbox": "https://mimiscozycorner.printify.me/product/34124648",
  "my vibe is": "https://mimiscozycorner.printify.me/product/34083778",
  "no filter": "https://mimiscozycorner.printify.me/product/34099506",
  "no therapy coffee": "https://mimiscozycorner.printify.me/product/34124607",
  "not bossy direction": "https://mimiscozycorner.printify.me/product/34124628",
  "not mean honest": "https://mimiscozycorner.printify.me/product/34099546",
  "petty since birth": "https://mimiscozycorner.printify.me/product/34083748",
  "plot twist": "https://mimiscozycorner.printify.me/product/34083760",
  "proud woman phoenix": "https://mimiscozycorner.printify.me/product/34099705",
  "queen gangster psycho": "https://mimiscozycorner.printify.me/product/34099674",
  "queen of farts": "https://mimiscozycorner.printify.me/product/34124779",
  "sarcasm sprinkles": "https://mimiscozycorner.printify.me/product/34124829",
  "sarchotic": "https://mimiscozycorner.printify.me/product/34099718",
  "sparkle bad decisions": "https://mimiscozycorner.printify.me/product/34124768",
  "strong women built": "https://mimiscozycorner.printify.me/product/34099686",
  "talk behind my back": "https://mimiscozycorner.printify.me/product/34099650",
  "too cute to be rude": "https://mimiscozycorner.printify.me/product/34083729",
  "too glam fart": "https://mimiscozycorner.printify.me/product/34124746",
  "unstoppable unstable": "https://mimiscozycorner.printify.me/product/34099582",
  "warning fart glitter": "https://mimiscozycorner.printify.me/product/34124724",
  "woke up fabulous": "https://mimiscozycorner.printify.me/product/34124681",
  // Nov 9, 2026 (v5): Pinterest batch 2, 12 designs.
  "already disturbed": "https://mimiscozycorner.printify.me/product/34213844",
  "bat shit crazy": "https://mimiscozycorner.printify.me/product/34214044",
  "flip out bat crap crazy": "https://mimiscozycorner.printify.me/product/34213823",
  "highland cow boss": "https://mimiscozycorner.printify.me/product/34213999",
  "hippie friendship": "https://mimiscozycorner.printify.me/product/34213903",
  "honk if sexy": "https://mimiscozycorner.printify.me/product/34214066",
  "its fine chicken": "https://mimiscozycorner.printify.me/product/34214018",
  "not getting old": "https://mimiscozycorner.printify.me/product/34213958",
  "prayed for patience": "https://mimiscozycorner.printify.me/product/34213867",
  "queen to gangsta": "https://mimiscozycorner.printify.me/product/34213938",
  "todays plan": "https://mimiscozycorner.printify.me/product/34213984",
  "why drama": "https://mimiscozycorner.printify.me/product/34213886",

};
const MUG_LINKS: Record<string, string> = {
  "0 days since my last": "https://mimiscozycorner.printify.me/product/34048522",
  "ancient flame": "https://mimiscozycorner.printify.me/product/34048955",
  "angels andoutlaws": "https://mimiscozycorner.printify.me/product/34048499",
  "baby huey": "https://mimiscozycorner.printify.me/product/34048452",
  "bear of backyard avoidance": "https://mimiscozycorner.printify.me/product/34048961",
  "beetlejuice its showtime green": "https://mimiscozycorner.printify.me/product/34043967",
  "beetljuice its showtime green orange": "https://mimiscozycorner.printify.me/product/34043950",
  "behind every great kid": "https://mimiscozycorner.printify.me/product/34043971",
  "believe in yourself bright": "https://mimiscozycorner.printify.me/product/34048994",
  "believe in yourself dreamy": "https://mimiscozycorner.printify.me/product/34048490",
  "believe in yourself night": "https://mimiscozycorner.printify.me/product/34048455",
  "best dad by par": "https://mimiscozycorner.printify.me/product/34048558",
  "blade bloom": "https://mimiscozycorner.printify.me/product/34048618",
  "blessed stressed 1": "https://mimiscozycorner.printify.me/product/34048779",
  "blessed stressed caffeinated chaos": "https://mimiscozycorner.printify.me/product/34048561",
  "bloom beast": "https://mimiscozycorner.printify.me/product/34048448",
  "bookish": "https://mimiscozycorner.printify.me/product/34048958",
  "bright motion": "https://mimiscozycorner.printify.me/product/34048411",
  "bright star": "https://mimiscozycorner.printify.me/product/34048408",
  "brightscale gecko": "https://mimiscozycorner.printify.me/product/34048404",
  "buffalo of budgeting breakdown": "https://mimiscozycorner.printify.me/product/34048997",
  "burnt out crispy unicorn": "https://mimiscozycorner.printify.me/product/34049003",
  "burst of color": "https://mimiscozycorner.printify.me/product/34048368",
  "butterflies": "https://mimiscozycorner.printify.me/product/34048363",
  "calm mind club": "https://mimiscozycorner.printify.me/product/34048532",
  "calm mind club dreamy": "https://mimiscozycorner.printify.me/product/34048287",
  "calm mind club zen": "https://mimiscozycorner.printify.me/product/34048282",
  "casting spells not opinions": "https://mimiscozycorner.printify.me/product/34048586",
  "castle": "https://mimiscozycorner.printify.me/product/34048242",
  "castle of the day": "https://mimiscozycorner.printify.me/product/34048278",
  "castle of the night": "https://mimiscozycorner.printify.me/product/34048823",
  "cat in chaos overload": "https://mimiscozycorner.printify.me/product/34048785",
  "celestial gaze": "https://mimiscozycorner.printify.me/product/34048964",
  "chaos crown": "https://mimiscozycorner.printify.me/product/34048648",
  "chill out colorful": "https://mimiscozycorner.printify.me/product/34048622",
  "chines lunar girl": "https://mimiscozycorner.printify.me/product/34043873",
  "chinese cherry blossom tiger": "https://mimiscozycorner.printify.me/product/34043840",
  "chinese girl print": "https://mimiscozycorner.printify.me/product/34043835",
  "chinese goldfish flowers": "https://mimiscozycorner.printify.me/product/34043831",
  "chinese lunar day": "https://mimiscozycorner.printify.me/product/34043870",
  "chinese tiger": "https://mimiscozycorner.printify.me/product/34043809",
  "chinese tiger master": "https://mimiscozycorner.printify.me/product/34043803",
  "chiseling his way": "https://mimiscozycorner.printify.me/product/34048494",
  "choose calm blue": "https://mimiscozycorner.printify.me/product/34048583",
  "choose calm cozy": "https://mimiscozycorner.printify.me/product/34039707",
  "choose calm green": "https://mimiscozycorner.printify.me/product/34039704",
  "choose calm plain": "https://mimiscozycorner.printify.me/product/34048360",
  "choose calm zen": "https://mimiscozycorner.printify.me/product/34048838",
  "chris 2024": "https://mimiscozycorner.printify.me/product/34048239",
  "cloudy train": "https://mimiscozycorner.printify.me/product/34048235",
  "colorful energy": "https://mimiscozycorner.printify.me/product/34048217",
  "coyote of carride commentary": "https://mimiscozycorner.printify.me/product/34048213",
  "cozy homebody coffee": "https://mimiscozycorner.printify.me/product/34048901",
  "cozy reader club": "https://mimiscozycorner.printify.me/product/34048645",
  "cozy reader club cozy": "https://mimiscozycorner.printify.me/product/34048326",
  "cozy reader club plain": "https://mimiscozycorner.printify.me/product/34048322",
  "cozy vibes": "https://mimiscozycorner.printify.me/product/34048909",
  "cpromoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048318",
  "crimson spiral": "https://mimiscozycorner.printify.me/product/34048208",
  "crying a river": "https://mimiscozycorner.printify.me/product/34048175",
  "cultivating self compassion": "https://mimiscozycorner.printify.me/product/34048169",
  "dad because grandpa wasnt cool": "https://mimiscozycorner.printify.me/product/34048132",
  "dad bod built by bbq": "https://mimiscozycorner.printify.me/product/34048525",
  "dad eats my fries": "https://mimiscozycorner.printify.me/product/34048912",
  "dad fueling the family with": "https://mimiscozycorner.printify.me/product/34048128",
  "dad jokes are how eye": "https://mimiscozycorner.printify.me/product/34048639",
  "dad life powered by coffee": "https://mimiscozycorner.printify.me/product/34048844",
  "dad master of the remote": "https://mimiscozycorner.printify.me/product/34048580",
  "dad professional thermostat protector": "https://mimiscozycorner.printify.me/product/34048641",
  "dad sacrificing sleep since forever": "https://mimiscozycorner.printify.me/product/34048122",
  "dad tax taking a piece": "https://mimiscozycorner.printify.me/product/34049044",
  "dad the human instructions nobody": "https://mimiscozycorner.printify.me/product/34048101",
  "dads bbq rule 1 if": "https://mimiscozycorner.printify.me/product/34048097",
  "dads chair touch it": "https://mimiscozycorner.printify.me/product/34048615",
  "dads cooking timer ill know": "https://mimiscozycorner.printify.me/product/34048093",
  "dads dance moves": "https://mimiscozycorner.printify.me/product/34048164",
  "dads driving rules silence means": "https://mimiscozycorner.printify.me/product/34048075",
  "dads favorite child depends on": "https://mimiscozycorner.printify.me/product/34048071",
  "dads favorite exercise walking to": "https://mimiscozycorner.printify.me/product/34048841",
  "dads garage my tools my": "https://mimiscozycorner.printify.me/product/34048067",
  "dads garage where projects go": "https://mimiscozycorner.printify.me/product/34048047",
  "dads gas station stop somehow": "https://mimiscozycorner.printify.me/product/34048044",
  "dads grill schedule burnt outside": "https://mimiscozycorner.printify.me/product/34048040",
  "dads grocery store mission go": "https://mimiscozycorner.printify.me/product/34047920",
  "dads hearing works selectively": "https://mimiscozycorner.printify.me/product/34047907",
  "dads lawn rules stripes matter": "https://mimiscozycorner.printify.me/product/34047901",
  "dads nap the most protected": "https://mimiscozycorner.printify.me/product/34048553",
  "dads official language grunts sighs": "https://mimiscozycorner.printify.me/product/34047845",
  "dads remote control rights nobody": "https://mimiscozycorner.printify.me/product/34047840",
  "dads snack stash hidden better": "https://mimiscozycorner.printify.me/product/34048782",
  "dads texting style one word": "https://mimiscozycorner.printify.me/product/34047833",
  "dads toolbox full of tools": "https://mimiscozycorner.printify.me/product/34047767",
  "dads universal fix put some": "https://mimiscozycorner.printify.me/product/34048776",
  "dads vacation packing list 14": "https://mimiscozycorner.printify.me/product/34047744",
  "dads wallet opens faster at": "https://mimiscozycorner.printify.me/product/34047740",
  "dads weather forecast yep its": "https://mimiscozycorner.printify.me/product/34047689",
  "divine damned": "https://mimiscozycorner.printify.me/product/34048556",
  "divine light within": "https://mimiscozycorner.printify.me/product/34049000",
  "dog of dad jokes": "https://mimiscozycorner.printify.me/product/34048589",
  "done dragon": "https://mimiscozycorner.printify.me/product/34039700",
  "dragon": "https://mimiscozycorner.printify.me/product/34047681",
  "dragon of domestic doom": "https://mimiscozycorner.printify.me/product/34047684",
  "dream beyond the clouds": "https://mimiscozycorner.printify.me/product/34047650",
  "drowning in thought": "https://mimiscozycorner.printify.me/product/34047644",
  "earth fire wind water": "https://mimiscozycorner.printify.me/product/34047604",
  "echo of color": "https://mimiscozycorner.printify.me/product/34047602",
  "echoes of the ascendant stone": "https://mimiscozycorner.printify.me/product/34047600",
  "el general": "https://mimiscozycorner.printify.me/product/34047642",
  "embrace the unexpected": "https://mimiscozycorner.printify.me/product/34047574",
  "explorer fox adventure awaits": "https://mimiscozycorner.printify.me/product/34047571",
  "eye of the spirits": "https://mimiscozycorner.printify.me/product/34047567",
  "faith hope cure print": "https://mimiscozycorner.printify.me/product/34043800",
  "fire of myth 1": "https://mimiscozycorner.printify.me/product/34047544",
  "first my mother forever my": "https://mimiscozycorner.printify.me/product/34047541",
  "flamingo flock you cancer print": "https://mimiscozycorner.printify.me/product/34043775",
  "forces of energy": "https://mimiscozycorner.printify.me/product/34047506",
  "forge truth": "https://mimiscozycorner.printify.me/product/34047500",
  "fuck off": "https://mimiscozycorner.printify.me/product/34047497",
  "funny mom humor moth": "https://mimiscozycorner.printify.me/product/34047458",
  "funny parent": "https://mimiscozycorner.printify.me/product/34047456",
  "garden of love 1": "https://mimiscozycorner.printify.me/product/34047432",
  "genie of gendered expectations": "https://mimiscozycorner.printify.me/product/34047429",
  "ghost heart print": "https://mimiscozycorner.printify.me/product/34043770",
  "give cance the boot print": "https://mimiscozycorner.printify.me/product/34043766",
  "glowing butterflies": "https://mimiscozycorner.printify.me/product/34039520",
  "goat of grocery rage 1": "https://mimiscozycorner.printify.me/product/34047392",
  "goat of gruntbased communication 1": "https://mimiscozycorner.printify.me/product/34047387",
  "god sent kids blessings": "https://mimiscozycorner.printify.me/product/34047384",
  "grim": "https://mimiscozycorner.printify.me/product/34047439",
  "happy dino trio": "https://mimiscozycorner.printify.me/product/34047303",
  "happy fathers day to the": "https://mimiscozycorner.printify.me/product/34047298",
  "harry potter": "https://mimiscozycorner.printify.me/product/34047213",
  "healing in progress bright": "https://mimiscozycorner.printify.me/product/34047350",
  "healing in progress calm": "https://mimiscozycorner.printify.me/product/34047342",
  "healing in progress glow": "https://mimiscozycorner.printify.me/product/34047338",
  "healing in progress plain": "https://mimiscozycorner.printify.me/product/34047306",
  "heaven havoc": "https://mimiscozycorner.printify.me/product/34047209",
  "hedgehogs guide to social anxiety": "https://mimiscozycorner.printify.me/product/34047205",
  "her fight is my fight": "https://mimiscozycorner.printify.me/product/34043719",
  "high hound": "https://mimiscozycorner.printify.me/product/34047172",
  "hippo of halffinished projects": "https://mimiscozycorner.printify.me/product/34047165",
  "home is where mom is": "https://mimiscozycorner.printify.me/product/34047161",
  "home is wherever mom is": "https://mimiscozycorner.printify.me/product/34047117",
  "hypno fusion petal": "https://mimiscozycorner.printify.me/product/34047112",
  "i am confident": "https://mimiscozycorner.printify.me/product/34047107",
  "i am connected to the": "https://mimiscozycorner.printify.me/product/34046984",
  "i am strong": "https://mimiscozycorner.printify.me/product/34047059",
  "i am the storm": "https://mimiscozycorner.printify.me/product/34046990",
  "i cant fix stupid but": "https://mimiscozycorner.printify.me/product/34047049",
  "i dont snore i dream": "https://mimiscozycorner.printify.me/product/34047043",
  "i embody the power of": "https://mimiscozycorner.printify.me/product/34046869",
  "i make awesome kids youre": "https://mimiscozycorner.printify.me/product/34046996",
  "i run on coffee": "https://mimiscozycorner.printify.me/product/34046864",
  "i survied to many storms": "https://mimiscozycorner.printify.me/product/34046859",
  "i will not give up": "https://mimiscozycorner.printify.me/product/34046813",
  "im not arguing im just": "https://mimiscozycorner.printify.me/product/34046809",
  "inner self pic": "https://mimiscozycorner.printify.me/product/34046805",
  "insane rat": "https://mimiscozycorner.printify.me/product/34046654",
  "kindness bear be kind be": "https://mimiscozycorner.printify.me/product/34046650",
  "leaving in 5 minutes not": "https://mimiscozycorner.printify.me/product/34046645",
  "light in the sky": "https://mimiscozycorner.printify.me/product/34046605",
  "lightening fights": "https://mimiscozycorner.printify.me/product/34046600",
  "lion of lost tools": "https://mimiscozycorner.printify.me/product/34046595",
  "live free image": "https://mimiscozycorner.printify.me/product/34046429",
  "lizard of lawn obsession": "https://mimiscozycorner.printify.me/product/34046424",
  "locked dove": "https://mimiscozycorner.printify.me/product/34046420",
  "lunar dragon": "https://mimiscozycorner.printify.me/product/34043716",
  "lunar gold fish": "https://mimiscozycorner.printify.me/product/34043712",
  "lunar hats": "https://mimiscozycorner.printify.me/product/34043689",
  "lust loyalty": "https://mimiscozycorner.printify.me/product/34046375",
  "make something new": "https://mimiscozycorner.printify.me/product/34046363",
  "mama bear her cubs": "https://mimiscozycorner.printify.me/product/34046319",
  "mama needs wine lucid yellow": "https://mimiscozycorner.printify.me/product/34046322",
  "mama needs wine survival": "https://mimiscozycorner.printify.me/product/34046314",
  "manifesting": "https://mimiscozycorner.printify.me/product/34043684",
  "mentally at home": "https://mimiscozycorner.printify.me/product/34046290",
  "messy mom life fueled by": "https://mimiscozycorner.printify.me/product/34046287",
  "mideviel image": "https://mimiscozycorner.printify.me/product/34046251",
  "mindful zen bath": "https://mimiscozycorner.printify.me/product/34046248",
  "mom at 2 percent": "https://mimiscozycorner.printify.me/product/34046204",
  "mom boss vibes in full": "https://mimiscozycorner.printify.me/product/34046197",
  "mom fuel toddler chaos": "https://mimiscozycorner.printify.me/product/34046194",
  "mom life fueled by love": "https://mimiscozycorner.printify.me/product/34046142",
  "mom life in full swing": "https://mimiscozycorner.printify.me/product/34046148",
  "mom the original sea": "https://mimiscozycorner.printify.me/product/34046243",
  "mom the ultimate search engine": "https://mimiscozycorner.printify.me/product/34046136",
  "monkey of mental load mayhem": "https://mimiscozycorner.printify.me/product/34039511",
  "moose of miscommunication": "https://mimiscozycorner.printify.me/product/34046076",
  "motherhood chaos fueled by love": "https://mimiscozycorner.printify.me/product/34046073",
  "motherhoodthe toughest job powered by": "https://mimiscozycorner.printify.me/product/34046028",
  "mowing grass icon": "https://mimiscozycorner.printify.me/product/34046022",
  "my dad eats my fries": "https://mimiscozycorner.printify.me/product/34039515",
  "my dads super power": "https://mimiscozycorner.printify.me/product/34046367",
  "my dads superpower is losing": "https://mimiscozycorner.printify.me/product/34046016",
  "my give a damns busted": "https://mimiscozycorner.printify.me/product/34039473",
  "mystical": "https://mimiscozycorner.printify.me/product/34045967",
  "mythical moon castle": "https://mimiscozycorner.printify.me/product/34045963",
  "octopus of overcommitment": "https://mimiscozycorner.printify.me/product/34039465",
  "octopus of overcommitment 1": "https://mimiscozycorner.printify.me/product/34045918",
  "octopus of overcommitment 2": "https://mimiscozycorner.printify.me/product/34045909",
  "octopus of overcommitment 2 1": "https://mimiscozycorner.printify.me/product/34039470",
  "octopus overwhelmed with responsibilities": "https://mimiscozycorner.printify.me/product/34045906",
  "one more store": "https://mimiscozycorner.printify.me/product/34039290",
  "open minded": "https://mimiscozycorner.printify.me/product/34043680",
  "otter of overexplaining": "https://mimiscozycorner.printify.me/product/34045861",
  "over it owl 1": "https://mimiscozycorner.printify.me/product/34045852",
  "owl of overthinking": "https://mimiscozycorner.printify.me/product/34039285",
  "parenting demon mode": "https://mimiscozycorner.printify.me/product/34045723",
  "peace over everything hippie": "https://mimiscozycorner.printify.me/product/34045802",
  "peace over everything plain": "https://mimiscozycorner.printify.me/product/34045798",
  "peace over everything wave": "https://mimiscozycorner.printify.me/product/34045794",
  "pelican of over passive parenting 1": "https://mimiscozycorner.printify.me/product/34045718",
  "petals of power blades of": "https://mimiscozycorner.printify.me/product/34045715",
  "pink fight": "https://mimiscozycorner.printify.me/product/34043657",
  "power of legends": "https://mimiscozycorner.printify.me/product/34045693",
  "professional snack provider boo": "https://mimiscozycorner.printify.me/product/34045690",
  "professional snack provider boo boo": "https://mimiscozycorner.printify.me/product/34045686",
  "promoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048529",
  "protect your energy": "https://mimiscozycorner.printify.me/product/34045666",
  "protect your peace plain": "https://mimiscozycorner.printify.me/product/34045761",
  "protect your peace wave": "https://mimiscozycorner.printify.me/product/34045755",
  "protect your peace zen": "https://mimiscozycorner.printify.me/product/34045751",
  "queen mom vibes royal": "https://mimiscozycorner.printify.me/product/34045662",
  "raccoon in perpetual chaos": "https://mimiscozycorner.printify.me/product/34045622",
  "raccoon of remote control rage": "https://mimiscozycorner.printify.me/product/34045617",
  "rainbow unicorn shine bright": "https://mimiscozycorner.printify.me/product/34045375",
  "read more books colorful": "https://mimiscozycorner.printify.me/product/34045657",
  "read more books purple": "https://mimiscozycorner.printify.me/product/34045627",
  "reading bunny": "https://mimiscozycorner.printify.me/product/34045372",
  "realms of wonder": "https://mimiscozycorner.printify.me/product/34045366",
  "reclaiming your emotional intuition": "https://mimiscozycorner.printify.me/product/34045330",
  "running on chaos moonlight": "https://mimiscozycorner.printify.me/product/34043653",
  "sarcasm level expert": "https://mimiscozycorner.printify.me/product/34045023",
  "savage lion": "https://mimiscozycorner.printify.me/product/34044976",
  "scare away breast cancer": "https://mimiscozycorner.printify.me/product/34043648",
  "sentimental mothers": "https://mimiscozycorner.printify.me/product/34044973",
  "serpent of silent screaming": "https://mimiscozycorner.printify.me/product/34039280",
  "she believed she did it": "https://mimiscozycorner.printify.me/product/34044922",
  "she is strength grace": "https://mimiscozycorner.printify.me/product/34044918",
  "shooting stars": "https://mimiscozycorner.printify.me/product/34044914",
  "silly dolphins splash into fun": "https://mimiscozycorner.printify.me/product/34044869",
  "sinners saints": "https://mimiscozycorner.printify.me/product/34045327",
  "sinners saints 1": "https://mimiscozycorner.printify.me/product/34045321",
  "skull head": "https://mimiscozycorner.printify.me/product/34044864",
  "skunk of social overstimulation": "https://mimiscozycorner.printify.me/product/34039191",
  "sloth in procrastination mode": "https://mimiscozycorner.printify.me/product/34044811",
  "snail of slowburn resentment": "https://mimiscozycorner.printify.me/product/34039123",
  "soft life": "https://mimiscozycorner.printify.me/product/34043639",
  "space octopus reach for the": "https://mimiscozycorner.printify.me/product/34044803",
  "spectrum cry": "https://mimiscozycorner.printify.me/product/34044762",
  "spiral dreamscape": "https://mimiscozycorner.printify.me/product/34044754",
  "spirit of the forest": "https://mimiscozycorner.printify.me/product/34044750",
  "squirrel of chaotic energy": "https://mimiscozycorner.printify.me/product/34044698",
  "squirrel of scattered sanity": "https://mimiscozycorner.printify.me/product/34044706",
  "squirrel of scattered sanity1": "https://mimiscozycorner.printify.me/product/34044701",
  "stardust dreams": "https://mimiscozycorner.printify.me/product/34044652",
  "starlight shadow": "https://mimiscozycorner.printify.me/product/34044647",
  "stay calm bluegreen": "https://mimiscozycorner.printify.me/product/34045093",
  "stay calm colorful": "https://mimiscozycorner.printify.me/product/34045084",
  "stay calm plain": "https://mimiscozycorner.printify.me/product/34045080",
  "stay cool orange": "https://mimiscozycorner.printify.me/product/34044643",
  "stay cool purple": "https://mimiscozycorner.printify.me/product/34044599",
  "stfu i got kids": "https://mimiscozycorner.printify.me/product/34045034",
  "stfu i got kids 1": "https://mimiscozycorner.printify.me/product/34045027",
  "strong kind fierce mom power": "https://mimiscozycorner.printify.me/product/34044593",
  "sunami house": "https://mimiscozycorner.printify.me/product/34044590",
  "superhero mom in crayon": "https://mimiscozycorner.printify.me/product/34044545",
  "superheroes wear aprons too": "https://mimiscozycorner.printify.me/product/34044539",
  "supermom love chaos cozy": "https://mimiscozycorner.printify.me/product/34044536",
  "support admire honor": "https://mimiscozycorner.printify.me/product/34043631",
  "tackle cancer football": "https://mimiscozycorner.printify.me/product/34039756",
  "take the leap": "https://mimiscozycorner.printify.me/product/34044477",
  "temptation betrayal": "https://mimiscozycorner.printify.me/product/34044482",
  "thanks for teaching me everything": "https://mimiscozycorner.printify.me/product/34044473",
  "they see me mowin": "https://mimiscozycorner.printify.me/product/34044427",
  "think rich": "https://mimiscozycorner.printify.me/product/34044420",
  "tiger of time blindness": "https://mimiscozycorner.printify.me/product/34044418",
  "tiger of timeblindness": "https://mimiscozycorner.printify.me/product/34039094",
  "timeless treasures": "https://mimiscozycorner.printify.me/product/34044374",
  "toddler tornado": "https://mimiscozycorner.printify.me/product/34044370",
  "tower of light": "https://mimiscozycorner.printify.me/product/34044366",
  "triangle burst": "https://mimiscozycorner.printify.me/product/34044313",
  "true power": "https://mimiscozycorner.printify.me/product/34044309",
  "trust the process": "https://mimiscozycorner.printify.me/product/34044306",
  "unfiltered mama": "https://mimiscozycorner.printify.me/product/34044264",
  "unicorn of unpaid emotional labor": "https://mimiscozycorner.printify.me/product/34044253",
  "unicorn queen": "https://mimiscozycorner.printify.me/product/34044261",
  "unshaken by shadows": "https://mimiscozycorner.printify.me/product/34044209",
  "valentine ghost be my boo": "https://mimiscozycorner.printify.me/product/34039751",
  "virtue vice": "https://mimiscozycorner.printify.me/product/34044207",
  "vivid eye": "https://mimiscozycorner.printify.me/product/34044203",
  "warrior": "https://mimiscozycorner.printify.me/product/34039747",
  "well shit": "https://mimiscozycorner.printify.me/product/34038978",
  "when life gets ruff just": "https://mimiscozycorner.printify.me/product/34044101",
  "who did this": "https://mimiscozycorner.printify.me/product/34039055",
  "wild ember flower": "https://mimiscozycorner.printify.me/product/34044097",
  "woman in rain": "https://mimiscozycorner.printify.me/product/34044058",
  "wonder flows without end": "https://mimiscozycorner.printify.me/product/34044050",
  "wonder will": "https://mimiscozycorner.printify.me/product/34044055",
  "worlds okayest dad but still": "https://mimiscozycorner.printify.me/product/34044048",
  "you never left i just": "https://mimiscozycorner.printify.me/product/34044014",
  "youre allowed to be here im": "https://mimiscozycorner.printify.me/product/34044006",
  "youre grill ious dad": "https://mimiscozycorner.printify.me/product/34044009",
  "youre the coolest dad this": "https://mimiscozycorner.printify.me/product/34044002",
  "zero fucks given": "https://mimiscozycorner.printify.me/product/34038931",
  "zodiac women": "https://mimiscozycorner.printify.me/product/34043974",
  // Nov 8, 2026 (v4): sassy + Pinterest + funny batches, 13 designs each.
  "boo bitch": "https://mimiscozycorner.printify.me/product/34083767",
  "burp rainbows": "https://mimiscozycorner.printify.me/product/34124703",
  "came saw farted": "https://mimiscozycorner.printify.me/product/34124796",
  "cluck in charge": "https://mimiscozycorner.printify.me/product/34083722",
  "coffee sarcasm decisions": "https://mimiscozycorner.printify.me/product/34124761",
  "delicate flower": "https://mimiscozycorner.printify.me/product/34099326",
  "dont sweat sparkle": "https://mimiscozycorner.printify.me/product/34124818",
  "dont test me": "https://mimiscozycorner.printify.me/product/34083757",
  "eye roll level expert": "https://mimiscozycorner.printify.me/product/34083745",
  "fabulous sneeze money": "https://mimiscozycorner.printify.me/product/34124670",
  "farts smell cupcakes": "https://mimiscozycorner.printify.me/product/34124692",
  "fluent in sarcasm": "https://mimiscozycorner.printify.me/product/34099314",
  "i said what i said": "https://mimiscozycorner.printify.me/product/34083737",
  "if looks could kill": "https://mimiscozycorner.printify.me/product/34099318",
  "karma fix it": "https://mimiscozycorner.printify.me/product/34099616",
  "keep receipts": "https://mimiscozycorner.printify.me/product/34099523",
  "kindly fuck off": "https://mimiscozycorner.printify.me/product/34083773",
  "limited edition": "https://mimiscozycorner.printify.me/product/34124736",
  "missing screw toolbox": "https://mimiscozycorner.printify.me/product/34124652",
  "my vibe is": "https://mimiscozycorner.printify.me/product/34083779",
  "no filter": "https://mimiscozycorner.printify.me/product/34099509",
  "no therapy coffee": "https://mimiscozycorner.printify.me/product/34124610",
  "not bossy direction": "https://mimiscozycorner.printify.me/product/34124632",
  "not mean honest": "https://mimiscozycorner.printify.me/product/34099551",
  "petty since birth": "https://mimiscozycorner.printify.me/product/34083751",
  "plot twist": "https://mimiscozycorner.printify.me/product/34083761",
  "proud woman phoenix": "https://mimiscozycorner.printify.me/product/34099708",
  "queen gangster psycho": "https://mimiscozycorner.printify.me/product/34099675",
  "queen of farts": "https://mimiscozycorner.printify.me/product/34124782",
  "sarcasm sprinkles": "https://mimiscozycorner.printify.me/product/34124835",
  "sarchotic": "https://mimiscozycorner.printify.me/product/34099723",
  "sparkle bad decisions": "https://mimiscozycorner.printify.me/product/34124773",
  "strong women built": "https://mimiscozycorner.printify.me/product/34099688",
  "talk behind my back": "https://mimiscozycorner.printify.me/product/34099656",
  "too cute to be rude": "https://mimiscozycorner.printify.me/product/34083730",
  "too glam fart": "https://mimiscozycorner.printify.me/product/34124748",
  "unstoppable unstable": "https://mimiscozycorner.printify.me/product/34099587",
  "warning fart glitter": "https://mimiscozycorner.printify.me/product/34124726",
  "woke up fabulous": "https://mimiscozycorner.printify.me/product/34124683",
  // Nov 9, 2026 (v5): Pinterest batch 2, 12 designs.
  "already disturbed": "https://mimiscozycorner.printify.me/product/34213846",
  "bat shit crazy": "https://mimiscozycorner.printify.me/product/34214047",
  "flip out bat crap crazy": "https://mimiscozycorner.printify.me/product/34213827",
  "highland cow boss": "https://mimiscozycorner.printify.me/product/34214000",
  "hippie friendship": "https://mimiscozycorner.printify.me/product/34213905",
  "honk if sexy": "https://mimiscozycorner.printify.me/product/34214069",
  "its fine chicken": "https://mimiscozycorner.printify.me/product/34214024",
  "not getting old": "https://mimiscozycorner.printify.me/product/34213963",
  "prayed for patience": "https://mimiscozycorner.printify.me/product/34213870",
  "queen to gangsta": "https://mimiscozycorner.printify.me/product/34213941",
  "todays plan": "https://mimiscozycorner.printify.me/product/34213987",
  "why drama": "https://mimiscozycorner.printify.me/product/34213891",

};
const TOTE_LINKS: Record<string, string> = {
  "0 days since my last": "https://mimiscozycorner.printify.me/product/34048504",
  "ancient flame": "https://mimiscozycorner.printify.me/product/34048916",
  "angels andoutlaws": "https://mimiscozycorner.printify.me/product/34048498",
  "baby huey": "https://mimiscozycorner.printify.me/product/34048451",
  "bear of backyard avoidance": "https://mimiscozycorner.printify.me/product/34048960",
  "beetlejuice its showtime green": "https://mimiscozycorner.printify.me/product/34043966",
  "beetljuice its showtime green orange": "https://mimiscozycorner.printify.me/product/34043949",
  "behind every great kid": "https://mimiscozycorner.printify.me/product/34043969",
  "believe in yourself bright": "https://mimiscozycorner.printify.me/product/34048966",
  "believe in yourself dreamy": "https://mimiscozycorner.printify.me/product/34048489",
  "believe in yourself night": "https://mimiscozycorner.printify.me/product/34048457",
  "best dad by par": "https://mimiscozycorner.printify.me/product/34048559",
  "blade bloom": "https://mimiscozycorner.printify.me/product/34048619",
  "blessed stressed 1": "https://mimiscozycorner.printify.me/product/34048778",
  "blessed stressed caffeinated chaos": "https://mimiscozycorner.printify.me/product/34048562",
  "bloom beast": "https://mimiscozycorner.printify.me/product/34048447",
  "bookish": "https://mimiscozycorner.printify.me/product/34048957",
  "bright motion": "https://mimiscozycorner.printify.me/product/34048410",
  "bright star": "https://mimiscozycorner.printify.me/product/34048406",
  "brightscale gecko": "https://mimiscozycorner.printify.me/product/34048403",
  "buffalo of budgeting breakdown": "https://mimiscozycorner.printify.me/product/34048996",
  "burnt out crispy unicorn": "https://mimiscozycorner.printify.me/product/34049002",
  "burst of color": "https://mimiscozycorner.printify.me/product/34048369",
  "butterflies": "https://mimiscozycorner.printify.me/product/34048362",
  "calm mind club": "https://mimiscozycorner.printify.me/product/34048530",
  "calm mind club dreamy": "https://mimiscozycorner.printify.me/product/34048288",
  "calm mind club zen": "https://mimiscozycorner.printify.me/product/34048281",
  "casting spells not opinions": "https://mimiscozycorner.printify.me/product/34048585",
  "castle": "https://mimiscozycorner.printify.me/product/34048241",
  "castle of the day": "https://mimiscozycorner.printify.me/product/34048276",
  "castle of the night": "https://mimiscozycorner.printify.me/product/34048787",
  "cat in chaos overload": "https://mimiscozycorner.printify.me/product/34048784",
  "celestial gaze": "https://mimiscozycorner.printify.me/product/34048963",
  "chaos crown": "https://mimiscozycorner.printify.me/product/34048647",
  "chill out colorful": "https://mimiscozycorner.printify.me/product/34048621",
  "chines lunar girl": "https://mimiscozycorner.printify.me/product/34043872",
  "chinese cherry blossom tiger": "https://mimiscozycorner.printify.me/product/34043838",
  "chinese girl print": "https://mimiscozycorner.printify.me/product/34043834",
  "chinese goldfish flowers": "https://mimiscozycorner.printify.me/product/34043830",
  "chinese lunar day": "https://mimiscozycorner.printify.me/product/34043869",
  "chinese tiger": "https://mimiscozycorner.printify.me/product/34043807",
  "chinese tiger master": "https://mimiscozycorner.printify.me/product/34043805",
  "chiseling his way": "https://mimiscozycorner.printify.me/product/34048492",
  "choose calm blue": "https://mimiscozycorner.printify.me/product/34048582",
  "choose calm cozy": "https://mimiscozycorner.printify.me/product/34039706",
  "choose calm green": "https://mimiscozycorner.printify.me/product/34039703",
  "choose calm plain": "https://mimiscozycorner.printify.me/product/34048358",
  "choose calm zen": "https://mimiscozycorner.printify.me/product/34048837",
  "chris 2024": "https://mimiscozycorner.printify.me/product/34048237",
  "cloudy train": "https://mimiscozycorner.printify.me/product/34048234",
  "colorful energy": "https://mimiscozycorner.printify.me/product/34048215",
  "coyote of carride commentary": "https://mimiscozycorner.printify.me/product/34048211",
  "cozy homebody coffee": "https://mimiscozycorner.printify.me/product/34048848",
  "cozy reader club": "https://mimiscozycorner.printify.me/product/34048644",
  "cozy reader club cozy": "https://mimiscozycorner.printify.me/product/34048324",
  "cozy reader club plain": "https://mimiscozycorner.printify.me/product/34048320",
  "cozy vibes": "https://mimiscozycorner.printify.me/product/34048907",
  "cpromoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048317",
  "crimson spiral": "https://mimiscozycorner.printify.me/product/34048206",
  "crying a river": "https://mimiscozycorner.printify.me/product/34048174",
  "cultivating self compassion": "https://mimiscozycorner.printify.me/product/34048168",
  "dad because grandpa wasnt cool": "https://mimiscozycorner.printify.me/product/34048131",
  "dad bod built by bbq": "https://mimiscozycorner.printify.me/product/34048524",
  "dad eats my fries": "https://mimiscozycorner.printify.me/product/34048914",
  "dad fueling the family with": "https://mimiscozycorner.printify.me/product/34048125",
  "dad jokes are how eye": "https://mimiscozycorner.printify.me/product/34048624",
  "dad life powered by coffee": "https://mimiscozycorner.printify.me/product/34048843",
  "dad master of the remote": "https://mimiscozycorner.printify.me/product/34048564",
  "dad professional thermostat protector": "https://mimiscozycorner.printify.me/product/34048642",
  "dad sacrificing sleep since forever": "https://mimiscozycorner.printify.me/product/34048121",
  "dad tax taking a piece": "https://mimiscozycorner.printify.me/product/34049010",
  "dad the human instructions nobody": "https://mimiscozycorner.printify.me/product/34048100",
  "dads bbq rule 1 if": "https://mimiscozycorner.printify.me/product/34048096",
  "dads chair touch it": "https://mimiscozycorner.printify.me/product/34048616",
  "dads cooking timer ill know": "https://mimiscozycorner.printify.me/product/34048094",
  "dads dance moves": "https://mimiscozycorner.printify.me/product/34048165",
  "dads driving rules silence means": "https://mimiscozycorner.printify.me/product/34048074",
  "dads favorite child depends on": "https://mimiscozycorner.printify.me/product/34048072",
  "dads favorite exercise walking to": "https://mimiscozycorner.printify.me/product/34048840",
  "dads garage my tools my": "https://mimiscozycorner.printify.me/product/34048066",
  "dads garage where projects go": "https://mimiscozycorner.printify.me/product/34048048",
  "dads gas station stop somehow": "https://mimiscozycorner.printify.me/product/34048042",
  "dads grill schedule burnt outside": "https://mimiscozycorner.printify.me/product/34048039",
  "dads grocery store mission go": "https://mimiscozycorner.printify.me/product/34047919",
  "dads hearing works selectively": "https://mimiscozycorner.printify.me/product/34047905",
  "dads lawn rules stripes matter": "https://mimiscozycorner.printify.me/product/34047902",
  "dads nap the most protected": "https://mimiscozycorner.printify.me/product/34048535",
  "dads official language grunts sighs": "https://mimiscozycorner.printify.me/product/34047843",
  "dads remote control rights nobody": "https://mimiscozycorner.printify.me/product/34047839",
  "dads snack stash hidden better": "https://mimiscozycorner.printify.me/product/34048781",
  "dads texting style one word": "https://mimiscozycorner.printify.me/product/34047832",
  "dads toolbox full of tools": "https://mimiscozycorner.printify.me/product/34047766",
  "dads universal fix put some": "https://mimiscozycorner.printify.me/product/34048653",
  "dads vacation packing list 14": "https://mimiscozycorner.printify.me/product/34047742",
  "dads wallet opens faster at": "https://mimiscozycorner.printify.me/product/34047739",
  "dads weather forecast yep its": "https://mimiscozycorner.printify.me/product/34047688",
  "divine damned": "https://mimiscozycorner.printify.me/product/34048555",
  "divine light within": "https://mimiscozycorner.printify.me/product/34048999",
  "dog of dad jokes": "https://mimiscozycorner.printify.me/product/34048588",
  "done dragon": "https://mimiscozycorner.printify.me/product/34039694",
  "dragon": "https://mimiscozycorner.printify.me/product/34047683",
  "dragon of domestic doom": "https://mimiscozycorner.printify.me/product/34047686",
  "dream beyond the clouds": "https://mimiscozycorner.printify.me/product/34047649",
  "drowning in thought": "https://mimiscozycorner.printify.me/product/34047646",
  "earth fire wind water": "https://mimiscozycorner.printify.me/product/34047606",
  "echo of color": "https://mimiscozycorner.printify.me/product/34047605",
  "echoes of the ascendant stone": "https://mimiscozycorner.printify.me/product/34047601",
  "el general": "https://mimiscozycorner.printify.me/product/34047641",
  "embrace the unexpected": "https://mimiscozycorner.printify.me/product/34047573",
  "explorer fox adventure awaits": "https://mimiscozycorner.printify.me/product/34047569",
  "eye of the spirits": "https://mimiscozycorner.printify.me/product/34047566",
  "faith hope cure print": "https://mimiscozycorner.printify.me/product/34043799",
  "fire of myth 1": "https://mimiscozycorner.printify.me/product/34047545",
  "first my mother forever my": "https://mimiscozycorner.printify.me/product/34047540",
  "flamingo flock you cancer print": "https://mimiscozycorner.printify.me/product/34043774",
  "forces of energy": "https://mimiscozycorner.printify.me/product/34047504",
  "forge truth": "https://mimiscozycorner.printify.me/product/34047499",
  "fuck off": "https://mimiscozycorner.printify.me/product/34047495",
  "funny mom humor moth": "https://mimiscozycorner.printify.me/product/34047457",
  "funny parent": "https://mimiscozycorner.printify.me/product/34047455",
  "garden of love 1": "https://mimiscozycorner.printify.me/product/34047433",
  "genie of gendered expectations": "https://mimiscozycorner.printify.me/product/34047428",
  "ghost heart print": "https://mimiscozycorner.printify.me/product/34043769",
  "give cance the boot print": "https://mimiscozycorner.printify.me/product/34043765",
  "glowing butterflies": "https://mimiscozycorner.printify.me/product/34039519",
  "goat of grocery rage 1": "https://mimiscozycorner.printify.me/product/34047391",
  "goat of gruntbased communication 1": "https://mimiscozycorner.printify.me/product/34047388",
  "god sent kids blessings": "https://mimiscozycorner.printify.me/product/34047385",
  "grim": "https://mimiscozycorner.printify.me/product/34047438",
  "happy dino trio": "https://mimiscozycorner.printify.me/product/34047301",
  "happy fathers day to the": "https://mimiscozycorner.printify.me/product/34047299",
  "harry potter": "https://mimiscozycorner.printify.me/product/34047212",
  "healing in progress bright": "https://mimiscozycorner.printify.me/product/34047349",
  "healing in progress calm": "https://mimiscozycorner.printify.me/product/34047343",
  "healing in progress glow": "https://mimiscozycorner.printify.me/product/34047337",
  "healing in progress plain": "https://mimiscozycorner.printify.me/product/34047305",
  "heaven havoc": "https://mimiscozycorner.printify.me/product/34047208",
  "hedgehogs guide to social anxiety": "https://mimiscozycorner.printify.me/product/34047206",
  "her fight is my fight": "https://mimiscozycorner.printify.me/product/34043718",
  "high hound": "https://mimiscozycorner.printify.me/product/34047171",
  "hippo of halffinished projects": "https://mimiscozycorner.printify.me/product/34047163",
  "home is where mom is": "https://mimiscozycorner.printify.me/product/34047160",
  "home is wherever mom is": "https://mimiscozycorner.printify.me/product/34047115",
  "hypno fusion petal": "https://mimiscozycorner.printify.me/product/34047110",
  "i am confident": "https://mimiscozycorner.printify.me/product/34047106",
  "i am connected to the": "https://mimiscozycorner.printify.me/product/34046983",
  "i am strong": "https://mimiscozycorner.printify.me/product/34047058",
  "i am the storm": "https://mimiscozycorner.printify.me/product/34046989",
  "i cant fix stupid but": "https://mimiscozycorner.printify.me/product/34047046",
  "i dont snore i dream": "https://mimiscozycorner.printify.me/product/34047047",
  "i embody the power of": "https://mimiscozycorner.printify.me/product/34046868",
  "i make awesome kids youre": "https://mimiscozycorner.printify.me/product/34046995",
  "i run on coffee": "https://mimiscozycorner.printify.me/product/34046862",
  "i survied to many storms": "https://mimiscozycorner.printify.me/product/34046858",
  "i will not give up": "https://mimiscozycorner.printify.me/product/34046812",
  "im not arguing im just": "https://mimiscozycorner.printify.me/product/34046808",
  "inner self pic": "https://mimiscozycorner.printify.me/product/34046803",
  "insane rat": "https://mimiscozycorner.printify.me/product/34046653",
  "kindness bear be kind be": "https://mimiscozycorner.printify.me/product/34046649",
  "leaving in 5 minutes not": "https://mimiscozycorner.printify.me/product/34046642",
  "light in the sky": "https://mimiscozycorner.printify.me/product/34046606",
  "lightening fights": "https://mimiscozycorner.printify.me/product/34046602",
  "lion of lost tools": "https://mimiscozycorner.printify.me/product/34046594",
  "live free image": "https://mimiscozycorner.printify.me/product/34046428",
  "lizard of lawn obsession": "https://mimiscozycorner.printify.me/product/34046422",
  "locked dove": "https://mimiscozycorner.printify.me/product/34046419",
  "lunar dragon": "https://mimiscozycorner.printify.me/product/34043714",
  "lunar gold fish": "https://mimiscozycorner.printify.me/product/34043711",
  "lunar hats": "https://mimiscozycorner.printify.me/product/34043690",
  "lust loyalty": "https://mimiscozycorner.printify.me/product/34046373",
  "make something new": "https://mimiscozycorner.printify.me/product/34046361",
  "mama bear her cubs": "https://mimiscozycorner.printify.me/product/34046317",
  "mama needs wine lucid yellow": "https://mimiscozycorner.printify.me/product/34046321",
  "mama needs wine survival": "https://mimiscozycorner.printify.me/product/34046313",
  "manifesting": "https://mimiscozycorner.printify.me/product/34043683",
  "mentally at home": "https://mimiscozycorner.printify.me/product/34046291",
  "messy mom life fueled by": "https://mimiscozycorner.printify.me/product/34046286",
  "mideviel image": "https://mimiscozycorner.printify.me/product/34046250",
  "mindful zen bath": "https://mimiscozycorner.printify.me/product/34046246",
  "mom at 2 percent": "https://mimiscozycorner.printify.me/product/34046203",
  "mom boss vibes in full": "https://mimiscozycorner.printify.me/product/34046198",
  "mom fuel toddler chaos": "https://mimiscozycorner.printify.me/product/34046193",
  "mom life fueled by love": "https://mimiscozycorner.printify.me/product/34046139",
  "mom life in full swing": "https://mimiscozycorner.printify.me/product/34046147",
  "mom the original sea": "https://mimiscozycorner.printify.me/product/34046242",
  "mom the ultimate search engine": "https://mimiscozycorner.printify.me/product/34046137",
  "monkey of mental load mayhem": "https://mimiscozycorner.printify.me/product/34039510",
  "moose of miscommunication": "https://mimiscozycorner.printify.me/product/34046075",
  "motherhood chaos fueled by love": "https://mimiscozycorner.printify.me/product/34046072",
  "motherhoodthe toughest job powered by": "https://mimiscozycorner.printify.me/product/34046027",
  "mowing grass icon": "https://mimiscozycorner.printify.me/product/34046020",
  "my dad eats my fries": "https://mimiscozycorner.printify.me/product/34039513",
  "my dads super power": "https://mimiscozycorner.printify.me/product/34046365",
  "my dads superpower is losing": "https://mimiscozycorner.printify.me/product/34046017",
  "my give a damns busted": "https://mimiscozycorner.printify.me/product/34039474",
  "mystical": "https://mimiscozycorner.printify.me/product/34045965",
  "mythical moon castle": "https://mimiscozycorner.printify.me/product/34045961",
  "octopus of overcommitment": "https://mimiscozycorner.printify.me/product/34039458",
  "octopus of overcommitment 1": "https://mimiscozycorner.printify.me/product/34045917",
  "octopus of overcommitment 2": "https://mimiscozycorner.printify.me/product/34045908",
  "octopus of overcommitment 2 1": "https://mimiscozycorner.printify.me/product/34039469",
  "octopus overwhelmed with responsibilities": "https://mimiscozycorner.printify.me/product/34045904",
  "one more store": "https://mimiscozycorner.printify.me/product/34039289",
  "open minded": "https://mimiscozycorner.printify.me/product/34043679",
  "otter of overexplaining": "https://mimiscozycorner.printify.me/product/34045860",
  "over it owl 1": "https://mimiscozycorner.printify.me/product/34045853",
  "owl of overthinking": "https://mimiscozycorner.printify.me/product/34039284",
  "parenting demon mode": "https://mimiscozycorner.printify.me/product/34045721",
  "peace over everything hippie": "https://mimiscozycorner.printify.me/product/34045801",
  "peace over everything plain": "https://mimiscozycorner.printify.me/product/34045796",
  "peace over everything wave": "https://mimiscozycorner.printify.me/product/34045793",
  "pelican of over passive parenting 1": "https://mimiscozycorner.printify.me/product/34045717",
  "petals of power blades of": "https://mimiscozycorner.printify.me/product/34045714",
  "pink fight": "https://mimiscozycorner.printify.me/product/34043655",
  "power of legends": "https://mimiscozycorner.printify.me/product/34045692",
  "professional snack provider boo": "https://mimiscozycorner.printify.me/product/34045688",
  "professional snack provider boo boo": "https://mimiscozycorner.printify.me/product/34045685",
  "promoted to mom still figuring": "https://mimiscozycorner.printify.me/product/34048528",
  "protect your energy": "https://mimiscozycorner.printify.me/product/34045664",
  "protect your peace plain": "https://mimiscozycorner.printify.me/product/34045760",
  "protect your peace wave": "https://mimiscozycorner.printify.me/product/34045754",
  "protect your peace zen": "https://mimiscozycorner.printify.me/product/34045753",
  "queen mom vibes royal": "https://mimiscozycorner.printify.me/product/34045660",
  "raccoon in perpetual chaos": "https://mimiscozycorner.printify.me/product/34045620",
  "raccoon of remote control rage": "https://mimiscozycorner.printify.me/product/34045615",
  "rainbow unicorn shine bright": "https://mimiscozycorner.printify.me/product/34045376",
  "read more books colorful": "https://mimiscozycorner.printify.me/product/34045656",
  "read more books purple": "https://mimiscozycorner.printify.me/product/34045626",
  "reading bunny": "https://mimiscozycorner.printify.me/product/34045370",
  "realms of wonder": "https://mimiscozycorner.printify.me/product/34045367",
  "reclaiming your emotional intuition": "https://mimiscozycorner.printify.me/product/34045331",
  "running on chaos moonlight": "https://mimiscozycorner.printify.me/product/34043651",
  "sarcasm level expert": "https://mimiscozycorner.printify.me/product/34045022",
  "savage lion": "https://mimiscozycorner.printify.me/product/34044977",
  "scare away breast cancer": "https://mimiscozycorner.printify.me/product/34043649",
  "sentimental mothers": "https://mimiscozycorner.printify.me/product/34044971",
  "serpent of silent screaming": "https://mimiscozycorner.printify.me/product/34039278",
  "she believed she did it": "https://mimiscozycorner.printify.me/product/34044923",
  "she is strength grace": "https://mimiscozycorner.printify.me/product/34044917",
  "shooting stars": "https://mimiscozycorner.printify.me/product/34044913",
  "silly dolphins splash into fun": "https://mimiscozycorner.printify.me/product/34044868",
  "sinners saints": "https://mimiscozycorner.printify.me/product/34045324",
  "sinners saints 1": "https://mimiscozycorner.printify.me/product/34045308",
  "skull head": "https://mimiscozycorner.printify.me/product/34044863",
  "skunk of social overstimulation": "https://mimiscozycorner.printify.me/product/34039186",
  "sloth in procrastination mode": "https://mimiscozycorner.printify.me/product/34044810",
  "snail of slowburn resentment": "https://mimiscozycorner.printify.me/product/34039115",
  "soft life": "https://mimiscozycorner.printify.me/product/34043638",
  "space octopus reach for the": "https://mimiscozycorner.printify.me/product/34044802",
  "spectrum cry": "https://mimiscozycorner.printify.me/product/34044761",
  "spiral dreamscape": "https://mimiscozycorner.printify.me/product/34044753",
  "spirit of the forest": "https://mimiscozycorner.printify.me/product/34044751",
  "squirrel of chaotic energy": "https://mimiscozycorner.printify.me/product/34044697",
  "squirrel of scattered sanity": "https://mimiscozycorner.printify.me/product/34044707",
  "squirrel of scattered sanity1": "https://mimiscozycorner.printify.me/product/34044700",
  "stardust dreams": "https://mimiscozycorner.printify.me/product/34044650",
  "starlight shadow": "https://mimiscozycorner.printify.me/product/34044645",
  "stay calm bluegreen": "https://mimiscozycorner.printify.me/product/34045092",
  "stay calm colorful": "https://mimiscozycorner.printify.me/product/34045082",
  "stay calm plain": "https://mimiscozycorner.printify.me/product/34045079",
  "stay cool orange": "https://mimiscozycorner.printify.me/product/34044642",
  "stay cool purple": "https://mimiscozycorner.printify.me/product/34044598",
  "stfu i got kids": "https://mimiscozycorner.printify.me/product/34045033",
  "stfu i got kids 1": "https://mimiscozycorner.printify.me/product/34045026",
  "strong kind fierce mom power": "https://mimiscozycorner.printify.me/product/34044592",
  "sunami house": "https://mimiscozycorner.printify.me/product/34044589",
  "superhero mom in crayon": "https://mimiscozycorner.printify.me/product/34044546",
  "superheroes wear aprons too": "https://mimiscozycorner.printify.me/product/34044540",
  "supermom love chaos cozy": "https://mimiscozycorner.printify.me/product/34044537",
  "support admire honor": "https://mimiscozycorner.printify.me/product/34043630",
  "tackle cancer football": "https://mimiscozycorner.printify.me/product/34039755",
  "take the leap": "https://mimiscozycorner.printify.me/product/34044476",
  "temptation betrayal": "https://mimiscozycorner.printify.me/product/34044481",
  "thanks for teaching me everything": "https://mimiscozycorner.printify.me/product/34044472",
  "they see me mowin": "https://mimiscozycorner.printify.me/product/34044426",
  "think rich": "https://mimiscozycorner.printify.me/product/34044421",
  "tiger of time blindness": "https://mimiscozycorner.printify.me/product/34044417",
  "tiger of timeblindness": "https://mimiscozycorner.printify.me/product/34039103",
  "timeless treasures": "https://mimiscozycorner.printify.me/product/34044373",
  "toddler tornado": "https://mimiscozycorner.printify.me/product/34044368",
  "tower of light": "https://mimiscozycorner.printify.me/product/34044365",
  "triangle burst": "https://mimiscozycorner.printify.me/product/34044312",
  "true power": "https://mimiscozycorner.printify.me/product/34044307",
  "trust the process": "https://mimiscozycorner.printify.me/product/34044304",
  "unfiltered mama": "https://mimiscozycorner.printify.me/product/34044262",
  "unicorn of unpaid emotional labor": "https://mimiscozycorner.printify.me/product/34044252",
  "unicorn queen": "https://mimiscozycorner.printify.me/product/34044258",
  "unshaken by shadows": "https://mimiscozycorner.printify.me/product/34044208",
  "valentine ghost be my boo": "https://mimiscozycorner.printify.me/product/34039750",
  "virtue vice": "https://mimiscozycorner.printify.me/product/34044205",
  "vivid eye": "https://mimiscozycorner.printify.me/product/34044202",
  "warrior": "https://mimiscozycorner.printify.me/product/34039745",
  "well shit": "https://mimiscozycorner.printify.me/product/34038968",
  "when life gets ruff just": "https://mimiscozycorner.printify.me/product/34044100",
  "who did this": "https://mimiscozycorner.printify.me/product/34039057",
  "wild ember flower": "https://mimiscozycorner.printify.me/product/34044095",
  "woman in rain": "https://mimiscozycorner.printify.me/product/34044056",
  "wonder flows without end": "https://mimiscozycorner.printify.me/product/34044049",
  "wonder will": "https://mimiscozycorner.printify.me/product/34044052",
  "worlds okayest dad but still": "https://mimiscozycorner.printify.me/product/34044047",
  "you never left i just": "https://mimiscozycorner.printify.me/product/34044013",
  "youre allowed to be here im": "https://mimiscozycorner.printify.me/product/34044005",
  "youre grill ious dad": "https://mimiscozycorner.printify.me/product/34044008",
  "youre the coolest dad this": "https://mimiscozycorner.printify.me/product/34044001",
  "zero fucks given": "https://mimiscozycorner.printify.me/product/34038927",
  "zodiac women": "https://mimiscozycorner.printify.me/product/34043972",
  // Nov 8, 2026 (v4): sassy + Pinterest + funny batches, 13 designs each.
  "boo bitch": "https://mimiscozycorner.printify.me/product/34083768",
  "burp rainbows": "https://mimiscozycorner.printify.me/product/34124707",
  "came saw farted": "https://mimiscozycorner.printify.me/product/34124802",
  "cluck in charge": "https://mimiscozycorner.printify.me/product/34083723",
  "coffee sarcasm decisions": "https://mimiscozycorner.printify.me/product/34124763",
  "delicate flower": "https://mimiscozycorner.printify.me/product/34099328",
  "dont sweat sparkle": "https://mimiscozycorner.printify.me/product/34124822",
  "dont test me": "https://mimiscozycorner.printify.me/product/34083758",
  "eye roll level expert": "https://mimiscozycorner.printify.me/product/34083746",
  "fabulous sneeze money": "https://mimiscozycorner.printify.me/product/34124672",
  "farts smell cupcakes": "https://mimiscozycorner.printify.me/product/34124693",
  "fluent in sarcasm": "https://mimiscozycorner.printify.me/product/34099315",
  "i said what i said": "https://mimiscozycorner.printify.me/product/34083738",
  "if looks could kill": "https://mimiscozycorner.printify.me/product/34099320",
  "karma fix it": "https://mimiscozycorner.printify.me/product/34099625",
  "keep receipts": "https://mimiscozycorner.printify.me/product/34099531",
  "kindly fuck off": "https://mimiscozycorner.printify.me/product/34083774",
  "limited edition": "https://mimiscozycorner.printify.me/product/34124740",
  "missing screw toolbox": "https://mimiscozycorner.printify.me/product/34124656",
  "my vibe is": "https://mimiscozycorner.printify.me/product/34084777",
  "no filter": "https://mimiscozycorner.printify.me/product/34099511",
  "no therapy coffee": "https://mimiscozycorner.printify.me/product/34124612",
  "not bossy direction": "https://mimiscozycorner.printify.me/product/34124636",
  "not mean honest": "https://mimiscozycorner.printify.me/product/34099564",
  "petty since birth": "https://mimiscozycorner.printify.me/product/34083752",
  "plot twist": "https://mimiscozycorner.printify.me/product/34083762",
  "proud woman phoenix": "https://mimiscozycorner.printify.me/product/34099712",
  "queen gangster psycho": "https://mimiscozycorner.printify.me/product/34099677",
  "queen of farts": "https://mimiscozycorner.printify.me/product/34124784",
  "sarcasm sprinkles": "https://mimiscozycorner.printify.me/product/34124839",
  "sarchotic": "https://mimiscozycorner.printify.me/product/34099724",
  "sparkle bad decisions": "https://mimiscozycorner.printify.me/product/34124774",
  "strong women built": "https://mimiscozycorner.printify.me/product/34099693",
  "talk behind my back": "https://mimiscozycorner.printify.me/product/34099662",
  "too cute to be rude": "https://mimiscozycorner.printify.me/product/34083734",
  "too glam fart": "https://mimiscozycorner.printify.me/product/34124752",
  "unstoppable unstable": "https://mimiscozycorner.printify.me/product/34099593",
  "warning fart glitter": "https://mimiscozycorner.printify.me/product/34124731",
  "woke up fabulous": "https://mimiscozycorner.printify.me/product/34124684",
  // Nov 9, 2026 (v5): Pinterest batch 2, 12 designs.
  "already disturbed": "https://mimiscozycorner.printify.me/product/34213849",
  "bat shit crazy": "https://mimiscozycorner.printify.me/product/34214052",
  "flip out bat crap crazy": "https://mimiscozycorner.printify.me/product/34213836",
  "highland cow boss": "https://mimiscozycorner.printify.me/product/34214004",
  "hippie friendship": "https://mimiscozycorner.printify.me/product/34213910",
  "honk if sexy": "https://mimiscozycorner.printify.me/product/34214073",
  "its fine chicken": "https://mimiscozycorner.printify.me/product/34214029",
  "not getting old": "https://mimiscozycorner.printify.me/product/34213966",
  "prayed for patience": "https://mimiscozycorner.printify.me/product/34213875",
  "queen to gangsta": "https://mimiscozycorner.printify.me/product/34213946",
  "todays plan": "https://mimiscozycorner.printify.me/product/34213990",
  "why drama": "https://mimiscozycorner.printify.me/product/34213895",

};

// Normalize a gallery design title exactly the way the STORE_LINKS keys were built:
// lowercase, "&" -> "and", apostrophes dropped, other punctuation -> space,
// collapse whitespace, drop the word "and".
function normalizeTitle(t: string): string {
  return t.toLowerCase().replace(/&/g, " and ").replace(/['‘’ʼ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").split(" ").filter(w => w && w !== "and").join(" ");
}

// Pick the buy link for the product type the customer selected in the modal.
// Returns the matching Pop-Up Store product URL, or the store homepage with a
// "SEE ALL PRODUCTS" label when this design has no product of that type.
function buyTarget(prodName: string, title: string): { url: string; label: string } {
  const key = normalizeTitle(title);
  if (prodName === "Hoodie") {
    const u = HOODIE_LINKS[key];
    return u ? { url: u, label: "BUY THIS HOODIE \u2014 $44.99" } : { url: STORE_HOME, label: "SEE ALL PRODUCTS" };
  }
  if (prodName === "Mug 11oz") {
    const u = MUG_LINKS[key];
    return u ? { url: u, label: "BUY THIS MUG \u2014 $14.99" } : { url: STORE_HOME, label: "SEE ALL PRODUCTS" };
  }
  if (prodName === "Tote Bag") {
    const u = TOTE_LINKS[key];
    return u ? { url: u, label: "BUY THIS TOTE \u2014 $19.99" } : { url: STORE_HOME, label: "SEE ALL PRODUCTS" };
  }
  const u = STORE_LINKS[key];
  return u ? { url: u, label: "BUY THIS SHIRT \u2014 $24.99" } : { url: STORE_HOME, label: "SEE ALL PRODUCTS" };
}

const getBrand = (fn: string): Design["brand"] => {
  const f = fn.toLowerCase();
  if (f.includes("budget") || f.includes("broke") || f.includes("save") || f.includes("cheap") || f.includes("dollar") || f.includes("coupon")) return "budget";
  if (f.includes("daily") || f.includes("find") || f.includes("cozy") || f.includes("soft life") || f.includes("mom fuel") || f.includes("bookish") || f.includes("cozy reader")) return "daily";
  if (f.includes("ad") || f.includes("creative") || f.includes("mama needs") || f.includes("stfu") || f.includes("snarky") || f.includes("funny")) return "creative";
  if (f.includes("atlas") || f.includes("sec 8") || f.includes("sec8") || f.includes("section") || f.includes("spirit") || f.includes("manifest") || f.includes("chakra") || f.includes("divine") || f.includes("cosmic") || f.includes("heal") || f.includes("calm") || f.includes("peace")) return "atlas";
  // default bucket by keyword
  if (f.includes("mom") || f.includes("dad") || f.includes("family")) return "daily";
  return "other";
};

const allDesigns: Design[] = Object.entries(mods)
.filter(([p])=>!p.toLowerCase().includes("mimis-cozy-logo") && !p.toLowerCase().includes("rochestercontent_logo") && !p.toLowerCase().includes(".htm"))
.map(([path])=>{
  const fn = path.split("/").pop()||"";
  const name = fn.replace(/\.[^/.]+$/,"").replace(/[_-]/g," ").trim();
  const title = name.split(" ").slice(0,5).map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" ");
  return { title, image: "/images/"+encodeURIComponent(fn), brand: getBrand(fn) };
});

function ExistingApp(){
  const [q,setQ]=useState("");
  const [brand,setBrand]=useState<"all"|"budget"|"daily"|"creative"|"atlas">("all");
  const [sel,setSel]=useState<Design|null>(null);
  const [selProd,setSelProd]=useState<Prod>(PRODS[0]);
  const [creating,setCreating]=useState(false);
  const [genTab,setGenTab]=useState(false);
  const [prompt,setPrompt]=useState("");
  const [genImage,setGenImage]=useState<string|null>(null);
  const [generating,setGenerating]=useState(false);

  const filtered = allDesigns.filter(d=>{
    if (brand!=="all" && d.brand!==brand) return false;
    if (q && !d.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: allDesigns.length,
    budget: allDesigns.filter(d=>d.brand==="budget").length,
    daily: allDesigns.filter(d=>d.brand==="daily").length,
    creative: allDesigns.filter(d=>d.brand==="creative").length,
    atlas: allDesigns.filter(d=>d.brand==="atlas").length,
  };

  const create = async (img: string, title: string)=>{
    setCreating(true);
    try{
      const fullUrl = img.startsWith("http") ? img : window.location.origin + img;
      const res = await fetch('/api/printify/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title: `${title} - ${selProd.name}`, imageUrl: fullUrl, blueprint_id: selProd.bp, print_provider_id: selProd.pp, variant_ids: selProd.vars})});
      const data = await res.json();
      if(data.success){ alert(`✅ Created ${selProd.name}! ID:${data.product_id}`); window.open(`https://printify.com/app/store/1/products/${data.product_id}`,'_blank'); }
      else alert('Failed:'+JSON.stringify(data).slice(0,600));
    }catch(e:any){ alert(e.message); }
    setCreating(false);
  };

  const gen = async ()=>{
    if(!prompt.trim()) return alert("Enter prompt");
    setGenerating(true);
    const encoded = encodeURIComponent(prompt + ", high quality print design, transparent background");
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&nologo=true`;
    const i = new Image(); i.onload=()=>{ setGenImage(url); setGenerating(false); }; i.onerror=()=>{ alert("Failed"); setGenerating(false); }; i.src=url;
  };

  return (
    <div style={{background:"#170a2e", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* HEADER */}
      <div style={{background:"#1e0f3d", textAlign:"center", borderBottom:"4px solid #ff4fbe"}}>
        <img src="/images/mimis-cozy-logo.png" style={{width:"100%", maxWidth:"1100px", margin:"0 auto", display:"block"}}/>
        <div style={{padding:"8px 12px 12px"}}>
          <h1 style={{margin:"0", fontSize:"20px", color:"#ff4fbe"}}>One Website - 4 Brands Separated</h1>
          <p style={{margin:"4px 0 0", fontSize:"12px", color:"#c9c6d7"}}>Budget Buster • Daily Finds • Creative Ads • Atlas OS — all on mimiscozycorner.com</p>
          <div style={{display:"flex", justifyContent:"center", gap:"6px", flexWrap:"wrap", marginTop:"10px"}}>
            <button onClick={()=>{setBrand("all"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="all" && !genTab?"2px solid #ff4fbe":"1px solid rgba(255,255,255,0.35)", background: brand==="all" && !genTab?"#ff4fbe":"rgba(255,255,255,0.06)", color: brand==="all" && !genTab?"white":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>ALL ({counts.all})</button>
            <button onClick={()=>{setBrand("budget"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="budget" && !genTab?"2px solid #0891b2":"1px solid rgba(255,255,255,0.35)", background: brand==="budget" && !genTab?"#0891b2":"rgba(255,255,255,0.06)", color: brand==="budget" && !genTab?"white":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>💰 BUDGET BUSTER ({counts.budget})</button>
            <button onClick={()=>{setBrand("daily"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="daily" && !genTab?"2px solid #ff4fbe":"1px solid rgba(255,255,255,0.35)", background: brand==="daily" && !genTab?"#ff4fbe":"rgba(255,255,255,0.06)", color: brand==="daily" && !genTab?"white":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>☕ DAILY FINDS ({counts.daily})</button>
            <button onClick={()=>{setBrand("creative"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="creative" && !genTab?"2px solid #ff6a00":"1px solid rgba(255,255,255,0.35)", background: brand==="creative" && !genTab?"#ff6a00":"rgba(255,255,255,0.06)", color: brand==="creative" && !genTab?"white":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>📣 CREATIVE ADS ({counts.creative})</button>
            <button onClick={()=>{setBrand("atlas"); setGenTab(false);}} style={{padding:"8px 14px", borderRadius:"20px", border: brand==="atlas" && !genTab?"2px solid #6a00ff":"1px solid rgba(255,255,255,0.35)", background: brand==="atlas" && !genTab?"#6a00ff":"rgba(255,255,255,0.06)", color: brand==="atlas" && !genTab?"white":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>✨ ATLAS OS ({counts.atlas})</button>
            <button onClick={()=>setGenTab(true)} style={{padding:"8px 14px", borderRadius:"20px", border: genTab?"2px solid #28e8ff":"1px solid rgba(255,255,255,0.35)", background: genTab?"#28e8ff":"rgba(255,255,255,0.06)", color: genTab?"#080713":"#f5f0ff", fontWeight:800, fontSize:"11px"}}>🎨 IMAGE GENERATOR</button>
          </div>
          <div style={{marginTop:"8px"}}>
            <input placeholder={`Search ${brand} designs...`} value={q} onChange={e=>setQ(e.target.value)} style={{padding:"8px 16px", borderRadius:"20px", border:"1px solid #ff4fbe", background:"#1e0f3d", color:"#fff", width:"280px", fontSize:"12px"}}/>
          </div>
        </div>
      </div>

      {genTab ? (
        <div style={{maxWidth:"760px", margin:"0 auto", padding:"16px"}}>
          <div style={{background:"#1e0f3d", borderRadius:"14px", padding:"16px", border:"2px solid #ff4fbe", color:"#f5f0ff"}}>
            <h2 style={{margin:"0 0 6px", color:"#fff"}}>🎨 Image Generator - Make Products for Any Brand</h2>
            <p style={{fontSize:"11px", color:"#c9c6d7", margin:"0 0 12px"}}>Type prompt → choose brand → generate → create product. For Budget Buster, Daily Finds, Creative Ads, Atlas OS.</p>
            <div style={{display:"flex", gap:"8px"}}>
              <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. 'budget buster, save money, coupon queen, funny' or 'atlas os sec 8 housing manifesting'" style={{flex:1, padding:"10px 14px", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.35)", background:"#170a2e", color:"#fff", fontSize:"12px"}}/>
              <button onClick={gen} disabled={generating} style={{padding:"10px 18px", background:"#ff4fbe", color:"white", border:"none", borderRadius:"10px", fontWeight:800, fontSize:"12px"}}>{generating?"GEN...":"GENERATE"}</button>
            </div>
            <div style={{display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"10px"}}>
              {["budget buster save money funny","mimis daily finds cozy mom coffee","mimis creative ads mama needs wine stfu","atlas os sec 8 spiritual manifesting"].map(ex=>(
                <button key={ex} onClick={()=>setPrompt(ex)} style={{fontSize:"10px", padding:"4px 8px", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.06)", color:"#f5f0ff"}}>{ex}</button>
              ))}
            </div>
            {genImage ? (
              <div style={{marginTop:"14px"}}>
                <img src={genImage} style={{width:"100%", maxHeight:"380px", objectFit:"contain", background:"#170a2e", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.2)"}}/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
                  {PRODS.map(p=><button key={p.name} onClick={()=>setSelProd(p)} style={{padding:"8px", borderRadius:"8px", border: selProd.name===p.name?"2px solid #ff4fbe":"1px solid rgba(255,255,255,0.2)", background: selProd.name===p.name?"rgba(255,79,190,0.15)":"rgba(255,255,255,0.06)", fontSize:"11px", fontWeight:700, color:"#f5f0ff"}}>{p.emoji} {p.name} {p.price}</button>)}
                </div>
                <button onClick={()=>create(genImage, prompt.slice(0,40))} disabled={creating} style={{width:"100%", marginTop:"10px", padding:"12px", background:"#ff4fbe", color:"white", border:"none", borderRadius:"10px", fontWeight:800}}>{creating?"CREATING...":`CREATE ${selProd.name}`}</button>
              </div>
            ) : (
              <div style={{marginTop:"14px", border:"1px dashed rgba(255,255,255,0.3)", borderRadius:"12px", padding:"28px", textAlign:"center", color:"#c9c6d7", fontSize:"12px"}}>Generated image will appear here</div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div style={{maxWidth:"1300px", margin:"0 auto", padding:"12px 16px 0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:"12px", fontWeight:700, color:"#ff4fbe"}}>{brand.toUpperCase()} • {filtered.length} products</div>
            <div style={{fontSize:"10px", color:"#c9c6d7"}}>Separated brands, one website: mimiscozycorner.com</div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"12px", padding:"16px", maxWidth:"1300px", margin:"0 auto"}}>
            {filtered.map((d,i)=>(
              <div key={i} style={{background:"#241640", borderRadius:"12px", overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", borderTop: d.brand==="budget"?"3px solid #0891b2":d.brand==="daily"?"3px solid #ff4fbe":d.brand==="creative"?"3px solid #ff6a00":d.brand==="atlas"?"3px solid #6a00ff":"3px solid rgba(255,255,255,0.25)"}}>
                <div onClick={()=>{setSel(d); setSelProd(PRODS[0]);}} style={{background:"#1e0f3d", aspectRatio:"1", cursor:"pointer", position:"relative"}}><img src={d.image} loading="lazy" style={{width:"100%",height:"100%",objectFit:"contain",padding:"6px"}}/><span style={{position:"absolute", top:"6px", left:"6px", fontSize:"8px", fontWeight:800, color:"white", background: d.brand==="budget"?"#0891b2":d.brand==="daily"?"#ff4fbe":d.brand==="creative"?"#ff6a00":d.brand==="atlas"?"#6a00ff":"#999", padding:"3px 6px", borderRadius:"8px"}}>{d.brand.toUpperCase()}</span></div>
                <div style={{padding:"8px", fontSize:"11px", fontWeight:600, height:"32px", overflow:"hidden", color:"#f5f0ff"}}>{d.title}</div>
                <div onClick={()=>setSel(d)} style={{textAlign:"center", padding:"0 8px 8px", fontSize:"10px", fontWeight:800, color:"#ff4fbe", cursor:"pointer"}}>CHOOSE PRODUCT →</div>
              </div>
            ))}
          </div>
        </>
      )}

      {sel&&(
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:"16px"}} onClick={()=>setSel(null)}>
          <div style={{background:"#1e0f3d", borderRadius:"16px", maxWidth:"480px", width:"100%", overflow:"hidden", color:"#f5f0ff"}} onClick={e=>e.stopPropagation()}>
            <img src={sel.image} style={{width:"100%", maxHeight:"360px", objectFit:"contain", background:"#1e0f3d"}}/>
            <div style={{padding:"14px"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{margin:0, fontSize:"14px", color:"#fff"}}>{sel.title}</h3><span style={{fontSize:"9px", background:"rgba(255,255,255,0.12)", color:"#c9c6d7", padding:"3px 6px", borderRadius:"8px"}}>{sel.brand}</span></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginTop:"10px"}}>
                {PRODS.map(p=><button key={p.name} onClick={()=>setSelProd(p)} style={{padding:"8px", borderRadius:"8px", border: selProd.name===p.name?"2px solid #ff4fbe":"1px solid rgba(255,255,255,0.2)", background: selProd.name===p.name?"rgba(255,79,190,0.15)":"rgba(255,255,255,0.06)", fontSize:"11px", fontWeight:700, color:"#f5f0ff"}}>{p.emoji} {p.name}</button>)}
              </div>
              <button onClick={()=>window.open(buyTarget(selProd.name, sel.title).url, "_blank")} style={{width:"100%", marginTop:"10px", padding:"11px", background:"#ff4fbe", color:"white", border:"none", borderRadius:"10px", fontWeight:800, fontSize:"12px"}}>{buyTarget(selProd.name, sel.title).label}</button>
              <div style={{textAlign:"center", marginTop:"8px"}}>
                <button onClick={()=>create(sel.image, sel.title)} disabled={creating} style={{border:"none", background:"none", color:"#c9c6d7", fontSize:"10px", textDecoration:"underline", cursor:"pointer"}}>Seller: create this in Printify</button>
              </div>
              <button onClick={()=>setSel(null)} style={{width:"100%", marginTop:"8px", padding:"8px", border:"none", background:"rgba(255,255,255,0.12)", color:"#f5f0ff", borderRadius:"8px", fontSize:"11px"}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const payhipLinks: Record<string, string> = {
  'budget-buster': 'https://payhip.com/buy?link=BzZT8',
  'self-care': 'https://payhip.com/buy?link=jVEFc',
  'gratitude': 'https://payhip.com/buy?link=OcHNL',
  'dream': 'https://payhip.com/buy?link=Wj0Gn',
  'home-binder': 'https://payhip.com/buy?link=kiNdm',
  'unfiltered-mama': 'https://payhip.com/buy?link=9enVh',
  'mimi-finds': 'https://payhip.com/buy?link=Fw0S2',
  'section8': 'https://payhip.com/buy?link=DEyje',
  'shoprescue': 'https://payhip.com/buy?link=38jHZ',
};

function goToPayhip(productId: string) {
  const link = payhipLinks[productId];

  if (link) {
    window.location.href = link;
  } else {
    alert('This product checkout is being connected. Please check back soon.');
  }
}
const restoredProducts = [
  { id:'budget-buster', title:'Budget Buster Smart Workbook', subtitle:'Big Savings • Smart Finds • Happy Wallets', price:'$5', image:'/products/budget-buster.png', badge:'SMART Workbook',
    pages:[
      ['Cover','Budget Buster','A practical money tracker for income, bills, spending, and next steps.'],
      ['Income Tracker','Date • Source • Amount • Notes','Track every income source in one place.'],
      ['Bills Due','Due date • Bill name • Amount • Paid','Keep upcoming bills organized and visible.'],
      ['Expense Log','Category • Amount • Date • Notes','Record spending and see where your money is going.'],
      ['Reflection & Next Steps','What went well? • What can improve? • Next money move','Finish with one realistic step for the next month.']
    ] },
  { id:'self-care', title:'Self Care Reset Smart Workbook', subtitle:"Custom Designs for Cozy Mamas • Let's Make Something Cozy", price:'$5', image:'/products/self-care.jpg', badge:'SMART Workbook',
    pages:[
      ['Cover','Self Care Reset','A gentle place to pause, reset, and care for yourself.'],
      ['Daily Pages','Date • Mood • Top 3 today','Cozy prompt: What would make today lighter?'],
      ['Prompts','Rest • boundaries • tiny acts of care','Write a kind note to tired me.'],
      ['Reflection','What went well? • What felt hard? • What do I need next?','One small step I can take.'],
      ['Next Steps','Choose one realistic act of care.','Keep the goal small enough to actually do.']
    ] },
  { id:'gratitude', title:'Gratitude Journal Smart Reflection', subtitle:'Daily gratitude prompts • Mindful moments • Feel-good vibes', price:'$5', image:'/products/gratitude.jpg', badge:'SMART Reflection',
    pages:[
      ['Cover','Gratitude Journal','Daily gratitude prompts • Mindful moments • Feel-good vibes.'],
      ['Daily Pages','Date • Mood • Top 3 today','What am I grateful for?'],
      ['Prompts','Three tiny joys today? • Who made me smile?','A small win I can celebrate.'],
      ['Reflection','What changed when I slowed down?','What deserves more appreciation?'],
      ['Next Steps','Keep a simple daily gratitude habit.','Use reflection pages to notice patterns and small wins.']
    ] },
  { id:'dream', title:'Dream Journal Smart Reflection', subtitle:'Capture dreams • Night notes • Reflect & grow', price:'$5', image:'/products/dream.jpg', badge:'SMART Reflection',
    pages:[
      ['Cover','Dream Journal','Capture dreams • Night notes • Reflect & grow.'],
      ['Dream Entry','Date • Dream notes • Mood / emotion','What stood out?'],
      ['Symbols','What symbol stood out? • How did it feel?','What does it remind you of?'],
      ['Prompts','What did I dream? • Emotion? • Symbol?','Message for today?'],
      ['Reflection','What do I want to remember?','What will I carry into today?']
    ] },
  { id:'home-binder', title:'Home Binder Smart Writable', subtitle:'Organize your home • Writable pages • Everyday ease', price:'$5', image:'/products/home-binder.jpg', badge:'SMART Writable',
    pages:[
      ['Cover: Welcome Home','Home Binder Smart Writable','One place for the everyday details that keep home moving.'],
      ['Cozy Mama System','Daily 5-Minute Flow • Weekly Reset • Monthly Truth Check','A simple rhythm for everyday organization.'],
      ['Meal Planning','Pantry Inventory • Weekly Menu • Grocery List','Meal prep, freezer meals, kids lunches, and budget meals.'],
      ['Cleaning Schedule','Daily Sparkle • Weekly Deep Zones • Laundry Flow','Bathroom, kitchen, clutter, and chore planning.'],
      ['Budget Tracker','Income Map • Bills • Expenses • Savings','Payday planning and savings buckets.'],
      ['Family & Home','Emergency Family • School • Pets • Projects','Keep important household information together.'],
      ['Reflection','Morning Routine • Night Routine • Weekly Reflection','Monthly goals, wins, decluttering, and cozy inspiration.']
    ] },
  { id:'unfiltered-mama', title:'Unfiltered Mama Smart Workbook', subtitle:'Raw motherhood • rage • joy • Real talk for real mamas', price:'$5', image:'/products/unfiltered-mama.png', badge:'SMART Workbook',
    pages:[
      ['Cover','Unfiltered Mama','Raw motherhood • rage • joy • real talk for real mamas.'],
      ['Daily Pages','Date • Mood • Top 3 today','What would make today lighter?'],
      ['Prompts','What am I not saying out loud?','Rage → what do I actually need?'],
      ['Reflection','What went well? • What was too much?','What support do I need? What can wait?'],
      ['Next Steps','Choose one small act of care.','Give yourself permission to be human.']
    ] },
  { id:'twin-story', title:'My Twin Story Method Smart Workbook', subtitle:'Every story has a twin • Guided storytelling method', price:'$5', image:'/products/twin-story.jpg', badge:'SMART Workbook',
    pages:[
      ['Cover','My Twin Story Method','Every story has a twin • Guided storytelling method.'],
      ['Story One','What happened? • Who was there?','Capture the first version of the story.'],
      ['Story Twin','What is the parallel story?','Find the second story, pattern, or perspective.'],
      ['Compare','What is similar? • What changed?','Notice the meaning between the two stories.'],
      ['Reflection','What did I learn?','What story do I want to carry forward?']
    ] },
  { id:'mimi-finds', title:'Mimi Finds Daily Smart Guide', subtitle:'Top Finds • Real Reviews • Every Day • Curated with love', price:'$5', image:'/products/mimi-finds.png', badge:'SMART Guide',
    pages:[
      ['Cover','Mimi Finds Daily','Top Finds • Real Reviews • Every Day • Curated with love.'],
      ['Daily Finds','Find of the day • Why it is useful','Record price and where you found it.'],
      ['Top Finds','What is worth checking out?','Track the useful finds you discover.'],
      ['Reviews','What I liked • What I would change','Who is it useful for? Would I recommend it?'],
      ['How It Works','Organize finds, reviews, and everyday recommendations.','Build your own personal list as you discover products.']
    ] },
  { id:'section8', title:'Section 8 Housing Smart Guide', subtitle:'All 50 States • Helping Families Find a Place to Call Home', price:'$5', image:'/products/section8.jpg', badge:'SMART Guide',
    pages:[
      ['Cover','Section 8 Housing Smart Guide','All 50 States • Helping Families Find a Place to Call Home.'],
      ['Application Organizer','Application date • Agency • Contact','Keep housing application details together.'],
      ['Document Checklist','Identification • Income • Household documents','Track what has been gathered and what is still needed.'],
      ['Housing Search','Property • Contact • Rent • Requirements','Record housing options and follow-ups.'],
      ['Follow-Up Tracker','Date contacted • Response • Next step','Stay organized while you move through the process.']
    ] },
  { id:'shoprescue', title:'ShopRescue Smart Guide', subtitle:'Auto repair rescue • Guidance • Save at the shop • Know before you go', price:'$49', image:'/products/shoprescue.jpg', badge:'SMART Guide',
    pages:[
      ['Cover','ShopRescue Smart Guide','Auto repair rescue • guidance • save at the shop • know before you go.'],
      ['Repair Guide','Symptoms • Proposed repair • Parts','Write down what the shop is telling you.'],
      ['Cost Estimator','Labor • Parts • Total','Questions to ask before approving work.'],
      ['Shop Checklist','Written estimate • Parts • Warranty • Old parts','Keep your repair decisions organized.'],
      ['Save Tips','Compare written estimates.','Ask what is urgent versus what can wait.']
    ] }
];

function PreviewWatermark(){
  return <div style={{position:'absolute',inset:0,pointerEvents:'none',userSelect:'none',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',opacity:.14}}>
    <div style={{transform:'rotate(-18deg)',fontSize:'clamp(28px,5vw,68px)',fontWeight:1000,letterSpacing:'.08em',color:'#111827',whiteSpace:'nowrap'}}>
      MIMI'S COZY CORNER • PREVIEW ONLY
    </div>
  </div>;
}

function ProductPreview({p,onClose}:{p:any,onClose:()=>void}){
  useEffect(()=>{
    const block=(e:KeyboardEvent)=>{
      if((e.ctrlKey||e.metaKey)&&['s','p','c','u'].includes(e.key.toLowerCase())) e.preventDefault();
    };
    document.addEventListener('keydown',block);
    const old=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{document.removeEventListener('keydown',block);document.body.style.overflow=old;};
  },[]);
  return <div
    style={{position:'fixed',inset:0,zIndex:100,background:'rgba(3,5,15,.92)',backdropFilter:'blur(8px)',padding:12,boxSizing:'border-box'}}
    onContextMenu={e=>e.preventDefault()}
    onClick={onClose}
  >
    <div onClick={e=>e.stopPropagation()} style={{height:'100%',maxWidth:1180,margin:'0 auto',background:'#e5e7eb',borderRadius:20,overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 30px 100px rgba(0,0,0,.55)'}}>
      <header style={{flex:'none',background:'#070b16',color:'#fff',padding:'18px 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:15}}>
        <div>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.15em',color:'#5eead4',fontWeight:900}}>Full Product Preview</div>
          <div style={{fontSize:'clamp(18px,3vw,28px)',fontWeight:900,marginTop:4}}>{p.title}</div>
          <div style={{fontSize:12,color:'#94a3b8',marginTop:5}}>{p.pages.length} preview pages • View only</div>
        </div>
        <button onClick={onClose} style={{width:42,height:42,borderRadius:'50%',border:'1px solid rgba(255,255,255,.15)',background:'rgba(255,255,255,.08)',color:'#fff',fontSize:25,cursor:'pointer'}}>×</button>
      </header>
      <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
        <div style={{background:'#ccfbf1',color:'#134e4a',border:'1px solid #99f6e4',borderRadius:14,padding:14,fontSize:14,lineHeight:1.55,marginBottom:18}}>
          <strong>Preview only:</strong> Customers can look through the pages before buying. Downloading, printing, copying, and right-click saving are blocked on this preview layer. Screenshots cannot be technically prevented.
        </div>
        {p.pages.map((page:any,index:number)=><div key={index}
          onContextMenu={e=>e.preventDefault()}
          style={{position:'relative',minHeight:650,background:'#fff',color:'#0f172a',borderRadius:12,border:'1px solid #cbd5e1',boxShadow:'0 8px 24px rgba(15,23,42,.1)',padding:'38px',boxSizing:'border-box',overflow:'hidden',marginBottom:18,userSelect:'none'}}
        >
          <div style={{position:'relative',zIndex:2}}>
            <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'.2em',color:'#0f766e',fontWeight:900,marginBottom:35}}>Mimi's Cozy Corner • Preview Page {index+1}</div>
            <h3 style={{fontSize:'clamp(28px,4vw,44px)',lineHeight:1.08,fontWeight:900,margin:'0 0 30px'}}>{page[0]}</h3>
            <div style={{display:'grid',gap:14,maxWidth:850}}>
              <div style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:12,padding:20,fontSize:20,lineHeight:1.5,color:'#334155',fontWeight:800}}>{page[1]}</div>
              <div style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:12,padding:20,fontSize:17,lineHeight:1.6,color:'#475569'}}>{page[2]}</div>
            </div>
            <div style={{position:'absolute',left:38,right:38,bottom:24,paddingTop:13,borderTop:'1px solid #e2e8f0',color:'#94a3b8',fontSize:11}}>Preview only • Purchased files are delivered through Payhip.</div>
          </div>
          <PreviewWatermark/>
        </div>)}
        <div style={{textAlign:'center',padding:'20px 0 30px'}}>
          <button onClick={()=>goToPayhip(p.id)}
            style={{border:0,borderRadius:999,padding:'15px 25px',fontWeight:900,fontSize:16,background:'#ff4fbe',color:'#fff',cursor:'pointer'}}>
            Get {p.title} — {p.price}
          </button>
        </div>
      </div>
    </div>
  </div>;
}

function DigitalProducts(){
  const [selected,setSelected]=useState<any|null>(null);
  return <div style={{background:'#080713',minHeight:'100vh',color:'#fff',fontFamily:'system-ui,-apple-system,Segoe UI,sans-serif'}}>
    <header style={{padding:'18px 24px',borderBottom:'1px solid rgba(255,255,255,.12)',position:'sticky',top:0,background:'rgba(8,7,19,.94)',backdropFilter:'blur(12px)',zIndex:10}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
        <a href='/' style={{color:'#fff',textDecoration:'none',fontWeight:900,letterSpacing:'.04em'}}>Mimi's Cozy Corner</a>
        <a href='/' style={{color:'#28e8ff',textDecoration:'none',fontWeight:700}}>← Back Home</a>
      </div>
    </header>
    <section style={{padding:'64px 20px 34px',textAlign:'center',background:'radial-gradient(circle at 50% 0%, rgba(255,200,87,.18), transparent 45%)'}}>
      <div style={{display:'inline-block',padding:'7px 12px',border:'1px solid rgba(255,200,87,.45)',borderRadius:999,color:'#ffc857',fontSize:12,fontWeight:800,letterSpacing:'.08em'}}>MIMI'S DIGITAL PRODUCTS</div>
      <h1 style={{fontSize:'clamp(34px,6vw,64px)',margin:'18px auto 10px',maxWidth:900,lineHeight:1.02}}>Smart products made to be used.</h1>
      <p style={{maxWidth:700,margin:'0 auto',color:'#c9c6d7',fontSize:17}}>Browse the products, then open a watermarked page-by-page preview before buying.</p>
    </section>
    <section style={{padding:'24px 20px 70px'}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:22}}>
        {restoredProducts.map(p=><article key={p.id} style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.12)',borderRadius:20,overflow:'hidden',boxShadow:'0 12px 35px rgba(0,0,0,.22)'}}>
          <div style={{background:'#111022',aspectRatio:'1/1',display:'grid',placeItems:'center',padding:12}}>
            <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:12}}/>
          </div>
          <div style={{padding:18}}>
            <div style={{display:'inline-block',padding:'5px 9px',borderRadius:999,background:'rgba(255,200,87,.12)',color:'#ffc857',fontSize:10,fontWeight:900,letterSpacing:'.06em'}}>{p.badge}</div>
            <h2 style={{fontSize:19,lineHeight:1.2,margin:'12px 0 8px'}}>{p.title}</h2>
            <p style={{color:'#aaa7b9',fontSize:13,lineHeight:1.5,minHeight:58,margin:'0 0 16px'}}>{p.subtitle}</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
              <strong style={{fontSize:24,color:'#ffc857'}}>{p.price}</strong>
              <div style={{display:'flex',gap:8}}>
                <button type='button' onClick={()=>setSelected(p)} style={{border:'1px solid #28e8ff',borderRadius:12,padding:'10px 12px',fontWeight:900,background:'rgba(40,232,255,.08)',color:'#28e8ff',cursor:'pointer'}}>👁 Preview</button>
                <button type='button' onClick={()=>goToPayhip(p.id)} style={{border:0,borderRadius:12,padding:'10px 14px',fontWeight:900,background:'#ff4fbe',color:'#fff',cursor:'pointer'}}>View Product</button>
              </div>
            </div>
          </div>
        </article>)}
      </div>
    </section>
    {selected&&<ProductPreview p={selected} onClose={()=>setSelected(null)}/>}
  </div>;
}

export default function App(){
  const path=window.location.pathname.replace(/\/$/,'')||'/';
  if(path==='/digital-products') return <DigitalProducts/>;
  return <ExistingApp/>;
}
