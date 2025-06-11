import React, { useState, useEffect } from 'react';
import { FiX, FiUpload, FiPaperclip, FiCalendar, FiType, FiMessageSquare } from 'react-icons/fi';
import './AddLeave.css';

const AddLeave = ({ isOpen, onClose, onSubmit, leaveTypes, employeeInfo }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    attachments: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        attachments: [],
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required.';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date cannot be before start date.';
    }
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return `${diffDays} day(s)`;
      }
    }
    return '0 day(s)';
  };

  return (
    <div className="add-leave-modal-overlay">
      <div className="add-leave-modal">
        <div className="modal-header">
          <h2>Request a Leave</h2>
          <button onClick={onClose} className="close-button"><FiX /></button>
        </div>
        <div className="modal-content">
          <div className="employee-info-banner">
            <img src={employeeInfo.avatar} alt="Employee" />
            <div className="employee-details">
              <span className="name">{employeeInfo.name}</span>
              <span className="id">Employee ID: {employeeInfo.id}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="leaveType"><FiType /> Leave Type</label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleInputChange}
                className={errors.leaveType ? 'invalid' : ''}
              >
                <option value="" disabled>Select a leave type...</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.name}>{type.name}</option>
                ))}
              </select>
              {errors.leaveType && <span className="error-message">{errors.leaveType}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate"><FiCalendar /> Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={errors.startDate ? 'invalid' : ''}
                />
                {errors.startDate && <span className="error-message">{errors.startDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="endDate"><FiCalendar /> End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={errors.endDate ? 'invalid' : ''}
                />
                {errors.endDate && <span className="error-message">{errors.endDate}</span>}
              </div>
            </div>
             <div className="leave-duration">
              <span>Total: {calculateDays()}</span>
            </div>

            <div className="form-group">
              <label htmlFor="reason"><FiMessageSquare /> Reason</label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                placeholder="Please provide a reason for your leave..."
                value={formData.reason}
                onChange={handleInputChange}
                className={errors.reason ? 'invalid' : ''}
              ></textarea>
              {errors.reason && <span className="error-message">{errors.reason}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="attachments"><FiPaperclip /> Attachments</label>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  multiple
                  onChange={handleFileChange}
                  hidden
                />
                <label htmlFor="attachments" className="file-upload-label">
                  <FiUpload />
                  <span>Click to upload or drag and drop</span>
                  <span className="file-hint">PDF, PNG, JPG, DOCX (Max 5MB)</span>
                </label>
              </div>
              <div className="file-list">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(index)}><FiX /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="submit-btn">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeave; 