import { MdSearch } from "react-icons/md";
import { useProvider } from "./Context/AppContext"; 

export default function Search() {
  const { searchQuery, setSearchQuery } = useProvider(); 

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="form items-center" onSubmit={handleSearchSubmit}>
      <input
        className="p-1.5 border-0 outline-0 rounded-l-md"
        type="search"
        id="search"
        placeholder="Search for a task"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-teal-600 p-1.5 rounded-r-md text-center place-content-center">
        <MdSearch role="button" className="text-white text-2xl" />
      </button>
    </form>
  );
}
