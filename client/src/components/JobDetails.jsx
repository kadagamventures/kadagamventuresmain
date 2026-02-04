import { useParams, useNavigate } from "react-router-dom";
import useJobsStore from "../zustand/useJobsStore";
import slugify from "../utils/slugify";
import RightClipAccent from "./RightClipAccent";
import { useEffect, useState } from "react";

import JobApplyModal from "./modals/JobApplyModal";

const JobDetails = () => {

    const [openApply, setOpenApply] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();

    const { jobs, loadJobs } = useJobsStore();


    useEffect(() => {
        if (jobs.length === 0) {
            loadJobs();
        }
    }, [jobs.length, loadJobs]);

    // Wait until jobs are available
    if (jobs.length === 0) {
        return (
            <p className="text-center mt-20 text-gray-500">
                Loading job...
            </p>
        );
    }

    const job = jobs.find((j) => slugify(j.title) === slug);

    // Job not found (invalid slug)
    if (!job) {
        return (
            <div className="text-center mt-20 space-y-4">
                <p className="text-gray-500">Job not found</p>
                <button
                    onClick={() => navigate("/careers")}
                    className="text-sm text-gray-600 hover:underline"
                >
                    ← Back to Careers
                </button>
            </div>
        );
    }

    return (
        <main className="max-w-5xl mx-auto p-8 space-y-12">
            <RightClipAccent height="h-32 md:h-110" />
            {/* Back */}
            <button
                onClick={() => navigate("/careers")}
                title="Careers Page"
                className="text-sm pb-8 cursor-pointer text-gray-600 top-12 relative hover:underline"
            >
                ← Back to Careers
            </button>

            {/* Header */}
            <header className="space-y-2">
                <h1 className="text-4xl font-bold">{job.title}</h1>
                <p className="text-gray-500">
                    {job.location} • {job.experience} • {job.employmentType}
                </p>
                <p className="text-sm text-gray-400">
                    Open Positions: {job.positionCount}
                </p>
            </header>

            {/* Overview */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Job Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                    {job.overview}
                </p>
            </section>

            {/* Responsibilities */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>

            {/* Skills */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-1.5 text-sm bg-gray-100 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* What We Offer */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">What We Offer</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {job.whatWeOffer.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>

            {/* How to Apply */}
            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">How to Apply</h2>
                <p className="text-gray-600 leading-relaxed">
                    {job.howToApply}
                </p>
            </section>

            {/* CTA */}
            <div className="pt-6">
                <button
                    onClick={() => setOpenApply(true)}
                    className="px-12 py-4 bg-[#405BAA] text-white rounded-xl hover:bg-[#405BAA]/90 transition">
                    Apply Now
                </button>
            </div>

            <JobApplyModal
                isOpen={openApply}
                onClose={() => setOpenApply(false)}
                job={job}
            />
        </main>
    );
};

export default JobDetails;
