import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private tickerAPIUrl = 'https://blockchain.info/ticker'
  private tradeVolumeAPIUrl = 'https://api.blockchain.info/charts/trade-volume?timespan=6months&format=json&cors=true'

  constructor(private http:HttpClient) {}

  public getMarketPrice():Observable<number>{
    return this.http.get<any>(this.tickerAPIUrl).pipe(
      map(data => data.USD.last)
    )
  }

  public getRate(){

  }

  public getTradeVolume():Observable<object>{
    console.log('getting called');
    
    return this.http.get<any>(this.tradeVolumeAPIUrl).pipe(
      map((data) => data.values.map((item:any) => ({x:item.x, y:item.y})))
    )
  }
}
