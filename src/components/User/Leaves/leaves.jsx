import React, { useState, useEffect } from "react";
import "./leaves.css";
import SideMenu from '../../Admin/SideMenu/Side_menu';
import Topbar from '../../Admin/Topbar/Topbar';
import { FiEdit2, FiTrash2, FiCheck, FiClock, FiX, FiAlertTriangle, FiPlus } from 'react-icons/fi';
import AddLeave from './AddLeave';

const leaveTypesDefault = [
  { id: 1, name: "Sick Leave", days: 30 },
  { id: 2, name: "Personal Leave", days: 4 },
  { id: 3, name: "Annual Leave", days: 6 },
  { id: 4, name: "Maternity Leave", days: 90 },
  { id: 5, name: "Ordination Leave", days: 30 },
  { id: 6, name: "Leave without Pay", days: 0 },
];

const leaveListMock = [
  {
    name: "John Doe",
    nickname: "John",
    employeeId: "1",
    date: "2025-05-01",
    days: 2,
    type: "Sick Leave",
    status: "Approved",
    approver: "Manager",
    reason: "Not feeling well",
  },
  {
    name: "Sarah Johnson",
    nickname: "Sarah",
    date: "2025-05-03",
    days: 5,
    type: "Annual Leave",
    status: "Pending",
    approver: "Supervisor",
    reason: "Family vacation",
  },
  {
    name: "Michael Chen",
    nickname: "Mike",
    date: "2025-05-10",
    days: 1,
    type: "Personal Leave",
    status: "Approved",
    approver: "Team Lead",
    reason: "Doctor appointment",
  },
  {
    name: "Emily Wilson",
    nickname: "Em",
    date: "2025-05-15",
    days: 90,
    type: "Maternity Leave",
    status: "Approved",
    approver: "HR Manager",
    reason: "Maternity leave",
  },
  {
    name: "David Thompson",
    nickname: "Dave",
    date: "2025-05-20",
    days: 3,
    type: "Sick Leave",
    status: "Approved",
    approver: "Department Head",
    reason: "Fever and flu",
  },
  {
    name: "Lisa Anderson",
    nickname: "Lisa",
    date: "2025-06-01",
    days: 7,
    type: "Annual Leave",
    status: "Pending",
    approver: "Manager",
    reason: "Overseas trip",
  },
  {
    name: "Robert Kim",
    nickname: "Rob",
    date: "2025-06-05",
    days: 30,
    type: "Ordination Leave",
    status: "Approved",
    approver: "HR Director",
    reason: "Buddhist ordination",
  },
  {
    name: "Amanda Lee",
    nickname: "Amy",
    date: "2025-06-10",
    days: 2,
    type: "Personal Leave",
    status: "Rejected",
    approver: "Supervisor",
    reason: "Personal matters",
  },
  {
    name: "Thomas Wright",
    nickname: "Tom",
    date: "2025-06-15",
    days: 5,
    type: "Leave without Pay",
    status: "Approved",
    approver: "Department Head",
    reason: "Extended personal time",
  },
  {
    name: "Maria Garcia",
    nickname: "Mari",
    date: "2025-06-20",
    days: 3,
    type: "Sick Leave",
    status: "Pending",
    approver: "Team Lead",
    reason: "Medical check-up",
  },
  {
    name: "James Wilson",
    nickname: "Jim",
    date: "2025-06-25",
    days: 4,
    type: "Annual Leave",
    status: "Approved",
    approver: "Manager",
    reason: "Summer holiday",
  }
];

const mockMonthlyReport2025 = [
  { month: "January", sickLeave: 12, personalLeave: 5, annualLeave: 8, maternityLeave: 1, ordinationLeave: 0, unpaidLeave: 2 },
  { month: "February", sickLeave: 8, personalLeave: 6, annualLeave: 10, maternityLeave: 1, ordinationLeave: 1, unpaidLeave: 0 },
  { month: "March", sickLeave: 15, personalLeave: 4, annualLeave: 12, maternityLeave: 1, ordinationLeave: 0, unpaidLeave: 1 },
  { month: "April", sickLeave: 10, personalLeave: 8, annualLeave: 15, maternityLeave: 0, ordinationLeave: 0, unpaidLeave: 3 },
  { month: "May", sickLeave: 7, personalLeave: 3, annualLeave: 6, maternityLeave: 0, ordinationLeave: 0, unpaidLeave: 1 }
];

