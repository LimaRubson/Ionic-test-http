import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { StatusBarMock, SplashScreenMock } from 'ionic-mocks';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
   
} from '../../test-config/mocks-ionic';

 
describe('Component: Root Component', () => {

    let component: MyApp;
    let fixture: ComponentFixture<MyApp>;
    let de: DebugElement;
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp],
             
            providers: [
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
            ],
 
            imports: [
                IonicModule.forRoot(MyApp)
            ]
 
        });

    //create component and test fixture
    fixture = TestBed.createComponent(MyApp);

    //get test component from the fixture
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('ion-title'));

  }));

  it('Should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

});

