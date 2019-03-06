import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }

    register() {

    }
}