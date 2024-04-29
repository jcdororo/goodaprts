import { useEffect, useState } from "react";
import { readMajorCategory } from "../../api/product/readMajorCategory";

const MajorCategory = () => {
  const [majorCategories, setMajorCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const readMajorCategories = (await readMajorCategory()) as [];
      setMajorCategories(readMajorCategories);
    })();
  }, []);

  return (
    <div className="flex gap-4">
      {majorCategories.map((x, _) => (
        <div key={x}>{x}</div>
      ))}
    </div>
  );
};

export default MajorCategory;
