import { IndoorAssessmentData } from "@/lib/types";

export type IndoorFormUpdater = (
  updater: (prev: IndoorAssessmentData) => IndoorAssessmentData
) => void;
