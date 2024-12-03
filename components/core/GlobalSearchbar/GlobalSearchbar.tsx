import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const GlobalSearchbar = () => {
  return (
    <div className="relative flex items-center rounded-full bg-[#F0F4F9] h-[60px]">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background px-5 items-center border-none shadow-none"
      />
      <div className="h-6 border-l border-solid border-black"></div>
      <Button variant="ghost" size="icon" className="rounded-full px-10">
        <SearchIcon className="h-5 w-5" />
      </Button>
    </div>

  )
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}