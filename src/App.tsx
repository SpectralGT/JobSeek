import { useState, useCallback } from 'react'
import type { UserData, PersonalDetails, PublicInformation, EducationEntry, ExperienceEntry, ProjectEntry, Skills, LeadershipEntry } from './types/userData'
import { PersonalDetails as PersonalDetailsSection } from './components/PersonalDetails'
import { PublicInfo } from './components/PublicInfo'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { LeadershipSection } from './components/LeadershipSection'
import { JsonOutput } from './components/JsonOutput'

function defaultPersonal(): PersonalDetails {
  return { Name: '', Street: '', Town: '', State: '', Zipcode: '' };
}
function defaultPublic(): PublicInformation {
  return { phone: '', email: '', linkedin: '', github: '' };
}
function defaultEducation(): EducationEntry {
  return { university: '', start: '', end: '', city: '', state: '', courseType: '', courseName: '', coursework: [''] };
}
function defaultExperience(): ExperienceEntry {
  return { companyName: '', role: '', start: '', end: '', city: '', state: '', work: [''] };
}
function defaultProject(): ProjectEntry {
  return { name: '', stack: [], month: '', year: '' };
}
function defaultSkills(): Skills {
  return { languages: [], tools: [], more: [] };
}
function defaultLeadership(): LeadershipEntry {
  return { organisationName: '', work: [''] };
}

function buildUserData(form: FormState): UserData {
  return {
    'Personal Details': form.personal,
    'Public Information': form.public,
    Education: form.education.map((e) => ({
      ...e,
      coursework: e.coursework.filter((s) => s.trim()).length ? e.coursework.filter((s) => s.trim()) : [],
    })),
    experience: form.experience.map((e) => ({
      ...e,
      work: e.work.filter((s) => s.trim()).length ? e.work.filter((s) => s.trim()) : [],
    })),
    projects: form.projects,
    skills: form.skills,
    leadership: form.leadership.map((e) => ({
      ...e,
      work: e.work.filter((s) => s.trim()).length ? e.work.filter((s) => s.trim()) : [],
    })),
  };
}

interface FormState {
  personal: PersonalDetails;
  public: PublicInformation;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: Skills;
  leadership: LeadershipEntry[];
}

const initialForm: FormState = {
  personal: defaultPersonal(),
  public: defaultPublic(),
  education: [defaultEducation()],
  experience: [defaultExperience()],
  projects: [defaultProject()],
  skills: defaultSkills(),
  leadership: [defaultLeadership()],
};

export default function App() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [jsonString, setJsonString] = useState('');

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generateJson = useCallback(() => {
    const data = buildUserData(form);
    setJsonString(JSON.stringify(data, null, 2));
  }, [form]);

  return (
    <div className="container">
      <h1>Job Application Details</h1>
      <p className="subtitle">Fill in every field. Output matches userData.json structure.</p>

      <PersonalDetailsSection value={form.personal} onChange={(v) => update('personal', v)} />
      <PublicInfo value={form.public} onChange={(v) => update('public', v)} />
      <EducationSection value={form.education} onChange={(v) => update('education', v)} />
      <ExperienceSection value={form.experience} onChange={(v) => update('experience', v)} />
      <ProjectsSection value={form.projects} onChange={(v) => update('projects', v)} />
      <SkillsSection value={form.skills} onChange={(v) => update('skills', v)} />
      <LeadershipSection value={form.leadership} onChange={(v) => update('leadership', v)} />

      <JsonOutput jsonString={jsonString} onGenerate={generateJson} />
    </div>
  );
}
