import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../ui/Button";
import { DataSourceBadge } from "../ui/DataSourceBadge";
import { AQICard } from "@/features/air-quality/AQICard";
import { RecommendationCard } from "@/features/air-quality/RecommendationCard";
import { FamilyChecklist } from "@/features/air-quality/FamilyChecklist";
import { getFallbackDemoData } from "@/server/demo-data";

describe("UI & Feature Component Tests", () => {
  it("renders Button with proper label and responds to clicks", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state in Button and disables interactions", () => {
    render(<Button isLoading>Submit</Button>);
    const btn = screen.getByRole("button", { name: /loading\.\.\./i });
    expect(btn).toBeDisabled();
  });

  it("distinguishes LIVE vs DEMO data source in DataSourceBadge", () => {
    const { rerender } = render(<DataSourceBadge origin="live" updatedAt="2026-11-26T10:00:00Z" />);
    expect(screen.getByText(/LIVE DATA/i)).toBeInTheDocument();

    rerender(<DataSourceBadge origin="demo" />);
    expect(screen.getByText(/DEMO DATA/i)).toBeInTheDocument();
  });

  it("renders AQICard with category and health implications", () => {
    const snap = getFallbackDemoData("London", 51.5, -0.1);
    render(<AQICard snapshot={snap} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText(/What this means for your household/i)).toBeInTheDocument();
  });

  it("expands recommendation card details on toggle button click", () => {
    const rec = {
      id: "rec-test",
      category: "outdoor" as const,
      action: "Test Action Recommendation",
      reason: "Test Reason",
      evidence: "PM2.5 = 80",
      expectedBenefit: "Clean air",
      confidence: 0.9,
      isGeneral: false,
    };

    render(<RecommendationCard recommendation={rec} />);
    expect(screen.getByText("Test Action Recommendation")).toBeInTheDocument();

    // Toggle details button
    const toggleBtn = screen.getByRole("button", { name: /toggle details/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/Grounded Data Evidence:/i)).toBeInTheDocument();
    expect(screen.getByText("PM2.5 = 80")).toBeInTheDocument();
  });

  it("interactively checks off items in FamilyChecklist", () => {
    render(<FamilyChecklist />);
    const checklistButtons = screen.getAllByRole("button");
    expect(checklistButtons.length).toBeGreaterThan(0);

    const firstItem = checklistButtons[0];
    if (firstItem) {
      fireEvent.click(firstItem);
    }
  });
});
