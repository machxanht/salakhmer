import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  MonitorSmartphone,
  RefreshCw,
  RotateCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/mobile-viewer")({
  head: () => ({ meta: [{ title: "Mobile UI Viewer | SalaKhmer" }] }),
  component: MobileViewer,
});

type Device = { name: string; width: number; height: number; kind: "phone" | "tablet" };

const devices: Device[] = [
  { name: "iPhone 15", width: 393, height: 852, kind: "phone" },
  { name: "iPhone SE", width: 375, height: 667, kind: "phone" },
  { name: "Pixel 8", width: 412, height: 915, kind: "phone" },
  { name: "iPad Mini", width: 768, height: 1024, kind: "tablet" },
];

function MobileViewer() {
  const [url, setUrl] = useState("/");
  const [frameUrl, setFrameUrl] = useState("/");
  const [device, setDevice] = useState<Device>(devices[0]);
  const [landscape, setLandscape] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setUrl(window.location.origin);
    setFrameUrl(window.location.origin);
  }, []);

  const dimensions = useMemo(
    () => (landscape ? { width: device.height, height: device.width } : device),
    [device, landscape],
  );

  const navigate = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    setFrameUrl(
      /^https?:\/\//i.test(trimmed) || trimmed.startsWith("/") ? trimmed : `https://${trimmed}`,
    );
    setReloadKey((key) => key + 1);
  };

  const isPhone = device.kind === "phone";

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100">
      <header className="border-b border-white/10 bg-[#172033] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3">
          <div className="mr-2 flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-slate-950">
              <MonitorSmartphone className="h-5 w-5" />
            </span>
            Mobile Viewer
          </div>
          <form
            onSubmit={navigate}
            className="order-3 flex min-w-[260px] flex-1 items-center gap-2 sm:order-none"
          >
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://your-app.com"
              className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm outline-none ring-amber-400/60 placeholder:text-slate-500 focus:ring-2"
            />
            <button
              type="submit"
              className="h-10 rounded-lg bg-amber-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Load
            </button>
          </form>
          <a
            href={frameUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            <ExternalLink className="h-4 w-4" /> Open
          </a>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[#141d2e] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            Device
          </span>
          {devices.map((item) => {
            const Icon = item.kind === "phone" ? Smartphone : Tablet;
            return (
              <button
                key={item.name}
                onClick={() => setDevice(item)}
                className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${device.name === item.name ? "bg-amber-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                <Icon className="h-4 w-4" /> {item.name}
                <span className="text-xs opacity-70">
                  {item.width}×{item.height}
                </span>
              </button>
            );
          })}
          <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
          <button
            onClick={() => setLandscape((value) => !value)}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/5 px-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
          >
            <RotateCw className="h-4 w-4" /> Rotate
          </button>
          <button
            onClick={() => setReloadKey((key) => key + 1)}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/5 px-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" /> Reload
          </button>
          <span className="ml-auto rounded-md bg-white/5 px-2 py-1 text-xs font-mono text-slate-400">
            {dimensions.width} × {dimensions.height}
          </span>
        </div>
      </section>

      <main className="grid min-h-[calc(100vh-125px)] place-items-start overflow-auto bg-[radial-gradient(circle_at_center,_#24324d_0,_#101827_60%)] p-8 sm:p-12">
        <div
          className="relative rounded-[2.8rem] bg-slate-950 p-3 shadow-2xl shadow-black/50"
          style={{ width: dimensions.width + 24, height: dimensions.height + 24 }}
        >
          {isPhone && (
            <span
              className={`absolute z-10 h-6 w-28 rounded-full bg-slate-950 ${landscape ? "left-1 top-1/2 -translate-y-1/2" : "left-1/2 top-2 -translate-x-1/2"}`}
            />
          )}
          <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
            <iframe
              key={reloadKey}
              title="Mobile preview"
              src={frameUrl}
              className="h-full w-full border-0"
            />
          </div>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-slate-700" />
        </div>
        <p className="mt-6 max-w-xl text-center text-xs leading-5 text-slate-400">
          Mẹo: URL cùng domain sẽ xem được trực tiếp. Một số website chặn hiển thị trong iframe bằng
          chính sách bảo mật; hãy dùng nút{" "}
          <span className="font-semibold text-slate-300">Open</span> trong trường hợp đó.
        </p>
      </main>
    </div>
  );
}
