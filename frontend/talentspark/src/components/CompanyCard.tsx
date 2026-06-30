import type { Company } from '../types/company';

type Props = {
  companies: Company[];
};


function CompanyCard({companies}:Props) {
  //const [company, setCompanies] = useState<Company[]>([]);
  //async function fetchCompanies() {
  //    const companies = await getCompanies();
  //    setCompanies(companies);
  //}

  //useEffect(() => {
  //  fetchCompanies();
  //}, []);


  return (
    <div className="company-card">
      {companies.map((comp) => (
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