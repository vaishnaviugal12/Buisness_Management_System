import { Routes, Route } from 'react-router'
import Login from "./Pages/Login";
import Home from './Pages/Home';
import Customers from './Pages/CustmorManagement';
import Suppliers from './Pages/SupplierManagement';
import CustomerDetails from './Pages/CustmorDetails';
import SupplierDetails from './Pages/SupplierDetails';
import ReportAnalysis from './Pages/Report_Analysis'; 

function App() {
  return (
    <>
      <div className=''>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Customer Management Routes */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />

          {/* Supplier Management Routes */}
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />

          {/* Reports */}
          <Route path="/reports" element={<ReportAnalysis />} /> 

        </Routes>
      </div>
    </>
  );
}

export default App;
