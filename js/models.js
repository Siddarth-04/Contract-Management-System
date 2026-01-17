// Models - Contract Status Constants and Validation

export const CONTRACT_STATUS = {
  CREATED: 'CREATED',
  APPROVED: 'APPROVED',
  SENT: 'SENT',
  SIGNED: 'SIGNED',
  LOCKED: 'LOCKED'
};

export const FIELD_TYPES = {
  TEXT: 'text',
  DATE: 'date',
  CHECKBOX: 'checkbox',
  SIGNATURE: 'signature'
};

/**
 * Valid lifecycle transitions
 */
const VALID_TRANSITIONS = {
  [CONTRACT_STATUS.CREATED]: [CONTRACT_STATUS.APPROVED],
  [CONTRACT_STATUS.APPROVED]: [CONTRACT_STATUS.SENT, CONTRACT_STATUS.CREATED],
  [CONTRACT_STATUS.SENT]: [CONTRACT_STATUS.SIGNED],
  [CONTRACT_STATUS.SIGNED]: [CONTRACT_STATUS.LOCKED],
  [CONTRACT_STATUS.LOCKED]: []
};

/**
 * Check if a status transition is valid
 */
export function isValidTransition(currentStatus, newStatus) {
  const allowedStatuses = VALID_TRANSITIONS[currentStatus] || [];
  return allowedStatuses.includes(newStatus);
}

/**
 * Get available next statuses for a given status
 */
export function getAvailableTransitions(currentStatus) {
  return VALID_TRANSITIONS[currentStatus] || [];
}

/**
 * Check if a contract is locked (immutable)
 */
export function isContractLocked(status) {
  return status === CONTRACT_STATUS.LOCKED;
}

/**
 * Check if revoke is allowed
 */
export function canRevoke(currentStatus) {
  // Can only revoke from APPROVED back to CREATED
  return currentStatus === CONTRACT_STATUS.APPROVED;
}

/**
 * Get status badge class
 */
export function getStatusBadgeClass(status) {
  const classMap = {
    [CONTRACT_STATUS.CREATED]: 'badge-created',
    [CONTRACT_STATUS.APPROVED]: 'badge-approved',
    [CONTRACT_STATUS.SENT]: 'badge-sent',
    [CONTRACT_STATUS.SIGNED]: 'badge-signed',
    [CONTRACT_STATUS.LOCKED]: 'badge-locked'
  };
  return classMap[status] || 'badge-created';
}

/**
 * Generate unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format datetime for display
 */
export function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Create a blueprint object
 */
export function createBlueprint(name, fields) {
  return {
    id: generateId(),
    name: name.trim(),
    fields: fields,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Create a contract object
 */
export function createContract(name, blueprintId, blueprintName, fieldValues) {
  return {
    id: generateId(),
    name: name.trim(),
    blueprintId: blueprintId,
    blueprintName: blueprintName,
    fieldValues: fieldValues,
    status: CONTRACT_STATUS.CREATED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Validate blueprint
 */
export function validateBlueprint(name, fields) {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Blueprint name is required');
  }
  
  if (!fields || fields.length === 0) {
    errors.push('At least one field is required');
  }
  
  fields.forEach((field, index) => {
    if (!field.label || field.label.trim().length === 0) {
      errors.push(`Field ${index + 1}: Label is required`);
    }
    if (!field.type) {
      errors.push(`Field ${index + 1}: Type is required`);
    }
  });
  
  return errors;
}

/**
 * Validate contract
 */
export function validateContract(name, fieldValues, requiredFields) {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Contract name is required');
  }
  
  requiredFields.forEach(field => {
    const value = fieldValues[field.id];
    if (field.required && (!value || value.toString().trim().length === 0)) {
      errors.push(`${field.label} is required`);
    }
  });
  
  return errors;
}
