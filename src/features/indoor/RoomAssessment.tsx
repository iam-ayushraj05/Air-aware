"use client";

import { useState } from "react";
import { calculateIndoorScore } from "@/lib/indoor";
import { IndoorAssessmentData } from "@/lib/types";
import { AssessmentControls } from "./components/AssessmentControls";
import { AssessmentScoreCard } from "./components/AssessmentScoreCard";
import { PlantScienceCard } from "./components/PlantScienceCard";

interface RoomAssessmentProps {
  outdoorAqi?: number;
}

/**
 * Interactive room air quality assessment module estimating indoor scores from ventilation,
 * filtration, cooking fuel, and cleaning routines.
 */
export function RoomAssessment({ outdoorAqi = 140 }: RoomAssessmentProps) {
  const [data, setData] = useState<Partial<IndoorAssessmentData>>({
    roomType: "living_room",
    hasPurifier: true,
    purifierHepa: true,
    cookingFuel: "piped_gas",
    exhaustFanWorking: true,
    ventilationMethod: "smart_timing",
    hasIncenseOrCandles: false,
    dustCleaningFrequency: "daily_damp",
    indoorPlantsCount: 3,
  });

  const result = calculateIndoorScore(data, outdoorAqi);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <AssessmentControls data={data} setData={setData} />
        <AssessmentScoreCard result={result} outdoorAqi={outdoorAqi} />
      </div>
      <PlantScienceCard />
    </div>
  );
}
