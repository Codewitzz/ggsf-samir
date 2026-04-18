export type AlumniRegistrationItem = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  graduationYear?: string;
  department?: string;
  company?: string;
  designation?: string;
  createdAt: number;
  updatedAt: number;
};

export type AlumniStoryItem = {
  id: string;
  name: string;
  batch?: string;
  title?: string;
  story: string;
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEYS = {
  registrations: "ggsf_admin_alumni_registrations_v1",
  stories: "ggsf_admin_alumni_stories_v1",
} as const;

function now() {
  return Date.now();
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `alumni_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function dispatchChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_alumni_changed"));
}

export function getAlumniRegistrations(): AlumniRegistrationItem[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<AlumniRegistrationItem[]>(storage.getItem(STORAGE_KEYS.registrations));
  return Array.isArray(parsed) ? parsed : [];
}

export function setAlumniRegistrations(items: AlumniRegistrationItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.registrations, JSON.stringify(items));
  dispatchChanged();
}

export function addAlumniRegistration(
  input: Omit<AlumniRegistrationItem, "id" | "createdAt" | "updatedAt">,
) {
  const item: AlumniRegistrationItem = {
    id: makeId(),
    ...input,
    createdAt: now(),
    updatedAt: now(),
  };
  setAlumniRegistrations([item, ...getAlumniRegistrations()]);
}

export function deleteAlumniRegistration(id: string) {
  setAlumniRegistrations(getAlumniRegistrations().filter((x) => x.id !== id));
}

export function getAlumniStories(): AlumniStoryItem[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<AlumniStoryItem[]>(storage.getItem(STORAGE_KEYS.stories));
  return Array.isArray(parsed) ? parsed : [];
}

export function setAlumniStories(items: AlumniStoryItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.stories, JSON.stringify(items));
  dispatchChanged();
}

export function addAlumniStory(input: Omit<AlumniStoryItem, "id" | "createdAt" | "updatedAt">) {
  const item: AlumniStoryItem = {
    id: makeId(),
    ...input,
    createdAt: now(),
    updatedAt: now(),
  };
  setAlumniStories([item, ...getAlumniStories()]);
}

export function deleteAlumniStory(id: string) {
  setAlumniStories(getAlumniStories().filter((x) => x.id !== id));
}

export function replaceAlumniState(registrations: AlumniRegistrationItem[], stories: AlumniStoryItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.registrations, JSON.stringify(registrations));
  storage.setItem(STORAGE_KEYS.stories, JSON.stringify(stories));
  dispatchChanged();
}
