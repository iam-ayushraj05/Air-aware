export interface FamilyChecklistItemModel {
  id: string;
  target: "children" | "elderly" | "household";
  title: string;
  description: string;
}

export const DEFAULT_FAMILY_CHECKLIST: FamilyChecklistItemModel[] = [
  {
    id: "fam-1",
    target: "children",
    title: "Relocate outdoor recess & school sports indoors",
    description:
      "Young lungs inhale more air per pound of body weight, accelerating fine particle deposition.",
  },
  {
    id: "fam-2",
    target: "elderly",
    title: "Verify rescue inhalers / cardiovascular medications are accessible",
    description:
      "PM2.5 exposure triggers systemic inflammation and vascular constriction within hours.",
  },
  {
    id: "fam-3",
    target: "children",
    title: "Ensure well-fitted pediatric N95 / KF94 respirators for transit",
    description: "Cloth masks provide under 20% filtration efficiency against sub-micron PM2.5.",
  },
  {
    id: "fam-4",
    target: "household",
    title: "Seal bedroom window cracks with weatherstripping tape",
    description: "Prevents nocturnal draft infiltration into sleeping areas.",
  },
  {
    id: "fam-5",
    target: "household",
    title: "Operate True HEPA air cleaner continuously on whisper mode",
    description: "Maintains a clean air sanctuary in the primary family living area.",
  },
];
