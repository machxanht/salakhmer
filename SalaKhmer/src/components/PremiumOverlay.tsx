import { ReactNode, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Sparkles, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface PremiumOverlayProps {
  isLocked: boolean;
  children: ReactNode;
}

export function PremiumOverlay({ isLocked, children }: PremiumOverlayProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl group cursor-pointer h-full"
        onClick={() => setIsOpen(true)}
      >
        {/* Blurred content preview */}
        <div className="blur-[3px] opacity-60 pointer-events-none select-none h-full">
          {children}
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center z-10 transition-colors group-hover:bg-background/40">
          <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-border">
            <Lock className="w-4 w-4" />
          </div>
          <span className="mt-1.5 text-[10px] font-extrabold tracking-widest text-muted-foreground">
            PRO
          </span>
        </div>
      </div>

      {/* Popup dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/15 text-primary">
              <Sparkles className="w-7 h-7" />
            </div>
            <DialogTitle className="text-xl">Unlock all content</DialogTitle>
            <DialogDescription className="text-sm pt-1 leading-relaxed">
              Create a free account to save your progress and access every lesson and category.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <button
              id="overlay-cta-login"
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/login", search: { redirect: window.location.pathname } });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-extrabold text-primary-foreground shadow transition-opacity hover:opacity-90"
            >
              <LogIn className="h-4 w-4" />
              Log in / Sign up for free
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground py-1"
            >
              Continue preview
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
