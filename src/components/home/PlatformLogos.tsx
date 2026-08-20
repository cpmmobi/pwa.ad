import { siGoogleads, siKuaishou, siMeta, siTiktok } from 'simple-icons';

type BrandIcon = {
  title: string;
  path: string;
};

function Logo({ icon, label }: { icon: BrandIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-white">
      <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d={icon.path} />
      </svg>
      <span className="text-sm font-semibold tracking-wide">{label}</span>
    </span>
  );
}

export default function PlatformLogos() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 opacity-70 hover:opacity-100 transition-opacity duration-500">
      <Logo icon={siMeta} label="Meta" />
      <Logo icon={siGoogleads} label="Google Ads" />
      <Logo icon={siTiktok} label="TikTok" />
      <Logo icon={siKuaishou} label="Kwai" />
      <span className="text-sm font-semibold tracking-wide text-white">AppsFlyer</span>
    </div>
  );
}
