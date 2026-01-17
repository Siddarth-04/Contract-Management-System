// Lifecycle Module - Contract Status Management

import { CONTRACT_STATUS, isValidTransition, getAvailableTransitions, canRevoke } from './models.js';
import { updateContract } from './storage.js';

/**
 * Transition contract to a new status
 */
export function transitionContract(contract, newStatus) {
  if (!isValidTransition(contract.status, newStatus)) {
    throw new Error(`Invalid transition from ${contract.status} to ${newStatus}`);
  }
  
  return updateContract(contract.id, { status: newStatus });
}

/**
 * Approve a contract
 */
export function approveContract(contract) {
  return transitionContract(contract, CONTRACT_STATUS.APPROVED);
}

/**
 * Send a contract
 */
export function sendContract(contract) {
  return transitionContract(contract, CONTRACT_STATUS.SENT);
}

/**
 * Sign a contract
 */
export function signContract(contract) {
  return transitionContract(contract, CONTRACT_STATUS.SIGNED);
}

/**
 * Lock a contract
 */
export function lockContract(contract) {
  return transitionContract(contract, CONTRACT_STATUS.LOCKED);
}

/**
 * Revoke a contract (APPROVED -> CREATED)
 */
export function revokeContract(contract) {
  if (!canRevoke(contract.status)) {
    throw new Error('Contract cannot be revoked from current status');
  }
  return transitionContract(contract, CONTRACT_STATUS.CREATED);
}

/**
 * Get lifecycle actions for a contract
 */
export function getLifecycleActions(contract) {
  const actions = [];
  const availableTransitions = getAvailableTransitions(contract.status);
  
  availableTransitions.forEach(status => {
    switch (status) {
      case CONTRACT_STATUS.APPROVED:
        actions.push({
          id: 'approve',
          label: 'Approve',
          status: CONTRACT_STATUS.APPROVED,
          class: 'btn-primary'
        });
        break;
      case CONTRACT_STATUS.SENT:
        actions.push({
          id: 'send',
          label: 'Send',
          status: CONTRACT_STATUS.SENT,
          class: 'btn-primary'
        });
        break;
      case CONTRACT_STATUS.SIGNED:
        actions.push({
          id: 'sign',
          label: 'Sign',
          status: CONTRACT_STATUS.SIGNED,
          class: 'btn-primary'
        });
        break;
      case CONTRACT_STATUS.LOCKED:
        actions.push({
          id: 'lock',
          label: 'Lock',
          status: CONTRACT_STATUS.LOCKED,
          class: 'btn-secondary'
        });
        break;
      case CONTRACT_STATUS.CREATED:
        // This is for revoke action
        actions.push({
          id: 'revoke',
          label: 'Revoke',
          status: CONTRACT_STATUS.CREATED,
          class: 'btn-outline'
        });
        break;
    }
  });
  
  return actions;
}

/**
 * Get lifecycle timeline steps
 */
export function getLifecycleSteps(currentStatus) {
  const allStatuses = [
    CONTRACT_STATUS.CREATED,
    CONTRACT_STATUS.APPROVED,
    CONTRACT_STATUS.SENT,
    CONTRACT_STATUS.SIGNED,
    CONTRACT_STATUS.LOCKED
  ];
  
  const currentIndex = allStatuses.indexOf(currentStatus);
  
  return allStatuses.map((status, index) => ({
    status,
    label: status,
    active: status === currentStatus,
    completed: index < currentIndex
  }));
}
