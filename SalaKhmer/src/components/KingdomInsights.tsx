import { Compass, BookOpen, Banknote, ExternalLink, Heart, Users } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

const EXPANDED_INSIGHT_VI: Record<string, { title: string; subtitle: string; content: string }> = {
  "ride-apps": { title: "Ứng dụng gọi xe và địa chỉ", subtitle: "Giúp tài xế đón bạn dễ hơn", content: "Đặt điểm đón ở nơi tài xế có thể dừng an toàn và đối chiếu tên địa điểm Khmer trên bản đồ. Hãy lưu ảnh chụp tên, số điện thoại và địa chỉ Khmer của chỗ ở để dùng khi mất mạng." },
  "road-crossing": { title: "Qua đường đông xe", subtitle: "Di chuyển dễ đoán và luôn quan sát", content: "Ưu tiên vạch qua đường hoặc đèn giao thông. Nhìn cả hai hướng vì xe có thể đến từ phía bạn không ngờ tới, và tránh bước ra từ sau xe đang đỗ." },
  "checking-change": { title: "Thanh toán và kiểm tra tiền thừa", subtitle: "Đếm bình tĩnh trước khi rời đi", content: "Xác nhận tổng tiền trước khi trả và đếm tiền thừa ngay tại quầy. Tách tiền riel mệnh giá nhỏ khỏi tiền lớn để giao dịch hằng ngày rõ ràng hơn." },
  heat: { title: "Nắng nóng và bổ sung nước", subtitle: "Nghỉ trước khi cơ thể kiệt sức", content: "Mang theo nước đóng chai còn niêm phong, ưu tiên bóng râm và đi bộ nhiều vào lúc mát. Nếu chóng mặt hoặc yếu bất thường, hãy dừng lại, làm mát cơ thể và nhờ giúp đỡ." },
  laundry: { title: "Dùng dịch vụ giặt ủi", subtitle: "Xác nhận thời gian và cách chăm sóc", content: "Hỏi giá tính theo món hay theo cân và xác nhận giờ lấy đồ. Báo trước đồ mỏng, vết bẩn hoặc món không được sấy." },
  "home-shoes": { title: "Giày dép trong nhà và nơi linh thiêng", subtitle: "Quan sát dấu hiệu của người địa phương", content: "Nếu giày dép được xếp ngoài cửa nhà, phòng hoặc khu vực thờ cúng, hãy cởi giày trước khi vào và đặt gọn để không chắn lối." },
  photography: { title: "Chụp ảnh mọi người một cách tôn trọng", subtitle: "Xin phép trước khi chụp chân dung gần", content: "Xin phép trước khi chụp rõ mặt một người, đặc biệt là trẻ em, nhà sư, người lao động hoặc người đang hành lễ. Tôn trọng biển cấm chụp ảnh và không làm gián đoạn nghi lễ." },
  "rural-visits": { title: "Thăm cộng đồng nông thôn", subtitle: "Đi nhẹ nhàng và hỏi trước", content: "Đi theo lối có sẵn, xin phép trước khi vào đất riêng và mang rác của bạn ra ngoài. Không phát quà hoặc chụp người dân khi chưa có hướng dẫn và đồng ý." },
  pharmacy: { title: "Trao đổi tại nhà thuốc", subtitle: "Mang theo thông tin thuốc", content: "Cho dược sĩ xem tên hoạt chất, liều dùng, thông tin dị ứng và ảnh bao bì gốc nếu có. Khi có triệu chứng nặng, khó thở hoặc chấn thương lớn, hãy tìm cơ sở y tế đủ chuyên môn." },
  charging: { title: "Sạc điện thoại và thiết bị", subtitle: "Giữ quyền truy cập bản đồ và liên lạc", content: "Mang đầu chuyển phù hợp và pin dự phòng nhỏ, sạc trước ngày di chuyển dài. Lưu ngoại tuyến địa chỉ, vé và số liên lạc quan trọng." },
};

