import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../Admin/SideMenu/Side_menu';
import Topbar from '../Admin/Topbar/Topbar';
import './AddAccountSuperAdmin.css';
import '../Admin/AnimationCircles/AnimationCircles.css';

const AddAccountSuperAdmin = () => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    role: 'user', // Default role
    status: 'Active', // Default status
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to create the account
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/superadmin/account', {
        state: { message: 'Account created successfully!' }
      });
    } catch (err) {
      console.error('Error creating account:', err);
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (    <div className="account dashboard-container">
      <ul className="circles">
        {[...Array(25)].map((_, i) => <li key={i}></li>)}
      </ul>
      <ul className="circles-bottom">
        {[...Array(25)].map((_, i) => <li key={`bottom-${i}`}></li>)}
      </ul>

      <SideMenu
        isMinimized={isMinimized}
        onToggleMinimize={setIsMinimized}
        mobileOpen={isMobileMenuOpen}
      />
      <div className="account dashboard-main">
        <div className="account dashboard-content">
          <Topbar
            pageTitle="Add New Account"
            pageSubtitle="Create a new user account"
            onMobileMenuClick={handleMobileMenuToggle}
          />
          
          <div className="form-content-wrapper">
            <form onSubmit={handleSubmit} className="add-account-form-container">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                  placeholder="Enter username"
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter password"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              {errors.submit && <div className="error-message">{errors.submit}</div>}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate('/superadmin/account')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountSuperAdmin;
