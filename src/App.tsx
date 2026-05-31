import { useState, useEffect } from 'react';
import { Heart, Cake, Copy, Download, Sparkles, Mail, MessageCircle, ChevronDown, X, CheckCircle2 } from 'lucide-react';

type Relationship = 'crush' | 'girlfriend';
type WishType = 'romantic' | 'cute' | 'emotional' | 'flirty' | 'poetic';
type LetterType = 'short' | 'long' | 'good_morning';

const relationshipOptions = [
  { value: 'crush', label: 'Crush', emoji: '💘' },
  { value: 'girlfriend', label: 'Girlfriend', emoji: '❤️' },
];

const wishTypes: { value: WishType; label: string; description: string }[] = [
  { value: 'romantic', label: 'Romantic', description: 'Deep and passionate' },
  { value: 'cute', label: 'Cute', description: 'Sweet and adorable' },
  { value: 'emotional', label: 'Deep Emotional', description: 'Heartfelt and touching' },
  { value: 'flirty', label: 'Flirty', description: 'Playful and charming' },
  { value: 'poetic', label: 'Poetic', description: 'Lyrical and artistic' },
];

const letterTypes: { value: LetterType; label: string; description: string }[] = [
  { value: 'short', label: 'Short Letter', description: 'Quick and sweet' },
  { value: 'long', label: 'Long Letter', description: 'Deep and detailed' },
  { value: 'good_morning', label: 'Good Morning Birthday Letter', description: 'Start her special day right' },
];

const wishTemplates: Record<WishType, Record<Relationship, string[]>> = {
  romantic: {
    crush: [
      "Happy Birthday to the girl who makes my heart skip a beat every time she walks into the room. May your special day be as enchanting as your smile.",
      "On your birthday, I want you to know that you're the most beautiful chapter of my life that hasn't been written yet. Happy Birthday, stunning.",
      "Every moment with you feels like a beautiful dream I never want to wake up from. Happy Birthday to the girl who stole my heart without even trying.",
    ],
    girlfriend: [
      "Happy Birthday to the love of my life. Every day with you is a gift, and today we celebrate the day the world was blessed with you. I love you more than words can say.",
      "On your birthday, I want to remind you that you're the best thing that's ever happened to me. You make my world brighter, my heart fuller, and my life complete.",
      "Happy Birthday, my beautiful angel. You've taught me what true love feels like, and I promise to spend every day making you feel as special as you make me feel.",
    ],
  },
  cute: {
    crush: [
      "Happy Birthday to the cutest girl I know! May your day be filled with as much sweetness as you bring into the world.",
      "If I could give you one thing for your birthday, it would be the ability to see yourself through my eyes. You're absolutely adorable! Happy Birthday!",
      "Happy Birthday! You know that thing you do when you smile? Yeah, that's my favorite thing in the whole world.",
    ],
    girlfriend: [
      "Happy Birthday, my little ray of sunshine! You make every day brighter just by being you, and I'm so lucky you're mine.",
      "To the girl with the cutest laugh and the biggest heart - Happy Birthday! I promise to keep protecting that beautiful smile of yours.",
      "Happy Birthday, cupcake! You're sweet, adorable, and I want to keep you forever. Just like a cupcake, but better!",
    ],
  },
  emotional: {
    crush: [
      "Happy Birthday. In a world full of noise, you're the melody I can't get out of my head. You've touched my soul in ways I never thought possible.",
      "On your birthday, I want you to know that knowing you has changed me. You've opened my heart to feelings I didn't know existed. Happy Birthday, beautiful soul.",
      "Happy Birthday to the person who made me believe in magic again. Your presence in my life is a gift I cherish every day, and I hope one day I can tell you this in person.",
    ],
    girlfriend: [
      "Happy Birthday, my soulmate. Before you, I never knew someone could understand me so completely. You're my best friend, my lover, and my home all in one.",
      "On the day you were born, the world became more beautiful. Happy Birthday to the woman who made me believe in forever. My heart is forever yours.",
      "Happy Birthday, my love. You've seen me at my worst and loved me through it all. I promise to spend every day showing you how much you mean to me.",
    ],
  },
  flirty: {
    crush: [
      "Happy Birthday! I was going to get you a card, but then I realized they don't make any that say 'Happy Birthday to the girl I'm absolutely crazy about'.",
      "Happy Birthday to the girl who's been running through my mind all day... just like every other day. Wait, did I say that out loud?",
      "Happy Birthday! You know, age is just a number... and in your case, a very attractive number. Hope your day is as stunning as you are!",
    ],
    girlfriend: [
      "Happy Birthday, gorgeous! I got you the perfect gift - me in a bow. Well, not literally, but I'm pretty sure I'm your favorite present anyway.",
      "Happy Birthday to the woman who makes me forget every pickup line I've ever known because you leave me completely speechless. That's your superpower.",
      "Happy Birthday, babe! You should be illegal - that much beauty and charm in one person? Not fair to the rest of the world. All mine though!",
    ],
  },
  poetic: {
    crush: [
      "Like the dawn breaking through the night, your smile illuminates my world. Happy Birthday to the poetry my heart writes but my lips cannot speak.",
      "In the garden of my dreams, you are the rose that blooms eternal. Happy Birthday, enchanting one. May your day be as beautiful as you are to me.",
      "Happy Birthday. You are the verse I long to write, the song I yearn to sing, the poetry my soul aches to speak aloud.",
    ],
    girlfriend: [
      "In your eyes, I see galaxies of love. In your heart, I find my universe. Happy Birthday, my eternal muse, my forever verse, my poetry come to life.",
      "You are the stanza that completes my poem, the chorus that makes my heart sing. Happy Birthday, my love, my art, my everything poetic.",
      "Like a sonnet written in the stars, our love story unfolds. Happy Birthday to the one who makes every moment poetry in motion.",
    ],
  },
};

