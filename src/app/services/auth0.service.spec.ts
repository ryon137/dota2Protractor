import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of, throwError } from 'rxjs';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;

  let user = { 
    name: "Ryon",
    email: "ryon137@gmail.com"
  };
  
  const authServiceSpy = jasmine.createSpyObj('Auth0Service', ['getUser']);
  const userSpy = authServiceSpy.getUser.and.returnValue(of(user));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth0Service, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(Auth0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable containing user authentication',()=>{
    service.getUser().subscribe();
    expect(userSpy.calls.any()).toBe(true);
  });
});
