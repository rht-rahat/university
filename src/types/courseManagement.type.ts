import { TAcademicSemester } from "./academicManajment.types";

export type TSemester = {
  title?: string;
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};
