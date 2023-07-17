import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class AppComponent {
  private httpClient = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  question: string = '';
  context: {
    role: string;
    content: string;
  }[] = [];
  id: string = '';
  count = 0;

  disabled = true;
  showContext = false;

  start() {
    this.count = 0;
    this.question = '';
    this.id = '';
    this.showContext = false;

    this.callApi();
  }

  answer(value: string) {
    this.callApi(value, this.id);
  }

  speak() {
    this.textToSpeech(this.question);
  }

  toggleShowContext() {
    this.showContext = !this.showContext;
    this.cdr.detectChanges();
  }

  private callApi(answer?: string, id?: string) {
    this.disabled = true;

    const url = 'https://guess-iezf2rkifq-uc.a.run.app/';
    const query = answer && id ? `?answer=${answer}&id=${id}` : '';
    this.httpClient.get(url + query).subscribe((data: any) => {
      const { question, id, context } = data;

      this.count++;
      this.question = question;
      this.id = id;
      this.context = context;

      this.textToSpeech(question);
      this.disabled = false;

      this.cdr.detectChanges();
    });
  }

  private textToSpeech(text: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }
}
