export type TemplateTone = "orange" | "green" | "amber" | "indigo" | "rose" | "violet";

export interface Template {
  id: string;
  title: string;
  description: string;
  tone: TemplateTone;
}
