import { Web3Provider } from "@components/provider";
import { Dashboard, Footer, Navbar, Services, Transactions, Welcome } from "@components/ui";



function HomePage({children}) {
  return (
    <Web3Provider>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        {children}
        <Welcome />
       
      </div>
        <Services />
        <Dashboard />
        <Transactions />
        <Footer />
    </div>
    </Web3Provider>
  );
}

export default HomePage