const letterTemplates: Record<LetterType, Record<Relationship, string[]>> = {
  short: {
    crush: [
      "Dear [Name],\n\nOn your special day, I want you to know how much you mean to me. Every time I see you, my world brightens a little more. You have this incredible ability to make everything feel magical.\n\nHappy Birthday! May all your dreams come true, and may this year bring you all the happiness you deserve.\n\nWith all my heart,\n[Your Secret Admirer]",
      "To the beautiful [Name],\n\nHappy Birthday! I've wanted to tell you this for so long - you are the most amazing person I've ever met. Your smile lights up every room, and your kindness touches everyone around you.\n\nI hope your birthday is as special as you are to me. Remember, you're loved more than you know.\n\nAlways thinking of you,\nSomeone who cares deeply",
    ],
    girlfriend: [
      "My Dearest [Name],\n\nHappy Birthday, my love! Today marks another year of having you in my life, and I can't tell you how grateful I am for that. You've made my life beautiful in ways I never imagined.\n\nYou're my best friend, my biggest supporter, and the love of my life. I promise to make every birthday more special than the last.\n\nForever yours,\nWith all my love",
    ],
  },
  long: {
    crush: [
      "My Dearest [Name],\n\nAs another year passes and you celebrate another birthday, I find myself reflecting on all the moments that have made me fall deeper for you. Every smile you've shared, every laugh we've exchanged, every moment you've been near - they've all etched themselves into my heart.\n\nYou may not know this, but you've changed my life in ways you can't imagine. Your kindness radiates like sunshine, and your presence makes everything better. I've watched you from afar, admiring not just your beauty, but your strength, your intelligence, and the way you light up every room you enter.\n\nOn this special day, I want you to know that someone out there thinks you're absolutely incredible. You deserve all the happiness in the world, all the success you dream of, and a love as genuine as your heart.\n\nHappy Birthday, beautiful. May this year bring you everything you've ever wanted and more. And maybe, just maybe, one day I'll have the courage to tell you all this in person.\n\nWith hopes and dreams,\nYour Secret Admirer",
    ],
    girlfriend: [
      "My Beloved [Name],\n\nHappy Birthday, my love! Today, as we celebrate the day you came into this world, I'm overwhelmed with gratitude that you came into my life. Every moment with you has been a gift.\n\nFrom the first time I saw you, I knew there was something special about you. But I never imagined just how much you would come to mean to me. You've become my best friend, my confidante, my biggest supporter, and my greatest love. With you, I've found a happiness I never knew existed.\n\nYour laughter is the soundtrack of my days, your smile the sunshine that brightens my darkest moments. You've taught me what true love feels like - it's patient, kind, supportive, and unwavering. And that's exactly how I promise to love you, every single day for the rest of our lives.\n\nOn your birthday, I want to make you a promise: to cherish every moment we share, to support your dreams as fiercely as you support mine, to hold your hand through every storm, and to love you more with each passing year. You are my forever, and I thank God every day for bringing you into my life.\n\nHappy Birthday, my beautiful angel. Here's to many more birthdays together, growing old, and loving each other more with every candle you blow out.\n\nEternally yours,\nWith all my heart, now and always",
    ],
  },
  good_morning: {
    crush: [
      "Good Morning, Beautiful [Name],\n\nAs the first rays of sunlight touch the world on your birthday morning, I want you to know that you're the first thought in my mind. Happy Birthday!\n\nWake up and smile, because today the world celebrates YOU. May this morning be the beginning of the most wonderful day. You deserve to be treated like the queen you are.\n\nFrom the moment you open your eyes until you close them tonight, I hope every moment feels special. This is YOUR day, and the universe is smiling down on you.\n\nGood morning, sunshine. Make today unforgettable!\n\nWith morning wishes,\nSomeone who thinks you're amazing",
    ],
    girlfriend: [
      "Good Morning, My Love [Name],\n\nHappy Birthday, beautiful! I hope these are the first words you read this morning because you're the first thought in my heart.\n\nAs you wake up on this special day, I want you to know that you've made my life something beautiful. Every morning I wake up grateful that you're in my life, and today, I'm especially grateful that the world was blessed with you.\n\nLet's make this day magical. I have so many surprises planned, but the biggest one is this: my love for you grows stronger every single day. You are my morning sunshine, my midnight stars, and everything in between.\n\nOpen your eyes, beautiful. Your special day awaits, and I promise to make it as wonderful as you make every day for me.\n\nGood morning, birthday girl. I love you!\n\nForever yours,\nYour loving partner",
    ],
  },
};

