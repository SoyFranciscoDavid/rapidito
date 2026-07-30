import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 md:gap-8 mb-16">
      {CATEGORIES.map((cat) => (
        <CategoryCard key={cat.name} category={cat} />
      ))}
    </div>
  );
}
