"use client"
import React, { useRef, useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSearchParam } from "@/hooks/use-search-param"

const SearchInput = () => {
  const [search, setSearch] = useSearchParam()

  const [searchValue, setSearchValue] = useState(search || "")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(searchValue.trim())
    setIsFocused(false)
    inputRef.current?.blur()
  }

  const clearSearch = () => {
    setSearchValue("")
    setSearch("")
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-2xl mx-4 relative"
      role="search"
    >
      <div
        className={
          "relative flex items-center transition-all duration-200"
        }
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />

        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search documents... (Ctrl + K)"
          className={cn("pl-10 pr-9 border-none focus:ring-0 focus:border-0 rounded-full h-[44px] placeholder:text-neutral-800 shadow-sm", isFocused ? "ring-2 ring-blue-500 bg-white shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "bg-[#F0F4F8]")}
          
        />

        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-red-500"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Hint or suggestions */}
      {isFocused && (
        <div className="absolute left-0 mt-2 w-full rounded-md bg-white border p-2 text-sm text-gray-500 shadow-md animate-fade-in-down z-10">
          Press <kbd className="px-1 bg-gray-100 rounded">Enter</kbd> to search, or <kbd className="px-1 bg-gray-100 rounded">Ctrl + K</kbd> to refocus
        </div>
      )}
    </form>
  )
}

export default SearchInput
