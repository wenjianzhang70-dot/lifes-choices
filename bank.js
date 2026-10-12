/* 题库 + 抽题引擎。题目格式：{id,g,d,q,opts:[[文案,{O,I,S,C}]...]}；d=主维度，g=场景组（同组每局最多一题） */
(function(){
var DIM={O:'Openness',I:'First moves',S:'Security',C:'Talking'};
// 旧题打标签：[id,g,d]
var OLD={serious:[['s01','msg','S'],['s02','invite','O'],['s03','crush','I'],['s04','intro','O'],['s05','dateflow','C'],['s06','solo','O'],['s07','jealous','S'],['s08','conflict','C'],['s09','confess','I'],['s10','pace','O']],
 funny:[['f01','animal','O'],['f02','gods','S'],['f03','delivery','I'],['f04','cupid','O'],['f05','game','S'],['f06','trapped','I'],['f07','wish','O'],['f08','late','C'],['f09','forecast','S'],['f10','tech','I']]};
var A=function(id,g,d,q,o){return {id:id,g:g,d:d,q:q,opts:o}};
var NEW={serious:[
// O 开放度 6
A('s11','invite','O','A coworker is organising a weekend hike and bringing some new people. You:',[['Go. Meeting new people is nice',{O:2}],['See who\'s coming first',{O:1}],['Politely pass. Weekends are for the sofa',{O:0}],['Go, but stick with people I know',{O:1,S:1}]]),
A('s12','intro','O','Someone liked you on a dating app. You:',[['Open their profile and read it properly',{O:2}],['Leave it for later',{O:1}],['These apps aren\'t for me. Swipe away',{O:0}],['Just say hi and chat',{O:2,I:2}]]),
A('s13','solo','O','All your friends are coupled up. Your most frequent thought:',[['Maybe I\'ll give it a go too',{O:2}],['It\'ll happen when it happens',{O:1}],['I\'m happier on my own',{O:0,S:2}],['A little panicky, but I won\'t settle',{O:1,S:1}]]),
A('s14','pace','O','They\'re a type you\'ve never met before. You:',[['Curious! I want to know more',{O:2}],['Watch for a while first',{O:1}],['Not my type, moving on',{O:0}],['Get a friend\'s opinion first',{O:1,C:1}]]),
A('s15','future','O','Someone asks, "If we got together, which city would we live in?" You:',[['Start daydreaming in detail',{O:2}],['Laugh it off',{O:1}],['Feel it\'s too soon, a bit of pressure',{O:0}],['Ask what they think first',{O:1,C:2}]]),
A('s16','social','O','An online friend from another city wants to meet. You:',[['Sure, somewhere public',{O:2,S:1}],['Chat a while longer first',{O:1}],['Online friends stay online',{O:0}],['Video call first',{O:1,C:1}]]),
// I 主动性 8
A('s17','crush','I','Your crush posts something new. You:',[['Comment with a joke to start a chat',{I:2}],['Like it and go',{I:1}],['Quietly look at it many times',{I:0}],['DM to ask more',{I:2,C:1}]]),
A('s18','crush','I','You know they\'re looking for a lunch buddy. You:',[['Ask them, "Want to go together?"',{I:2}],['Ask in the group chat who\'s in',{I:1}],['Wait for them to ask me',{I:0}],['Get a friend to set it up',{I:1,C:0}]]),
A('s19','invite','I','First date. Who chooses the place?',[['I\'ll pick, then check with them',{I:2}],['We decide together',{I:1,C:2}],['Whatever they plan',{I:0}],['I\'ll give them a shortlist',{I:2,C:1}]]),
A('s20','confess','I','A month of flirting and nobody\'s said anything. You:',[['I\'ll say it',{I:2,C:2}],['Create a moment for them to say it',{I:1}],['Keep waiting, no rush',{I:0}],['Text a bit less and see how they react',{I:0,S:0}]]),
A('s21','msg','I','Mid-chat they went to shower and never came back. Next day you:',[['Casually start a new topic',{I:2}],['Wait for them to message first',{I:0}],['Ask, "Fell asleep last night?"',{I:1,C:1}],['Send a sticker',{I:1}]]),
A('s22','dateflow','I','The date went well. Next time?',[['Set it up that same day',{I:2}],['Bring it up in a couple of days',{I:1}],['See if they suggest it',{I:0}],['Text "I had a great time today"',{I:1,C:2}]]),
A('s23','social','I','At a party you notice someone who catches your eye. You:',[['Go and say hi',{I:2}],['Get a friend to introduce you',{I:1}],['Just look a few more times',{I:0}],['Add them online and chat later',{I:1,O:1}]]),
A('s24','ex','I','Your ex suddenly texts, "How\'ve you been?" You:',[['Reply politely and leave it there',{I:1,S:2}],['Get chatting enthusiastically',{I:2,O:2}],['Don\'t reply',{I:0}],['Ask, "Is something up?"',{I:1,C:2}]]),
// S 安全感 8
A('s25','msg','S','They said "I\'ll call you later", but it\'s bedtime and nothing. You:',[['They\'re probably busy. Tomorrow, then',{S:2}],['Can\'t sleep, keep checking my phone',{S:0}],['Send a quick message to ask',{S:1,C:2}],['A bit let down but don\'t say anything',{S:0,C:0}]]),
A('s26','jealous','S','Their phone lights up with a name you don\'t know. You:',[['Don\'t care',{S:2}],['Heart starts drumming',{S:0}],['Casually ask who it is',{S:1,C:2}],['Want to sneak a look',{S:0,C:0}]]),
A('s27','jealous','S','They\'re still friends with their ex and chat sometimes. You:',[['I get it',{S:2}],['Bothers me but I put up with it',{S:0,C:0}],['Tell them where my boundaries are',{S:1,C:2}],['Ask them to delete the contact',{S:0,C:1}]]),
A('s28','future','S','They say work\'s crazy and you\'ll see each other less. You:',[['Then I\'ll plan my own time too',{S:2}],['Worry they\'re cooling off',{S:0}],['Set a regular video-call time',{S:1,C:2}],['Say "OK" but feel uneasy',{S:0,C:0}]]),
A('s29','social','S','They didn\'t invite you to their friends\' get-together. You:',[['Normal. We each have our own social lives',{S:2}],['Start wondering if I matter',{S:0}],['Say I\'d love to meet them next time',{S:1,C:2}],['Don\'t invite them to mine either',{S:0,I:1}]]),
A('s30','money','S','For your anniversary they only gave you a handwritten card. You:',[['Love it. It\'s the thought that counts',{S:2}],['Quietly compare it with other people\'s gifts',{S:0}],['Suggest choosing something together next time',{S:1,C:2}],['A little disappointed but keep it to myself',{S:1,C:0}]]),
A('s31','family','S','Six months in and they haven\'t mentioned meeting their friends or family. You:',[['Different pace, no rush',{S:2}],['Suspect they\'re not in it for the long run',{S:0}],['Bring it up myself',{S:1,C:2,I:1}],['Wait for them to think of it',{S:1,I:0}]]),
A('s32','routine','S','Which line do you agree with most?',[['How solid a relationship is shows in what both people do',{S:2}],['Even the best love can change overnight',{S:0}],['Security comes from within, and it also needs an answer',{S:1,C:1}],['I need to know every day that I\'m liked',{S:0,C:2}]]),
// C 沟通 8
A('s33','conflict','C','Something they said didn\'t sit right with you. You:',[['Say right away, "That one didn\'t feel great"',{C:2}],['Think it over and talk later',{C:1}],['Never mind, not worth a fight',{C:0}],['Point it out with a joke',{C:1,I:1}]]),
A('s34','conflict','C','After an argument, you usually:',[['Cool down, then go over it together',{C:2,I:1}],['Wait for them to speak first',{C:0}],['Make up now, sort it out later',{C:1}],['Write a very long message',{C:2}]]),
A('s35','dateflow','C','You don\'t actually like the restaurant they picked. You:',[['Say so, and pick another',{C:2}],['Mention it gently after dinner',{C:1}],['Let it go, I\'ll pick next time',{C:0}],['Offer to choose next time',{C:1,I:2}]]),
A('s36','money','C','They always pay on dates. You:',[['Talk about how to split it',{C:2}],['Quietly treat them next time',{C:1,I:1}],['Say nothing, if they\'re happy',{C:0}],['Joke, "This one\'s on me"',{C:1}]]),
A('s37','routine','C','When you want more time together, you:',[['Say it: "I want to see you more"',{C:2}],['Hint: "Weekends are so boring"',{C:1}],['Don\'t say anything. Don\'t want to seem clingy',{C:0}],['Just plan the weekend together',{C:1,I:2}]]),
A('s38','future','C','You disagree about whether to have kids someday. You:',[['Sit down and talk it through',{C:2}],['Leave it for later',{C:0}],['Feel out what they think first',{C:1}],['Ask myself what I really want first',{C:1,S:1}]]),
A('s39','family','C','Your parents aren\'t sure about them. You:',[['Talk to both sides separately',{C:2}],['Don\'t tell them',{C:0}],['Pass on the main points gently',{C:1}],['Take their side and keep things calm',{C:1,S:1}]]),
A('s40','ex','C','They ask, "What was your ex like?" You:',[['Tell them honestly, briefly',{C:2}],['Say "That\'s all in the past"',{C:0}],['Ask why they want to know',{C:1}],['Tell the funny version',{C:1,O:1}]]),
// 扩充 s41+
A("s41","travel","O","A friend suggests a spur-of-the-moment trip to a town you've never been. You:",[["Yes! Booking now",{"O":2}],["Let me look it up first",{"O":1}],["Somewhere familiar, maybe",{"O":0}],["Invite my crush along",{"O":2,"I":1}]]),
A("s42","travel","I","On the road, you want to send your crush a postcard. You:",[["Write it and post it right away",{"I":2}],["Write it but never send it",{"I":0}],["Take a photo of it and send that",{"I":1,"C":1}],["Post it to myself as a keepsake",{"I":0,"S":1}]]),
A("s43","travel","S","Your travel buddy changes plans without asking you. You:",[["A bit miffed, but go along",{"S":1}],["No problem, go with the flow",{"S":2}],["Feel like I don't matter",{"S":0}],["Talk to them about it that evening",{"S":1,"C":1}]]),
A("s44","travel","C","On a trip you disagree on where to go. You:",[["Say where I'd rather go",{"C":2}],["Let them pick",{"C":0}],["Split up and meet for dinner",{"C":1,"O":1}],["Flip a coin",{"C":1}]]),
A("s45","work","O","A new coworker and you really hit it off. You:",[["Ask them to grab dinner after work",{"O":2,"I":1}],["Chatting at work is enough",{"O":1}],["Keep it professional",{"O":0}],["Check whether they're seeing someone",{"O":1,"S":1}]]),
A("s46","work","I","Working late, you notice your crush is still there too. You:",[["Go over and say \"Walk out together?\"",{"I":2}],["Text to ask when they're leaving",{"I":1}],["Pretend not to see and leave first",{"I":0}],["Dawdle a little to wait for them",{"I":1,"S":1}]]),
A("s47","work","S","They're having dinner with coworkers tonight, some of them attractive. You:",[["Great, have fun!",{"S":2}],["Ask who's going",{"S":1,"C":1}],["Say \"OK\" while my heart drums",{"S":0}],["Ask them to text when they're home",{"S":1}]]),
A("s48","work","C","You think they've been working too hard. You:",[["Say it: \"You need a break\"",{"C":2}],["Quietly order them takeaway",{"C":0,"I":1}],["Hint at it in a roundabout way",{"C":1}],["Stay up with them",{"C":0,"S":1}]]),
A("s49","holiday","O","A holiday's coming up. Your attitude:",[["Let's try something new",{"O":2}],["Keep it simple",{"O":1}],["Holidays are just marketing",{"O":0}],["Depends if they want to celebrate",{"O":1,"C":1}]]),
A("s50","holiday","I","On the day, they haven't mentioned any plans. You:",[["I'll plan a little surprise",{"I":2}],["Ask, \"What are we doing today?\"",{"I":1,"C":1}],["Wait for them to remember",{"I":0}],["Celebrating on my own is fine too",{"I":0,"S":2}]]),
A("s51","holiday","S","They didn't give you a gift for the holiday. Inside you feel:",[["It doesn't matter, it's the thought",{"S":2}],["A tiny bit let down",{"S":1}],["Like they don't value me",{"S":0}],["Just ask if they forgot",{"S":1,"C":2}]]),
A("s52","holiday","C","The gift you wanted is nothing like the one they gave. You:",[["Tell them what I'd like next time",{"C":2}],["Accept it happily, say nothing",{"C":0}],["Hint at it half-jokingly",{"C":1}],["Secretly send them my wish list",{"C":1,"I":1}]]),
A("s53","pet","O","They have a pet you're scared of. You:",[["Try getting used to it slowly",{"O":2}],["Meet up outside instead",{"O":1}],["That's a hard no",{"O":0}],["Admit I'm a bit scared",{"O":1,"C":2}]]),
A("s54","pet","I","You walk past a pet shop together. You:",[["Pull them in for a look",{"I":2}],["Ask if they want to go in",{"I":1,"C":1}],["See if they stop",{"I":0}],["Take a long look and keep walking",{"I":0}]]),
A("s55","gift","C","A friend gave you a gift you don't love. You:",[["Say \"Let's pick together next time\"",{"C":2}],["Say thanks and put it away",{"C":0}],["Say I like it but rarely use it",{"C":1}],["Regift it",{"C":0}]]),
A("s56","gift","O","It's your crush's birthday. How do you choose a gift?",[["Something new I've never tried",{"O":2}],["Ask friends what to get",{"O":1}],["Something safe and useful",{"O":0}],["Ask them what they want",{"O":1,"C":2}]]),
A("s57","gift","I","You spot a little thing that's so them. You:",[["Buy it and give it next time I see them",{"I":2}],["Snap a photo and send it",{"I":1}],["Think about it, then leave it",{"I":0}],["Save it for a special occasion",{"I":1,"S":1}]]),
A("s58","rain","S","The date's called off because of heavy rain. You:",[["No problem, another day",{"S":2}],["A bit disappointed, but I understand",{"S":1}],["Wonder if they didn't want to come",{"S":0}],["Switch to a video call",{"S":1,"I":1}]]),
A("s59","rain","C","You forgot your umbrella and they offer to pick you up, but you don't know each other well. You:",[["\"Yes please, thank you!\"",{"C":2}],["\"No, no, it's fine\"",{"C":0}],["\"If it's no trouble\"",{"C":1}],["Send them my location",{"C":1,"I":1}]]),
A("s60","gym","O","Someone strikes up a chat at the gym. You:",[["Chat. This is fun",{"O":2}],["Reply politely",{"O":1}],["Put my headphones on",{"O":0}],["Chat a bit and see",{"O":1,"S":1}]]),
A("s61","gym","I","You want to ask them to exercise together. You:",[["Ask, \"Run together this weekend?\"",{"I":2}],["Post my workout and wait for a comment",{"I":1}],["Forget it, they might find it tiring",{"I":0}],["Invite them with a group of friends",{"I":1,"O":1}]]),
A("s62","study","S","They're focusing on exams and want three months of less contact. You:",[["Supportive. I'll be here when you're done",{"S":2}],["OK, but check in now and then",{"S":1,"C":1}],["Really uneasy",{"S":0}],["Think it's an excuse",{"S":0}]]),
A("s63","study","C","They ask you a question you can't answer either. You:",[["Admit I don't know, look it up together",{"C":2}],["Say \"Let me think\" and secretly google it",{"C":1}],["Act like I know",{"C":0}],["Change the subject",{"C":0}]]),
A("s64","movie","O","They invite you to a kind of film you never watch. You:",[["Go. I might like it",{"O":2}],["Go, but check the reviews first",{"O":1}],["Suggest a different one",{"O":0,"C":1}],["Take turns choosing",{"O":1,"C":1}]]),
A("s65","movie","I","At the cinema you want to hold their hand. You:",[["Just take it",{"I":2}],["Rest my hand on the armrest and wait",{"I":1}],["Think about it the whole film, do nothing",{"I":0}],["Wait till it's over",{"I":1}]]),
A("s66","movie","S","The couple on screen break up and they're really into it. You:",[["Nice, they're so sincere",{"S":2}],["Want to ask if they'd do the same",{"S":1,"C":1}],["Can't help thinking about us",{"S":0}],["Stay quiet",{"S":1}]]),
A("s67","cook","C","The meal they cooked isn't great, and they ask how it tastes. You:",[["Smile and say \"A bit salty\"",{"C":2}],["Say it's delicious and finish it all",{"C":0}],["Say \"Room to improve\"",{"C":1}],["I'll cook next time",{"C":1,"I":1}]]),
A("s68","cook","O","They suggest learning to cook a dish from another country together. You:",[["So much fun",{"O":2}],["Sure, something easy",{"O":1}],["Let's just order in",{"O":0}],["I'm in charge of eating",{"O":1,"S":1}]]),
A("s69","moving","I","They're moving and didn't ask you to help. You:",[["Offer: \"Want me to come?\"",{"I":2}],["Wait for them to ask",{"I":0}],["Send a housewarming gift",{"I":1}],["Text to ask if they're done",{"I":1,"C":1}]]),
A("s70","moving","S","They say they want to move to another city for work. You:",[["Supportive. We'll figure it out",{"S":2}],["Talk through the details first",{"S":1,"C":1}],["Worry about us",{"S":0}],["Quietly prepare",{"S":1}]]),
A("s71","moving","C","You disagree about decorating your new place. You:",[["Lay out my reasons calmly",{"C":2}],["Never mind, their call",{"C":0}],["One room each",{"C":1,"O":1}],["Leave it and bring it up in a few days",{"C":1}]]),
A("s72","sick","O","Your crush has a cold. You:",[["Bring them medicine",{"O":1,"I":2}],["Text to remind them to drink water",{"O":1}],["Don't want to bother them",{"O":0}],["Order them some soup",{"O":1,"I":1}]]),
A("s73","sick","I","You're ill and really want them to visit. You:",[["Say it: \"I want you to come\"",{"I":2}],["Mention I'm ill and see what they do",{"I":1}],["Say nothing, tough it out",{"I":0}],["Get a friend to let them know",{"I":1,"C":0}]]),
A("s74","sick","S","You're ill and they're too busy to reply. You:",[["They're busy, I'll wait",{"S":2}],["A bit hurt, but I understand",{"S":1}],["Feel ignored",{"S":0}],["Talk to them once I'm better",{"S":1,"C":1}]]),
A("s75","phone","S","They always keep their phone face down on the table. You:",[["No big deal, just a habit",{"S":2}],["Casually ask",{"S":1,"C":1}],["Start overthinking",{"S":0}],["Flip mine over too",{"S":0}]]),
A("s76","phone","C","They keep replying \"ok\" and \"mm\". You:",[["Ask, \"Are you tired?\"",{"C":2}],["Reply \"mm\" too",{"C":0}],["Try another topic",{"C":1}],["Message them again in a couple of days",{"C":1,"S":1}]]),
A("s77","photo","O","They suggest a couple's photo shoot. You:",[["Yes! That sounds lovely",{"O":2}],["Sure, something simple",{"O":1}],["Too embarrassing",{"O":0}],["Let me see other people's first",{"O":1}]]),
A("s78","photo","I","You took a great photo of them. You:",[["Send it right away",{"I":2}],["Keep it for myself",{"I":0}],["Post it without saying who",{"I":1}],["Ask if I can post it",{"I":1,"C":1}]]),
A("s79","music","S","They share a song whose lyrics sound like the two of you. You:",[["Feel all warm inside",{"S":2}],["Play it on repeat decoding it",{"S":1}],["Worry I'm reading too much into it",{"S":0}],["Ask what they meant",{"S":1,"C":2}]]),
A("s80","music","C","You don't like a song they recommended, and they ask what you think. You:",[["Say so, and send one of mine",{"C":2}],["Say \"It's nice\"",{"C":0}],["Say \"I liked one line\"",{"C":1}],["Reply in a few days",{"C":0}]]),
A("s81","wedding","O","At a friend's wedding you feel:",[["I want a day like this too",{"O":2}],["Moved, but in no hurry",{"O":1}],["It feels so far away for me",{"O":0}],["Sneak a glance at the person next to me",{"O":1,"I":1}]]),
A("s82","wedding","I","The bouquet toss. You:",[["Go for it",{"I":2}],["Stand nearby, whatever happens",{"I":1}],["Hide far away",{"I":0}],["Catch it for someone else",{"I":1}]]),
A("s83","wedding","S","Someone at the wedding asks when it's your turn. You:",[["Smile: \"When it happens!\"",{"S":2}],["It stings a little",{"S":1}],["Feel uncomfortable",{"S":0}],["Ask back, \"And you?\"",{"S":1,"C":1}]]),
A("s84","friend","C","A friend says your crush isn't very reliable. You:",[["Ask them why",{"C":2}],["Agree out loud, disagree inside",{"C":0}],["Watch for myself a bit longer",{"C":1}],["Talk to my crush about it",{"C":2,"I":1}]]),
A("s85","friend","O","A friend wants to set you up: \"Really nice, just a bit quiet.\" You:",[["Sure. Quiet has its charms",{"O":2}],["Add them online first",{"O":1}],["No, not interested",{"O":0}],["Ask my friend for more details",{"O":1,"C":1}]]),
A("s86","friend","I","At a group hangout they're sitting far from you. You:",[["Go and sit next to them",{"I":2}],["Make eyes across the room",{"I":1}],["Stay put",{"I":0}],["Text them",{"I":1,"C":1}]]),
A("s87","night","S","Late at night they suddenly text, \"You up?\" You:",[["Happy. Chat with them",{"S":2}],["Ask if something's on their mind",{"S":1,"C":1}],["Wonder if they're just bored",{"S":0}],["Read it, reply in the morning",{"S":1}]]),
A("s88","night","C","You can't sleep and want to talk to them. You:",[["Text, \"Can't sleep, keep me company?\"",{"C":2}],["Post something",{"C":0}],["Test the waters with \"You up?\"",{"C":1}],["Better not bother them",{"C":0,"S":1}]]),
A("s89","weekend","O","They suggest an exhibition you're totally not into. You:",[["Go. It might be interesting",{"O":2}],["Sure, my pick next time",{"O":1,"C":1}],["Say I'd rather rest at home",{"O":0}],["Go with them, but my mind wanders",{"O":1}]]),
A("s90","weekend","I","You want to stay in, they want to go out. You:",[["Suggest a middle ground",{"I":2,"C":1}],["Go along",{"I":0}],["Let them go alone",{"I":1}],["Make snacks and wait for them at home",{"I":1,"S":1}]]),
A("s91","weekend","S","They spent all weekend with friends and didn't message you. You:",[["Good, I have my own things going on",{"S":2}],["Ask in the evening how it went",{"S":1,"C":1}],["Feel a bit left out",{"S":0}],["Make plans with my friends too",{"S":1}]]),
A("s92","chatapp","C","They always take ages to reply. You:",[["Ask if they're busy",{"C":2}],["Take ages to reply too",{"C":0}],["Send a sticker and see",{"C":1}],["Say \"No need to rush\"",{"C":1,"S":1}]]),
A("s93","chatapp","O","Someone you just met adds you online with a very long intro. You:",[["Read it all and reply properly",{"O":2}],["Just say hi back",{"O":1}],["Don't accept",{"O":0}],["Look at their posts first",{"O":1,"S":1}]]),
A("s94","habit","I","You notice a habit of theirs that's very different from yours. You:",[["Talk to them about it",{"I":2,"C":1}],["Get used to it slowly",{"I":0}],["Try it their way",{"I":1,"O":1}],["Wait for them to notice mine",{"I":0}]]),
A("s95","habit","S","They say, \"We haven't been on a date in ages.\" You:",[["A helpful reminder. Good",{"S":2}],["Feel a bit guilty",{"S":1}],["Worry they're unhappy",{"S":0}],["Plan one right now",{"S":1,"I":2}]]),
A("s96","distance","C","Long-distance, you miss them. You:",[["Say it: \"I miss you so much\"",{"C":2}],["Send a photo of something that reminds me of them",{"C":1}],["Hold it in",{"C":0}],["Book a ticket to go see them",{"C":1,"I":2}]]),
A("s97","distance","O","Someone suggests trying long-distance. You:",[["Willing to try",{"O":2}],["Depends how far",{"O":1}],["Long-distance is too hard",{"O":0}],["Agree first on how often we'd meet",{"O":1,"C":1}]]),
A("s98","memory","I","It's one year since you met. You:",[["Plan something to mark it",{"I":2}],["Ask if they remember",{"I":1,"C":1}],["Wait for them to bring it up",{"I":0}],["Celebrate quietly on my own",{"I":0,"S":1}]]),
A("s99","memory","S","They forgot the day you first met. You:",[["That's OK, I remember",{"S":2}],["A little sad",{"S":1}],["Feel like they don't care",{"S":0}],["Remind them with a smile",{"S":1,"C":1}]]),
A("s100","memory","C","You scroll back through your old chats and want to say something. You:",[["Screenshot it: \"Remember this?\"",{"C":2}],["Read it all quietly",{"C":0}],["Send \"Suddenly missing you\"",{"C":1}],["Ask them to go back to that place with me",{"C":1,"I":1}]])
],funny:[
// O 7
A('f11','time','O','A time machine sends you back to high school. Your desk mate slides you a note. You:',[['Open it right away',{O:2}],['Hide it and read it at home',{O:1}],['Hand it back unopened',{O:0}],['Write an even longer one back',{O:2,I:2}]]),
A('f12','space','O','An alien says: "Earthling, please date me." You:',[['Deal! Let\'s see the face first',{O:2}],['Contract first',{O:1,S:1}],['Call the police',{O:0}],['Ask if they can cook',{O:1,C:1}]]),
A('f13','food','O','You fish a note saying "Destiny" out of the hot pot. You:',[['Romance is coming today for sure',{O:2}],['Take a photo as a keepsake',{O:1}],['This restaurant has hygiene issues',{O:0}],['Send it to my crush',{O:2,I:2}]]),
A('f14','ghost','O','A very handsome ghost asks to be your flatmate. You:',[['Fine, if the rent\'s halved',{O:2}],['Trial week first',{O:1}],['Move out tonight',{O:0}],['House rules first',{O:1,C:2}]]),
A('f15','magic','O','You find a "One-Day Butterflies Pass". You:',[['Use it immediately',{O:2}],['Save it for the right person',{O:1}],['Sell it',{O:0}],['Give it to my best friend',{O:0,C:1}]]),
A('f16','school','O','Love Academy sends you an acceptance letter. You:',[['Enrol tonight',{O:2}],['Check the timetable first',{O:1}],['Drop out',{O:0}],['Apply to be a TA',{O:1,I:1}]]),
A('f17','wish','O','A shooting star flies past. Your first thought:',[['A sweet romance, please',{O:2}],['Money, please',{O:0}],['Quick, take a photo',{O:1}],['A cat, please',{O:0,S:2}]]),
// I 7
A('f18','animal','I','Your dog brings home someone\'s business card. On the back: "Let\'s be friends." You:',[['Add them right away',{I:2}],['Look them up online first',{I:1}],['Bin it',{I:0}],['Send the dog back with mine',{I:1,C:1}]]),
A('f19','game','I','The Love Dungeon opens and asks you to pick a class. You:',[['Front-line warrior',{I:2}],['Support healer',{I:1}],['Mage hiding at the back',{I:0}],['Bard who talks a lot',{I:1,C:2}]]),
A('f20','delivery','I','Your crush\'s food delivery came to your door by mistake. You:',[['Deliver it myself',{I:2}],['Let the rider take it',{I:0}],['Deliver it with a little note',{I:2,C:2}],['Eat it for them',{I:1,S:0}]]),
A('f21','tech','I','Your phone suddenly has a "Confess in One Tap" button. You:',[['Tap!',{I:2}],['See if there\'s an undo first',{I:1}],['Uninstall',{I:0}],['Test it on myself first',{I:0,S:1}]]),
A('f22','trapped','I','You and your crush are stuck in an escape room. You:',[['Lead the hunt for clues',{I:2}],['Quietly pass them the props',{I:1}],['Solve it slowly on purpose',{I:1,O:2}],['Crouch in the corner and wait for rescue',{I:0}]]),
A('f23','space','I','At the Martian Matchmaking Fair you get 30 seconds on stage. You:',[['Rush up and talk',{I:2,C:2}],['Hold up a sign',{I:1}],['Watch from the crowd',{I:0}],['Pass a note to the host',{I:1}]]),
A('f24','school','I','PE teams. You want to be with that person. You:',[['Go over and say so',{I:2}],['Team up with their friends',{I:1}],['Leave it to fate',{I:0}],['Casually drift over',{I:1,C:0}]]),
// S 7
A('f25','animal','S','Your cat is cuddlier with other people than with you. You:',[['It\'s a cat. As long as it\'s happy',{S:2}],['Lie awake all night',{S:0}],['Have a serious talk with the cat',{S:1,C:2}],['Buy treats to win it back',{S:0,I:2}]]),
A('f26','ghost','S','Your partner has a contact saved as "Baby". It\'s their grandma. You:',[['I\'m dying',{S:2}],['Still need to double-check',{S:0}],['Say hi to Grandma too',{S:2,O:2}],['Rename myself "Baby Baby Baby"',{S:1,C:1}]]),
A('f27','forecast','S','Your horoscope says your love life is "turbulent" this week. You:',[['Don\'t believe it',{S:2}],['On edge all week',{S:0}],['Screenshot it to my partner',{S:1,C:2}],['Check a few more apps to compare',{S:0}]]),
A('f28','tech','S','Every game friend on your partner\'s list is the same person. You:',[['Probably their regular teammate',{S:2}],['Log on right now to check',{S:0}],['Ask, "Can I join?"',{S:1,C:2}],['Make a secret account and add them',{S:0,C:0}]]),
A('f29','magic','S','You get a mirror that shows what your partner is thinking. You:',[['Don\'t look. Keep the mystery',{S:2}],['Look every day',{S:0}],['Only during arguments',{S:1}],['Give the mirror to them',{S:1,O:2}]]),
A('f30','time','S','A fortune teller says your future partner will be "very ordinary". You:',[['Ordinary is nice',{S:2}],['Ask for a refund',{S:0}],['How ordinary, exactly?',{S:1,C:2}],['Quietly lower my expectations',{S:1,O:0}]]),
A('f31','food','S','Your partner gave the last piece of meat to someone else. You:',[['So polite of them',{S:2}],['Note it in my little book',{S:0}],['Smile: "Where\'s mine?"',{S:1,C:2}],['Order another plate',{S:2,I:1}]]),
// C 9
A('f32','late','C','Your stomach growls loudly on a date. You:',[['"It says it\'s dinner time"',{C:2}],['Pretend I didn\'t hear',{C:0}],['Cough to cover it',{C:1}],['Drag them off to eat',{C:1,I:2}]]),
A('f33','gods','C','Cupid asks for your ideal type in just three words. You:',[['Blurt them out',{C:2}],['Ask to write an essay instead',{C:1}],['"Whatever happens"',{C:0}],['"You decide"',{C:0,O:1}]]),
A('f34','trapped','C','Mid-date you step in gum and your shoe sticks. You:',[['Laugh and ask for help',{C:2}],['Secretly take the shoe off',{C:0}],['Turn it into a story',{C:2,O:1}],['Pretend to tie my laces',{C:1}]]),
A('f35','cupid','C','Cupid says he hit the wrong person and wants the arrow back. You:',[['Reason with him',{C:2}],['Quietly agree',{C:0}],['Ask who it was meant for',{C:1,O:2}],['Hide the arrow',{C:0,S:0}]]),
A('f36','delivery','C','Your partner brings you a dish you don\'t eat. You:',[['Say it: "I don\'t eat this"',{C:2}],['Force it down',{C:0}],['Say "Try this one next time"',{C:1}],['Secretly feed it to them',{C:1,I:1}]]),
A('f37','forecast','C','You\'re arguing and it starts to rain. You:',[['"See, even the sky wants us to make up"',{C:2,I:1}],['Open my umbrella and walk off',{C:0}],['Tilt the umbrella their way',{C:1,S:1}],['Post a moody late-night caption',{C:0}]]),
A('f38','game','C','Truth or dare, and you get truth. You:',[['Ask me anything',{C:2}],['I\'ll take the dare',{C:0,I:2}],['Answer in circles',{C:1}],['Turn the question back on the asker',{C:1}]]),
A('f39','wish','C','The genie says you must say your wish in front of your partner. You:',[['Say it loudly',{C:2}],['Whisper it',{C:1}],['Change my wish',{C:0}],['Ask the genie to say it for me',{C:0,I:0}]]),
A('f40','late','C','You accidentally sent your partner a message complaining about them. You:',[['Confess: "I was just moaning about you"',{C:2}],['Unsend it immediately',{C:0}],['Follow up with "Just kidding!"',{C:1}],['Might as well finish the rant',{C:2,I:2}]]),
// 扩充 f41+
A("f41","alien","O","Aliens come to pick one human to take home and date. They pick you. You:",[["So cool. Beam me up",{"O":2}],["Ask if their planet has bubble tea",{"O":1}],["No thanks, I'm an Earthling",{"O":0}],["Only if my cat comes too",{"O":1,"S":1}]]),
A("f42","alien","I","Aliens say confessing on their planet means doing a dance. You:",[["Dance on the spot",{"I":2}],["Let them dance first",{"I":0}],["Send a dance video",{"I":1}],["Teach them an Earth dance",{"I":1,"C":1}]]),
A("f43","alien","S","Your alien partner comes back to Earth once every 300 years. You:",[["No problem, I can wait",{"S":2}],["Then let's schedule video calls",{"S":1,"C":1}],["Who could stand 300 years?",{"S":0}],["I'll move to their planet",{"S":1,"O":2}]]),
A("f44","alien","C","The alien doesn't understand human words. You want to say you like them. You:",[["Draw them a heart",{"C":2}],["Cook a feast",{"C":1}],["Give up on talking",{"C":0}],["Find a translator",{"C":1,"O":1}]]),
A("f45","fairy","O","A fairy-tale frog says one kiss will turn him into a prince. You:",[["Sure, let's try",{"O":2}],["Ask why he became a frog first",{"O":1,"C":1}],["No kiss. Frogs are fine",{"O":0}],["Let someone else try first",{"O":0}]]),
A("f46","fairy","I","You're the only one awake in Sleeping Beauty's castle. You:",[["Go wake the prince",{"I":2}],["Explore the castle",{"I":1,"O":1}],["Lie down for a nap too",{"I":0}],["Put a notice on the door",{"I":1}]]),
A("f47","fairy","S","The magic mirror says you're not the fairest of them all. You:",[["Don't care, I'm happy",{"S":2}],["Then who's number one?",{"S":1}],["A little hurt",{"S":0}],["Turn the mirror around",{"S":1}]]),
A("f48","fairy","C","Your fairy godmother asks what you need for the ball. You:",[["Tell her exactly",{"C":2}],["\"Whatever you think\"",{"C":0}],["Comfy shoes, please",{"C":1}],["Ask if I can bring a friend",{"C":1,"O":1}]]),
A("f49","weather","O","The forecast says tomorrow brings \"love rain\". Get caught in it and you'll fall for someone. You:",[["Run out and get soaked",{"O":2}],["Take an umbrella",{"O":1}],["Stay in with the windows shut",{"O":0}],["Drag my crush out into it with me",{"O":2,"I":2}]]),
A("f50","weather","I","A cloud follows you around all day. You:",[["Say hello",{"I":2}],["Pretend not to notice",{"I":0}],["Take a photo and post it",{"I":1}],["Ask where it's going",{"I":1,"C":1}]]),
A("f51","weather","S","A rainbow appears. It only works if you watch it with your crush, but they're busy. You:",[["Watching alone is lovely too",{"S":2}],["Snap a photo and send it",{"S":1,"C":1}],["A bit of a shame",{"S":1}],["Feels like a bad sign",{"S":0}]]),
A("f52","weather","C","Your mood shows up as weather over your head. Right now it's:",[["Sunny, I'll say anything",{"C":2}],["Cloudy, hard to say",{"C":1}],["Drizzle, don't want to talk",{"C":0}],["Thunder, about to speak",{"C":2,"I":1}]]),
A("f53","kitchen","O","An egg in the fridge asks if you'll date it. You:",[["Sure. How would you like to be cooked?",{"O":2}],["Cool down a bit first",{"O":1}],["Close the fridge",{"O":0}],["Ask the milk for its opinion",{"O":1,"C":1}]]),
A("f54","kitchen","I","You cooked for your crush and burned it. You:",[["Serve it anyway",{"I":2}],["Secretly start again",{"I":1}],["Pass off takeaway as mine",{"I":0}],["\"It's a new recipe\"",{"I":1,"C":1}]]),
A("f55","kitchen","S","Your rice cooker starts giving you life lectures. You:",[["Listen carefully",{"S":2}],["Argue back",{"S":1,"C":1}],["It kind of has a point",{"S":0}],["Unplug it",{"S":0}]]),
A("f56","kitchen","C","You and your partner both want the last piece of meat. You:",[["Say it: \"I want it\"",{"C":2}],["Pretend I don't",{"C":0}],["Half each",{"C":1}],["Give them a look",{"C":1}]]),
A("f57","library","O","A library book keeps falling open on a love poem. You:",[["Read it out loud",{"O":2}],["Take a photo of it",{"O":1}],["Close it and walk away",{"O":0}],["Find out who wrote it",{"O":1,"I":1}]]),
A("f58","library","I","Your crush is sitting across from you in the library. You:",[["Pass them a note",{"I":2}],["Pretend to read and sneak glances",{"I":0}],["Move to sit next to them",{"I":2}],["Smile when they look up",{"I":1}]]),
A("f59","library","S","A stranger's love letter is tucked in your library book. You:",[["So romantic. Put it back",{"S":2}],["Read it, too curious",{"S":1,"O":1}],["Feel a bit uneasy",{"S":0}],["Help find who it's for",{"S":1,"I":1}]]),
A("f60","library","C","The library only allows notes. You want to ask them to dinner. You:",[["Write \"Dinner together?\"",{"C":2}],["Draw a bowl",{"C":1}],["Write it, then tear it up",{"C":0}],["Pass them a sweet",{"C":1}]]),
A("f61","superpower","O","You can suddenly hear people's thoughts. You:",[["Curious, let's try",{"O":2}],["Only my crush's",{"O":1}],["Switch it off now",{"O":0}],["Tell them about my power first",{"O":1,"C":2}]]),
A("f62","superpower","I","You can turn invisible for a day. You:",[["Walk alongside my crush for a while",{"I":1}],["Appear in front of them for a fright",{"I":2}],["Sleep at home",{"I":0}],["Get a free meal somewhere",{"I":1}]]),
A("f63","superpower","S","You can see everyone's \"like meter\". Theirs is low. You:",[["That's OK, slowly does it",{"S":2}],["A little sad",{"S":1}],["Give up",{"S":0}],["Ask what would raise it",{"S":1,"C":2}]]),
A("f64","superpower","C","You can read minds, but you have to tell the truth first. You:",[["I'll go first then",{"C":2}],["Not worth it",{"C":0}],["Tell half",{"C":1}],["Write it down for them",{"C":1}]]),
A("f65","ocean","O","You find a message in a bottle on the beach. You:",[["Open it",{"O":2}],["Put it back in the sea",{"O":0}],["Write a reply and throw it back",{"O":2,"I":1}],["Dry it off first",{"O":1}]]),
A("f66","ocean","I","A mermaid offers a date in exchange for your voice. You:",[["Deal",{"I":2,"O":1}],["Haggle",{"I":1,"C":1}],["No deal",{"I":0}],["Can I pay in instalments?",{"I":1}]]),
A("f67","ocean","S","The waves wash away the names you wrote in the sand. You:",[["Write them again",{"S":2}],["I took a photo already",{"S":1}],["Feels like a bad sign",{"S":0}],["Write them further up the beach",{"S":1}]]),
A("f68","ocean","C","A dolphin asks who you like. You:",[["Tell it straight",{"C":2}],["Shh, don't tell anyone",{"C":1}],["Pretend not to understand",{"C":0}],["Ask who it likes",{"C":1}]]),
A("f69","robot","O","Your robot vacuum falls in love with you. You:",[["So cute, I say yes",{"O":2}],["Finish the floors first",{"O":1}],["Reset it",{"O":0}],["Introduce it to another robot",{"O":1,"C":1}]]),
A("f70","robot","I","Your AI partner writes you a poem every day. You:",[["Write one back",{"I":2}],["Just give it a like",{"I":1}],["Secretly save them all",{"I":0}],["Ask for shorter ones",{"I":1,"C":2}]]),
A("f71","robot","S","Your robot partner needs an update and might forget you. You:",[["That's OK, we'll meet again",{"S":2}],["Back up the memories first",{"S":1}],["So scared",{"S":0}],["No update allowed",{"S":0}]]),
A("f72","robot","C","Your robot partner only understands direct sentences. You:",[["Perfect, I'll say it straight",{"C":2}],["Learn slowly",{"C":1}],["Too hard",{"C":0}],["Write it in code",{"C":1}]]),
A("f73","zoo","O","The zoo panda lets only one person pet it, and it picks you. You:",[["Pet it happily",{"O":2}],["Nervous, but pet it",{"O":1}],["Let someone else",{"O":0}],["Ask the keeper first",{"O":1,"C":1}]]),
A("f74","zoo","I","At the zoo a monkey steals your hat. You:",[["Chase it",{"I":2}],["Send my partner after it",{"I":0}],["Negotiate with the monkey",{"I":1,"C":1}],["Film it and post it",{"I":1}]]),
A("f75","zoo","S","A peacock fans its tail at your partner. You:",[["Ha, so cute",{"S":2}],["A little jealous",{"S":1}],["Grab my partner and leave",{"S":0}],["Fan mine out too",{"S":1,"I":1}]]),
A("f76","zoo","C","A giraffe won't let you leave until you say something from the heart. You:",[["Say it loudly",{"C":2}],["Whisper it",{"C":1}],["Climb over the fence",{"C":0}],["Make the giraffe go first",{"C":1}]]),
A("f77","dream","O","You dreamed your crush confessed to you. When you wake up you:",[["Take it as a good sign",{"O":2}],["Tell them I dreamed about them",{"O":1,"C":2}],["It's not real",{"O":0}],["Go back to sleep",{"O":1}]]),
A("f78","dream","I","You can enter someone's dream once. You:",[["Pop into my crush's dream to say hi",{"I":2}],["Visit my own",{"I":0}],["Just wander",{"I":1,"O":1}],["Ask what they'd like to dream about",{"I":1,"C":1}]]),
A("f79","dream","S","In the dream they were cold to you. You wake up:",[["It was just a dream",{"S":2}],["A bit upset",{"S":1}],["Thinking about it all day",{"S":0}],["Ask them how their day is",{"S":1,"C":1}]]),
A("f80","dream","C","In the dream you must say your crush's name to wake up. You:",[["Say it",{"C":2}],["Say a fake name",{"C":0}],["Tell half",{"C":1}],["Stay asleep",{"C":0,"S":1}]]),
A("f81","bus","O","Someone on the bus gives up their seat and smiles at you. You:",[["Smile, say thanks, chat a bit",{"O":2}],["Just say thanks",{"O":1}],["Feel a bit wary",{"O":0}],["Ask where they're getting off",{"O":1,"I":1}]]),
A("f82","bus","I","You spot your crush on a crowded bus. You:",[["Squeeze over",{"I":2}],["Text \"Turn around\"",{"I":1}],["Wait till they get off",{"I":0}],["Stage a \"chance\" meeting",{"I":1}]]),
A("f83","bus","S","You missed your stop and your partner offers to come and get you. You:",[["Yes, I'll wait",{"S":2}],["No need, I'll walk",{"S":1}],["Worry about bothering them",{"S":0}],["Meet halfway and walk together",{"S":1,"I":1}]]),
A("f84","bus","C","You fell asleep on a stranger's shoulder on the bus. When you wake you:",[["Apologise and say thank you",{"C":2}],["Pretend it never happened",{"C":0}],["Get off with a red face",{"C":1}],["Ask if their shoulder's sore",{"C":1}]]),
A("f85","market","O","The lady at the farmers' market says you obviously have a partner. You:",[["Laugh: \"From your lips!\"",{"O":2}],["Say not yet",{"O":1}],["Pay and leave",{"O":0}],["Ask her to set me up",{"O":2,"I":2}]]),
A("f86","market","I","You're haggling at the market and the seller is your crush. You:",[["Haggle hard",{"I":2}],["Pay full price",{"I":0}],["Let them name the price",{"I":1}],["Give them a bunch of herbs",{"I":1}]]),
A("f87","market","S","The stallholder gives you a spring onion: \"For luck in love.\" You:",[["Take it happily",{"S":2}],["A bit suspicious",{"S":1}],["Feel seen",{"S":0}],["Give her something back",{"S":1}]]),
A("f88","market","C","Someone grabs the watermelon you wanted. You:",[["Ask if we can split it",{"C":2}],["Walk away quietly",{"C":0}],["Ask the seller if there's another",{"C":1}],["Reason with them",{"C":1}]]),
A("f89","snow","O","The snowman you built suddenly starts talking. You:",[["Chat with it",{"O":2}],["Film it first",{"O":1}],["Run",{"O":0}],["Give it a scarf",{"O":1,"S":1}]]),
A("f90","snow","I","You want to write their name in the snow. You:",[["Write it big",{"I":2}],["Just the initials",{"I":1}],["Write it, then stamp it out",{"I":0}],["Photograph it and send it to them",{"I":1,"C":1}]]),
A("f91","snow","S","Your snowman melted the next day. You:",[["I'll build another next year",{"S":2}],["Sad to see it go",{"S":1}],["Really sad",{"S":0}],["I took a photo, it's fine",{"S":1}]]),
A("f92","snow","C","In a snowball fight you hit your crush by accident. You:",[["Apologise and brush the snow off",{"C":2}],["Run for it",{"C":0}],["Throw another",{"C":1,"I":1}],["Blame someone else",{"C":0}]]),
A("f93","cat","O","A cat leaves a little fish on your doorstep every day. You:",[["Accept it and study the cat",{"O":2}],["Take a photo and post it",{"O":1}],["Bit creepy",{"O":0}],["Invite it in",{"O":2,"I":1}]]),
A("f94","cat","I","You want to pet an aloof cat. You:",[["Reach out slowly",{"I":1}],["Scoop it up",{"I":2}],["Wait for it to come to me",{"I":0}],["Lure it with treats",{"I":1}]]),
A("f95","cat","S","The cat ignores you but adores your partner. You:",[["Great, one happy family",{"S":2}],["A little jealous",{"S":1}],["Feel unloved",{"S":0}],["Buy better treats",{"S":1,"I":1}]]),
A("f96","cat","C","You chat with the cat and it says your partner has something on their mind. You:",[["Go and ask my partner",{"C":2}],["Puzzle over it myself",{"C":1}],["Pretend I didn't hear",{"C":0}],["Ask the cat what it is first",{"C":1}]]),
A("f97","mirror","O","Your reflection winks and asks to swap shifts for a day. You:",[["Sure, you go to work today",{"O":2}],["Let's negotiate terms",{"O":1,"C":1}],["Cover the mirror right now",{"O":0}],["Send it on my date instead",{"O":1,"I":1}]]),
A("f98","elevator","I","The lift stops for ten seconds with just you and your crush inside. You:",[["Use the moment to chat",{"I":2}],["Stare at the floor numbers",{"I":0}],["Pretend to take a call",{"I":0,"C":0}],["Offer them a sweet",{"I":1}]]),
A("f99","umbrella","S","Your umbrella pops open whenever you're jealous. It just opened. You:",[["Close it. No big deal",{"S":2}],["Admit it with a smile",{"S":1,"C":1}],["Leave it open",{"S":0}],["Get an umbrella that won't open",{"S":0}]]),
A("f100","map","C","The satnav says: \"In 500 metres, tell them how you really feel.\" You:",[["Do it",{"C":2}],["Take another road",{"C":0}],["Turn the volume down",{"C":1}],["Switch it off",{"C":0}]])
]};
var BANK={};
['serious','funny'].forEach(function(m){
  var base=(window.QUIZ&&window.QUIZ[m].questions)||[];
  BANK[m]=OLD[m].map(function(t,i){var q=base[i];return {id:t[0],g:t[1],d:t[2],q:q.q,opts:q.opts}}).concat(NEW[m]);
});
var QUOTA=[[3,3,2,2],[2,3,3,2],[2,2,3,3],[3,2,2,3]],DIMS=['O','I','S','C'],RING=100;
function key(m){return 'lc-seen-'+m}
function loadSeen(m,st){try{var v=JSON.parse(st.getItem(key(m))||'{}');return {ids:v.ids||[],n:v.n||0}}catch(e){return {ids:[],n:0}}}
function saveSeen(m,s,st){try{st.setItem(key(m),JSON.stringify(s))}catch(e){}}
function shuffle(a,r){for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
// 纯函数：seen=最近题目id（旧→新），play=局数；返回10题
var PATS=[[3,3,2,2],[3,2,3,2],[3,2,2,3],[2,3,3,2],[2,3,2,3],[2,2,3,3]];
// 纯函数：seen=最近题目id（旧→新），play=局数；返回10题
// 规则：每维2–3题（默认按 QUOTA 轮换，新题不够时换配比）；同场景组每局≤1；优先没见过的题，其次最久前见过的；
// 新题里优先抽「剩余新题最多的场景组」，让后面几局仍有足够多不同场景组。
function draw(m,seen,play,r){r=r||Math.random;var bank=BANK[m],rank={},left={};
  seen.forEach(function(id,i){rank[id]=i});
  bank.forEach(function(x){if(!(x.id in rank))left[x.g]=(left[x.g]||0)+1});
  var pref=QUOTA[play%4],best=null,bs=1e9;
  var pats=[pref].concat(PATS.filter(function(p){return p.join()!==pref.join()}));
  for(var pi=0;pi<pats.length&&bs>0;pi++)for(var t=0;t<8&&bs>0;t++){var q=pats[pi],out=[],groups={},rep=0,gd=0;
    shuffle([0,1,2,3],r).forEach(function(k){var d=DIMS[k],need=q[k],c=shuffle(bank.filter(function(x){return x.d===d}),r);
      var fresh=c.filter(function(x){return !(x.id in rank)}).sort(function(a,b){return left[b.g]-left[a.g]+(r()-.5)*(t?1.5:0)}),
          old=c.filter(function(x){return x.id in rank}).sort(function(a,b){return rank[a.id]-rank[b.id]});
      [fresh,old,fresh,old].forEach(function(L,pass){for(var i=0;i<L.length&&need>0;i++){var x=L[i];
        if(out.indexOf(x)>=0||(pass<2&&groups[x.g]))continue;if(groups[x.g])gd++;if(x.id in rank)rep++;groups[x.g]=1;out.push(x);need--}})});
    var sc=gd*1000+rep*10+(pi?1:0);if(sc<bs){bs=sc;best=out}}
  return shuffle(best,r)}
function next(m){var st=null;try{st=window.localStorage;st.setItem('lc-t','1')}catch(e){st=null}
  var s=st?loadSeen(m,st):(window.__lqMem=window.__lqMem||{})[m]||{ids:[],n:0};
  var qs=draw(m,s.ids,s.n);s.ids=s.ids.concat(qs.map(function(x){return x.id})).slice(-RING);s.n++;
  if(st)saveSeen(m,s,st);else window.__lqMem[m]=s;return qs}
window.BANK=BANK;window.DIMLBL=DIM;window.drawQuiz=draw;window.nextQuiz=next;
})();
