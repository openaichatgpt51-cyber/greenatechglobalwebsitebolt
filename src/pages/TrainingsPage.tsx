import { Link } from 'react-router-dom';
import { ArrowRight, Building2, GraduationCap, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const corporateCourses = [
  'Cloud Architecture & DevOps',
  'AI & Machine Learning for Business',
  'Cybersecurity Awareness & Defence',
  'Data Engineering & Analytics',
  'Digital Transformation Strategy',
  'Agile & Product Management',
];

const corporateStats = [
  { value: '500+', label: 'Professionals Trained' },
  { value: '30+', label: 'Corporate Clients' },
  { value: '4.9/5', label: 'Satisfaction Score' },
];

const starterTracks = [
  {
    title: 'Software Development Bootcamp',
    duration: '12 weeks',
    level: 'Beginner → Junior',
    description: 'Full-stack web development from zero — HTML through to React, Node, and cloud deployment.',
    skills: ['HTML/CSS/JS', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Git'],
  },
  {
    title: 'Cloud & DevOps Fundamentals',
    duration: '8 weeks',
    level: 'Beginner → Associate',
    description: 'Hands-on training in AWS, CI/CD pipelines, containers, and infrastructure-as-code.',
    skills: ['AWS EC2/S3', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux'],
  },
  {
    title: 'Data Science & AI Essentials',
    duration: '10 weeks',
    level: 'Beginner → Practitioner',
    description: 'Python, statistics, machine learning fundamentals, and real-world model deployment.',
    skills: ['Python', 'Pandas', 'scikit-learn', 'PyTorch', 'Model deployment', 'Data viz'],
  },
  {
    title: 'Cybersecurity Foundations',
    duration: '8 weeks',
    level: 'Beginner → Associate',
    description: 'Network security, ethical hacking basics, threat analysis, and security operations.',
    skills: ['Network security', 'Penetration testing', 'SIEM', 'Threat analysis', 'OWASP', 'Incident response'],
  },
  {
    title: 'Product & UX Design',
    duration: '10 weeks',
    level: 'Beginner → Practitioner',
    description: 'Design thinking, user research, prototyping, and modern product design workflows.',
    skills: ['Figma', 'Design systems', 'User research', 'Prototyping', 'Design thinking', 'UX writing'],
  },
  {
    title: 'Engineering Leadership',
    duration: '6 weeks',
    level: 'Mid → Senior',
    description: 'Technical leadership, system design, team management, and strategic decision-making.',
    skills: ['System design', 'Tech strategy', 'Team management', 'Code reviews', 'Roadmapping', 'Mentoring'],
  },
];

export default function TrainingsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <PageHero
        eyebrow="Training & Education"
        title={<>Grow the People.<br />Grow the Talent.<br />Grow the Business.</>}
        subtitle="We are nurturing the world's next tech pipeline from within Africa. Our Youth Empowerment Hub provides structured training, creating world-class specialists for the global economy, while our corporate programs deliver practical AI expertise — not just certificates — to keep your organization competitive."
        image="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Corporate Training */}
      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-start gap-6 mb-12">
            <div className="w-14 h-14 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
              <Building2 size={22} className="text-brand-green" />
            </div>
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                Corporate Training
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Bespoke, on-site or remote programmes that upskill your workforce and align your
                organisation with the demands of today's technology landscape. We deliver practical
                AI expertise — not just certificates — to keep your organization competitive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border mb-12">
            {corporateCourses.map((course) => (
              <div
                key={course}
                className="bg-brand-dark p-6 group hover:bg-brand-card transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{course}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-px bg-brand-border mb-12 max-w-2xl">
            {corporateStats.map((s) => (
              <div key={s.label} className="bg-brand-dark p-6 text-center">
                <div className="text-3xl lg:text-4xl font-black text-brand-green mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-green text-black text-sm font-semibold px-7 py-3.5 hover:bg-lime-400 transition-colors duration-200 group"
          >
            Request a corporate programme
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* Next Generation Hub */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] border-y border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-start gap-6 mb-12">
            <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                The Next Generation Hub
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Intensive, structured pathways equipping newcomers with world-class engineering,
                product, and leadership skills. We turn African potential into global technology talent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
            {starterTracks.map((track) => (
              <div
                key={track.title}
                className="bg-[#0a0a0a] p-8 group hover:bg-brand-card transition-all duration-300 cursor-pointer border-l-2 border-transparent hover:border-brand-green"
              >
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs text-brand-green border border-brand-green/30 px-2 py-0.5">
                    {track.duration}
                  </span>
                  <span className="text-xs text-gray-500 border border-brand-border px-2 py-0.5">
                    {track.level}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-3 group-hover:text-brand-green transition-colors">
                  {track.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{track.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {track.skills.map((skill) => (
                    <span key={skill} className="text-xs text-gray-600 bg-brand-dark border border-brand-border px-2 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-7 py-3.5 hover:bg-white hover:text-brand-dark transition-all duration-200 group"
            >
              Enrol now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
