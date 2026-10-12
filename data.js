// 题目与结果数据：改这里就能换内容。维度：O=恋爱开放度 I=主动性 S=安全感 C=沟通直接度（每项0-2分）
window.DIMS = { O: "Open to love", I: "Makes the first move", S: "Feels secure", C: "Says it straight" };
window.QUIZ = {
serious: {
  name: "Thoughtful", icon: "lens",
  questions: [
    { q: "They haven't texted back in three hours. You:", d: "Security", opts: [
      ["Get on with your day and wait till they're free", { S: 2 }], ["Imagine a hundred reasons but never ask", { S: 0 }],
      ["Just ask, \"Busy?\"", { C: 2, S: 1 }], ["Take your sweet time replying too", { S: 0, C: 0 }]]},
    { q: "Someone you just met asks you to dinner, just the two of you. You:", d: "Openness", opts: [
      ["Say yes. What's the harm?", { O: 2 }], ["Bring a friend along", { O: 1 }],
      ["Find a polite excuse", { O: 0 }], ["Decide based on who it is", { O: 1, S: 1 }]]},
    { q: "When you have a crush, you usually:", d: "First moves", opts: [
      ["Find reasons to chat and \"accidentally\" bump into them", { I: 2 }], ["Wait for them to show a sign", { I: 0 }],
      ["Analyse it with your best friend 800 times", { I: 1 }], ["Just ask them out", { I: 2, C: 2 }]]},
    { q: "A friend wants to set you up. You:", d: "Openness", opts: [
      ["Sure, send me their number", { O: 2 }], ["Let me see their photos and socials first", { O: 1 }],
      ["Nah, not in the mood lately", { O: 0 }], ["Ask what they're like first", { O: 1, C: 1 }]]},
    { q: "There's an awkward silence on a date. You:", d: "Talking", opts: [
      ["Throw out a new topic", { C: 2, I: 1 }], ["Sip your drink and wait for them to speak", { C: 0 }],
      ["Crack a joke to break the ice", { C: 1, I: 1 }], ["Quietly deduct points", { S: 0 }]]},
    { q: "A weekend on your own feels:", d: "Openness", opts: [
      ["Wonderful. Please don't disturb", { O: 0, S: 2 }], ["A little empty sometimes", { O: 1 }],
      ["Like I'd love some company", { O: 2 }], ["Depends. Sometimes great, sometimes empty", { O: 1, S: 1 }]]},
    { q: "Your almost-something is having a great time chatting with someone else. You:", d: "Security", opts: [
      ["Fine by me, we're not official", { S: 2 }], ["Look calm, then scroll their whole profile at home", { S: 0 }],
      ["Joke, \"What are you two talking about?\"", { C: 2, S: 1 }], ["Quietly step back. Not worth a fight", { S: 0, I: 0 }]]},
    { q: "Something in the relationship bothers you. You:", d: "Talking", opts: [
      ["Talk it out that same day", { C: 2 }], ["Save it up until it all explodes", { C: 0 }],
      ["Drop gentle hints and hope they get it", { C: 1 }], ["Deal with it alone and let it go", { C: 0, S: 1 }]]},
    { q: "Should you confess first?", d: "First moves", opts: [
      ["If I like them I'll say it, even if they say no", { I: 2, C: 2 }], ["They have to say it first", { I: 0 }],
      ["Only once I'm 80% sure", { I: 1 }], ["I could go my whole life never saying it", { I: 0, O: 0 }]]},
    { q: "Your ideal pace for love is:", d: "Openness", opts: [
      ["Meet the right person, go all in", { O: 2, I: 2 }], ["Get to know each other slowly and let it happen", { O: 1, S: 2 }],
      ["Be friends for a long time first", { O: 1 }], ["Not something I'm thinking about right now", { O: 0 }]]}
  ],
  chars: [
    { p: { O: 2, I: 2, S: 1, C: 2 }, motif: "comet", bg: "a", name: "Taki Tachibana", fp: "Panicking but playing it cool", from: "the film Your Name", stage: "right after he starts swapping bodies with Mitsuha and everything is chaos",
      why: "Back then he was impatient and stubborn, but once he'd decided, he charged ahead and went looking for her without even knowing where she lived. You answered the same way: act first, figure it out later. When you like someone, you don't just sit and wait.",
      diff: "Where you're not like him: you're better with words and won't bottle your feelings up in a diary.",
      fun: ["You in love: texting \"good morning\" every day, then following up with \"are you up yet?\"", "Superpower: turning panic into \"I have a plan.\""] },
    { p: { O: 1, I: 0, S: 0, C: 1 }, motif: "lantern", bg: "c", name: "Chihiro", fp: "Would work a bathhouse shift for love", from: "the film Spirited Away", stage: "when she first arrives at the bathhouse, still scared of everything",
      why: "Back then Chihiro was timid and unsure, but she turned brave the moment someone she cared about needed her. In relationships you tend to worry and overthink, but when you really like someone, you quietly do a lot for them.",
      diff: "Where you're not like her: you hide your nerves better. No one can tell you're panicking.",
      fun: ["You in love: one \"I'm here\" from them keeps you calm all day.", "Hidden trait: when it counts, you'll take on a whole bathhouse shift for love."] },
    { p: { O: 2, I: 1, S: 2, C: 2 }, motif: "bow", bg: "g", name: "Duk-sun", fp: "The whole street knows", from: "the K-drama Reply 1988", stage: "in high school, loud and carefree in her neighbourhood alley",
      why: "Back then Duk-sun was warm, easy to be around and said whatever she thought. When she liked someone, she couldn't hide it. Your answers were open and direct: you give love a chance and you don't hold grudges.",
      diff: "Where you're not like her: you know who you like more clearly and aren't easily led astray by misunderstandings.",
      fun: ["You in love: your partner ends up meeting every friend on the block.", "Friends say: \"When she's dating, the whole world knows.\""] },
    { p: { O: 0, I: 1, S: 2, C: 2 }, motif: "quill", bg: "d", name: "Elizabeth Bennet", fp: "Sharp tongue, soft heart", from: "the film Pride & Prejudice (2005)", stage: "when she first meets Darcy at the ball and can't stand him",
      why: "Back then she was independent, opinionated and quick-witted, and she'd never lower her standards just to be with someone. You feel secure and speak your mind, but you're in no hurry for romance itself.",
      diff: "Where you're not like her: your first impressions don't swing straight to full marks or zero.",
      fun: ["You in love: you'll win the argument, then secretly soften.", "Warning: anyone who wants to date you has three rounds of interviews first."] },
    { p: { O: 0, I: 0, S: 1, C: 0 }, motif: "cat", bg: "o", name: "Natsume", fp: "Says \"I'm fine\", does everything", from: "the anime Natsume's Book of Friends", stage: "in season one, just moved in with the Fujiwaras and not used to being cared for",
      why: "Back then Natsume was gentle but closed off, afraid of being a burden, and kept a lot unsaid. You're slow and quiet in love and don't say much, but you're wonderful to the person you choose.",
      diff: "Where you're not like him: you actually enjoy being alone more. It isn't fear of getting close. You just don't need it right now.",
      fun: ["You in love: you say \"it's nothing,\" and then do everything for them.", "Tip: get yourself a Nyanko-sensei to say things out loud for you."] },
    { p: { O: 2, I: 2, S: 0, C: 2 }, motif: "starplanet", bg: "b", name: "Cheon Song-yi", fp: "\"Do you love me?\" daily", from: "the K-drama My Love from the Star", stage: "when she's just met Do Min-joon and knocks on his door every day",
      why: "Back then she was bold, forward and wore every feeling on her face. She went after what she wanted but really needed a response. You're forward and direct and go for it when you like someone, while caring a lot about how they react.",
      diff: "Where you're not like her: you know when to hold back. No ringing the doorbell at 3 a.m.",
      fun: ["You in love: \"Did you love me today?\" Asked daily.", "Vibe: a whole romcom, starring you."] }
  ]
},
funny: {
  name: "Silly", icon: "popper",
  questions: [
    { q: "Your crush suddenly turns into a cat sitting on your doorstep. You:", opts: [
      ["Adopt it on the spot and name it Baby", { O: 2, I: 2 }], ["Take a photo and post it first", { C: 2 }],
      ["Crouch down and ask, \"Who are you?\"", { C: 1, S: 1 }], ["Close the door and pretend you didn't see", { O: 0 }]]},
    { q: "Cupid texts you: \"Your red string got tangled.\" You reply:", opts: [
      ["Then untangle it, quick!", { I: 2, C: 2 }], ["Is untangling extra?", { S: 2 }],
      ["Leave it on read", { C: 0 }], ["I'll cut it myself", { O: 0, S: 2 }]]},
    { q: "The delivery driver says, \"You look like my first love.\" You:", opts: [
      ["Want to swap numbers, then?", { I: 2, O: 2 }], ["One-star review", { O: 0 }],
      ["\"Like how, exactly? Go on\"", { C: 2 }], ["Die of embarrassment and evaporate on the spot", { S: 0 }]]},
    { q: "Cupid misses and hits your bubble tea instead. You:", opts: [
      ["Drink it. Maybe I'll fall for the barista", { O: 2 }], ["Ask Cupid for compensation", { C: 2, S: 2 }],
      ["Wonder if it's a hint to cut down on sugar", { S: 0 }], ["Grab the arrow and go aim it yourself", { I: 2 }]]},
    { q: "On your love skill tree, which branch is maxed out?", opts: [
      ["\"Talking to strangers\": max level", { I: 2 }], ["\"Leaving people on read\": max level", { C: 0 }],
      ["\"Imaginary scenarios\": max level", { S: 0, O: 1 }], ["\"Fine on my own\": max level", { O: 0, S: 2 }]]},
    { q: "The lift gets stuck with just you and your crush inside. You:", opts: [
      ["This is my chance. Start chatting", { I: 2, C: 2 }], ["Smash the alarm button", { O: 0 }],
      ["Sneakily fix your hair", { O: 1, S: 1 }], ["Heart's racing too fast, faint first", { S: 0 }]]},
    { q: "The wishing well grants only one wish. You wish for:", opts: [
      ["Finding someone this year", { O: 2 }], ["Getting rich. Love will follow", { S: 2, O: 1 }],
      ["My ex doing worse than me", { S: 0 }], ["Never having to work again", { O: 0 }]]},
    { q: "You're half an hour late for a date. Your excuse:", opts: [
      ["The truth: I overslept", { C: 2 }], ["I rescued an alien on the way", { C: 1, I: 1 }],
      ["Send a crying sticker and hope for the best", { C: 0 }], ["I'm never late. I'm an hour early", { S: 0, I: 2 }]]},
    { q: "Your love life is now a weather forecast. Today it's:", opts: [
      ["Sunny! Perfect for finding someone", { O: 2, S: 2 }], ["Cloudy, depends on my mood", { O: 1 }],
      ["Thunderstorms. Don't push it", { O: 0, C: 2 }], ["Foggy. Can't see what I want", { S: 0 }]]},
    { q: "An AI offers to write your love letter. You:", opts: [
      ["Yes! And send it the second it's done", { I: 2, O: 2 }], ["Let it write, then edit it ten times", { I: 1, S: 0 }],
      ["Save it as a draft forever", { I: 0 }], ["Ask it for a breakup letter instead", { O: 0, C: 2 }]]}
  ],
  chars: [
    { p: { O: 2, I: 2, S: 1, C: 1 }, motif: "ball", bg: "a", name: "Hanamichi Sakuragi", fp: "Showing off for love, a born genius", from: "the anime Slam Dunk", stage: "right after he joins the basketball team to impress Haruko",
      why: "Back then Sakuragi was impulsive and fired up, willing to try anything for the person he liked, and fifty rejections couldn't stop him. You answered boldly too: go first, think later.",
      diff: "Where you're not like him: you probably haven't been turned down fifty times.",
      fun: ["You in love: \"I'm a genius!\", performed live for your partner.", "Warning: don't show off so hard you end up in the nurse's office."] },
    { p: { O: 1, I: 0, S: 1, C: 0 }, motif: "moonfan", bg: "c", name: "Kaguya Shinomiya", fp: "Whoever confesses first loses", from: "the anime Kaguya-sama: Love Is War", stage: "in season one, scheming to make him confess first",
      why: "Back then Kaguya liked him and would never admit it. She was set on making him speak first and plotted endlessly. You're a bit stubborn too, you'd rather not bend first, and your feelings hide in the details.",
      diff: "Where you're not like her: your schemes are simpler. Mostly \"reply a little late.\"",
      fun: ["You in love: \"It's not like I brought you breakfast because I like you.\"", "Motto: whoever says it first, loses."] },
    { p: { O: 1, I: 1, S: 2, C: 2 }, motif: "flame", bg: "g", name: "Sophie", fp: "Grumbles while tidying up", from: "the film Howl's Moving Castle", stage: "after she's turned into an old woman and moves into the castle",
      why: "Back then Sophie didn't panic one bit. She moved into the castle, cleaned it top to bottom and said exactly what she thought, and felt freer for it. You feel secure and steady, and you take love calmly too.",
      diff: "Where you're not like her: you don't need a curse to be yourself.",
      fun: ["You in love: you'll complain about your partner while tidying their room.", "Best line: \"I look good old, too.\""] },
    { p: { O: 2, I: 1, S: 0, C: 1 }, motif: "sprout", bg: "d", name: "WALL-E", fp: "A little rock counts as a gift", from: "the film WALL-E", stage: "when he first meets EVE and follows her all the way into space",
      why: "Back then WALL-E was lonely and longing for company. One spark and he'd chase someone across the universe, but he was scared of being left behind. You'd love to be in love, and you sometimes worry they don't like you as much.",
      diff: "Where you're not like him: you can talk, so you don't have to just say their name.",
      fun: ["You in love: you'll give a small rock as a gift, very sincerely.", "Superpower: making it romantic with a single light bulb."] },
    { p: { O: 0, I: 1, S: 2, C: 2 }, motif: "blossom", bg: "o", name: "Zhen Huan", fp: "Remembers it for three years", from: "the drama Empresses in the Palace", stage: "when she first enters the palace and only wants a quiet life",
      why: "Back then Zhen Huan was clever and clear-headed with no interest in competing for favour, but when she had to speak, she never gave an inch. You're in no hurry for love, you think clearly, and it's hard to fool you.",
      diff: "Where you're not like her: hopefully there's less palace intrigue in your life.",
      fun: ["You in love: if they say one wrong thing, you'll remember it for three years.", "Signature line: kept strictly to your inner voice."] },
    { p: { O: 0, I: 0, S: 0, C: 0 }, motif: "ufo", bg: "b", name: "Stitch", fp: "Cuddly with exactly one person", from: "the film Lilo & Stitch", stage: "right after he crash-lands on Earth and bares his teeth at everyone",
      why: "Back then Stitch was guarded and trusted no one, though deep down he wanted a family. You're pretty guarded about love right now. You don't make the first move or say much, but the right person who comes closer slowly will see you soften.",
      diff: "Where you're not like him: you probably don't bite. Probably.",
      fun: ["You in love: a little monster who's cuddly with exactly one person.", "Tip: practise being gentle on a cactus first."] }
  ]
}};
window.STATUS = [
  { min: 0, name: "Door locked for now", fp: "Door locked", icon: "lock", text: "You're enjoying your own rhythm, and love isn't a must right now. The door is locked, but you hold the key." },
  { min: 0.4, name: "Door ajar", fp: "Door ajar", icon: "doorhalf", text: "You're not against love, but you won't date just for the sake of it. If the right person walks by, you'll peek out." },
  { min: 0.7, name: "Door wide open", fp: "Door open", icon: "dooropen", text: "You're very open to love and already giving people a chance. Someone just needs to walk in." }
];
window.SIGNAL = {
  near: { name: "Any day now", fp: "Green light soon", icon: "sig_near", text: "You act fast and your light is already on. It mostly depends on whether you leave the house.", tips: ["Try popping down to the corner shop more this week. You never know.", "Try a nicer profile photo. Signal strength +200%."] },
  chance: { name: "Waiting for a moment", fp: "Waiting for the moment", icon: "sig_chance", text: "Your best chance is when you change scenery or start something new.", tips: ["Try a class. Someone might be waiting in pottery.", "Take a trip. Your red string might be in another city."] },
  slow: { name: "Slow burn", fp: "Slow burn", icon: "sig_slow", text: "You tend to go from friends to more, slowly. That person might already be around you.", tips: ["Scroll your contacts and notice who always texts back first.", "Go to more friends' dinners. Cupid is camping out at the hot-pot place."] }
};

// 平衡系数：让随机作答时 6 个角色出现概率接近（由模拟校准，改角色后需重算）
window.BIAS={"serious":[-0.048,0.271,-0.045,-0.044,0.038,-0.173],"funny":[0.193,-0.015,0.108,0.191,-0.126,-0.35]};
for(const m in window.BIAS)window.QUIZ[m].chars.forEach((c,i)=>c.bias=window.BIAS[m][i]);
