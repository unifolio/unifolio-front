import { useState, useEffect } from "react";
import API from "lib/api.js";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await API.get.all_categories();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);
  return { categories };
};

export default useFetchCategories;
