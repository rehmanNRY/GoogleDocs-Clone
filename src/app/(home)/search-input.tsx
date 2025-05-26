"use client"
import React, { useRef, useState, useEffect } from "react"
import { Search, X, Command } from "lucide-react"
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
        className={cn(
          "relative flex items-center transition-all duration-200",
          isFocused && "scale-[1.02]"
        )}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 h-4 w-4 pointer-events-none" />

        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search documents..."
          className={cn(
            "pl-10 pr-24 border-none focus:ring-0 focus:border-0 rounded-full h-[44px] placeholder:text-neutral-500 shadow-sm transition-all duration-200",
            isFocused 
              ? "ring-2 ring-blue-500 bg-white shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
              : "bg-[#F0F4F8] hover:bg-[#E8EDF2]"
          )}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-red-500 transition-colors"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded border bg-white px-2 font-mono text-[10px] font-medium text-neutral-500 opacity-100">
            <Command className="h-3 w-3" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      {/* Hint or suggestions */}
      {isFocused && (
        <div className="absolute left-0 mt-2 w-full rounded-lg bg-white border border-gray-100 p-3 text-sm text-gray-500 shadow-lg animate-fade-in-down z-10">
          <div className="flex items-center gap-2 text-blue-600 font-medium mb-1">
            <Search className="h-4 w-4" />
            Search Tips
          </div>
          <div className="space-y-2">
            <p>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to search</p>
            <p>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to close</p>
            <p>Use <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl + K</kbd> to focus search</p>
          </div>
        </div>
      )}
    </form>
  )
}

export default SearchInput
