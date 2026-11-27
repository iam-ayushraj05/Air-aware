import { LocationInfo } from "@/lib/types";

interface LocationSearchResultsListProps {
  searchResults: LocationInfo[];
  onSelectLocation: (loc: LocationInfo) => void;
  onClose: () => void;
}

/**
 * Renders scrollable geocoding search results with city and administrative area labels.
 */
export function LocationSearchResultsList({
  searchResults,
  onSelectLocation,
  onClose,
}: LocationSearchResultsListProps) {
  if (searchResults.length === 0) return null;

  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
        Search Results
      </span>
      <div className="max-h-44 overflow-y-auto space-y-1">
        {searchResults.map((loc, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              onSelectLocation(loc);
              onClose();
            }}
            className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">{loc.name}</span>
            <span className="text-slate-400">
              {loc.admin1 ? `${loc.admin1}, ` : ""}
              {loc.country}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
