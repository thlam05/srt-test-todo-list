import React from 'react';

type FilterValue = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilter({ filter, onFilterChange, searchKeyword, onSearchChange }: TodoFilterProps) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search todos..."
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            style={{ ...styles.filterButton, ...(filter === f.value ? styles.activeFilter : {}) }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { marginBottom: 16 },
  searchInput: {
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid #ddd',
    borderRadius: 4,
    boxSizing: 'border-box',
    marginBottom: 12,
  },
  filters: { display: 'flex', gap: 8 },
  filterButton: {
    padding: '6px 16px',
    fontSize: 14,
    background: '#ecf0f1',
    color: '#333',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  activeFilter: { background: '#3498db', color: '#fff' },
};
