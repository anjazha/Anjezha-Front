import { useState, useEffect, useCallback, useMemo } from "react";
import { XIcon } from "lucide-react";
import { SetURLSearchParams} from "react-router-dom";
import { Categories } from "../types/categories";
import { getAllCategory } from "../functions/getAllCategory";
import MultiRangeSlider from "multi-range-slider-react";

interface IProp {
  right: string;
  setRightFilters: React.Dispatch<React.SetStateAction<string>>;
  search: URLSearchParams;
  setSearch: SetURLSearchParams;
}

const FiltersTasker = ({ right, setRightFilters,search,  setSearch }: IProp) => {
  const searchParams = useMemo(()=> new URLSearchParams(search), [search]) 
  const handleInputChange = useCallback((name: string, value: string) => {
    // const updatedParams = new URLSearchParams(searchParams);
    // console.log(name, value)
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearch(searchParams);
  }, [ searchParams, setSearch]);

//   useEffect(()=>setSearch(searchParams),[])

// console.log(searchParams)
  return (
    <div
      className={`h-[calc(100vh-75px)] overflow-auto w-[300px] fixed top-[80px] ${right} py-5 px-4 duration-500 z-40 bg-bodyColor dark:bg-inputDark dark:text-bodyColor shadow-xl rounded-lg`}
    >
      <h1 className="text-center text-xl font-bold">تصفية</h1>

      <CloseButton onClose={() => setRightFilters("right-[-100%]")} />

      <div className="mt-4">
        <form>
          {/* Price Filter */}
          <PriceFilter
            minValue={Number(searchParams.get("minRating")) || 1}
            maxValue={Number(searchParams.get("maxRating")) || 5}
            onMinPriceChange={handleInputChange}
            onMaxPriceChange={handleInputChange}
          />

          <CategoryFilter
            value={Number(searchParams.get("category")) || 0}
            onChange={(id: number) => {
              handleInputChange("category", id.toString());
            }}
          />
        </form>
      </div>
    </div>
  );
};

// Smaller components

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <div
    onClick={onClose}
    className="absolute top-2 cursor-pointer left-3 hover:text-buttonsColor duration-300"
  >
    <XIcon size={30} />
  </div>
);

const PriceFilter = ({
  minValue,
  maxValue,
  onMinPriceChange,
  onMaxPriceChange,
}: {
  minValue: number;
  maxValue: number;
  onMinPriceChange: (name: string, value: string) => void;
  onMaxPriceChange: (name: string, value: string) => void;
}) => {


  return (
    <div className="mt-3" dir="ltr">
      <label className="block font-semibold text-darkColor dark:text-bodyColor">
        التقييم
      </label>
      <MultiRangeSlider
        step={1}
        min={1}
        max={5}
        minValue={minValue}
        maxValue={maxValue}
        thumbLeftColor="blue"
        thumbRightColor="blue"
        barInnerColor="blue"
        style={{ boxShadow: "none", border: "none" }}
        onChange={(e) => {
        //   handleSliderChange(e.minValue, e.maxValue);
        onMinPriceChange("minRating", e.minValue.toString());
        onMaxPriceChange("maxRating", e.maxValue.toString());
        }}
      />
      <div className="mt-2">
        <span>الحد الأدنى: {minValue}</span>
        <span> - </span>
        <span>الحد الأقصى: {maxValue}</span>
      </div>
    </div>
  );
};

const CategoryFilter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (id: number) => void;
}) => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    getAllCategory(setCategories);
  }, []);

  return (
    <div className="mt-3">
      <label className="block font-semibold text-darkColor dark:text-bodyColor">
        الفئات
      </label>
      {categories.length > 0 ? (
        categories.map((category: Categories) => (
          <div key={category.id} className="mt-2">
            <input
              type="radio"
              name="category"
              id={`category-${category.id}`}
              checked={value === +category.id}
              onChange={() => onChange(+category.id)}
            />
            <label htmlFor={`category-${category.id}`} className="mx-1">
              {category.category}
            </label>
          </div>
        ))
      ) : (
        <p>لا توجد فئات</p>
      )}
    </div>
  );
};

export default FiltersTasker;