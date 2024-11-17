import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-green-900 dark:bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">HOFWAMS</h3>
            <p className="text-gray-300">
              Leading solution in the hospitality industry reducing food waste
              and making a more sustainable future.
            </p>
          </div>
          {["Links", "Support", "Information"].map((section) => (
            <div key={section}>
              <h3 className="font-bold text-xl mb-4">{section}</h3>
              <ul className="space-y-2">
                {["About Us", "Services", "Contact", "Privacy Policy"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-green-800 dark:border-green-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} - HOFWAMS</p>
        </div>
      </div>
    </footer>
  );
};
