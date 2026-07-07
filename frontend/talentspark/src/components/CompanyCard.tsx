import { useState } from "react";
import type { Company } from "../types/company";
import type { Job } from "../types/job";

type Props = {
  companies: Company[];
  jobs: Job[];
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
  onAdd: (company: Company) => void;
};

function CompanyCard({
  companies,
  jobs,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const [editCompanyId, setEditCompanyId] = useState<number | null>(null);

  const emptyCompany: Company = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
    jobs: [],
  };

  const [addform, setAddform] = useState<Company>(emptyCompany);
  const [editform, setEditform] = useState<Company>(emptyCompany);

  const handleAdd = () => {
    onAdd(addform);
    setAddform(emptyCompany);
  };

  const handleSave = () => {
    onEdit(editform);
    setEditCompanyId(null);
    setEditform(emptyCompany);
  };

  const handleCancel = () => {
    setEditCompanyId(null);
    setEditform(emptyCompany);
  };

  return (
    <>
      {/* Company Cards */}
      <div className="companies-container">
        {companies.map((company) => (
          <div className="company-card" key={company.id}>
            {editCompanyId === company.id ? (
              <>
                <h2>Edit Company</h2>

                <input
                  type="text"
                  value={editform.name}
                  placeholder="Company Name"
                  onChange={(e) =>
                    setEditform({ ...editform, name: e.target.value })
                  }
                />
                <br />
                <br />

                <input
                  type="email"
                  value={editform.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setEditform({ ...editform, email: e.target.value })
                  }
                />
                <br />
                <br />

                <input
                  type="text"
                  value={editform.phone}
                  placeholder="Phone"
                  onChange={(e) =>
                    setEditform({ ...editform, phone: e.target.value })
                  }
                />
                <br />
                <br />

                <input
                  type="text"
                  value={editform.location}
                  placeholder="Location"
                  onChange={(e) =>
                    setEditform({ ...editform, location: e.target.value })
                  }
                />
                <br />
                <br />

                <div className="company-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{company.name}</h2>

                <p>
                  <strong>Email:</strong> {company.email}
                </p>

                <p>
                  <strong>Phone:</strong> {company.phone}
                </p>

                <p>
                  <strong>Location:</strong> {company.location}
                </p>

                <p>
                  <strong>Jobs:</strong>{" "}
                  {
                    jobs.filter((job) => job.company_id === company.id).length
                  }{" "}
                  Opening
                  {jobs.filter((job) => job.company_id === company.id).length !==
                  1
                    ? "s"
                    : ""}
                </p>

                <div className="company-actions">
                  <button
                    onClick={() => {
                      setEditCompanyId(company.id);
                      setEditform(company);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => onDelete(company.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Company Form */}
      <div className="add-company">
        <h2>Add Company</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={addform.name}
          onChange={(e) =>
            setAddform({ ...addform, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={addform.email}
          onChange={(e) =>
            setAddform({ ...addform, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={addform.phone}
          onChange={(e) =>
            setAddform({ ...addform, phone: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={addform.location}
          onChange={(e) =>
            setAddform({ ...addform, location: e.target.value })
          }
        />

        <br />
        <br />

        <button onClick={handleAdd}>Add Company</button>
      </div>
    </>
  );
}

export default CompanyCard;