// Storage Module - LocalStorage Helper Functions

const STORAGE_KEYS = {
  BLUEPRINTS: 'contractflow_blueprints',
  CONTRACTS: 'contractflow_contracts'
};

/**
 * Get all blueprints from storage
 */
export function getBlueprints() {
  const data = localStorage.getItem(STORAGE_KEYS.BLUEPRINTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Save blueprints to storage
 */
export function saveBlueprints(blueprints) {
  localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(blueprints));
}

/**
 * Get a single blueprint by ID
 */
export function getBlueprintById(id) {
  const blueprints = getBlueprints();
  return blueprints.find(bp => bp.id === id);
}

/**
 * Add a new blueprint
 */
export function addBlueprint(blueprint) {
  const blueprints = getBlueprints();
  blueprints.push(blueprint);
  saveBlueprints(blueprints);
  return blueprint;
}

/**
 * Delete a blueprint by ID
 */
export function deleteBlueprint(id) {
  const blueprints = getBlueprints();
  const filtered = blueprints.filter(bp => bp.id !== id);
  saveBlueprints(filtered);
  return filtered;
}

/**
 * Get all contracts from storage
 */
export function getContracts() {
  const data = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Save contracts to storage
 */
export function saveContracts(contracts) {
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
}

/**
 * Get a single contract by ID
 */
export function getContractById(id) {
  const contracts = getContracts();
  return contracts.find(c => c.id === id);
}

/**
 * Add a new contract
 */
export function addContract(contract) {
  const contracts = getContracts();
  contracts.push(contract);
  saveContracts(contracts);
  return contract;
}

/**
 * Update an existing contract
 */
export function updateContract(id, updates) {
  const contracts = getContracts();
  const index = contracts.findIndex(c => c.id === id);
  
  if (index !== -1) {
    contracts[index] = {
      ...contracts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveContracts(contracts);
    return contracts[index];
  }
  
  return null;
}

/**
 * Delete a contract by ID
 */
export function deleteContract(id) {
  const contracts = getContracts();
  const filtered = contracts.filter(c => c.id !== id);
  saveContracts(filtered);
  return filtered;
}

/**
 * Clear all data (useful for testing)
 */
export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.BLUEPRINTS);
  localStorage.removeItem(STORAGE_KEYS.CONTRACTS);
}
