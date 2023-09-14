import { TestBed } from '@angular/core/testing';

import { TokenValidationInterceptor } from './token-validation.interceptor';

describe('TokenValidationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenValidationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenValidationInterceptor = TestBed.inject(TokenValidationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
