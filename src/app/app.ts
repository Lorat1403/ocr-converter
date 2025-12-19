import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OcrConverter } from "./components/ocr-converter/ocr-converter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OcrConverter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ocr-converter');
}
