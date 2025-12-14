import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import useDebounce from "@/hooks/useDebounce";

function SearchInput({ value, onChange, onSearch }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value || "");

  // Debounce search
  const debouncedValue = useDebounce(inputValue, 500);
  const isClearing = useRef(false);

  useEffect(() => {
    // Skip debounce effect if we're clearing
    if (isClearing.current) {
      isClearing.current = false;
      return;
    }

    if (debouncedValue !== value) {
      onChange?.(debouncedValue);
      if (debouncedValue.trim()) {
        onSearch?.(debouncedValue.trim());
      }
    }
  }, [debouncedValue, value, onChange, onSearch]);

  // Sync with external value
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleClear = useCallback(() => {
    isClearing.current = true; // Flag to skip debounce
    setInputValue("");
    onChange?.("");
  }, [onChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t("write_sth")}
        className="pl-10 pr-10 h-11 bg-secondary/50 border-none rounded-xl focus-visible:ring-1"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
