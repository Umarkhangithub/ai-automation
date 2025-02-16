import { memo } from "react";
import { useSelector } from "react-redux";


// Feature Component
const Feature = () => {
  // Redux Store se data fetch karna
  const FEATURES = useSelector((state) => state.features.items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {FEATURES.map(({ id, title, description, icon: Icon }) => (
        <div
          key={id}
          className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105"
        >
          <Icon className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(Feature);
