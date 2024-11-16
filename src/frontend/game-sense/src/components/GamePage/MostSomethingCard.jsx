import React from "react";

const MostSomethingCard = ({ categories }) => {
  return (
    <div className="card-compact rounded-xl bg-base-100 shadow-md">
      <div className="card-body text-center">
        {/* Card Title */}
        <h2 className="card-title text-gray-500">Top Stats</h2>

        {/* Carousel */}
        <div className="carousel w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              id={`item${index}`}
              className="carousel-item w-full flex flex-col items-center justify-center"
            >
              <div className="text-center">
                <p className="text-lg font-bold">{category.name}</p>
                <p className="text-md">
                  {category.value} {category.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination */}
        <div className="flex justify-center py-2 gap-1">
          {categories.map((_, index) => (
            <a
              key={index}
              href={`#item${index}`}
              className="btn btn-circle btn-xs"
            ></a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostSomethingCard;
