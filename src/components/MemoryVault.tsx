import { useState } from "react";
import { Lock, Unlock, Heart, Gift, Plus, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HugVoucher {
  id: string;
  title: string;
  description: string;
  claimed: boolean;
  emoji: string;
}

const defaultVouchers: HugVoucher[] = [
  { id: "1", title: "Infinite Hug", description: "Redeemable for 1 hug that never ends. No time limit. No letting go.", emoji: "🤗", claimed: false },
  { id: "2", title: "Midnight Snack Run", description: "I'll drive anywhere at any hour to get you whatever you're craving.", emoji: "🍕", claimed: false },
  { id: "3", title: "Movie Pick Pass", description: "You get to pick the movie. No complaints. Even if it's that one again.", emoji: "🎬", claimed: false },
  { id: "4", title: "Breakfast in Bed", description: "Wake up to your favorite breakfast, made with love (and probably some mess).", emoji: "🥞", claimed: false },
  { id: "5", title: "No-Phone Date", description: "A full evening of just us. No screens. Just your smile and my bad jokes.", emoji: "📵", claimed: false },
  { id: "6", title: "Letter on Demand", description: "Ask and you'll receive a handwritten love letter within 24 hours.", emoji: "💌", claimed: false },
];

const VAULT_KEY = "140223"; // Replace with your special date

export const MemoryVault = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");
  const [vouchers, setVouchers] = useState<HugVoucher[]>(defaultVouchers);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [claimedVoucher, setClaimedVoucher] = useState<HugVoucher | null>(null);
  const [shake, setShake] = useState(false);

  const tryUnlock = () => {
    if (keyInput === VAULT_KEY) {
      setIsLocked(false);
      setError("");
    } else {
      setError("Wrong key, love! Try our special date 💕");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const claimVoucher = (id: string) => {
    const voucher = vouchers.find((v) => v.id === id);
    if (voucher && !voucher.claimed) {
      setClaimedVoucher(voucher);
      setVouchers((prev) => prev.map((v) => (v.id === id ? { ...v, claimed: true } : v)));
    }
  };

  const addVoucher = () => {
    if (!newTitle.trim()) return;
    setVouchers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTitle,
        description: newDesc || "A special surprise just for you ❤️",
        emoji: "🎁",
        claimed: false,
      },
    ]);
    setNewTitle("");
    setNewDesc("");
    setShowAdd(false);
  };

  if (isLocked) {
    return (
      <Card className="bg-gradient-card shadow-strong max-w-md mx-auto overflow-hidden">
        <CardContent className="p-8 text-center space-y-6">
          <div className={`transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">Memory Vault</h3>
            <p className="text-muted-foreground text-sm">Enter our special date to unlock your surprises</p>
          </div>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter the key... (hint: DDMMYY)"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
              className="text-center bg-background/50 text-lg tracking-widest"
              maxLength={6}
            />
            {error && <p className="text-sm text-destructive animate-fade-in">{error}</p>}
            <Button onClick={tryUnlock} className="w-full rounded-full shadow-glow">
              <Unlock className="w-4 h-4 mr-2" /> Unlock Vault
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Claimed overlay */}
      {claimedVoucher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setClaimedVoucher(null)}>
          <Card className="bg-gradient-card shadow-strong max-w-sm w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8 text-center space-y-4">
              <Sparkles className="w-12 h-12 mx-auto text-primary animate-twinkle" />
              <div className="text-5xl">{claimedVoucher.emoji}</div>
              <h3 className="font-playfair text-2xl font-bold text-foreground">Voucher Claimed!</h3>
              <p className="text-lg text-foreground/90 font-medium">{claimedVoucher.title}</p>
              <p className="text-muted-foreground">{claimedVoucher.description}</p>
              <p className="text-sm text-primary font-medium">Show this to me to redeem 💕</p>
              <Button onClick={() => setClaimedVoucher(null)} variant="outline" className="rounded-full">
                <X className="w-4 h-4 mr-1" /> Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground font-mono">// Vault unlocked 🔓 — Welcome, love</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((voucher) => (
          <Card key={voucher.id} className={`group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden ${voucher.claimed ? "opacity-60" : "hover:scale-105 cursor-pointer"}`} onClick={() => !voucher.claimed && claimVoucher(voucher.id)}>
            <CardContent className="p-5 text-center space-y-3">
              <div className="text-4xl">{voucher.emoji}</div>
              <h4 className={`font-playfair font-bold text-foreground ${voucher.claimed ? "line-through" : ""}`}>{voucher.title}</h4>
              <p className="text-sm text-muted-foreground">{voucher.description}</p>
              {voucher.claimed ? (
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                  <Heart className="w-3 h-3" fill="currentColor" /> Claimed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <Gift className="w-3 h-3" /> Tap to claim
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add voucher */}
      {showAdd ? (
        <Card className="bg-gradient-card shadow-soft p-6">
          <CardContent className="p-0 space-y-3">
            <Input placeholder="Voucher title (e.g., 'Forehead Kiss')" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="bg-background/50" />
            <Input placeholder="Description (optional)" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addVoucher()} className="bg-background/50" />
            <div className="flex gap-2">
              <Button onClick={addVoucher} size="sm" className="rounded-full">
                <Plus className="w-4 h-4 mr-1" /> Add Voucher
              </Button>
              <Button onClick={() => setShowAdd(false)} size="sm" variant="ghost" className="rounded-full">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowAdd(true)} variant="outline" className="w-full rounded-full border-dashed border-primary/30 hover:border-primary/60">
          <Plus className="w-4 h-4 mr-2" /> Add a Future Hug
        </Button>
      )}
    </div>
  );
};
