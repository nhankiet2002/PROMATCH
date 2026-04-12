// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";

const CategoryGridItem = ({ category, index, isSlide }) => {
  const Wrapper = isSlide ? "div" : Spring;
  const wrapperProps = isSlide ? {} : { type: "slideUp", index };

  return (
    <Wrapper className="card flex flex-col h-full" {...wrapperProps}>
      <div className="flex items-start gap-[14px] mb-2.5">
        <div className="img-wrapper flex flex-1 items-center justify-center">
          <img src={category?.thumbnail?.url} alt={category?.thumbnail?.alt} />
        </div>
        {/* <SubmenuTrigger /> */}
      </div>
      <div className="flex items-center gap-2 mb-2.5">
        <NavLink
          className={`h6 !leading-[1.4] block max-w-[180px] transition hover:text-accent ${
            isSlide ? "mb-0" : ""
          }`}
          to="/category-editor"
        >
          {category.name}
        </NavLink>
        {category.status && (
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
              category.status === "active"
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:shadow-lg"
                : category.status === "hidden"
                ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md hover:shadow-lg"
                : category.status === "draft"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md hover:shadow-lg"
                : "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:shadow-lg"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                category.status === "active"
                  ? "bg-white"
                  : category.status === "hidden"
                  ? "bg-white"
                  : "bg-white"
              } animate-pulse`}
            />
            {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
          </span>
        )}
      </div>

      {!isSlide && (
        <div className="grid grid-cols-2 gap-1.5 mt-4">
          <NavLink
            className="btn btn--outline blue !text-sm"
            to="/category-editor"
          >
            <i className="icon icon-pen-solid text-xs" /> Edit
          </NavLink>
          <button className="btn btn--outline red !text-sm">Delete</button>
        </div>
      )}
    </Wrapper>
  );
};

export default CategoryGridItem;
