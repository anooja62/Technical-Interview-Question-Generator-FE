export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-blue-50 via-white to-purple-100 border-t border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-purple-700">CodeCrack</span>. All rights reserved.
          </div>
  
          <div className="flex gap-6 text-sm">
            <a href="/about" className="hover:text-purple-600 transition">About</a>
            <a href="/contact" className="hover:text-purple-600 transition">Contact</a>
            <a href="/privacy" className="hover:text-purple-600 transition">Privacy</a>
          </div>
        </div>
      </footer>
    );
  }
  