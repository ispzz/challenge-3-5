import "@testing-library/jest-dom";

// Polyfill for structuredClone
global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

// Mock fetch for Apollo Client
global.fetch = jest.fn();
