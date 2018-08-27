import { TestBed, inject } from '@angular/core/testing';

import { PlayerdetailsService } from './playerdetails.service';

describe('PlayerdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerdetailsService]
    });
  });

  it('should be created', inject([PlayerdetailsService], (service: PlayerdetailsService) => {
    expect(service).toBeTruthy();
  }));
});
