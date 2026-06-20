export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Apna Kisan</h3>
            <p>India's Digital Agriculture Network</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            {/* Social media links */}
          </div>
        </div>
      </div>
    </footer>
  );
}
