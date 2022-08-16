import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroService} from '../../shared/hero.service';
import {PersonalHeroesPageComponent} from './personal-heroes-page.component';
import {of} from 'rxjs';
import {Hero} from '../../shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../../../shared/components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../../../shared/components/hero-card/hero-card.component';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import {MockComponent, MockModule} from 'ng-mocks';
import {FirebaseModule} from '../../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('PersonalHeroesPage', () => {
  let component: PersonalHeroesPageComponent;
  let fixture: ComponentFixture<PersonalHeroesPageComponent>;
  let fixtureWithOnePersonalHero: ComponentFixture<PersonalHeroesPageComponent>;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(FirebaseModule),
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent(HeroCardComponent),
        MockComponent(HeroLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        PersonalHeroesPageComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n
      ]
    });

    fixture = TestBed.createComponent(PersonalHeroesPageComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();

    fixtureWithOnePersonalHero = TestBed.createComponent(PersonalHeroesPageComponent);
    component = fixtureWithOnePersonalHero.debugElement.componentInstance;
    const heroList = [new Hero({name: 'hero test'}), new Hero({name: 'hero2 test2'})];
    heroList[1].personalHero = true;
    heroServiceSpy.getHeroes.and.returnValue(of(heroList));
    fixtureWithOnePersonalHero.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize heroes with no personal heroes', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(0);
    });
  }));

  it('should initialize heroes with 1 personal hero', async(() => {
    fixtureWithOnePersonalHero.whenStable().then(() => {
      expect(fixtureWithOnePersonalHero.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
    });
  }));
});
