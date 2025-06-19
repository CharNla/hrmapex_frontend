import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLogOut, FiFileText, FiDollarSign, FiMenu } from 'react-icons/fi'
import './Topbar.css'
import userImage from '../../../assets/profile.png'
import SideMenu from '../SideMenu/Side_menu'

const routeInfo = {
  '/admin/all-employees': { title: 'All Employees', subtitle: 'Manage employee information' },
  '/admin/employees': { title: 'All Employees', subtitle: 'Manage employee information' },
  '/admin/new-employee': { title: 'Add New Employee', subtitle: 'Enter details for the new employee' },
  '/admin/news': { title: 'News', subtitle: 'Manage news and announcements' },
  '/admin/addnews': { title: 'Add News', subtitle: 'Create a new news article or announcement' },
  '/admin/leaves': { title: 'Leaves', subtitle: 'Manage employee leave requests' },
  '/admin/payroll': { title: 'Payroll', subtitle: 'Process and manage employee payroll' },
  '/admin/disbursement': { title: 'Disbursement', subtitle: 'Manage employee expense reimbursements' },
  '/admin/adddisburse': { title: 'Add Disbursement', subtitle: 'Create a new disbursement request' },
  '/admin/settings': { title: 'Settings', subtitle: 'Configure application settings' },
  '/admin/holidays': { title: 'Holidays', subtitle: 'Manage company holidays' },
  '/admin/account': { title: 'My Account', subtitle: 'View and manage your account details' },
  '/admin/notifications': { title: 'Notifications', subtitle: 'View all your notifications' },
  '/user/news': { title: 'News', subtitle: 'Latest company news and announcements' },
  '/user/disbursement': { title: 'My Disbursements', subtitle: 'View your expense reimbursements' },
  '/user/adddisburse': { title: 'New Disbursement', subtitle: 'Submit a new expense reimbursement' },
  '/user/leaves': { title: 'My Leaves', subtitle: 'View your leave requests and balances' },
  '/user/holidays': { title: 'Holidays', subtitle: 'View company holidays' },
  '/user/notifications': { title: 'Notifications', subtitle: 'View all your notifications' },
  '/superadmin/account': { title: 'Super Admin Account', subtitle: 'Manage Super Admin accounts' }
};

