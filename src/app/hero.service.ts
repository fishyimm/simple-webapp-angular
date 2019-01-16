import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Tum } from "./tum";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  url = environment.url;

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  getTum() {
    console.log("getTum");
    return this.http.get<Tum>(this.url + "/api/tum");
  }

  getTest() {
    console.log("getTest");
    return this.http.get("/api/test", { responseType: "text" });
  }

  getHello() {
    console.log("getHello");
    return this.http.get(this.url + "/api/hello", { responseType: "text" });
  }
}
