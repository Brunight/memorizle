"use client";

import { useLocale } from "next-intl";

import { Select } from "@/components/ui/select";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = {
    en: "English",
    pt: "Português",
  };

  return (
    <Select
      value={locale}
      onValueChange={(newLocale) => {
        router.replace(pathname, { locale: newLocale });
      }}
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Select>
  );
}
