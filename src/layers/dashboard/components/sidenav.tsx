import { NavLinks } from "./nav-links";
export function SideNav() {
  return (
    <aside className="fixed hidden sm:flex inset-y-0 left-0  z-10  w-14  md:pt-10  flex-col md:border-none  bg-card ">
      <NavLinks />
    </aside>
  );
}
