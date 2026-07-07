import type { Job } from "../types/job";
import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
    jobs: Job[];
    companies: Company[];
    onEdit: (job: Job) => void;
    onDelete: (id: number) => void;
    onAdd: (job: Job) => void;
};

function JobCard({
    jobs,
    companies,
    onEdit,
    onDelete,
    onAdd,
}: Props) {

    const emptyJob: Job = {
        id: 0,
        title: "",
        description: "",
        salary: "",
        company_id: 0
    };

    const [editJobId, setEditJobId] = useState<number | null>(null);

    const [addform, setAddform] = useState<Job>(emptyJob);

    const [editform, setEditform] = useState<Job>(emptyJob);


    const handleAdd = () => {
        onAdd(addform);
        setAddform(emptyJob);
    };


    const handleSave = () => {
        onEdit(editform);
        setEditJobId(null);
        setEditform(emptyJob);
    };


    const handleCancel = () => {
        setEditJobId(null);
        setEditform(emptyJob);
    };


    return (
        <>

            <div className="companies-container">

                {jobs.map((job) => (

                    <div className="company-card" key={job.id}>

                        {editJobId === job.id ? (

                            <>

                                <h2>Edit Job</h2>


                                <input
                                    type="text"
                                    value={editform.title}
                                    placeholder="Job Title"
                                    onChange={(e) =>
                                        setEditform({
                                            ...editform,
                                            title: e.target.value
                                        })
                                    }
                                />


                                <input
                                    type="text"
                                    value={editform.description}
                                    placeholder="Description"
                                    onChange={(e) =>
                                        setEditform({
                                            ...editform,
                                            description: e.target.value
                                        })
                                    }
                                />


                                <input
                                    type="text"
                                    value={editform.salary}
                                    placeholder="Salary"
                                    onChange={(e) =>
                                        setEditform({
                                            ...editform,
                                            salary: e.target.value
                                        })
                                    }
                                />


                                <input
                                    type="number"
                                    value={editform.company_id}
                                    placeholder="Company ID"
                                    onChange={(e) =>
                                        setEditform({
                                            ...editform,
                                            company_id: Number(e.target.value)
                                        })
                                    }
                                />


                                <div className="company-actions">

                                    <button onClick={handleSave}>
                                        Save
                                    </button>


                                    <button onClick={handleCancel}>
                                        Cancel
                                    </button>

                                </div>

                            </>


                        ) : (

                            <>

                                <h2>{job.title}</h2>


                                <p>
                                    <strong>Description:</strong>
                                    <br />
                                    {job.description}
                                </p>


                                <p>
                                    <strong>Salary:</strong> {job.salary}
                                </p>


                                <p>
                                    <strong>Company:</strong>{" "}
                                    {
                                        companies.find(
                                            c => c.id === job.company_id
                                        )?.name || job.company_id
                                    }
                                </p>


                                <div className="company-actions">

                                    <button
                                        onClick={() => {

                                            setEditJobId(job.id);

                                            setEditform({
                                                id: job.id,
                                                title: job.title,
                                                description: job.description,
                                                salary: job.salary,
                                                company_id: job.company_id
                                            });

                                        }}
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => onDelete(job.id)}
                                    >
                                        Delete
                                    </button>

                                </div>


                            </>

                        )}

                    </div>

                ))}

            </div>



            <div className="add-company">

                <h2>Add Job</h2>


                <input
                    type="text"
                    placeholder="Job Title"
                    value={addform.title}
                    onChange={(e) =>
                        setAddform({
                            ...addform,
                            title: e.target.value
                        })
                    }
                />


                <input
                    type="text"
                    placeholder="Description"
                    value={addform.description}
                    onChange={(e) =>
                        setAddform({
                            ...addform,
                            description: e.target.value
                        })
                    }
                />


                <input
                    type="text"
                    placeholder="Salary"
                    value={addform.salary}
                    onChange={(e) =>
                        setAddform({
                            ...addform,
                            salary: e.target.value
                        })
                    }
                />


                <input
                    type="number"
                    placeholder="Company ID"
                    value={addform.company_id}
                    onChange={(e) =>
                        setAddform({
                            ...addform,
                            company_id: Number(e.target.value)
                        })
                    }
                />


                <br />
                <br />


                <button onClick={handleAdd}>
                    Add Job
                </button>


            </div>

        </>
    );
}


export default JobCard;