import { homeTemplate } from '../src/templates/home.js';
import mockFirebase from '../__mocks__/firebase-mock.js';
global.firebase = mockFirebase();

describe('homeTemplate', () => {
  it('debería ser una función', () => {
    expect(typeof homeTemplate).toBe('function');
  });