function getInsightCopy(insight: (typeof INSIGHTS)[number], locale: string) {
  const translated = locale === "vi" ? EXPANDED_INSIGHT_VI[insight.id] : undefined;
  return translated ?? { title: insight.title, subtitle: insight.subtitle, content: insight.content };
}

const INSIGHTS = [
  {
    id: "sampeah",
    title: "Greeting local people",
    subtitle: "The five levels of Sampeah",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1540304859062-817bf49544eb?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-4">
        <p>
          Like a prayer gesture, <strong>Sampeah</strong> is Cambodia's traditional greeting and a
          way to show respect. The higher the hands are held, the greater the respect.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>Level 1 (chest):</strong> Greet friends and peers.
          </li>
          <li>
            <strong>Level 2 (mouth):</strong> Greet older people or a superior.
          </li>
          <li>
            <strong>Level 3 (nose):</strong> Greet parents, grandparents, or teachers.
          </li>
          <li>
            <strong>Level 4 (eyebrows):</strong> Greet a king or monk.
          </li>
          <li>
            <strong>Level 5 (forehead):</strong> Pray to deities.
          </li>
        </ul>
        <p className="text-sm font-semibold italic border-l-2 border-jade pl-3 text-jade mt-4">
          Note: Do not use Sampeah with children or street vendors; a nod and smile is enough.
        </p>
      </div>
    ),
  },
  {
    id: "currency",
    title: "Currency survival tips",
    subtitle: "Riel or US dollars?",
    icon: Banknote,
    image:
      "https://images.unsplash.com/photo-1621503953724-4f40f0653f5a?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-4">
        <p>
          Cambodia uses two currencies side by side: the <strong>Riel (KHR)</strong> and the{" "}
          <strong>US dollar (USD)</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>Small change (under $1):</strong> You will usually receive change in Riel. 4000
            Riel = $1.
          </li>
          <li>
            <strong>Whole dollars ($1 or more):</strong> You can use US dollars almost everywhere,
            from supermarkets to tuk-tuks.
          </li>
        </ul>
        <div className="bg-destructive/10 text-destructive p-3 rounded-xl text-sm font-semibold border border-destructive/20 mt-4">
          Very important: US dollar bills must be{" "}
          <span className="underline">NEW, UNDAMAGED, UNFOLDED, AND INK-FREE</span>. A Cambodian
          seller may reject a $100 bill because of even a tiny tear.
        </div>
      </div>
    ),
  },
  { id: "tuk-tuk", title: "Tuk-tuk etiquette", subtitle: "Agree the fare before leaving", icon: Compass, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=800", content: <p>Agree the fare before the ride, keep small notes for change, and save your hotel name in Khmer for the return trip.</p> },
  { id: "temples", title: "Temple dress code", subtitle: "Respectful visits to sacred places", icon: Compass, image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&q=80&w=800", content: <p>Cover shoulders and knees at temples, remove hats where requested, and speak quietly near monks and worshippers.</p> },
  { id: "food", title: "Ordering Khmer food", subtitle: "A simple restaurant routine", icon: Compass, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800", content: <p>Start with a greeting, point politely when needed, and ask for less chilli with <strong>កុំហឹរ</strong> (kom her).</p> },
  { id: "water", title: "Water and ice", subtitle: "Stay comfortable in the heat", icon: Compass, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800", content: <p>Choose sealed bottled water. In established cafés, factory ice is usually safe; use your own judgement in remote areas.</p> },
  { id: "markets", title: "Market manners", subtitle: "Shop with a smile", icon: Compass, image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800", content: <p>Ask the price first, bargain gently when appropriate, and walk away warmly if a price does not work for you.</p> },
  { id: "monks", title: "Meeting monks", subtitle: "Small gestures of respect", icon: Compass, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800", content: <p>Offer objects with both hands when possible. Women should avoid touching monks and can place an item on a table instead.</p> },
  { id: "phones", title: "Phone and data", subtitle: "Stay connected", icon: Compass, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", content: <p>A local eSIM or SIM is inexpensive. Download an offline map and keep your accommodation address saved before travelling.</p> },
  { id: "weather", title: "Weather basics", subtitle: "Dry season and rainy season", icon: Compass, image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800", content: <p>Carry sun protection year-round. During the wet season, brief heavy showers are normal, so a light rain layer helps.</p> },
  { id: "polite", title: "Polite body language", subtitle: "Respect in everyday moments", icon: Compass, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800", content: <p>Avoid pointing feet at people or sacred objects. Pass items with your right hand or both hands when you can.</p> },
  { id: "emergency", title: "Useful help phrases", subtitle: "When you need assistance", icon: Compass, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800", content: <p>Save <strong>ជួយខ្ញុំផង</strong> (chuoy khnhom phong) — “Please help me” — along with your hotel contact and travel insurance details.</p> },
  { id: "ride-apps", title: "Ride apps and addresses", subtitle: "Make pickups easier", icon: Compass, image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Place the pickup pin where the driver can stop safely, then compare the Khmer place name with the map before leaving.</p><p>Save a screenshot of your accommodation name, phone number, and Khmer address in case mobile data is unavailable.</p></div> },
  { id: "road-crossing", title: "Crossing busy roads", subtitle: "Move predictably and stay alert", icon: Compass, image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Use a marked crossing or traffic light where one is available. Look in both directions, because vehicles may approach from an unexpected side.</p><p>Avoid stepping out from behind parked vehicles, especially after dark or during rain.</p></div> },
  { id: "checking-change", title: "Paying and checking change", subtitle: "Count calmly before leaving", icon: Banknote, image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Confirm the total before paying and count your change while you are still at the counter.</p><p>Keep small riel notes separate from larger notes so everyday purchases are quicker and clearer.</p></div> },
  { id: "heat", title: "Heat and hydration", subtitle: "Plan breaks before you need them", icon: Compass, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Carry sealed water, use shade, and schedule demanding walks for cooler parts of the day.</p><p>If you feel dizzy or unusually weak, stop, cool down, and ask for help rather than trying to push on.</p></div> },
  { id: "laundry", title: "Using a laundry service", subtitle: "Confirm timing and special care", icon: Compass, image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Ask whether the price is per item or by weight, and confirm when the clothes will be ready.</p><p>Point out delicate items, stains, or anything that must not go in a dryer before handing over the bag.</p></div> },
  { id: "home-shoes", title: "Shoes in homes and sacred spaces", subtitle: "Look for the local cue", icon: Users, image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>If shoes are lined up outside a home, room, or sacred area, remove yours before entering.</p><p>Place them neatly without blocking a doorway, and avoid stepping over someone else's belongings.</p></div> },
  { id: "photography", title: "Photographing people respectfully", subtitle: "Ask before taking a close portrait", icon: Users, image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Ask permission before photographing an identifiable person at close range, especially children, monks, workers, or worshippers.</p><p>Respect any no-photo sign and never interrupt a ceremony just to get a better angle.</p></div> },
  { id: "rural-visits", title: "Visiting rural communities", subtitle: "Travel lightly and ask first", icon: Users, image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Stay on established paths, ask before entering private land, and carry your rubbish back out.</p><p>Buy locally when appropriate, but do not distribute gifts or photograph residents without guidance and consent.</p></div> },
  { id: "pharmacy", title: "Communicating at a pharmacy", subtitle: "Bring the medicine details", icon: Compass, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Show the generic medicine name, dosage, allergy information, and a photo of the original packaging when possible.</p><p>For severe symptoms, breathing difficulty, major injury, or uncertainty, seek qualified medical care instead of relying only on self-treatment.</p></div> },
  { id: "charging", title: "Charging phones and devices", subtitle: "Protect access to maps and contacts", icon: Compass, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800", content: <div className="space-y-3"><p>Carry a suitable adapter and a small power bank, and charge before long travel days.</p><p>Use your own cable when possible and keep an offline copy of essential addresses, tickets, and contact numbers.</p></div> },
];

export function KingdomInsights() {
  const [activeArticle, setActiveArticle] = useState(INSIGHTS[0]?.id ?? "");
  const { locale } = useLocale();

  return (
    <div className="space-y-6 pt-2">
      <div className="bg-jade/10 border border-jade/20 rounded-2xl p-4">
        <h3 className="font-extrabold text-jade flex items-center gap-2">
          <Compass className="h-5 w-5" /> Cambodia Handbook
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Essential survival and cultural tips before visiting the Kingdom of Wonder.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INSIGHTS.map((insight) => {
          const isActive = activeArticle === insight.id;
          const Icon = insight.icon;
          const copy = getInsightCopy(insight, locale);
          return (
            <button
              key={insight.id}
              onClick={() => setActiveArticle(insight.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? "bg-jade text-jade-foreground border-jade shadow-md scale-105"
                  : "bg-card text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              <Icon className="h-5 w-5 mb-2" />
              <div className="text-xs font-bold leading-tight">{copy.title}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
        {INSIGHTS.map((insight) => {
          if (insight.id !== activeArticle) return null;
          const copy = getInsightCopy(insight, locale);
          return (
            <article
              key={insight.id}
              className="card-flat overflow-hidden border border-border/50 shadow-sm"
            >
              <div className="h-40 w-full relative">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-white font-extrabold text-xl leading-tight">
                    {copy.title}
                  </h2>
                  <p className="text-white/80 text-sm font-semibold mt-1">{copy.subtitle}</p>
                </div>
              </div>

              <div className="p-5 text-foreground leading-relaxed">
                {typeof copy.content === "string" ? <p>{copy.content}</p> : copy.content}
              </div>

              <PatreonSupportCard locale={locale} className="mx-5 mb-5" />

              <div className="bg-secondary/50 p-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> Survival knowledge
                </span>
                <button className="text-sm font-bold text-jade hover:underline">Got it</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const PATREON_URL = "https://www.patreon.com/cw/SalaKhmer";

function PatreonArticleSupport({ locale }: { locale: "en" | "vi" | "zh" | "fr" }) {
  const copy = {
    en: {
      title: "Keeping SalaKhmer free",
      body: "SalaKhmer is independently made and free for every learner. If this guide helped you, a small Patreon encouragement helps us keep building.",
      action: "Support SalaKhmer",
    },
    vi: {
      title: "Giữ SalaKhmer miễn phí",
      body: "SalaKhmer được làm độc lập và luôn miễn phí cho người học. Nếu bài này hữu ích, một lời ủng hộ nhỏ qua Patreon sẽ giúp ứng dụng tiếp tục phát triển.",
      action: "Ủng hộ SalaKhmer",
    },
    zh: {
      title: "让 SalaKhmer 保持免费",
      body: "SalaKhmer 由独立开发者制作，并始终免费提供给学习者。如果本指南对你有帮助，欢迎通过 Patreon 支持我们继续建设它。",
      action: "支持 SalaKhmer",
    },
    fr: {
      title: "Gardons SalaKhmer gratuit",
      body: "SalaKhmer est créé indépendamment et reste gratuit pour tous les apprenants. Si ce guide vous a aidé, un petit soutien sur Patreon nous aide à continuer.",
      action: "Soutenir SalaKhmer",
    },
  }[locale];

  return (
    <aside className="mx-5 mb-5 rounded-2xl border border-[#F1D698] bg-[#FFF9EA] p-4">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F9E4AC] text-[#A9631E]">
          <Heart className="h-[17px] w-[17px] fill-current" />
        </span>
        <div>
          <h3 className="text-sm font-extrabold text-[#3C332A]">{copy.title}</h3>
          <p className="mt-1 text-[12px] leading-5 text-[#786858]">{copy.body}</p>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-extrabold text-[#A9631E] hover:underline"
          >
            {copy.action} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
