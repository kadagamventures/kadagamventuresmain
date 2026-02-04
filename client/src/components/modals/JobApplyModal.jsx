import React, { useEffect } from "react"
import { IoClose } from "react-icons/io5"
import useJobApplyStore from "../../zustand/useJobApplyStore"

const JobApplyModal = ({ isOpen, onClose, job }) => {
    const { form, setField, submitApplication, loading, success,
        resetForm, } = useJobApplyStore()

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                resetForm()
                onClose()
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [success, onClose, resetForm])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="relative w-full max-w-4xl bg-white rounded-2xl p-8 overflow-y-auto max-h-[80vh]">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-black"
                >
                    <IoClose size={24} />
                </button>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-3xl font-bold text-green-600 mb-3">
                            Applied Successfully!
                        </h2>
                        <p className="text-gray-600">
                            Our team will contact you soon.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="space-y-2">
                            <p className="text-[#405BAA] font-medium">{job.positionCount} Openings</p>
                            <h2 className="text-3xl font-bold">{job.title}</h2>
                        </div>

                        {/* ================= Resume Upload ================= */}
                        <div className="mt-8 space-y-2">
                            <label className="font-medium">Attach Resume</label>

                            <label
                                htmlFor="resume"
                                className="border rounded-lg p-4 flex justify-center items-center cursor-pointer"
                            >
                                {form.resume ? form.resume.name : "Choose File"}
                            </label>

                            <input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => setField("resume", e.target.files[0])}
                            />
                        </div>

                        {/* ================= Form Fields ================= */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

                            <Input label="First Name" value={form.firstName} onChange={(v) => setField("firstName", v)} />
                            <Input label="Last Name" value={form.lastName} onChange={(v) => setField("lastName", v)} />
                            <Input label="Email" value={form.email} onChange={(v) => setField("email", v)} />
                            <Input label="Gender" value={form.gender} onChange={(v) => setField("gender", v)} />
                            <Input label="Phone" prefix="+91" value={form.phone} onChange={(v) => setField("phone", v)} />
                            <Input label="Location" value={form.location} onChange={(v) => setField("location", v)} />
                            <Input label="Current Salary" value={form.currentSalary} onChange={(v) => setField("currentSalary", v)} />
                            <Input label="Expected Salary" value={form.expectedSalary} onChange={(v) => setField("expectedSalary", v)} />
                            <Input label="Experience" value={form.experience} onChange={(v) => setField("experience", v)} />

                            {/* ✅ BOOLEAN SELECT */}
                            <Input
                                label="Immediate Joiner"
                                type="select"
                                value={form.isImmediateJoiner}
                                onChange={(v) => setField("isImmediateJoiner", v)}
                                options={[
                                    { label: "Yes, I can join immediately", value: true },
                                    { label: "No, I need notice period", value: false },
                                ]}
                            />

                            <Input label="Notice Period (days)" value={form.noticePeriod} onChange={(v) => setField("noticePeriod", v)} />
                            {/* <Input label="Joining Days" value={form.joiningDays} onChange={(v) => setField("joiningDays", v)} /> */}
                        </div>
                    </>
                )}




                {/* ================= Submit ================= */}
                <button
                    onClick={() => submitApplication(job._id)}
                    disabled={loading}
                    className="w-full mt-10 py-4 bg-[#405BAA] text-white rounded-xl"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

            </div>
        </div >
    )
}

const Input = ({
    label,
    prefix,
    type = "text",
    options = [],
    value,
    onChange,
}) => (
    <div>
        <label className="text-sm font-medium">{label}</label>

        {type === "select" ? (
            <select
                value={value === "" ? "" : String(value)}
                onChange={(e) => onChange(e.target.value === "true")}
                className="w-full border rounded-lg px-3 py-2"
            >
                <option value="">Select</option>

                {options.map((opt, i) => (
                    <option key={i} value={String(opt.value)}>
                        {opt.label}
                    </option>
                ))}
            </select>
        ) : (
            <div className="flex items-center border rounded-lg px-3 py-2">
                {prefix && <span className="mr-2 text-gray-400">{prefix}</span>}

                <input
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full outline-none"
                />
            </div>
        )}
    </div>
)


export default JobApplyModal