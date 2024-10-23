import { NavLinks } from "./nav-links";
export function SideNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 pt-10 flex-col border-r bg-background sm:flex">
      <NavLinks />
    </aside>
  );
}
