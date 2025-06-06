import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Admin/Login/Login'
import ForgotPassword from './components/Admin/ForgotPassword/ForgotPassword'
import Account from './components/Admin/Account/Account'
import ResetPassword from './components/Admin/ResetPassword/ResetPassword'
import AllEmployees from './components/Admin/AllEmployees/AllEmployees'
import NewEmployees from './components/Admin/NewEmployees/NewEmployees'
import ProfileDetail from './components/Admin/ProfileDetail/ProfileDetail'
import New from './components/Admin/Newspage/New'
import AddNew from './components/Admin/Newspage/AddNews/Addnew'
import Leaves from './components/Admin/Leaves/leaves'
import Payroll from './components/Admin/Payroll/Payroll'
import PayrollDetail from './components/Admin/PayrollDetail/PayrollDetail'
import Disbursement from './components/Admin/Disbursement/disbursement'
import Adddisburse from './components/Admin/Disbursement/Adddisburse'
import LeaveDetail from './components/Admin/Leaves/leavesdetail'
import Setting from './components/Admin/Layout/setting'
import Holidays from './components/Admin/holidays/holidays'
import NewHoliday from './components/Admin/holidays/newholiday'
import { ThemeProvider } from './context/ThemeContext'
import './styles/global.css'
import EditAccount from './components/Admin/Account/EditAccount'
import Notification from './components/Admin/Notifications/Notification'

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/all-employees" element={<AllEmployees />} />
          <Route path="/employees" element={<Navigate to="/all-employees" />} />
          <Route path="/new-employee" element={<NewEmployees />} />
          <Route path="/employee/:id" element={<ProfileDetail />} />
          <Route path="/news" element={<New />} />
          <Route path="/addnews" element={<AddNew />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/leaves/detail/:empId" element={<LeaveDetail />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll-detail/:id" element={<PayrollDetail />} />
          <Route path="/disbursement" element={<Disbursement />} />
          <Route path="/adddisburse" element={<Adddisburse />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/newholiday/:monthIndex" element={<NewHoliday />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-account/:id" element={<EditAccount />} />
          <Route path="/admin/notifications" element={<Notification />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
