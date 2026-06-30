import { getCompanies } from '../Services/CompanyService';
import { useEffect, useState } from 'react';
import type { Company } from '../types/company';

function CompanyCard() {
  const [company, setCompanies] = useState<Company[]>([]);
  async function fetchCompanies() {
      const companies = await getCompanies();
      setCompanies(companies);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);


  return (
    <div className="company-card">
      {company.map((comp) => (
        <div key={comp.id}>
          <h1>{comp.name}</h1>
          <p>Email: {comp.email}</p>
          <p>Phone: {comp.phone}</p>
          <p>Location: {comp.location}</p>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}

export default CompanyCard;