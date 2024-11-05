import { NavLinks } from "./nav-links";
export function SideNav() {
  return (
    <aside className="fixed  sm:flex md:inset-y-0 md:left-0 bottom-0 z-10  w-14 max-md:w-screen md:pt-10  md:flex-col md:border-r max-md:border-t bg-background ">
      <NavLinks />
    </aside>
  );
}
