import {Component, OnInit} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {HeroService} from '../../shared/hero.service';
import {Observable} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';

@Component({
  selector: 'app-personal-heroes-page',
  templateUrl: './personal-heroes-page.component.html',
  styleUrls: ['./personal-heroes-page.component.scss']
})

export class PersonalHeroesPageComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map((heroes) => heroes.filter(function(hero) {
        return (hero.personalHero);
      })),
      defaultIfEmpty([])
    );
  }
}
