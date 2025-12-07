// --------------- CAMPUSES ---------------
export const NU_CAMPUSES = [
  // --- METRO MANILA ---
  "NU-Manila", // Main Campus (Sampaloc)
  "NU-Nazareth", // Basic Education (Sampaloc)
  "NU-MOA", // Mall of Asia (Pasay)
  "NU-Fairview", // Quezon City
  "NU-EastOrtigas", // Pasig/Cainta
  "NU-Mendiola", // Manila Annex

  // --- PROVINCIAL CAMPUSES ---
  "NU-Laguna", // Calamba
  "NU-Baliwag", // Bulacan
  "NU-Dasma", // Dasmariñas, Cavite
  "NU-Lipa", // Batangas
  "NU-Clark", // Pampanga
  "NU-Bacolod", // Visayas campus

  // --- SPECIALIZED / AFFILIATE ---
  "NU-APC", // Asia Pacific College (Makati)
] as const;

export type NUCampus = (typeof NU_CAMPUSES)[number];

// --------------- COURSES ---------------
export const NU_COURSES = [
  // --- COMPUTING ---
  "BSCS-ML",
  "BSCS-DF",
  "BSIT-MWA",
  "BSIT-MAA",
  "BSIT-MIT",
  "BSIS",
  "ACT",

  // --- ENGINEERING ---
  "BSCE",
  "BSCE-CM",
  "BSCE-STE",
  "BSEE-REE",
  "BSEE-PSE",
  "BSECE-ME",
  "BSECE-ICE",
  "BSME-REE",
  "BSME-HVAC",
  "BSCpe",
  "BSEnSE",

  // --- BUSINESS ---
  "BSBA-FM",
  "BSBA-MM",
  "BSA",
  "BSMA",
  "BSAIS",
  "BSREM",
  "BSTM",
  "BSHM",

  // --- ALLIED HEALTH ---
  "BSN",
  "BSMT",
  "BSPharma",
  "BSPsych",
  "BS-ESS",
  "DMD",
  "OD",
  "Cert-DH",
  "Cert-DLT",

  // --- ARTS & EDUCATION ---
  "AB-Comm",
  "AB-ELS",
  "AB-PolSci",
  "BMMA",
  "BEEd",
  "BECEd",
  "BPEd",
  "BSEd-Eng",
  "BSEd-Fil",
  "BSEd-Math",
  "BSEd-Sci",

  // --- ARCHITECTURE & OTHERS ---
  "BSArch",
  "BSCrim",
] as const;

export type NUCourses = (typeof NU_COURSES)[number];

// --------------- YEAR LEVELS ---------------
export const NU_YEAR_LEVELS = [
  // --- SENIOR HIGH SCHOOL ---
  "Grade 11",
  "Grade 12",

  // --- UNDERGRADUATE ---
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",

  // --- EXTENDED PROGRAMS ---
  "5th Year",

  // --- CLINICAL PROGRAMS ---
  "6th Year",

] as const;

export type NUYearLevel = (typeof NU_YEAR_LEVELS)[number];

export const NU_DATA = {
  campuses: NU_CAMPUSES,
  courses: NU_COURSES,
  yearLevels: NU_YEAR_LEVELS,
};

export type {
  NUCampus as Campus,
  NUCourses as Course,
  NUYearLevel as YearLevel,
};