export default function App() {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<Relationship>('crush');
  const [activeSection, setActiveSection] = useState<'wishes' | 'letters'>('wishes');
  const [selectedWishType, setSelectedWishType] = useState<WishType>('romantic');
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType>('short');
  const [generatedContent, setGeneratedContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateWish = async () => {
    if (!name.trim()) return;

    setIsGenerating(true);
    const templates = wishTemplates[selectedWishType][relationship];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

    setTimeout(() => {
      setGeneratedContent(randomTemplate);
      setShowPreview(true);
      setIsGenerating(false);
    }, 800);
  };

  const generateLetter = async () => {
    if (!name.trim()) return;

    setIsGenerating(true);
    const templates = letterTemplates[selectedLetterType][relationship];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

    const personalized = randomTemplate.replace(/\[Name\]/g, name);

    setTimeout(() => {
      setGeneratedContent(personalized);
      setShowPreview(true);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(generatedContent);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const downloadCard = async () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Birthday Wish for ${name}</title>
  <style>
    body {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: white;
      max-width: 500px;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      text-align: center;
    }
    .header {
      font-size: 32px;
      margin-bottom: 20px;
      color: #e11d48;
    }
    .content {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      white-space: pre-wrap;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      color: #e11d48;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">Happy Birthday!</div>
    <div class="content">${generatedContent}</div>
    <div class="footer">Made with love</div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday-wish-${name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            <Heart
              size={20 + Math.random() * 30}
              fill={Math.random() > 0.5 ? 'currentColor' : 'none'}
              style={{
                opacity: 0.1 + Math.random() * 0.2,
                color: `rgb(${200 + Math.random() * 55}, ${50 + Math.random() * 50}, ${80 + Math.random() * 50})`
              }}
            />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-8 animate-pulse-soft">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">AI-Powered Wishes</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
            Romantic Birthday Wishes AI
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create heartfelt, personalized birthday wishes and love letters that will make her heart melt
          </p>

          <ChevronDown className="w-8 h-8 mx-auto text-rose-400 animate-bounce" />
        </div>

        {/* Decorative Cake */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-10">
          <Cake size={200} className="text-rose-400" />
        </div>
      </section>

      {/* Input Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-rose-100">
            <div className="space-y-8">
              {/* Name Input */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Who is this special wish for?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter her name..."
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-rose-50/50"
                />
              </div>

              {/* Relationship Selector */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Your relationship
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRelationship(option.value as Relationship)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        relationship === option.value
                          ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-lg scale-105'
                          : 'border-rose-200 hover:border-rose-300 text-gray-700'
                      }`}
                    >
                      <span className="text-3xl mb-2 block">{option.emoji}</span>
                      <span className="font-medium text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Tabs */}
              <div className="flex rounded-2xl bg-rose-100 p-1">
                <button
                  onClick={() => setActiveSection('wishes')}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === 'wishes'
                      ? 'bg-white text-rose-700 shadow-md'
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <Heart className="w-5 h-5 inline-block mr-2" />
                  Birthday Wishes
                </button>
                <button
                  onClick={() => setActiveSection('letters')}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === 'letters'
                      ? 'bg-white text-rose-700 shadow-md'
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <Mail className="w-5 h-5 inline-block mr-2" />
                  Love Letters
                </button>
              </div>

              {/* Wish Types */}
              {activeSection === 'wishes' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {wishTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedWishType(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedWishType === type.value
                          ? 'border-rose-500 bg-rose-50 shadow-md'
                          : 'border-rose-200 hover:border-rose-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{type.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Letter Types */}
              {activeSection === 'letters' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {letterTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedLetterType(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedLetterType === type.value
                          ? 'border-rose-500 bg-rose-50 shadow-md'
                          : 'border-rose-200 hover:border-rose-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{type.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={activeSection === 'wishes' ? generateWish : generateLetter}
                disabled={!name.trim() || isGenerating}
                className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 ${
                  name.trim() && !isGenerating
                    ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Magic...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate {activeSection === 'wishes' ? 'Wish' : 'Letter'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {showPreview && generatedContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative" id="card-preview">
              <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-rose-200">
                {/* Close Button */}
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>

                {/* Animated Hearts */}
                <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-rose-500 animate-float-down"
                      style={{ animationDelay: `${i * 0.3}s` }}
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Card Content */}
                <div className="text-center mt-8">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-100 mb-6">
                    <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
                    <span className="text-rose-700 font-semibold text-xl">Happy Birthday, {name}!</span>
                    <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-inner mb-8">
                    <p className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed">
                      {generatedContent}
                    </p>
                  </div>

                  {/* Share Actions */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copy Text
                        </>
                      )}
                    </button>

                    <button
                      onClick={shareViaWhatsApp}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </button>

                    <button
                      onClick={downloadCard}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Download Card
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-rose-400 font-medium">
                  Made with love
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Create the Perfect Birthday Message
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-rose-500 mb-6" fill="currentColor" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Heartfelt Wishes</h3>
              <p className="text-gray-600">
                Choose from romantic, cute, emotional, flirty, or poetic styles to match your feelings perfectly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-shadow">
              <Mail className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Love Letters</h3>
              <p className="text-gray-600">
                Express deeper emotions with personalized letters for different moods and moments.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-shadow">
              <Download className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Sharing</h3>
              <p className="text-gray-600">
                Copy, share via WhatsApp, or download a beautiful birthday card instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6" fill="currentColor" />
          <span className="text-xl font-semibold">Romantic Birthday Wishes AI</span>
          <Heart className="w-6 h-6" fill="currentColor" />
        </div>
        <p className="text-rose-100">Made with love to spread love and happiness</p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes float-down {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(10px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-down {
          animation: float-down 3s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}