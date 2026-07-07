// app/components/ProductFilters.js
// ---------------------------------
// The filter/search controls for the catalogue page.
// This is a Client Component because it uses useState for the search input
// and onChange handlers on the dropdowns — these are interactive browser features
// that Server Components can't do.

"use client";

import { useState } from "react";

export default function ProductFilters({
  // These are the current filter values, passed down from page.js
  searchQuery,
  selectedCategory,
  selectedTag,
  sortBy,

  // These are callback functions — when the user changes a filter,
  // we call these to tell page.js "update the filter to this new value"
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onSortChange,
  onClearAll,

  // The list of available categories and tags — we extract these
  // from the actual product data so the dropdowns always match
  // what's in the database
  categories,
  tags,
}) {
  return (
    <div
      className="mb-8"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* ── Row 1: Search bar ── */}
      <div>
        <input
          type="text"
          placeholder="Search products... (e.g. chakra, mirror, diwali)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg text-sm outline-none"
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
          }}
        />
      </div>

      {/* ── Row 2: Dropdowns + Sort + Clear ── */}
      <div
        className="flex flex-wrap items-center"
        style={{ gap: "0.75rem" }}
      >
        {/* Category dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg text-sm outline-none cursor-pointer"
          style={{
            padding: "0.6rem 0.75rem",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Tag dropdown */}
        <select
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="rounded-lg text-sm outline-none cursor-pointer"
          style={{
            padding: "0.6rem 0.75rem",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
          }}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg text-sm outline-none cursor-pointer"
          style={{
            padding: "0.6rem 0.75rem",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
          }}
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="newest">Newest First</option>
        </select>

        {/* Clear all filters button — only shows when at least one filter is active */}
        {(searchQuery || selectedCategory || selectedTag || sortBy) && (
          <button
            onClick={onClearAll}
            className="rounded-lg text-sm font-medium cursor-pointer"
            style={{
              padding: "0.6rem 1rem",
              backgroundColor: "var(--rose)",
              color: "white",
              border: "none",
            }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}