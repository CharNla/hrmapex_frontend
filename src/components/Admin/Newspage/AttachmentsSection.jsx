import React from 'react';
import { FiFile, FiX, FiUpload } from 'react-icons/fi';
import './AttachmentsSection.css';

const getFileIcon = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  // You can add more file type checks and return different icons
  return <FiFile />;
};

const truncateFilename = (filename) => {
  if (filename.length <= 20) return filename;
  
  const extension = filename.split('.').pop();
  const name = filename.substring(0, filename.lastIndexOf('.'));
  
  // Keep the first 10 chars and last 7 chars of the name plus the extension
  return `${name.substring(0, 10)}...${name.substring(name.length - 7)}.${extension}`;
};

const AttachmentsSection = ({ attachments, onRemoveAttachment, onAddAttachments }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onAddAttachments(files);
  };

  return (
    <div className="attachments-section">
      <div className="file-input-wrapper">
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          multiple
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        />        <label htmlFor="file-upload" className="file-input-label">
          <span className="upload-text">Drag and drop files here or click to browse</span>
          <span className="upload-hint">Supported formats: Images, PDF, DOC, DOCX, XLS, XLSX</span>
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="attachments-list">          {attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              {getFileIcon(file.filename)}
              <span title={file.filename}>{truncateFilename(file.filename)}</span>
              <button
                className="remove-btn"
                onClick={() => onRemoveAttachment(index)}
                title="Remove file"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentsSection;
