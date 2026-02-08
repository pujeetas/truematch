const JUNIOR_MAX_YEARS = 2;
const ENTRY_MAX_SKILLS = 5;
const SENIOR_MIN_YEARS = 3;

export const calculateTruthFlags = (
  title: string,
  experienceYears: number,
  requiredSkills: string[]
): string[] => {
  const flags: string[] = [];
  const titleLower = title.toLowerCase();

  const isJunior = titleLower.includes('junior');
  const isEntry = titleLower.includes('entry');
  const isSenior = titleLower.includes('senior');

  if ((isJunior || isEntry) && experienceYears > JUNIOR_MAX_YEARS) {
    flags.push(`Junior/Entry role requires ${experienceYears} years (max ${JUNIOR_MAX_YEARS})`);
  }

  if ((isJunior || isEntry) && requiredSkills.length > ENTRY_MAX_SKILLS) {
    flags.push(`Junior/Entry role requires ${requiredSkills.length} skills (max ${ENTRY_MAX_SKILLS})`);
  }

  if (isSenior && experienceYears < SENIOR_MIN_YEARS) {
    flags.push(`Senior role requires only ${experienceYears} years (min ${SENIOR_MIN_YEARS})`);
  }

  return flags;
};