import JobRow from "@/app/components/JobRow";

export default function Jobs({ header, jobs }) {
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{header || 'Recent jobs'}</h2>

        <div className="flex flex-col gap-4">
          {!jobs?.length && (
            <div>No jobs found</div>
          )}
          {jobs && jobs.map(job => (
            <JobRow key={job._id} jobDoc={job} /> // Added a key prop to JobRow
          ))}
        </div>
      </div>
    </div>
  );
}


