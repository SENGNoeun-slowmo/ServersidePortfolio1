// components/Experience.tsx
interface Exp {
  id: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities?: string[];
}

interface ExperienceProps {
  experiences?: Exp[];
  isLoading: boolean;
  isError: boolean;
}

const formatPeriod = (start: string, end: string) =>
  `${new Date(start).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} — ${
    end.toLowerCase() === 'present' ? 'Present' : new Date(end).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }`;

export default function Experience({ experiences = [], isLoading, isError }: ExperienceProps) {
  if (isLoading) return <div className="py-20 text-center">Loading experience...</div>;
  if (isError) return <div className="py-20 text-center text-red-400">Failed to load experience</div>;
  if (experiences.length === 0) return null;

  return (
    <section className="py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="space-y-10">
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="
                bg-white/5 dark:bg-white/5
                backdrop-blur-lg border border-white/10
                rounded-2xl p-7 md:p-9
                shadow-xl hover:shadow-2xl transition-shadow
              "
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-xl text-indigo-400">
                    {exp.company_name}
                  </p>
                </div>
                <div className="text-gray-600 font-medium whitespace-nowrap">
                  {formatPeriod(exp.start_date, exp.end_date)}
                </div>
              </div>

              {exp.responsibilities?.length ? (
                <ul className="mt-6 space-y-3 ">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="pl-6 relative">
                      <span className="absolute left-0 top-[0.6em] w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}