import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  getCompanies,
  updateCompany,
  deleteCompany,
  createCompany,
} from "./Services/CompanyService";
import type { Company } from "./types/company";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  async function fetchCompanies() {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setError("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(company: Company) {
    try {
      const updatedCompany = await updateCompany(company.id, company);

      setCompanies((prev) =>
        prev.map((item) =>
          item.id === updatedCompany.id ? updatedCompany : item
        )
      );
    } catch (err) {
      setError("Failed to update company");
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCompany(id);

      setCompanies((prev) =>
        prev.filter((company) => company.id !== id)
      );
    } catch (err) {
      setError("Failed to delete company");
    }
  }

  async function handleAdd(company: Company) {
    try {
      const newCompany = await createCompany(company);
      setCompanies((prev) => [...prev, newCompany]);
    } catch (err) {
      setError("Failed to add company");
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavBar />
      <br />

      <CompanyCard
        companies={companies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      <JobCard />
      <Footer />
    </>
  );
}

export default App;