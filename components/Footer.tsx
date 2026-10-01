export function Footer() {
  return (
    <footer className="mt-14 border-t border-line bg-fog">
      <div className="grid gap-10 px-6 py-12 text-[14px] md:grid-cols-3 lg:px-12 xl:px-20">
        <div>
          <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.04em]">
            Support
          </h2>
          <ul className="space-y-3">
            <li className="hover:underline">Help Center</li>
            <li className="hover:underline">AirCover</li>
            <li className="hover:underline">Anti-discrimination</li>
            <li className="hover:underline">Disability support</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.04em]">
            Hosting
          </h2>
          <ul className="space-y-3">
            <li className="hover:underline">Airbnb your home</li>
            <li className="hover:underline">AirCover for Hosts</li>
            <li className="hover:underline">Hosting resources</li>
            <li className="hover:underline">Community forum</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.04em]">
            Airbnb
          </h2>
          <ul className="space-y-3">
            <li className="hover:underline">Newsroom</li>
            <li className="hover:underline">Careers</li>
            <li className="hover:underline">Investors</li>
            <li className="hover:underline">Gift cards</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-line px-6 py-4 text-[14px] md:flex-row md:items-center md:justify-between lg:px-12 xl:px-20">
        <p>© {new Date().getFullYear()}</p>
        <p className="text-muted">Privacy · Terms · Sitemap</p>
      </div>
    </footer>
  );
}
