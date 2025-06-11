import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import './Popup.css';

const PopupUpdatePass = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/login');
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "-50px",
      opacity: 0,
      scale: 0.95,
      transition: { type: 'spring', damping: 15, stiffness: 200 }
    },
    visible: {
      y: "0",
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 200 }
    },
    exit: {
      y: "50px",
      opacity: 0,
      scale: 0.95,
      transition: { ease: "easeOut", duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="popup-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="popup-icon-container">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.2, type: 'spring' } }}
              >
                <FiCheck className="popup-icon" />
              </motion.div>
            </div>

            <h2 className="popup-heading">Success!</h2>
            <p className="popup-subheading">
              Your password has been updated.
            </p>

            <button
              className="popup-button"
              onClick={handleClose}
            >
              Back to Login
            </button>
            
            <button
                className="popup-close-btn"
                onClick={onClose}
                aria-label="Close"
            >
                <FiX />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupUpdatePass;