import Image from "next/image";

const categories = [
    { name: "T-Shirt", icon: "/icons/tshirt.svg" },
    { name: "Shirt", icon: "/icons/shirt.svg" },
    { name: "Pant", icon: "/icons/pant.svg" },
    { name: "Panjabi", icon: "/icons/panjabi.svg" },
    { name: "Shoes", icon: "/icons/shoes.svg" },
    { name: "Sunglasses", icon: "/icons/sunglasses.svg" },
    { name: "Jacket", icon: "/icons/jacket.svg" },
    { name: "Cap", icon: "/icons/cap.svg" },
    { name: "Watch", icon: "/icons/watch.svg" },
    { name: "Bag", icon: "/icons/bag.svg" },
];

const CategorySection = () => {
    return (
        <section className="pb-14 pt-10 bg-gray-50">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Top Categories</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Explore a world of choices across our most popular fashion categories
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6 max-w-7xl mx-auto px-4">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                        <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gray-100">
                            <Image
                                src={cat.icon}
                                alt={cat.name}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-gray-700 text-sm font-medium text-center">{cat.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategorySection;
