import { describe, it, expect } from "vitest";
import {
  buildVulnerableRecommendation,
  buildCommuteRecommendation,
} from "../recommendation-helpers";

describe("recommendation-helpers", () => {
  describe("buildVulnerableRecommendation", () => {
    it("returns null when no vulnerable members are in the household", () => {
      expect(buildVulnerableRecommendation(false, false, 200)).toBeNull();
    });

    it("returns null when AQI is below 101", () => {
      expect(buildVulnerableRecommendation(true, false, 50)).toBeNull();
      expect(buildVulnerableRecommendation(false, true, 80)).toBeNull();
    });

    it("returns protection alert when AQI is 101 or above with vulnerable household", () => {
      const rec = buildVulnerableRecommendation(true, false, 120);
      expect(rec).not.toBeNull();
      expect(rec?.category).toBe("vulnerable");
      expect(rec?.action).toContain("vulnerable family members");
    });
  });

  describe("buildCommuteRecommendation", () => {
    it("returns recirculation advice for solo drivers", () => {
      const rec = buildCommuteRecommendation("car_solo", 140);
      expect(rec).not.toBeNull();
      expect(rec?.category).toBe("commute");
      expect(rec?.action).toContain("recirculation");
    });

    it("returns caution advice for active cyclists/pedestrians in severe AQI", () => {
      const rec = buildCommuteRecommendation("walk_bike", 160);
      expect(rec).not.toBeNull();
      expect(rec?.action).toContain("N95");
    });

    it("returns null for favorable AQI or remote workers", () => {
      expect(buildCommuteRecommendation("remote", 200)).toBeNull();
      expect(buildCommuteRecommendation("walk_bike", 80)).toBeNull();
    });
  });
});
