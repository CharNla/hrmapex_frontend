import React from 'react';
import { FiFile, FiX, FiPlus } from 'react-icons/fi';
import AttachmentsSection from '../AttachmentsSection';

export function EditNewsModal({ 
  isOpen, 
  onClose, 
  form, 
  editItem, 
  categories, 
  handleChange, 
  handleSubmit,
  handleRemoveAttachment,
  handleAddAttachments,
  isImageFile 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>{editItem ? 'Edit News' : 'Add News'}</h3>
          <button className="edit-close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="edit-news-form">
          <div className="edit-form-group">
            <label>Title</label>
            <input 
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              required 
              placeholder="Enter news title"
            />
          </div>
          <div className="edit-form-group">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-form-group">
            <label>Content</label>
            <textarea 
              name="content" 
              value={form.content} 
              onChange={handleChange} 
              required 
              placeholder="Enter news content"
              rows="6"
            />
          </div>          <div className="form-group">
            <label>Attachments</label>
            <AttachmentsSection
              attachments={form.attachments}
              onRemoveAttachment={handleRemoveAttachment}
              onAddAttachments={handleAddAttachments}
            />
          </div>
          <div className="edit-modal-actions">
            <button type="button" onClick={onClose} className="edit-modal-btn edit-btn-cancel">
              Cancel
            </button> 
            <button type="submit" className="edit-modal-btn edit-btn-save">
              {editItem ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
