import { Dashboard, Footer, Navbar, Services, Transactions, Welcome } from "@components/ui";



function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        
        <Welcome />
      </div>
        <Services />
        <Dashboard />
        <Transactions />
        <Footer />
    </div>
  );
}

export default HomePage