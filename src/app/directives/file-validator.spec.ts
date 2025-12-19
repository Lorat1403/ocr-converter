import { FileValidator } from './file-validator';

describe('FileValidator', () => {
  it('should create an instance', () => {
    const directive = new FileValidator();
    expect(directive).toBeTruthy();
  });
});
