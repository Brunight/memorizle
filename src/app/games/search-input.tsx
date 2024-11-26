"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
//@ts-ignore use-debounce is not typed
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

interface SearchInputProps {
  defaultValue: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue);

  const [debouncedValue] = useDebounce(value, 300);

  // Update URL when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/games?${params.toString()}`);
    });
  }, [debouncedValue, router, searchParams]);

  return (
    <>
      <Input
        placeholder="Search games..."
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
        </div>
      )}
    </>
  );
}
