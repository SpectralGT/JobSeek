/** Matches the structure of userData.json */

export interface PersonalDetails {
  Name: string;
  Street: string;
  Town: string;
  State: string;
  Zipcode: string;
}

export interface PublicInformation {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface EducationEntry {
  university: string;
  start: string;
  end: string;
  city: string;
  state: string;
  courseType: string;
  courseName: string;
  coursework: string[];
}

export interface ExperienceEntry {
  companyName: string;
  role: string;
  start: string;
  end: string;
  city: string;
  state: string;
  work: string[];
}

export interface ProjectEntry {
  name: string;
  stack: string[];
  month: string;
  year: string;
}

export interface Skills {
  languages: string[];
  tools: string[];
  more: string[];
}

export interface LeadershipEntry {
  organisationName: string;
  work: string[];
}

export interface UserData {
  "Personal Details": PersonalDetails;
  "Public Information": PublicInformation;
  Education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: Skills;
  leadership: LeadershipEntry[];
}

export type CourseType = "bachelors" | "masters" | "phd" | "associate" | "certificate" | "";