const mockYearlyReport = [
  { year: "2023", total: 245, sickLeave: 85, personalLeave: 35, annualLeave: 90, maternityLeave: 15, ordinationLeave: 10, unpaidLeave: 10 },
  { year: "2024", total: 268, sickLeave: 92, personalLeave: 42, annualLeave: 95, maternityLeave: 18, ordinationLeave: 12, unpaidLeave: 9 },
  { year: "2025", total: 112, sickLeave: 52, personalLeave: 26, annualLeave: 51, maternityLeave: 3, ordinationLeave: 1, unpaidLeave: 7 }
];

// Mock data for employee leave reports
const employeeLeaveReports = {  "2025-05": [
    {      id: 1,
      employeeId: "1",
      name: "John Doe",
      nickname: "John",
      position: "Programmer",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },    {      id: 2,
      name: "Sarah Johnson",
      nickname: "Sarah",
      position: "HR",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 1,
        "Annual Leave": 3,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },    {      id: 3,
      name: "Somchai Jaidee",
      nickname: "Chai",
      position: "System",
      leaveData: {
        "Sick Leave": 2,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },
    {
      id: 4,
      name: "Pranee Rakdee",      nickname: "Nee",
      position: "System",
      leaveData: {
        "Sick Leave": 0,
        "Personal Leave": 2,
        "Annual Leave": 3,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },    {
      id: 5,
      name: "Wichai Suksang",      nickname: "Chai",
      position: "HR",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 3,
        "Leave without Pay": 0
      }
    },{
      id: 6,
      name: "Rattana Srisuk",      nickname: "Tan",
      position: "HR",
      leaveData: {
        "Sick Leave": 0,
        "Personal Leave": 1,
        "Annual Leave": 0,
        "Maternity Leave": 5,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },    {
      id: 7,
      name: "Michael Anderson",      nickname: "Mike",
      position: "Programmer",
      leaveData: {
        "Sick Leave": 2,
        "Personal Leave": 1,
        "Annual Leave": 1,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },    {
      id: 8,
      name: "Sunisa Wong",      nickname: "Sun",
      position: "System",
      leaveData: {
        "Sick Leave": 2,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },    {
      id: 9,
      name: "Tanawat Manop",      nickname: "Wat",
      position: "HR",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 1,
        "Annual Leave": 3,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },    {
      id: 10,
      name: "Jessica Chen",      nickname: "Jess",
      position: "Programmer",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 2,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },    {
      id: 11,
      name: "Piyarat Sombat",      nickname: "Piy",
      position: "HR",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },    {
      id: 12,
      name: "David Wilson",      nickname: "Dave",
      position: "System",
      leaveData: {
        "Sick Leave": 2,
        "Personal Leave": 1,
        "Annual Leave": 2,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 1
      }
    },
    // Add more employees here...
  ],
  "2025-04": [
    {
      id: 1,      name: "John Smith",
      nickname: "John",
      position: "Programmer",
      leaveData: {
        "Sick Leave": 1,
        "Personal Leave": 0,
        "Annual Leave": 3,
        "Maternity Leave": 0,
        "Ordination Leave": 0,
        "Leave without Pay": 0
      }
    },
    // Add more historical data...
  ]
};

const Leaves = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState("myLeaves");
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  
  const [userRole, setUserRole] = useState('user'); // default to user
  const [employeeId, setEmployeeId] = useState('1'); // mock employeeId

  // Mock employee info - replace with actual data from auth context or API
  const [employeeInfo, setEmployeeInfo] = useState({
    id: "1",
    name: "John Doe",
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const [leaveTypes, setLeaveTypes] = useState(leaveTypesDefault);
  const [leaveList, setLeaveList] = useState(leaveListMock);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 7), // Default to one year ago
    to: new Date().toISOString().slice(0, 7) // Default to current month
  });
  
  const statusOptions = ["all", "Approved", "Pending", "Rejected"];

  const filteredLeaveList = leaveList
    .filter(l => searchQuery === "" || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.nickname.toLowerCase().includes(searchQuery.toLowerCase()) || l.date.includes(searchQuery))
    .filter(l => selectedLeaveType === "all" || l.type === selectedLeaveType)
    .filter(l => selectedStatus === "all" || l.status.toLowerCase() === selectedStatus.toLowerCase());


  const handleNewLeaveSubmit = (formData) => {
    console.log("New leave data:", formData);
    // Here you would typically handle the form submission,
    // e.g., send data to an API
    
    // Create a new leave record from form data
    const newLeave = {
      name: employeeInfo.name,
      nickname: employeeInfo.name.split(' ')[0], // simple nickname
      employeeId: employeeInfo.id,
      date: formData.startDate,
      days: Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1,
      type: formData.leaveType,
      status: "Pending",
      approver: "Manager", // This might be determined by system logic
      reason: formData.reason,
      // attachments can be handled separately if they need to be uploaded
    };

    // Add to mock data list
    setLeaveList(prev => [newLeave, ...prev]);

    setIsAddLeaveModalOpen(false); // Close modal on submit
  };

  const handleToggleMinimize = (minimized) => {
    setIsMinimized(minimized);
  };

  const handleDateRangeChange = (type, value) => {
    setDateRange(prev => ({ ...prev, [type]: value }));
  };
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }

    const role = localStorage.getItem('userRole') || 'user';
    const empId = localStorage.getItem('employeeId') || '1';
    setUserRole(role);
    setEmployeeId(empId);
    
    // You can also fetch real employee info here and set it
    // For now, we'll stick with mock data.

  }, []);

  const renderMyLeaves = () => {
    const userLeaves = filteredLeaveList.filter(l => l.employeeId === employeeInfo.id);

    return (
      <div className="leaves-list-container">
        <div className="list-header">
          <h3>Your Leave History</h3>
          <button className="add-leave-btn" onClick={() => setIsAddLeaveModalOpen(true)}>
            <FiPlus />
            Request Leave
          </button>
        </div>
        <div className="table-responsive">
          <table className="leaves-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Date</th>
                <th>Days</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {userLeaves.map((l,i)=>(
                <tr key={i}>
                  <td>{l.type}</td>
                  <td>{l.date}</td>
                  <td>{l.days}</td>
                  <td>
                    <span className={`status-badge status-${l.status.toLowerCase()}`}>
                      {l.status}
                    </span>
                  </td>
                  <td>{l.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLeaveReport = () => {
    const start = new Date(dateRange.from + "-01");
    const end = new Date(dateRange.to + "-01");
    const months = [];
    for(let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
        months.push(d.toISOString().slice(0, 7));
    }

    const userLeavesInRange = leaveList.filter(leave => {
        const leaveMonth = leave.date.slice(0, 7);
        return leave.employeeId === employeeInfo.id && months.includes(leaveMonth) && leave.status === 'Approved';
    });

    const summary = leaveTypes.reduce((acc, type) => {
        acc[type.name] = {
            taken: userLeavesInRange.filter(l => l.type === type.name).reduce((sum, l) => sum + l.days, 0),
            total: type.days,
        };
        return acc;
    }, {});


    return (
      <div className="leaves-report-container">
        <div className="list-header">
          <h3>Your Leave Report</h3>
          <div className="report-controls">
            <div className="date-range-group">
                <span className="date-range-label">From:</span>
                <input
                type="month"
                className="month-input"
                value={dateRange.from}
                onChange={(e) => handleDateRangeChange('from', e.target.value)}
                max={dateRange.to}
                />
            </div>
            <div className="date-range-group">
                <span className="date-range-label">To:</span>
                <input
                type="month"
                className="month-input"
                value={dateRange.to}
                onChange={(e) => handleDateRangeChange('to', e.target.value)}
                min={dateRange.from}
                />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Total Allotment</th>
                <th>Days Taken</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([leaveType, data]) => {
                if (leaveType === 'Leave without Pay') return null;
                const remaining = data.total - data.taken;
                return (
                  <tr key={leaveType}>
                    <td>{leaveType}</td>
                    <td>{data.total} days</td>
                    <td>{data.taken} days</td>
                    <td>{remaining} days</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <SideMenu isMinimized={isMinimized} onToggleMinimize={handleToggleMinimize} />
      <div className={`dashboard-main ${isMinimized ? 'expanded' : ''}`}>
        <Topbar pageTitle="Leaves" />
        <div className="leaves-container">
          <div className="leaves-tabs">
            <button
              className={activeTab === "myLeaves" ? "active" : ""}
              onClick={() => setActiveTab("myLeaves")}
            >
              My Leaves
            </button>
            <button
              className={activeTab === "leaveReport" ? "active" : ""}
              onClick={() => setActiveTab("leaveReport")}
            >
              Leave Report
            </button>
          </div>
          <div className="leaves-content">
            {activeTab === "myLeaves" && renderMyLeaves()}
            {activeTab === "leaveReport" && renderLeaveReport()}
          </div>
        </div>
      </div>

      <AddLeave 
        isOpen={isAddLeaveModalOpen}
        onClose={() => setIsAddLeaveModalOpen(false)}
        onSubmit={handleNewLeaveSubmit}
        leaveTypes={leaveTypes}
        employeeInfo={employeeInfo}
      />
    </div>
  );
};

export default Leaves;