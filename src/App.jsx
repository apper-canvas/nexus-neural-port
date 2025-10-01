import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Header from "@/components/organisms/Header";
import Dashboard from "@/components/pages/Dashboard";
import Contacts from "@/components/pages/Contacts";
import ContactDetail from "@/components/pages/ContactDetail";
import Pipeline from "@/components/pages/Pipeline";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createContactTrigger, setCreateContactTrigger] = useState(0);
  const [createDealTrigger, setCreateDealTrigger] = useState(0);

  const handleCreateContact = () => {
    setCreateContactTrigger(prev => prev + 1);
  };

  const handleCreateDeal = () => {
    setCreateDealTrigger(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <MobileSidebar 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
          />

          <div className="flex-1 flex flex-col min-h-screen">
            <div className="lg:hidden fixed top-4 left-4 z-40">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobileMenuOpen(true)}
              >
                <ApperIcon name="Menu" size={20} />
              </Button>
            </div>

            <Header 
              onCreateContact={handleCreateContact}
              onCreateDeal={handleCreateDeal}
            />

            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route 
                    path="/contacts" 
                    element={
                      <Contacts 
                        onCreateContact={handleCreateContact}
                        createContactTrigger={createContactTrigger}
                      />
                    } 
                  />
                  <Route path="/contacts/:id" element={<ContactDetail />} />
                  <Route 
                    path="/pipeline" 
                    element={
                      <Pipeline 
                        onCreateDeal={handleCreateDeal}
                        createDealTrigger={createDealTrigger}
                      />
                    } 
                  />
                </Routes>
              </div>
            </main>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;