import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrService } from '../../services/ocr.service';
import { TextCleanerPipe } from '../../pipes/text-cleaner-pipe';
import { FileValidator } from '../../directives/file-validator';

@Component({
  selector: 'app-ocr-converter',
  standalone: true,
  imports: [CommonModule,  FileValidator],
  templateUrl: './ocr-converter.html',
  styleUrl: './ocr-converter.scss',
})
export class OcrConverter {
private ocrService = inject(OcrService);

  imagePreview = signal<string | null>(null);
  extractedData = signal<any[] | null>(null);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  // 1. ПРАВИЛЬНЕ МІСЦЕ ДЛЯ COMPUTED (на рівні класу)
  extractedText = computed(() => {
   const data = this.extractedData();
  return data ? data.map(item => item.text).join(' ') : '';
  });

  onFileSelected(file: File) {
    this.errorMessage.set(null);
    this.extractedData.set(null);

    // Створення прев'ю
    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);

    // Запит до API
    this.isLoading.set(true);
    this.ocrService.extractText(file).subscribe({
      next: (res) => {
        console.log('Відповідь API:', res); // Додай це для відладки
        this.extractedData.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Помилка API:', err);
        this.errorMessage.set('Помилка при обробці зображення.');
        this.isLoading.set(false);
      }
    });
  }

  handleError(error: string) {
    this.errorMessage.set(error);
    this.imagePreview.set(null);
  }

  copyToClipboard(text: string) {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert('Текст скопійовано!');
  }

}
