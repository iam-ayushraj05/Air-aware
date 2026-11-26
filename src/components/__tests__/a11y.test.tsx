import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { DataSourceBadge } from "../ui/DataSourceBadge";
import { AQICard } from "@/features/air-quality/AQICard";
import { getFallbackDemoData } from "@/server/demo-data";

describe("Accessibility Verification with vitest-axe", () => {
  it("Button has zero accessibility violations", async () => {
    const { container } = render(<Button>Accessible Action</Button>);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });

  it("Card container has zero accessibility violations", async () => {
    const { container } = render(
      <Card>
        <h2>Heading</h2>
        <p>Accessible descriptive paragraph.</p>
      </Card>
    );
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });

  it("Badge has zero accessibility violations", async () => {
    const { container } = render(<Badge variant="good">Good Status</Badge>);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });

  it("DataSourceBadge has zero accessibility violations", async () => {
    const { container } = render(<DataSourceBadge origin="live" updatedAt="2026-11-26T10:00:00Z" />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });

  it("AQICard has zero accessibility violations", async () => {
    const snap = getFallbackDemoData();
    const { container } = render(<AQICard snapshot={snap} />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
