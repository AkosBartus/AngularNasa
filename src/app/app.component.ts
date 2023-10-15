import { Component } from '@angular/core';
import { z } from 'zod';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const NasaResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  url: z.string(),
  title: z.string(),
  copyright: z.string(),
});

type NasaResponse = z.infer<typeof NasaResponseSchema>

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  minDate: string = '1995-06-20'
  maxDate: string = new Date().toISOString().split("T")[0]

  selectedDate: string = new Date().toISOString().split("T")[0]
  data: NasaResponse | undefined;

  apiKey: string = 'XS7gW2HTMN7dULQnHt8EP57Rwb7gjy1gDgCrr3Ct'
  public apiUrlBase =  `https://api.nasa.gov/planetary/apod`

  constructor(
    private http: HttpClient
  ) {
    this.loadData()
  }

  onDateChange() {
    const apiUrlDate = `${this.apiUrlBase}?api_key=${this.apiKey}&date=${this.selectedDate}`
    this.loadData(apiUrlDate)
  }

  loadData = (apiUrlDate?: string) => {
    if (!apiUrlDate) {
      apiUrlDate = `${this.apiUrlBase}?api_key=${this.apiKey}&date=${this.selectedDate}`
    }

    this.http.get<NasaResponse>(apiUrlDate)
    .subscribe((response: NasaResponse) => {
      this.data = response
      console.log(this.data);
    })
  }
}
