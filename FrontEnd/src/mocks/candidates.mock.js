/**
 * Mock candidate factory for testing and development
 */
const skills = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "HTML",
  "CSS",
  "Git",
  "Docker",
  "AWS",
  "Vue.js",
  "Angular",
  "Python",
  "Django",
  "Java",
  "Spring Boot",
  "GraphQL",
  "REST API",
];

const names = [
  "Nguyen Van A",
  "Tran Thi B",
  "Hoang Van C",
  "Pham Thi D",
  "Vu Van E",
  "Ngo Thi F",
  "Ly Van G",
  "Mai Thi H",
  "Dinh Van I",
  "Vu Thi K",
];

export const getMockCandidate = (overrides = {}) => {
  const id = overrides.id || Math.floor(Math.random() * 1000);
  const randomSkills = skills
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 5) + 2);
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomScore = Math.random();

  return {
    id,
    fullName: overrides.fullName || randomName,
    email: overrides.email || `user${id}@example.com`,
    skills: overrides.skills || randomSkills,
    matchScore:
      overrides.matchScore !== undefined ? overrides.matchScore : randomScore,
    status: overrides.status || (randomScore > 0.7 ? "available" : "pending"),
    ...overrides,
  };
};

export const getMockCandidates = (count = 10, overrides = {}) => {
  return Array.from({ length: count }, (_, idx) =>
    getMockCandidate({ id: idx + 1, ...overrides })
  );
};
