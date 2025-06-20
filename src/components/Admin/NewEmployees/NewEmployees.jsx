import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiUpload, FiFile, FiCheck, FiBriefcase, FiUsers, FiMoreHorizontal } from 'react-icons/fi'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import './NewEmployees.css'
import '../AnimationCircles/AnimationCircles.css'
import axios from 'axios'
import { motion } from 'framer-motion'

const truncateFileName = (fileName) => {
  if (!fileName) return '';
  if (fileName.length <= 25) return fileName;
  const extension = fileName.split('.').pop();
  const name = fileName.substring(0, fileName.lastIndexOf('.'));
  return `${name.substring(0, 15)}...${extension}`;
};

const NewEmployees = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    profileImage: null,
    firstName: '',
    lastName: '',
    nickname: '',
    age: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    religion: '',
    maritalStatus: '',
    nationality: '',
    idCardNumber: '',
    idCardIssueDate: '',
    idCardExpirationDate: '',
    personalEmail: '',
    lineId: '',
    currentAddress: '',
    currentSubdistrict: '',
    currentDistrict: '',
    currentProvince: '',
    currentZipCode: '',
    idCardAddress: '',
    idCardSubdistrict: '',
    idCardDistrict: '',
    idCardProvince: '',
    idCardZipCode: '',

    // Professional Information
    department: '',
    position: '',
    type: '',
    status: '',
    startDate: '',
    salary: '',

    // Bank Information
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    bankCode: '',

    // Family Information
    fatherName: '',
    fatherDob: '',
    fatherAge: '',
    fatherOccupation: '',
    motherName: '',
    motherDob: '',
    motherAge: '',
    motherOccupation: '',
    spouseName: '',
    spouseDob: '',
    spouseAge: '',
    spouseOccupation: '',
    numberOfChildren: '0',
    numberOfBoys: '0',
    numberOfGirls: '0',
    birthOrder: '',
    totalSiblings: '0',
    numberOfBrothers: '0',
    numberOfSisters: '0',
    childrenData: [],
    siblingsData: [],

    // Work & Education History
    workHistory: [{ company: '', position: '', start: '', end: '', salary: '', description: '' }],
    educationHistory: [{ level: '', field: '', institution: '', graduationYear: '' }],

    // Language Ability
    speaking: '',
    writing: '',
    reading: '',

    // Criminal/Civil Record
    hasCriminalRecord: '',
    criminalDetails: '',

    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactAddress: '',
    emergencyContactPhone: '',

    // Documents
    jobApplication: null,
    employmentContract: null,
    certificate: null,
    nationalId: null,
    householdRegistration: null,
    bankBook: null,
    documents: null,

    // Work Relocation
    canRelocate: '',
  })

  const [errors, setErrors] = useState({})
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const navigate = useNavigate()

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return ""; // Invalid date
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age.toString() : "";
  };

  useEffect(() => {
    const age = calculateAge(formData.fatherDob);
    setFormData(prev => ({ ...prev, fatherAge: age }));
  }, [formData.fatherDob]);

  useEffect(() => {
    const age = calculateAge(formData.motherDob);
    setFormData(prev => ({ ...prev, motherAge: age }));
  }, [formData.motherDob]);

  useEffect(() => {
    const age = calculateAge(formData.spouseDob);
    setFormData(prev => ({ ...prev, spouseAge: age }));
  }, [formData.spouseDob]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      // Clear criminal details if hasCriminalRecord is set to 'no'
      if (name === 'hasCriminalRecord' && value === 'no') {
        return {
          ...prev,
          [name]: value,
          criminalDetails: ''
        }
      }
      return {
        ...prev,
        [name]: value
      }
    })
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e, fieldName) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName] ? [...prev[fieldName], ...fileArray] : fileArray
      }))
    }
  }

  const handleRemoveFile = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }))
  }

  const handleWorkHistoryChange = (idx, field, value) => {
    const updated = [...formData.workHistory]
    updated[idx][field] = value
    setFormData(prev => ({ ...prev, workHistory: updated }))
  }

  const handleEducationChange = (idx, field, value) => {
    const updated = [...formData.educationHistory]
    updated[idx][field] = value
    setFormData(prev => ({ ...prev, educationHistory: updated }))
  }

  const handleChildInputChange = (index, field, value) => {
    const updatedChildren = [...formData.childrenData];
    const childData = updatedChildren[index] || {};
    updatedChildren[index] = { ...childData, [field]: value };
    setFormData(prev => ({ ...prev, childrenData: updatedChildren }));
  };

  const handleSiblingInputChange = (index, field, value) => {
    const updatedSiblings = [...formData.siblingsData];
    const siblingData = updatedSiblings[index] || {};
    updatedSiblings[index] = { ...siblingData, [field]: value };
    setFormData(prev => ({ ...prev, siblingsData: updatedSiblings }));
  };

  const handleAddWorkHistory = () => {
    setFormData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { company: '', position: '', start: '', end: '', salary: '', description: '' }]
    }))
  }

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      educationHistory: [...prev.educationHistory, { level: '', field: '', institution: '', graduationYear: '' }]
    }))
  }

  const handleRemoveWorkHistory = (idx) => {
    setFormData(prev => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== idx)
    }))
  }

  const handleRemoveEducation = (idx) => {
    setFormData(prev => ({
      ...prev,
      educationHistory: prev.educationHistory.filter((_, i) => i !== idx)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validate Personal Information
    if (!formData.firstName) newErrors.firstName = 'First Name is required'
    if (!formData.lastName) newErrors.lastName = 'Last Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone is required'
    if (!formData.dob) newErrors.dob = 'Date of Birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    
    // Validate Professional Information
    if (!formData.position) newErrors.position = 'Position is required'
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.status) newErrors.status = 'Status is required'
    if (!formData.startDate) newErrors.startDate = 'Start Date is required'
    if (!formData.salary) newErrors.salary = 'Salary is required'
    
    // Validate Bank Information
    if (!formData.bankName) newErrors.bankName = 'Bank Name is required'
    if (!formData.accountNumber) newErrors.accountNumber = 'Account Number is required'
    if (formData.accountNumber && !/^\d{10,12}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account Number must be 10-12 digits'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      // Since all required fields are under the 'personal' tab,
      // we can switch to it if it's not active.
      if (activeTab !== 'personal') {
        setActiveTab('personal')
      }

      // Use a timeout to ensure the DOM has updated before we try to scroll.
      setTimeout(() => {
        const firstErrorField = Object.keys(validationErrors)[0]
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
        
        if (errorElement) {
          // scrollIntoView is more reliable
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          errorElement.focus({ preventScroll: true })
        }
      }, 100)
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/api/employees', formData)
      if (response.data.employeeId) {
        setShowSuccessPopup(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to add employee. Please try again.')
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessPopup(false)
    navigate('/employees')
  }

  // Tab configuration
  const tabs = [
    {
      key: 'personal',
      label: 'Personal Info',
      icon: <FiUser />
    },
    {
      key: 'experience',
      label: 'Experience',
      icon: <FiBriefcase />
    },
    {
      key: 'family',
      label: 'Family Info',
      icon: <FiUsers />
    },
    {
      key: 'documents',
      label: 'Documents',
      icon: <FiFile />
    },
    {
      key: 'other',
      label: 'Other Info',
      icon: <FiMoreHorizontal />
    }
  ];

  return (
    <div className="dashboard-container">
      <SideMenu
        isMinimized={isMinimized}
        onToggleMinimize={setIsMinimized}
        mobileOpen={mobileOpen}
        onCloseMobileMenu={() => setMobileOpen(false)}
      />
      <div className="dashboard-main">
        <Topbar onMobileMenuClick={() => setMobileOpen(true)} />
        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`tab${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div 
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="employee-form">
            {/* Personal Information Section */}
            {activeTab === 'personal' && (
              <div className="form-section">
                <h2 className="section-title">Personal Information</h2>
                
                <div className="profile-upload">
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                  <label htmlFor="profile-image" className="upload-area">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Profile" />
                    ) : (
                      <FiUser />
                    )}
                  </label>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Nickname</label>
                    <input
                      type="text"
                      name="nickname"
                      placeholder="Enter nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone <span className="required">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>Date of Birth <span className="required">*</span></label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && <span className="error-text">{errors.dob}</span>}
                  </div>

                  <div className="form-group">
                    <label>Gender <span className="required">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Religion</label>
                    <select name="religion" value={formData.religion} onChange={handleChange}>
                      <option value="">Select religion</option>
                      <option value="พุทธศาสนา">พุทธศาสนา</option>
                      <option value="คริสต์ศาสนา">คริสต์ศาสนา</option>
                      <option value="อิสลาม">อิสลาม</option>
                      <option value="ศาสนาฮินดู">ศาสนาฮินดู</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Enter nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>ID Card Number</label>
                    <input
                      type="text"
                      name="idCardNumber"
                      placeholder="Enter ID card number"
                      value={formData.idCardNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Issue Date</label>
                    <input
                      type="date"
                      name="idCardIssueDate"
                      value={formData.idCardIssueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input
                      type="date"
                      name="idCardExpirationDate"
                      value={formData.idCardExpirationDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Personal Email</label>
                    <input
                      type="email"
                      name="personalEmail"
                      placeholder="Enter personal email"
                      value={formData.personalEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Line ID</label>
                    <input
                      type="text"
                      name="lineId"
                      placeholder="Enter Line ID"
                      value={formData.lineId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <div className="addresses-container">
                    <div className="address-section">
                      <h3>ID Card Address</h3>
                      <div className="form-group full-width">
                        <label>Address</label>
                        <textarea
                          name="idCardAddress"
                          placeholder="Enter ID card address"
                          value={formData.idCardAddress}
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Subdistrict</label>
                          <input
                            type="text"
                            name="idCardSubdistrict"
                            placeholder="Enter subdistrict"
                            value={formData.idCardSubdistrict}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>District</label>
                          <input
                            type="text"
                            name="idCardDistrict"
                            placeholder="Enter district"
                            value={formData.idCardDistrict}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Province</label>
                          <input
                            type="text"
                            name="idCardProvince"
                            placeholder="Enter province"
                            value={formData.idCardProvince}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="idCardZipCode"
                            placeholder="Enter zip code"
                            value={formData.idCardZipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="address-section">
                      <h3>Current Address</h3>
                      <div className="form-group full-width">
                        <label>Address</label>
                        <textarea
                          name="currentAddress"
                          placeholder="Enter current address"
                          value={formData.currentAddress}
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Subdistrict</label>
                          <input
                            type="text"
                            name="currentSubdistrict"
                            placeholder="Enter subdistrict"
                            value={formData.currentSubdistrict}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>District</label>
                          <input
                            type="text"
                            name="currentDistrict"
                            placeholder="Enter district"
                            value={formData.currentDistrict}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Province</label>
                          <input
                            type="text"
                            name="currentProvince"
                            placeholder="Enter province"
                            value={formData.currentProvince}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="currentZipCode"
                            placeholder="Enter zip code"
                            value={formData.currentZipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Information Section */}
            {activeTab === 'personal' && (
              <div className="form-section">
                <h2 className="section-title">Professional Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Position <span className="required">*</span></label>
                    <input
                      type="text"
                      name="position"
                      placeholder="Enter position"
                      value={formData.position}
                      onChange={handleChange}
                    />
                    {errors.position && <span className="error-text">{errors.position}</span>}
                  </div>

                  <div className="form-group">
                    <label>Type <span className="required">*</span></label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                      <option value="">Select type</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                    {errors.type && <span className="error-text">{errors.type}</span>}
                  </div>

                  <div className="form-group">
                    <label>Status <span className="required">*</span></label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                    </select>
                    {errors.status && <span className="error-text">{errors.status}</span>}
                  </div>

                  <div className="form-group">
                    <label>Start Date <span className="required">*</span></label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                    {errors.startDate && <span className="error-text">{errors.startDate}</span>}
                  </div>

                  <div className="form-group">
                    <label>Salary <span className="required">*</span></label>
                    <input
                      type="number"
                      name="salary"
                      placeholder="Enter salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                    {errors.salary && <span className="error-text">{errors.salary}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Work History */}
            {activeTab === 'experience' && (
              <div className="work-history-section experience-bg" style={{ backgroundImage: 'url(/src/assets/bgdashboard.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', padding: '24px 16px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.85)' }}>
                <h3>Work History</h3>
                <table className="work-history-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Salary</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>                    {formData.workHistory.map((work, idx) => (
                      <React.Fragment key={idx}>
                        <tr>
                          <td>
                            <input
                              type="text"
                              placeholder="Company name"
                              value={work.company}
                              onChange={e => handleWorkHistoryChange(idx, 'company', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="Position"
                              value={work.position}
                              onChange={e => handleWorkHistoryChange(idx, 'position', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="month"
                              value={work.start}
                              onChange={e => handleWorkHistoryChange(idx, 'start', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="month"
                              value={work.end}
                              onChange={e => handleWorkHistoryChange(idx, 'end', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              placeholder="Salary"
                              value={work.salary}
                              onChange={e => handleWorkHistoryChange(idx, 'salary', e.target.value)}
                            />
                          </td>
                          <td>
                            {formData.workHistory.length > 1 && (
                              <button
                                type="button"
                                className="btn-remove-row"
                                onClick={() => handleRemoveWorkHistory(idx)}
                              >
                                ×
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr className="description-row">
                          <td colSpan="6">
                            <textarea
                              placeholder="Job description"
                              value={work.description}
                              onChange={e => handleWorkHistoryChange(idx, 'description', e.target.value)}
                              rows="3"
                              className="work-description"
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="btn-add-row" onClick={handleAddWorkHistory}>
                  + Add Work History
                </button>
              </div>
            )}

            {/* Education History */}
            {activeTab === 'experience' && (
              <div className="education-section experience-bg" style={{ backgroundImage: 'url(/src/assets/bgdashboard.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', padding: '24px 16px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.85)' }}>
                <h3>Education History</h3>
                <table className="work-history-table">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Field of Study</th>
                      <th>Institution</th>
                      <th>Year</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.educationHistory.map((edu, idx) => (
                      <tr key={idx}>
                        <td>
                          <select
                            value={edu.level}
                            onChange={e => handleEducationChange(idx, 'level', e.target.value)}
                          >
                            <option value="">Select Level</option>
                            <option value="high_school">High School</option>
                            <option value="vocational">Vocational Certificate</option>
                            <option value="high_vocational">Higher Vocational Certificate</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="doctorate">Doctorate's Degree</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Field of study"
                            value={edu.field}
                            onChange={e => handleEducationChange(idx, 'field', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Institution name"
                            value={edu.institution}
                            onChange={e => handleEducationChange(idx, 'institution', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="Year"
                            value={edu.graduationYear}
                            onChange={e => handleEducationChange(idx, 'graduationYear', e.target.value)}
                            min="1950"
                            max="2025"
                          />
                        </td>
                        <td>
                          {formData.educationHistory.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove-row"
                              onClick={() => handleRemoveEducation(idx)}
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="btn-add-row" onClick={handleAddEducation}>
                  + Add Education
                </button>
              </div>
            )}

            {/* Bank Information Section */}
            {activeTab === 'personal' && (
              <div className="form-section">
                <h2 className="section-title">Bank Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Bank Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                    {errors.bankName && <span className="error-text">{errors.bankName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      name="accountHolderName"
                      placeholder="Enter account holder name"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Account Number <span className="required">*</span></label>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter account number (10-12digits)"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                    {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                  </div>
                </div>
              </div>
            )}

{activeTab === 'family' && (
              <div className="form-section">
                <h2 className="section-title">Family Information</h2>
                
                {/* Father's Information */}
                <div className="family-section">
                  <h3>Father's Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's name"
                        value={formData.fatherName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Occupation</label>
                      <input
                        type="text"
                        name="fatherOccupation"
                        placeholder="Father's occupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="fatherDob"
                        value={formData.fatherDob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="fatherAge"
                        placeholder="-"
                        value={formData.fatherAge}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="family-section">
                  <h3>Mother's Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="motherName"
                        placeholder="Mother's name"
                        value={formData.motherName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Occupation</label>
                      <input
                        type="text"
                        name="motherOccupation"
                        placeholder="Mother's occupation"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="motherDob"
                        value={formData.motherDob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="motherAge"
                        placeholder="-"
                        value={formData.motherAge}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Spouse Information */}
                <div className="family-section">
                  <h3>Spouse Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="spouseName"
                        placeholder="Spouse's name"
                        value={formData.spouseName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Occupation</label>
                      <input
                        type="text"
                        name="spouseOccupation"
                        placeholder="Spouse's occupation"
                        value={formData.spouseOccupation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="spouseDob"
                        value={formData.spouseDob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="spouseAge"
                        placeholder="-"
                        value={formData.spouseAge}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Children's Information */}
                <div className="info-section">
                  <div className="section-title">Children's Information</div>
                  <div className="info-row">
                    <div className="info-item">
                      <label>Number of Children</label>
                      <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleChange}
                        className="edit-input"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <label>Total number of Boy</label>
                      <input
                        type="number"
                        name="numberOfBoys"
                        value={formData.numberOfBoys}
                        onChange={handleChange}
                        className="edit-input"
                        min="0"
                      />
                    </div>
                    <div className="info-item">
                      <label>Total number of Girl</label>
                      <input
                        type="number"
                        name="numberOfGirls"
                        value={formData.numberOfGirls}
                        onChange={handleChange}
                        className="edit-input"
                        min="0"
                      />
                    </div>
                  </div>

                  {formData.numberOfChildren > 0 && (
                    <table className="siblings-table">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Date of Birth</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: parseInt(formData.numberOfChildren) || 0 }).map((_, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                value={formData.childrenData[index]?.name || ''}
                                onChange={(e) => handleChildInputChange(index, 'name', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={formData.childrenData[index]?.lastname || ''}
                                onChange={(e) => handleChildInputChange(index, 'lastname', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                value={formData.childrenData[index]?.birthdate || ''}
                                onChange={(e) => handleChildInputChange(index, 'birthdate', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              {calculateAge(formData.childrenData[index]?.birthdate) || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Siblings Details */}
                <div className="info-section">
                  <div className="section-title">Siblings Details</div>
                  <div className="info-row">
                    <div className="info-item">
                      <label>Total Siblings (Including Employee)</label>
                      <input
                        type="number"
                        name="totalSiblings"
                        value={formData.totalSiblings}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </div>
                    <div className="info-item">
                      <label>Birth Order</label>
                      <input
                        type="number"
                        name="birthOrder"
                        value={formData.birthOrder}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <label>Number of Brothers</label>
                      <input
                        type="number"
                        name="numberOfBrothers"
                        value={formData.numberOfBrothers}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </div>
                    <div className="info-item">
                      <label>Number of Sisters</label>
                      <input
                        type="number"
                        name="numberOfSisters"
                        value={formData.numberOfSisters}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </div>
                  </div>
                  {formData.totalSiblings > 1 && (
                    <table className="siblings-table">
                       <thead>
                        <tr>
                          <th>Name</th>
                          <th>Lastname</th>
                          <th>Date of Birth</th>
                          <th>Age</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Array.from({ length: (parseInt(formData.totalSiblings, 10) || 0) - 1 }).map((_, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                value={formData.siblingsData[index]?.name || ''}
                                onChange={(e) => handleSiblingInputChange(index, 'name', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={formData.siblingsData[index]?.lastname || ''}
                                onChange={(e) => handleSiblingInputChange(index, 'lastname', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                value={formData.siblingsData[index]?.birthdate || ''}
                                onChange={(e) => handleSiblingInputChange(index, 'birthdate', e.target.value)}
                                className="edit-input"
                              />
                            </td>
                            <td>
                              {calculateAge(formData.siblingsData[index]?.birthdate) || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {activeTab === 'documents' && (
              <div className="form-section">
                <h2 className="section-title">Required Documents</h2>
                <div className="file-upload-section">
                  <div className="documents-grid">                  {/* Job Application */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Job Application
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="job-application"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'jobApplication')}
                          hidden
                          multiple
                        />
                        <label htmlFor="job-application" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, DOC, DOCX</p>
                        </label>
                      </div>
                      {formData.jobApplication && formData.jobApplication.length > 0 && (
                        <div className="uploaded-files">
                          {formData.jobApplication.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button 
                                type="button" 
                                className="remove-file"
                                onClick={() => handleRemoveFile('jobApplication', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>                  {/* Certificate */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Certificate
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="certificate"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload(e, 'certificate')}
                          hidden
                          multiple
                        />
                        <label htmlFor="certificate" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, JPG, JPEG</p>
                        </label>
                      </div>
                      {formData.certificate && formData.certificate.length > 0 && (
                        <div className="uploaded-files">
                          {formData.certificate.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button 
                                type="button" 
                                className="remove-file"
                                onClick={() => handleRemoveFile('certificate', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* National ID */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Copy of National ID Card
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="national-id"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload(e, 'nationalId')}
                          hidden
                          multiple
                        />
                        <label htmlFor="national-id" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, JPG, JPEG</p>
                        </label>
                      </div>
                      {formData.nationalId && formData.nationalId.length > 0 && (
                        <div className="uploaded-files">
                          {formData.nationalId.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button
                                type="button"
                                className="remove-file"
                                onClick={() => handleRemoveFile('nationalId', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* House Registration */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Copy of House Registration
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="house-registration"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload(e, 'householdRegistration')}
                          hidden
                          multiple
                        />
                        <label htmlFor="house-registration" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, JPG, JPEG</p>
                        </label>
                      </div>
                      {formData.householdRegistration && formData.householdRegistration.length > 0 && (
                        <div className="uploaded-files">
                          {formData.householdRegistration.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button
                                type="button"
                                className="remove-file"
                                onClick={() => handleRemoveFile('householdRegistration', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bank Account */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Copy of Bank Book
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="bank-book"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload(e, 'bankBook')}
                          hidden
                          multiple
                        />
                        <label htmlFor="bank-book" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, JPG, JPEG</p>
                        </label>
                      </div>
                      {formData.bankBook && formData.bankBook.length > 0 && (
                        <div className="uploaded-files">
                          {formData.bankBook.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button
                                type="button"
                                className="remove-file"
                                onClick={() => handleRemoveFile('bankBook', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Employment Contract */}
                    <div className="document-upload-card">
                      <h3 className="document-title">
                        <FiFile /> Employment Contract
                      </h3>
                      <div className="upload-area-doc">
                        <input
                          type="file"
                          id="employment-contract"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'employmentContract')}
                          hidden
                          multiple
                        />
                        <label htmlFor="employment-contract" className="upload-label">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Drag & drop or <span className="choose-text">choose file</span> to upload</p>
                          <p className="supported-text">Supported files: PDF, DOC, DOCX</p>
                        </label>
                      </div>
                      {formData.employmentContract && formData.employmentContract.length > 0 && (
                        <div className="uploaded-files">
                          {formData.employmentContract.map((file, index) => (
                            <div key={index} className="uploaded-file">
                              <FiFile />
                              <span title={file.name}>{truncateFileName(file.name)}</span>
                              <button
                                type="button"
                                className="remove-file"
                                onClick={() => handleRemoveFile('employmentContract', index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other sections... */}
            {activeTab === 'other' && (
              <div className="form-section">
                <h2 className="section-title">Other</h2>
                
                {/* Language Ability Section */}
                <div className="language-ability-section">
                  <h3>English Language Ability</h3>
                  <div className="language-grid">
                    {/* Speaking */}
                    <div className="language-row">
                      <div className="language-label">Speaking:</div>
                      <div className="language-options responsive-language-select">
                        <select
                          name="speaking"
                          value={formData.speaking}
                          onChange={handleChange}
                          className="language-select"
                        >
                          <option value="">Select</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>
                    {/* Writing */}
                    <div className="language-row">
                      <div className="language-label">Writing:</div>
                      <div className="language-options responsive-language-select">
                        <select
                          name="writing"
                          value={formData.writing}
                          onChange={handleChange}
                          className="language-select"
                        >
                          <option value="">Select</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>
                    {/* Reading */}
                    <div className="language-row">
                      <div className="language-label">Reading:</div>
                      <div className="language-options responsive-language-select">
                        <select
                          name="reading"
                          value={formData.reading}
                          onChange={handleChange}
                          className="language-select"
                        >
                          <option value="">Select</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Criminal Record Section */}
                <div className="criminal-record-section">
                  <h3>Legal History</h3>
                  <div className="criminal-record-container">
                    <div className="criminal-record-question">
                      <p>Have you ever been convicted of a civil or criminal offense?</p>
                      <div className="criminal-options">
                        <label>
                          <input
                            type="radio"
                            name="hasCriminalRecord"
                            value="yes"
                            checked={formData.hasCriminalRecord === 'yes'}
                            onChange={handleChange}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="hasCriminalRecord"
                            value="no"
                            checked={formData.hasCriminalRecord === 'no'}
                            onChange={handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {formData.hasCriminalRecord === 'yes' && (
                      <div className="criminal-details">
                        <label htmlFor="criminalDetails">Details:</label>
                        <textarea
                          id="criminalDetails"
                          name="criminalDetails"
                          value={formData.criminalDetails}
                          onChange={handleChange}
                          placeholder="Please provide details of the offense and penalty."
                          rows="3"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Work Relocation Section */}
                <div className="relocation-section">
                  <h3>Work in other provinces</h3>
                  <div className="relocation-container">
                    <p>Are you able to work in other provinces?</p>
                    <div className="relocation-options">
                      <label>
                        <input
                          type="radio"
                          name="canRelocate"
                          value="yes"
                          checked={formData.canRelocate === 'yes'}
                          onChange={handleChange}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="canRelocate"
                          value="no"
                          checked={formData.canRelocate === 'no'}
                          onChange={handleChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Section */}
                <div className="emergency-contact-section">
                  <h3>Emergency Contact</h3>
                  
                  {/* คนที่ 1 */}
                  <div className="emergency-contact-container">
                    <h4>Contact 1</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          placeholder="Enter full name"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Relationship to applicant</label>
                        <input
                          type="text"
                          name="emergencyContactRelation"
                          placeholder="Enter relationship"
                          value={formData.emergencyContactRelation}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          placeholder="Enter phone number"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Address</label>
                      <textarea
                        name="emergencyContactAddress"
                        placeholder="Enter address"
                        value={formData.emergencyContactAddress}
                        onChange={handleChange}
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* คนที่ 2 */}
                  <div className="emergency-contact-container" style={{ marginTop: '20px' }}>
                    <h4>Contact 2</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="emergencyContactName2"
                          placeholder="Enter full name"
                          value={formData.emergencyContactName2}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Relationship to applicant</label>
                        <input
                          type="text"
                          name="emergencyContactRelation2"
                          placeholder="Enter relationship"
                          value={formData.emergencyContactRelation2}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="emergencyContactPhone2"
                          placeholder="Enter phone number"
                          value={formData.emergencyContactPhone2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Address</label>
                      <textarea
                        name="emergencyContactAddress2"
                        placeholder="Enter address"
                        value={formData.emergencyContactAddress2}
                        onChange={handleChange}
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="new-employee-form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate('/admin/all-employees')}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {showSuccessPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="success-popup">
            <div className="success-icon">
              <FiCheck />
            </div>
            <h2 className="success-title">Success!</h2>
            <p className="success-message">Employee has been added successfully.</p>
            <button className="success-button" onClick={handleSuccessClose}>
              Continue
            </button>
          </div>
        </>
      )}

      <style>
        {`
          .uploaded-files {
            margin-top: 10px;
            max-height: 150px;
            overflow-y: auto;
            padding-right: 10px;
          }

          .uploaded-file {
            display: flex;
            align-items: center;
            background: #f5f5f5;
            padding: 8px 12px;
            border-radius: 4px;
            margin-bottom: 5px;
            transition: all 0.3s ease;
          }

          .uploaded-file:hover {
            background: #e9e9e9;
          }

          .uploaded-file svg {
            margin-right: 8px;
            color: #666;
          }

          .uploaded-file span {
            flex: 1;
            margin-right: 8px;
            font-size: 0.9em;
            color: #333;
          }

          .remove-file {
            background: none;
            border: none;
            color: #ff4444;
            cursor: pointer;
            font-size: 1.2em;
            padding: 0 4px;
            transition: color 0.2s ease;
          }

          .remove-file:hover {
            color: #cc0000;
          }
        `}
      </style>
    </div>
  )
}

export default NewEmployees