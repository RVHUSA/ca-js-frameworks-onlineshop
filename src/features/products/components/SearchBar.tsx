"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// // Search field. The typed text is stored in the parent, which uses it to filter the grid
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div role="search">
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a product..."
      />
    </div>
  );
}
