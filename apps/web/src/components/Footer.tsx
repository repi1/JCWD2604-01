export const Footer = () => {
  return (
    <div className="bg-[#48744D] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="py-2 px-4 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
