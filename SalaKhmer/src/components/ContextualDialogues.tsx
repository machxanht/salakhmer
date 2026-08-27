import { MessageCircle, Volume2, MapPin, Utensils } from "lucide-react";

const DIALOGUES = [
  {
    id: "tuktuk",
    context: "Taking a tuk-tuk",
    icon: MapPin,
    phrases: [
      {
        khmer: "ទៅផ្សារធំថ្មីថ្លៃប៉ុន្មាន?",
        english: "How much is it to Phnom Penh Central Market?",
        latin: "To phsar thum thmei thlai ponman?",
      },
    ],
  },
  {
    id: "eating",
    context: "Eating at a restaurant",
    icon: Utensils,
    phrases: [
      {
        khmer: "សូមគិតលុយ ទឹកមួយដប",
        english: "The bill, please, and one bottle of water.",
        latin: "Som kit luy, teuk mouy dop",
      },
    ],
  },
];

export function ContextualDialogues() {
  const playAudio = (text: string) => {
    alert(`Play audio for: ${text}`);
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="bg-royal/10 border border-royal/20 rounded-2xl p-4">
        <h3 className="font-extrabold text-royal flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Contextual Dialogues
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Learn practical phrases for specific everyday situations in Cambodia.
        </p>
      </div>

      {DIALOGUES.map((dialogue) => {
        const Icon = dialogue.icon;
        return (
          <div key={dialogue.id} className="card-flat overflow-hidden">
            <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-royal text-white flex items-center justify-center">
                <Icon className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-foreground">Situation: {dialogue.context}</h4>
            </div>

            <div className="p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay">
              {dialogue.phrases.map((phrase, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="shrink-0 pt-1">
                    <div className="h-8 w-8 rounded-full bg-border flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tl-sm relative shadow-sm">
                      <p className="khmer text-lg leading-loose">{phrase.khmer}</p>
                      <button
                        onClick={() => playAudio(phrase.khmer)}
                        className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="bg-card border border-border p-3 rounded-2xl rounded-bl-sm ml-4 shadow-sm text-sm">
                      <p className="font-bold text-foreground mb-1">{phrase.english}</p>
                      <p className="text-muted-foreground italic font-mono text-xs">
                        🗣️ {phrase.latin}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