function Topbar({ pageTitle: propTitle, pageSubtitle: propSubtitle, onMobileMenuClick }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const currentHour = new Date().getHours()
  
  const userRole = localStorage.getItem('userRole')
  const userInfo = {
    name: userRole === 'admin' ? 'Admin' : userRole === 'superadmin' ? 'Superadmin' : 'User',
    role: userRole === 'admin' ? 'Administrator' : userRole === 'superadmin' ? 'Superadmin' : 'User',
    avatar: userImage,
    employeeId: 'EMP2025044861'
  }
    // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "ข่าวสารใหม่",
      message: "มีประกาศสำคัญเกี่ยวกับวันหยุดพิเศษ",
      time: "10 นาทีที่แล้ว",
      isRead: false,
      type: "news"
    },
    {
      id: 2,
      title: "การเบิกจ่ายได้รับการอนุมัติ",
      message: "คำขอเบิกค่าเดินทางของคุณได้รับการอนุมัติแล้ว",
      time: "2 ชั่วโมงที่แล้ว",
      isRead: false,
      type: "disbursement"
    },
    {
      id: 3,
      title: "แจ้งเตือนการเบิกจ่าย",
      message: "คุณมีรายการเบิกจ่ายที่ต้องดำเนินการ",
      time: "1 วันที่แล้ว",
      isRead: true,
      type: "disbursement"
    },
    {
      id: 4,
      title: "ข่าวประชาสัมพันธ์",
      message: "กิจกรรม Team Building วันที่ 1 มิถุนายน 2025",
      time: "2 วันที่แล้ว",
      isRead: true,
      type: "news"
    }
  ]

  const getPageInfo = () => {
    const path = location.pathname;
    
    // Handle dynamic routes like /admin/employee/:id
    const profileMatch = path.match(/^\/admin\/(employee)\/(\w+)/);
    if (profileMatch) {
        return { title: 'Employee Profile', subtitle: 'View and manage employee details' };
    }

    const payrollDetailMatch = path.match(/^\/admin\/(payroll-detail)\/(\w+)/);
    if (payrollDetailMatch) {
      return { title: 'Payroll Details', subtitle: 'View detailed payroll information' };
    }

    const leaveDetailMatch = path.match(/^\/admin\/(leaves\/detail)\/(\w+)/);
    if (leaveDetailMatch) {
      return { title: 'Leave Details', subtitle: 'View detailed leave information' };
    }
    
    const editAccountMatch = path.match(/^\/admin\/(edit-account)\/(\w+)/);
    if (editAccountMatch) {
      return { title: 'Edit Account', subtitle: 'Update account information' };
    }

    const newHolidayMatch = path.match(/^\/admin\/(newholiday)\/(\w+)/);
    if (newHolidayMatch) {
      return { title: 'Add New Holiday', subtitle: 'Create a new holiday entry' };
    }
    
    // Super Admin dynamic routes
    const superAdminEditMatch = path.match(/^\/superadmin\/(edit-account)\/(\w+)/);
    if (superAdminEditMatch) {
      return { title: 'Edit Super Admin', subtitle: 'Update Super Admin account information' };
    }

    // User dynamic routes
     const userPayrollDetailMatch = path.match(/^\/user\/(payroll-detail)\/(\w+)/);
    if (userPayrollDetailMatch) {
      return { title: 'My Payroll Details', subtitle: 'View your detailed payroll information' };
    }

    const userLeaveDetailMatch = path.match(/^\/user\/(leaves\/detail)\/(\w+)/);
    if (userLeaveDetailMatch) {
      return { title: 'My Leave Details', subtitle: 'View your detailed leave information' };
    }

    return routeInfo[path] || { title: propTitle || 'Dashboard', subtitle: propSubtitle || '' };
  };

  const { title: currentPageTitle, subtitle: currentPageSubtitle } = getPageInfo();

  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
  }

  const handleProfileClick = () => {
    setIsDropdownOpen(false)
    navigate(`/employee/${userInfo.employeeId}`)
  }

  const handleNotificationClick = (notificationId) => {
    // Handle notification click - you can mark as read, navigate, etc.
    console.log('Notification clicked:', notificationId)
  }

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen)
  }

  return (
    <>
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      <div className="topbar">
        <div className="left-section">
          <button className="mobile-menu-toggle" onClick={toggleSideMenu}>
            <FiMenu />
          </button>
          <div className="page-info">
            <h1 className="greeting mobile-disbursement-title">{currentPageTitle}</h1>
            <p className="sub-greeting">{currentPageSubtitle}</p>
          </div>
        </div>

        <div className="right-section">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="notification-container">
            <button 
              className="notification-btn"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <FiBell className="bell-icon" />
              <span className="notification-badge">
                {notifications.filter(n => !n.isRead).length}
              </span>
            </button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div 
                  className="notifications-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className={`notification-icon ${notification.type}`}>
                          {notification.type === 'news' && <FiFileText />}
                          {notification.type === 'disbursement' && <FiDollarSign />}
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>                  <div className="notifications-footer">
                    <button onClick={() => {
                      setIsNotificationOpen(false);
                      navigate('/admin/notifications');
                    }}>
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="profile-dropdown">
            <button 
              className="profile-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={userInfo.avatar} alt="User" className="user-avatar" />
              <div className="user-info">
                <h3 className="user-name">{userInfo.name}</h3>
                <p className="user-role">{userInfo.role}</p>
              </div>
              <FiChevronDown className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={handleProfileClick}>
                    <FiUser />
                    My Profile
                  </button>
                  <button onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar