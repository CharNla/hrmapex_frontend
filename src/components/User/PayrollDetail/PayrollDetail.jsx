import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PayrollDetail.css';
import SideMenu from '../../Admin/SideMenu/Side_menu';
import Topbar from '../../Admin/Topbar/Topbar';
import { FiDollarSign, FiMinusCircle, FiPlusCircle, FiFile } from 'react-icons/fi';

const mainTabs = [
  { key: 'salary', label: 'Base Salary', icon: <FiDollarSign /> },
  { key: 'deductions', label: 'Deductions', icon: <FiMinusCircle /> },
  { key: 'additions', label: 'Additional Income', icon: <FiPlusCircle /> },
  { key: 'documents', label: 'Documents', icon: <FiFile /> },
];

const PayrollDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('salary');
  const [isMinimized, setIsMinimized] = useState(false);

  // Mock data, replace with API call
  const [employeeData, setEmployeeData] = useState({
    id: id,
    name: "John Doe",
    position: "Software Engineer",
    payrollMonth: new Date(),
    baseSalary: 50000,
    deductions: {
      socialSecurity: 750,
      withHoldingTax: 5000,
      withoutPay: 0
    },
    additionalIncome: {
      overtime: 2000,
      travel: 1000,
      food: 500,
      other: 0
    },
    documents: {
      n550: [{ name: 'pnd1_form.pdf' }],
      paySlip: [{ name: 'payslip_june_2025.pdf' }]
    }
  });

  const handleToggleMinimize = (minimized) => {
    setIsMinimized(minimized);
  };

  const renderField = (label, value, isCurrency = false, isDeduction = false, isAddition = false) => {
    let displayValue = value;
    if (isCurrency) {
        displayValue = `฿${value.toLocaleString()}`;
        if (isDeduction) displayValue = `-${displayValue}`;
        if (isAddition) displayValue = `+${displayValue}`;
    }
    
    let valueClassName = '';
    if (isDeduction) valueClassName = 'deduction';
    if (isAddition) valueClassName = 'addition';

    return (
      <div className="payroll-detail__info-item">
        <label>{label}</label>
        <span className={valueClassName}>{displayValue}</span>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'salary':
        const formattedDate = new Date(employeeData.payrollMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return (
          <div className="payroll-detail__tab-content">
            <div className="payroll-detail__card">
              <div className="payroll-detail__info-grid">
                {renderField('Full Name', employeeData.name)}
                {renderField('Position', employeeData.position)}
                {renderField('Month/Year', formattedDate)}
                <div className="payroll-detail__info-item highlight">
                  <label>Base Salary</label>
                  <span style={{ color: '#ffffff' }}>฿{employeeData.baseSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deductions':
        const totalDeductions = Object.values(employeeData.deductions).reduce((a, b) => a + b, 0);
        return (
          <div className="payroll-detail__tab-content">
            <div className="payroll-detail__card">
              <div className="payroll-detail__info-grid">
                {renderField('Social Security', employeeData.deductions.socialSecurity, true, true)}
                {renderField('Withholding Tax (WHT)', employeeData.deductions.withHoldingTax, true, true)}
                {renderField('Leave Without Pay', employeeData.deductions.withoutPay, true, true)}
                <div className="payroll-detail__info-item highlight">
                  <label>Total Deductions</label>
                  <span className="deduction">-฿{totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'additions':
        const totalAdditions = Object.values(employeeData.additionalIncome).reduce((a, b) => a + b, 0);
        return (
          <div className="payroll-detail__tab-content">
            <div className="payroll-detail__card">
              <div className="payroll-detail__info-grid">
                {renderField('Overtime (OT)', employeeData.additionalIncome.overtime, true, false, true)}
                {renderField('Travel Allowance', employeeData.additionalIncome.travel, true, false, true)}
                {renderField('Food Allowance', employeeData.additionalIncome.food, true, false, true)}
                {renderField('Other', employeeData.additionalIncome.other, true, false, true)}
                <div className="payroll-detail__info-item highlight">
                  <label>Total Additional Income</label>
                  <span className="addition">+฿{totalAdditions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="payroll-detail__tab-content">
            <div className="payroll-detail__card">
              <div className="payroll-detail__document-section">
                <div className="payroll-detail__document-item">
                  <h4>P.N.D.1 Form (N550)</h4>
                  {employeeData.documents.n550.length > 0 && (
                      <div className="payroll-detail__file-list">
                        {employeeData.documents.n550.map((file, index) => (
                          <div key={index} className="payroll-detail__file-item">
                            <div className="file-info">
                              <FiFile /> {file.name}
                            </div>
                          </div>
                        ))}
                      </div>
                  )}
                </div>
                <div className="payroll-detail__document-item">
                  <h4>Payslip</h4>
                  {employeeData.documents.paySlip.length > 0 && (
                    <div className="payroll-detail__file-list">
                      {employeeData.documents.paySlip.map((file, index) => (
                        <div key={index} className="payroll-detail__file-item">
                          <div className="file-info">
                            <FiFile /> {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const calculateTotal = (data) => {
    return data.baseSalary +
      Object.values(data.additionalIncome).reduce((a, b) => a + b, 0) -
      Object.values(data.deductions).reduce((a, b) => a + b, 0);
  };

  return (
    <div className="payroll-detail__container">
      <SideMenu isMinimized={isMinimized} onToggleMinimize={handleToggleMinimize} />
      <div className={`payroll-detail__content ${isMinimized ? 'minimized' : ''}`}>
        <ul className="payroll-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Topbar pageTitle={`${employeeData.name}`} pageSubtitle="Salary Details" />
        <div className="payroll-detail__main">
          <div className="payroll-detail__header">
            <h2>Salary Details for {employeeData.name}</h2>
            <div className="payroll-detail__actions">
              <div className="payroll-detail__total">
                Net Salary: ฿{calculateTotal(employeeData).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="payroll-detail__tabs">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                className={`payroll-detail__tab-button ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PayrollDetail;
