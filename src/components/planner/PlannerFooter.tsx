import { Link } from "react-router-dom";

const PlannerFooter = () => (
  <footer className="bg-royal text-cream py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold gold-text mb-4">OM SAI</h3>
          <p className="text-cream/60 text-sm leading-relaxed">
            AI Event Planner — tell us what you need, and we'll match you with the
            right OM SAI package across our Banquet Hall and Lawns.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-gold-light">Explore</h4>
          <div className="space-y-2">
            <Link to="/planner" className="block text-cream/60 hover:text-gold-light transition-colors text-sm">
              AI Planner
            </Link>
            <Link to="/banquet" className="block text-cream/60 hover:text-gold-light transition-colors text-sm">
              Banquet Hall
            </Link>
            <Link to="/lawns" className="block text-cream/60 hover:text-gold-light transition-colors text-sm">
              Lawns
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-gold-light">Contact</h4>
          <div className="space-y-2 text-cream/60 text-sm">
            <p>📍 Om Sai Banquet & Lawns, Baramati, Maharashtra</p>
            <p>📞 +91 98226 58766</p>
            <p>✉️ omsailawns@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default PlannerFooter;
